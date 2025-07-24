"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import "../../../mail/mail.css";
import { IoCalendarClearOutline } from "react-icons/io5";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function MailDetailPage() {

  const URL = process.env.NEXT_PUBLIC_API_URL;
  const { idx } = useParams();
  const [mailDetail, setMailDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 메일 상세 정보 초기값
  const emptyDetail = {
    mailSub: '', recipient: '', memberId: '',
    mailDate: '', mailContent: '',
    mailIdx: 0, scheduleIdx: 0, toAll: false,
    createdAt: '', nextSendDate: '', intervalDays: 0,
    active: false
  };

  useEffect(() => {
    const member_id = sessionStorage.getItem("member_id");
    const token = sessionStorage.getItem("token");
    if (!member_id || !token) {
      alert("로그인 후 이용해주세요.");
      location.href = '/';
    } else {
      getMailDetail(idx, token);
    }
  }, []);

  // 메일 상세 정보 조회
  const getMailDetail = async (idx, token) => {
    try {
      const { data } = await axios.get(`${URL}/mail/detail`, {
        headers: {
          Authorization: token
        },
        params: {
          mailIdx: idx.includes("mailIdx") ? idx.split("EQ")[1] : null,
          scheduleIdx: idx.includes("scheduleIdx") ? idx.split("EQ")[1] : null
        }
      });
      console.log(data);
      if (data.mail) {
        setMailDetail(prev => ({ ...emptyDetail, ...data.mail }));
      } else {
        setMailDetail(prev => ({ ...emptyDetail, ...data.autoSend }));
      }

    } catch (error) {
      alert("메일 상세 정보 조회 중 오류가 발생했습니다. 다시 로그인 후 이용해주세요.");
      sessionStorage.removeItem("member_id");
      sessionStorage.removeItem("token");
      location.href = '/';
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

  return (
    <>
      <div className={"mailDetail-container"}>
        <h1 className={"mailDetail-title"}>{mailDetail.mailIdx ? "📨 발신 메일 상세보기" : "📨 정기 발송 메일 상세보기"}</h1>

        <div className={"mailDetail-card"}>
          <div className={"mailDetail-btn-wrapper"}>
            <Link href="/component/mail">
              <button className={"mailDetail-backBtn"}>← 리스트로 돌아가기</button>
            </Link>
            <button className={`${mailDetail.scheduleIdx ? "mailDetail-updateBtn" : "hidden"}`} onClick={() => {
              location.href = `/component/mail/update/scheduleIdxEQ${mailDetail.scheduleIdx}`;
            }}>정기 메일 수정</button>
          </div>

          <section className={"mailDetail-section"}>
            <h2 className={"mailDetail-subject"}>📧 {mailDetail.mailSub}</h2>
            <p className={"mailDetail-meta"}>
              수신 대상:{" "}
              <span>
                {mailDetail.recipient}
              </span>
            </p>
            <p className={"mailDetail-meta"}>
              담당자 ID: <span>{mailDetail.memberId}</span>
            </p>
            {mailDetail.scheduleIdx ? (
              <>
                <p className={"mailDetail-meta"}>
                  다음 발송 일자: <span>{mailDetail.nextSendDate}</span>
                </p>
                <p className={"mailDetail-meta"}>
                  발송 주기: <span>{mailDetail.intervalDays}일</span>
                </p>
                <p className={"mailDetail-meta"}>
                  활성화 여부: <span>{mailDetail.active ? "활성화" : "비활성화"}</span>
                </p>
              </>
            ) : (
              <>
              </>
            )}
            <div className={"mailDetail-date"}>
              <IoCalendarClearOutline />
              <span>{mailDetail.mailDate ? formatDate(mailDetail.mailDate) : formatDate(mailDetail.createdAt)}</span>
            </div>
          </section>

          <div className={"mailDetail-content"} dangerouslySetInnerHTML={{ __html: mailDetail.mailContent }} />
        </div>
      </div>
    </>
  );
}