'use client';

import axios from "axios";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../../../Header/page";
import Menu from "../../../menu/Menu";
import "../mail/mail.css";

export default function MailSend() {
    const pathname = usePathname();

    const URL = process.env.NEXT_PUBLIC_API_URL;

    const [memberId, setMemberId] = useState("");
    const [token, setToken] = useState("");
    const [userType, setUserType] = useState("");
    const [userId, setUserId] = useState("");
    const [recipients, setRecipients] = useState([]);
    const [recipient, setRecipient] = useState("");
    const [temIdx, setTemIdx] = useState("7");
    const [mailSub, setMailSub] = useState("");
    const [mailContent, setMailContent] = useState("");
    const [intervalDays, setIntervalDays] = useState("");
    const [reservedDate, setReservedDate] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // 라우팅 시작할 때 모든 상태 초기화
    useEffect(() => {
        const clearAll = () => {
        setUserType("");
        setUserId("");
        setRecipients([]);
        setRecipient("");
        setTemIdx("7");
        setMailSub("");
        setMailContent("");
        setIntervalDays("");
        setReservedDate("");
        setIsLoading(true);
        };
        clearAll();
    }, [pathname]);

    // 로그인 체크
    useEffect(() => {
        const member_id = sessionStorage.getItem("member_id");
        const getToken = sessionStorage.getItem("token");
        if (!member_id || !getToken) {
            alert("로그인 후 이용해주세요.");
            location.href = "/";
        } else {
            setMemberId(member_id);
            setToken(getToken);
        }
    }, []);

    // 메일 템플릿 변경 시 작성 중인 내용 저장 안됨 경고창 띄우기
    const handleTemplateChange = (e) => {
        const nextIdx = e.target.value;
        if (nextIdx === temIdx) return;
        if (temIdx === "") {
            setTemIdx(nextIdx);
            return;
        }
        const ok = window.confirm(
          "작성 중인 내용이 저장되지 않습니다.\n템플릿을 변경하시겠습니까?"
        );
        if (ok) {
          setTemIdx(nextIdx);
        }
      };

    // 메일 템플릿 가져오기
    useEffect(() => {
        if (!token) return;
        getTemplate(Number(temIdx), token);
    }, [temIdx, token]);

    // 메일 템플릿 가져오기
    const getTemplate = async (temIdx, token) => {
        try {
            const {data} = await axios.get(`${URL}/mail/template`,
            {
                headers: {Authorization: token},
                params: {temIdx: temIdx}
            }
        );
        setMailContent(data.template.temBody);
        } catch (error) {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            alert("메일 템플릿 조회 중 오류가 발생했습니다. 다시 로그인 후 이용해주세요.");
            sessionStorage.removeItem("member_id");
            sessionStorage.removeItem("token");
            location.href = '/';
        } finally {
            setIsLoading(false);
        }
    }

    // 작성 중인지 판단(예: 제목·본문·수신자 배열 중 하나라도 채워지면 true)
    const unsaved = useMemo(
        () =>
        temIdx !== "" ||
        mailSub !== "" ||
        mailContent !== "" ||
        recipients.length > 0 ||
        intervalDays !== "" ||
        reservedDate !== "",
        [temIdx, mailSub, mailContent, recipients, intervalDays, reservedDate]
    );

    // 작성 중인데 떠나면 경고창 띄우기
    const handleBeforeUnload = useCallback((e) => {
        e.preventDefault();
        e.returnValue = "";
      }, []);

    useEffect(() => {
        if (unsaved) {
          window.addEventListener("beforeunload", handleBeforeUnload);
        }
      
        return () => {
          window.removeEventListener("beforeunload", handleBeforeUnload);
        };
      }, [unsaved]);

      // 라우팅 시 작성 중인 내용 저장 안됨 경고창 띄우기
      useEffect(() => {
        const handleLinkClick = (e) => {
          const a = e.target.closest("a");
          if (!a) return;
      
          const href = a.getAttribute("href");
          // 내부 라우팅인지 확인 (절대경로 + 동일 도메인 + / 로 시작)
          if (!href?.startsWith("/") || href.startsWith("//")) return;
      
          if (unsaved) {
            if (!window.confirm("작성 중인 내용이 저장되지 않습니다.\n이동하시겠습니까?")) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
            }
          }
        };
      
        document.addEventListener("click", handleLinkClick, {capture: true});
        return () => document.removeEventListener("click", handleLinkClick, {capture: true});
      }, [unsaved]);

    // intervalDays 숫자만 입력 가능
    const onlyNumberInput = (e) => {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value)) {
            setIntervalDays(value);
        } else if (value === "") {
            setIntervalDays("");
        }
    }

    // 메일 발송
    const mailSend = async () => {

        if (userType === "개별" && recipients.length === 0) {
            alert("수신자를 입력해주세요.");
            return;
        }

        const finalRecipient =
        userType === "개별" ? recipients.join(",") : recipient;

        if (!finalRecipient) {
            alert("수신자 혹은 수신군을 입력해주세요.");
            return;
        }
        if (!mailSub) {
            alert("메일 제목을 입력해주세요.");
            return;
        }
        if (!mailContent) {
            alert("메일 본문을 입력해주세요.");
            return;
        }
        const active = intervalDays !== "" || reservedDate !== "" ? true : false;

        try {
            const {data} = await axios.post(`${URL}/mail/send`, 
                {
                    "temIdx": Number(temIdx),
                    "memberId" : memberId,
                    "isToAll" : userType === "개별" ? false : true,
                    "recipient" : finalRecipient,
                    "mailSub" : mailSub,
                    "mailContent" : mailContent,
                    "intervalDays" : intervalDays === "" ? 0 : Number(intervalDays),
                    "isActive" : active,
                    "reservedDate" : reservedDate ? reservedDate : null
                },
                {
                    headers: {Authorization: token},
                });
                window.removeEventListener("beforeunload", handleBeforeUnload);
            if (data.success) {
                alert("메일 발송이 완료되었습니다.");
                location.href = "/component/mail";
            } else {
                alert("메일 발송 중 오류가 발생했습니다.");
                location.href = "/component/mail";
            }
        } catch (error) {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            alert("메일 발송 중 오류가 발생했습니다. 다시 로그인 후 이용해주세요.");
            sessionStorage.removeItem("member_id");
            sessionStorage.removeItem("token");
            location.href = '/';
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header/>
            <Menu />
            <div className="stats_container">
                <h1 className="mailSend-title">메일 발송</h1>
                <div className="mailSend-container">
                    <h3 className="mailSend-subtitle">🎯 수신 대상 설정</h3>
                    <span className="mailSend-span">유저 분류</span>
                    <select
                    className="mailSend-select"
                    onChange={(e) => {setUserType(e.target.value);
                                       e.target.value !== "개별" && setRecipient(e.target.value);}}>
                        <option value="">유저 분류 선택</option>
                        <option value="전체">전체</option>
                        <option value="일반">일반 유저</option>
                        <option value="신규">신규 유저</option>
                        <option value="복귀">복귀 유저</option>
                        <option value="휴면">휴면 유저</option>
                        <option value="이탈 위험군">이탈 위험군 유저</option>
                        <option value="개별">개별 유저</option>
                    </select>
                    {userType === "개별" && (
                        <>
                            <span className="mailSend-span">유저 아이디</span>
                            <input type="text"
                            placeholder="유저 아이디를 입력해주세요."
                            className="mailSend-user-id-input"
                            onChange={(e) => setUserId(e.target.value)}
                            onKeyUp={(e) =>
                                e.key !== "Enter"
                                  ? null
                                  : !userId.trim()
                                  ? alert("유저 아이디를 입력해주세요.")
                                  : recipients.includes(userId.trim().toLowerCase())
                                  ? alert("이미 추가된 유저입니다.")
                                  : (setRecipients([...recipients, userId.trim().toLowerCase()]), setUserId(""))
                              }
                            value={userId}
                            />
                            <button className="mailSend-user-id-button"
                            onClick={()=>
                                !userId.trim()
                                  ? alert("유저 아이디를 입력해주세요.")
                                  : recipients.includes(userId.trim().toLowerCase())
                                  ? alert("이미 추가된 유저입니다.")
                                  : (setRecipients([...recipients, userId.trim().toLowerCase()]), setUserId(""))
                              }>추가</button>
                            <div className="mailSend-user-id-list">
                                {recipients.map((item, index) => (
                                    <div
                                    key={index}
                                    className="mailSend-user-id-item"
                                    onClick={()=> setRecipients(recipients.filter((_, i) => i !== index))}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                    <h3 className="mailSend-subtitle">📝 메일 작성</h3>
                    <span className="mailSend-span">메일 템플릿 선택</span>
                    <select className="mailSend-select" onChange={(e) => handleTemplateChange(e)} value={temIdx}>
                        <option value="7">템플릿 없음</option>
                        <option value="1">회원가입 환영 템플릿</option>
                        <option value="2">시스템 점검 안내 템플릿</option>
                        <option value="3">신규 기능 베타 테스터 모집 템플릿</option>
                        <option value="4">패치 노트 템플릿</option>
                        <option value="5">업데이트 안내 템플릿</option>
                        <option value="6">안내 템플릿</option>
                    </select>
                    <span className="mailSend-span">메일 제목</span>
                    <input
                    type="text"
                    placeholder="메일의 제목을 입력해주세요."
                    className="mailSend-input"
                    onChange={(e) => setMailSub(e.target.value)}
                    value={mailSub}
                    />
                    <div className="mailSend-content-container">
                        <div className={temIdx !== "7" ? "mailSend-content-wrapper" : "mailSend-content-wrapper-only"}>
                            <span className="mailSend-span">메일 본문 작성</span>
                            <textarea className="mailSend-textarea"
                            onChange={(e) => setMailContent(e.target.value)}
                            value={mailContent}
                            />
                        </div>
                            {mailContent !== "" && temIdx !== "7" ? (
                                <>
                                    <div className="mailSend-preview-wrapper">
                                        <span className="mailSend-span">메일 미리보기</span>
                                        {mailContent && (
                                        <div className="mailSend-preview">
                                            <div dangerouslySetInnerHTML={{__html: mailContent}}/>
                                        </div>
                                        )}
                                    </div>
                                </>
                            ) : null}
                    </div>
                    <h3 className="mailSend-subtitle">⚙️ 발송 옵션</h3>
                    <span className="mailSend-span">주기 입력</span>
                    <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="일 수를 입력해주세요. (예: 3일 → 3 입력, 일회성 메일일 경우 공란)"
                    className="mailSend-input"
                    onChange={onlyNumberInput}
                    value={intervalDays}
                    />
                    <span className="mailSend-span">예약 일자 입력</span>
                    <input
                    type="date"
                    className="mailSend-input"
                    onChange={(e) => {e.target.value ? setReservedDate(e.target.value) : setReservedDate("")}}
                    value={reservedDate}
                    />
                    <button className="mailSend-button" onClick={()=>mailSend()}>메일 발송</button>
                </div>
            </div>
        </>
    );
}