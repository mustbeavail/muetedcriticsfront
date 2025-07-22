"use client";
import Header from '../../../../Header/page';
import Menu from '../../../../menu/Menu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import '../inquiry.css';

const URL = process.env.NEXT_PUBLIC_API_URL;

const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;
const member_id = typeof window !== "undefined" ? sessionStorage.getItem('member_id') : null;

export default function InquiryDetail({ params }) {
    const { inquiryDetail } = use(params);
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
        if (inquiryDetail) {
            getDetail(inquiryDetail);
        }
    }, [inquiryDetail]);

    const getDetail = async (idx) => {
        const { data } = await axios.get(`${URL}/inquiry/detail/${idx}`, {
            headers: {
                authorization: token
            }
        });
        console.log(data);
        setInfo(data);
    };

    // 날짜를 한국 형식으로 포맷팅하는 함수
    const formatDate = (dateString) => {
        if (!dateString) return '-'; // 날짜 문자열이 없으면 '-' 반환

        const date = new Date(dateString); // 날짜 객체 생성
        // 날짜 부분을 한국어 형식으로 변환하고 공백 제거
        const datePart = date.toLocaleDateString('ko-KR').replace(/ /g, '');
        // 시간 부분을 24시간 형식으로 변환
        const timePart = date.toLocaleTimeString('ko-KR', {
            hour: '2-digit', // 시간: 두 자리 숫자
            minute: '2-digit', // 분: 두 자리 숫자
            hour12: false // 24시간 형식 사용
        });

        return `${datePart} ${timePart}`; // 날짜와 시간 조합하여 반환
    };

    // AI 답변 생성
    const [response, setResponse] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const aiResponse = async () => {
        if (isDisabled) return;
        setIsDisabled(true);

        const { data } = await axios.get(`${URL}/inquiry/${inquiryDetail}/ai-response`, {
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
            inquiryIdx: inquiryDetail,
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
            // router.push(`/component/inquiry`);
            getDetail(inquiryDetail);
        } else {
            alert('답변 작성에 실패했습니다.');
        }
    };

    return (
        <>
            <Header token={token} memberId={memberId}/>
            <Menu />
            <div className="inquiry-list-container">
                <span className={"inquiry-list-mainTitle"}>문의 상세보기</span>
                <div className={"inquiry-list-chartWrapper"}>
                    <button className="inquiry-detail-back-button" onClick={() => router.back()}>← 리스트로</button>

                    <span className="inquiry-detail-category">{info.category}</span>
                    <span className="inquiry-detail-title">{info.title}</span>

                    <div className="inquiry-detail-meta">유저 ID: {info.userId}</div>
                    <div className="inquiry-detail-meta">작성일: {formatDate(info.createdAt)}</div>

                    <div className="inquiry-detail-content">{info.content}</div>

                    {/* 만약 status가 false일시 답변 작성 섹션 보여주기 */}
                    {info.status != "완료" && (
                    <div className="inquiry-detail-reply-section">
                        <span className="inquiry-detail-reply-title">상담사 답변 작성</span>
                        <textarea
                            className="inquiry-detail-reply-input"
                            name="response"
                            placeholder="본문 내용을 입력해주세요."
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                        />
                        <div className="inquiry-detail-button-group">
                            <button className="inquiry-detail-ai-btn" onClick={aiResponse} disabled={isDisabled}>AI 답변 생성</button>
                            <button className="inquiry-detail-submit-btn" onClick={agentResponse}>답변 작성</button>
                        </div>
                    </div>
                    )}
                    {/* 만약 status가 true일 시 response 내용 보여주기 */}
                    {info.status === "완료" && (
                        <div className="inquiry-detail-reply-section">
                            <span className="inquiry-detail-reply-title">상담사 답변</span>
                            <div className="inquiry-detail-reply-content">{info.responses[0].content}</div>
                        </div>
                    )}
                </div>
            </div>

        </>
    );
}