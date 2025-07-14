import "../mail/mail.css";
import Link from "next/link";
import Header from "../../../Header/page";
import Menu from "../../../menu/Menu";

export default function MailSend() {
    return (
        <>
            {/* <Header /> */}
            <Menu />
            <div className="stats-container">
                <h1 className="mailSend-title">메일 발송</h1>
                <div className="mailSend-container">
                    <h3 className="mailSend-subtitle">🎯 수신 대상 설정</h3>
                    <span className="mailSend-span">유저 분류</span>
                    <select className="mailSend-select">
                        <option>전체</option>
                        <option>신규 유저</option>
                        <option>복귀 유저</option>
                        <option>일반 유저</option>
                    </select>
                    <h3 className="mailSend-subtitle">📝 메일 작성</h3>
                    <span className="mailSend-span">메일 템플릿 선택</span>
                    <select className="mailSend-select">
                        <option>템플릿 1</option>
                        <option>템플릿 2</option>
                        <option>템플릿 3</option>
                        <option>템플릿 4</option>
                        <option>템플릿 5</option>
                        <option>템플릿 6</option>
                        <option>템플릿 7</option>
                    </select>
                    <span className="mailSend-span">메일 제목</span>
                    <input type="text" placeholder="메일의 제목을 입력해주세요." className="mailSend-input" />
                    <span className="mailSend-span">메일 본문 작성</span>
                    <textarea placeholder="메일의 본문을 입력해주세요." className="mailSend-textarea" />
                    <h3 className="mailSend-subtitle">⚙️ 발송 옵션</h3>
                    <span className="mailSend-span">주기 입력</span>
                    <input type="text" placeholder="일 수를 입력해주세요. (예: 3일 → 3 입력, 일회성 메일일 경우 공란)" className="mailSend-input" />
                    <Link href="/component/mail">
                        <button className="mailSend-button">메일 발송</button>
                    </Link>
                </div>
            </div>
        </>
    );
}