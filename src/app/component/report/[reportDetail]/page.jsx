"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Header from '../../../../Header/page';
import Menu from '../../../../menu/Menu';
import { use } from 'react';
import '../report.css';

const URL = process.env.NEXT_PUBLIC_API_URL;

const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;
const member_id = typeof window !== "undefined" ? sessionStorage.getItem('member_id') : null;

export default function ReportDetail({ params }) {
    const { reportDetail } = use(params);
    const router = useRouter();

    const [info, setInfo] = useState({
        inquiryIdx: '',
        userId: '',
        reportedUserId: '',
        type: '',
        category: '',
        title: '',
        content: '',
        status: '',
        createdAt: '',
        responses: [{
            agentId: '',
            content: '',
            createdAt: '',
        }]
    });

    useEffect(() => {
        if (reportDetail) {
            getDetail(reportDetail);
        }
    }, [reportDetail]);

    const getDetail = async (idx) => {
        const { data } = await axios.get(`${URL}/report/detail/${idx}`, {
            headers: {
                authorization: token
            }
        });
        console.log(data);
        setInfo(data);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        const datePart = date.toLocaleDateString('ko-KR').replace(/ /g, '');
        const timePart = date.toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        return `${datePart} ${timePart}`;
    };

    // AI 답변 생성
    const [response, setResponse] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const aiResponse = async () => {
        if (isDisabled) return;
        setIsDisabled(true);

        const { data } = await axios.get(`${URL}/inquiry/${reportDetail}/ai-response`, {
            headers: {
                authorization: token
            }
        });
        console.log(data);
        setResponse(data.response);
    };

    // 상담사 답변 작성
    const agentResponse = async () => {
        const { data } = await axios.post(`${URL}/inquiry/agent-response`, {
            inquiryIdx: reportDetail,
            agentId: member_id,
            content: response,
        }, {
            headers: {
                authorization: token
            }
        });
        console.log(data);
        if (data.success) {
            alert('답변이 성공적으로 작성되었습니다.');
            // router.push(`/component/report`);
            getDetail(reportDetail);
        } else {
            alert('답변 작성에 실패했습니다.');
        }
    };

    return (
        <>
            <Header token={token} memberId={memberId}/>
            <Menu />
            <div className="report-container">
                <span className="report-mainTitle">신고 상세보기</span>
                <div className="report-chartWrapper">
                    <button className="report-detail-back-button" onClick={() => router.back()}>← 리스트로</button>
                    <span className="report-detail-category">{info.category}</span>
                    <span className="report-detail-title">{info.title}</span>
                    <div className="report-detail-meta">신고자 ID: {info.userId}</div>
                    <div className="report-detail-meta">피신고자 ID: {info.reportedUserId}</div>
                    <div className="report-detail-meta">작성일: {formatDate(info.createdAt)}</div>

                    <div className="report-detail-content">{info.content}</div>
                    {/* 만약 status가 false일시 답변 작성 섹션 보여주기 */}
                    {info.status != "완료" && (
                    <div className="report-detail-reply-section">
                        <span className="report-detail-reply-title">상담사 답변 작성</span>
                        <textarea
                            className="report-detail-reply-input"
                            name="response"
                            placeholder="본문 내용을 입력해주세요."
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                        />
                        <div className="report-detail-button-group">
                            <button className="report-detail-ai-btn" onClick={aiResponse} disabled={isDisabled}>AI 답변 생성</button>
                            <button className="report-detail-submit-btn" onClick={agentResponse}>답변 작성</button>
                        </div>
                    </div>
                    )}
                    {/* 만약 status가 true일 시 response 내용 보여주기 */}
                    {info.status === "완료" && (
                        <div className="report-detail-reply-section">
                            <span className="report-detail-reply-title">상담사 답변</span>
                            <div className="report-detail-reply-content">{info.responses[0].content}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
