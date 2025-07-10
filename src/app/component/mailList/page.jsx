"use client";
import { useState, useEffect } from "react";
import mailListStyles from "./mailList.module.css";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";

export default function MailList() {
    const [mailList, setMailList] = useState([]);
    const listItem = [
        { mail_idx: 1, mail_sub: "메일 제목 1", mail_date: "2025.06.30 09:05", recipient: "받는 사람 1", member_id: "담당자 1", mail_content: "메일 내용 1" },
        { mail_idx: 2, mail_sub: "메일 제목 2", mail_date: "2025.06.30 09:05", recipient: "받는 사람 2", member_id: "담당자 2", mail_content: "메일 내용 2" },
        { mail_idx: 3, mail_sub: "메일 제목 3", mail_date: "2025.06.30 09:05", recipient: "받는 사람 3", member_id: "담당자 3", mail_content: "메일 내용 3" },
        { mail_idx: 4, mail_sub: "메일 제목 4", mail_date: "2025.06.30 09:05", recipient: "받는 사람 4", member_id: "담당자 4", mail_content: "메일 내용 4" },
        { mail_idx: 5, mail_sub: "메일 제목 5", mail_date: "2025.06.30 09:05", recipient: "받는 사람 5", member_id: "담당자 5", mail_content: "메일 내용 5" },
        { mail_idx: 6, mail_sub: "메일 제목 6", mail_date: "2025.06.30 09:05", recipient: "받는 사람 6", member_id: "담당자 6", mail_content: "메일 내용 6" },
        { mail_idx: 7, mail_sub: "메일 제목 7", mail_date: "2025.06.30 09:05", recipient: "받는 사람 7", member_id: "담당자 7", mail_content: "메일 내용 7" },
        { mail_idx: 8, mail_sub: "메일 제목 8", mail_date: "2025.06.30 09:05", recipient: "받는 사람 8", member_id: "담당자 8", mail_content: "메일 내용 8" },
        { mail_idx: 9, mail_sub: "메일 제목 9", mail_date: "2025.06.30 09:05", recipient: "받는 사람 9", member_id: "담당자 9", mail_content: "메일 내용 9" },
        { mail_idx: 10, mail_sub: "메일 제목 10", mail_date: "2025.06.30 09:05", recipient: "받는 사람 10", member_id: "담당자 10", mail_content: "메일 내용 10" },
        { mail_idx: 11, mail_sub: "메일 제목 11", mail_date: "2025.06.30 09:05", recipient: "받는 사람 11", member_id: "담당자 11", mail_content: "메일 내용 11" },
        { mail_idx: 12, mail_sub: "메일 제목 12", mail_date: "2025.06.30 09:05", recipient: "받는 사람 12", member_id: "담당자 12", mail_content: "메일 내용 12" },
        { mail_idx: 13, mail_sub: "메일 제목 13", mail_date: "2025.06.30 09:05", recipient: "받는 사람 13", member_id: "담당자 13", mail_content: "메일 내용 13" },
        { mail_idx: 14, mail_sub: "메일 제목 14", mail_date: "2025.06.30 09:05", recipient: "받는 사람 14", member_id: "담당자 14", mail_content: "메일 내용 14" },
        { mail_idx: 15, mail_sub: "메일 제목 15", mail_date: "2025.06.30 09:05", recipient: "받는 사람 15", member_id: "담당자 15", mail_content: "메일 내용 15" },
        { mail_idx: 16, mail_sub: "메일 제목 16", mail_date: "2025.06.30 09:05", recipient: "받는 사람 16", member_id: "담당자 16", mail_content: "메일 내용 16" },
        { mail_idx: 17, mail_sub: "메일 제목 17", mail_date: "2025.06.30 09:05", recipient: "받는 사람 17", member_id: "담당자 17", mail_content: "메일 내용 17" },
        { mail_idx: 18, mail_sub: "메일 제목 18", mail_date: "2025.06.30 09:05", recipient: "받는 사람 18", member_id: "담당자 18", mail_content: "메일 내용 18" },
        { mail_idx: 19, mail_sub: "메일 제목 19", mail_date: "2025.06.30 09:05", recipient: "받는 사람 19", member_id: "담당자 19", mail_content: "메일 내용 19" },
        { mail_idx: 20, mail_sub: "메일 제목 20", mail_date: "2025.06.30 09:05", recipient: "받는 사람 20", member_id: "담당자 20", mail_content: "메일 내용 20" },
    ];

    useEffect(() => {
        setMailList(listItem);
    }, []);

    return (
        <>
            <span className={mailListStyles['mailList-title']}>발신 메일 리스트</span>
            <div className={mailListStyles['mailList-background']}>
                <div className={mailListStyles['mailList-header']}>
                    <div className={mailListStyles['mailList-search']}>
                        <span>메일 검색</span>
                        <div className={mailListStyles['mailList-input-wrapper']}>
                            <input type="text" placeholder="메일 검색" />
                            <button className={mailListStyles['search-btn']}><IoSearch /></button>
                        </div>
                    </div>
                    <select className={mailListStyles['mailList-select']}>
                        <option value="all">전체</option>
                        <option value="sent">정렬 기준 미정1</option>
                        <option value="received">정렬 기준 미정2</option>
                    </select>
                </div>
                {mailList.map((mail) => (
                    <Link key={mail.mail_idx} href={`/mailList/${mail.mail_idx}`} className={mailListStyles['mailList-item']}>
                        <div className={mailListStyles['mailList-subItem']}>
                            <div className={mailListStyles['mailList-left']}>
                                <div className={mailListStyles['mailList-title']}>📧 {mail.mail_sub}</div>
                                <div className={mailListStyles['mailList-recipient']}>수신 유저 분류: <span style={{ color: 'white' }}>{mail.recipient}</span></div>
                                <div className={mailListStyles['mailList-member']}>담당자 ID: <span style={{ color: 'white' }}>{mail.member_id}</span></div>
                            </div>
                            <div className={mailListStyles['mailList-right']}>
                                📆 {mail.mail_date}
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </>
    );
}