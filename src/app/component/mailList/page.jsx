"use client";
import { useState, useEffect } from "react";
import mailListStyles from "./mailList.module.css";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { listItem } from "./data"; // 더미데이터

export default function MailList() {
    // data.js 에서 더미데이터 불러옴
    const [mailList, setMailList] = useState([]);
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