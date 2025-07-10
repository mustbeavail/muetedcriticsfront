"use client";
import { useState, useEffect } from "react";
import "./mail.css";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { listItem } from "./data";

export default function MailList() {
    const [mailList, setMailList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    useEffect(() => {
        setMailList(listItem);
    }, []);

    const totalPages = Math.ceil(mailList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedList = mailList.slice(startIndex, endIndex);

    return (
        <>
            <h1 className={"mailList-title"}>발신 메일 리스트</h1>
            <div className={"mailList-background"}>
                <div className={"mailList-header"}>
                    <div className={"mailList-search"}>
                        <span>메일 검색</span>
                        <div className={"mailList-input-wrapper"}>
                            <input type="text" placeholder="메일 검색" />
                            <button className={"search-btn"}><IoSearch /></button>
                        </div>
                    </div>
                    <Link href="/component/mailSend">
                        <button className={"mailDetail-backBtn"}>메일 발송</button>
                    </Link>
                    <Link href="/component/salesStats">
                        <button className={"mailDetail-backBtn"}>매출 통계</button>
                    </Link>
                    <select className={"mailList-select"}>
                        <option>전체</option>
                        <option>정렬 기준 미정1</option>
                        <option>정렬 기준 미정2</option>
                    </select>
                </div>

                {/* 리스트 출력 */}
                {paginatedList.map((mail) => (
                    <Link key={mail.mail_idx} href={`/component/mail/${mail.mail_idx}`} className={"mailList-item"}>
                        <div className={"mailList-subItem"}>
                            <div className={"mailList-left"}>
                                <div className={"mailList-title"}>📧 {mail.mail_sub}</div>
                                <div className={"mailList-recipient"}>수신 유저 분류: <span style={{ color: 'white' }}>{mail.recipient}</span></div>
                                <div className={"mailList-member"}>담당자 ID: <span style={{ color: 'white' }}>{mail.member_id}</span></div>
                            </div>
                            <div className={"mailList-right"}>
                                📆 {mail.mail_date}
                            </div>
                        </div>
                    </Link>
                ))}

                {/* 페이징 */}
                <div className="mailList-pagination">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={`mailList-pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}