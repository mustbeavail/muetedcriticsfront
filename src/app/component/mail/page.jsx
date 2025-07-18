"use client";
import { useState, useEffect } from "react";
import "./mail.css";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { listItem } from "./data";
import axios from "axios";
import Header from "../../../Header/page";
import Menu from "../../../menu/Menu";

export default function MailList() {

    const URL = process.env.NEXT_PUBLIC_API_URL;
    const [mailList, setMailList] = useState([]);
    const [sort, setSort] = useState('mailList');
    const [align, setAlign] = useState('dateDesc');
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalFilteredPages, setTotalFilteredPages] = useState(1);

    useEffect(() => {
        const member_id = sessionStorage.getItem("member_id");
        const token = sessionStorage.getItem("token");
        if (member_id && token) {
            getList(token);
        }
    }, [sort, align]);

    const getList = async (token) => {
        const { data } = await axios.get(`${URL}/mail/list`, {
            headers: {
                Authorization: token
            },
            params: {
                sort: sort,
                page: currentPage,
                align: align
            }
        });
        console.log(data);
        if (sort === 'mailList') {
            setMailList(data.mailList.content);
            setTotalFilteredPages(data.mailList.totalPages);
        } else {
            setMailList(data.autoSendList.content);
            setTotalFilteredPages(data.autoSendList.totalPages);
        }
    }

    const searchMail = async () => {
        const { data } = await axios.get(`${URL}/mail/search`, {
            headers: {
                Authorization: token
            },
            params: {
                search: search,
                searchType: searchType,
                page: currentPage,
                sort: sort
            }
        });
    }

    return (
        <>
            <Header />
            <Menu />
            <div className="stats_container">
                <h1 className={"mailList-title"}>발신 메일 리스트</h1>
                <div className={"mailList-background"}>
                    <div className={"mailList-header"}>
                        <div className={"mailList-search"}>
                            <span>메일 검색</span>
                            <div className={"mailList-input-wrapper"}>
                                <input type="text" placeholder="메일 검색" onChange={(e) => setSearch(e.target.value)} />
                                <button className={"search-btn"}><IoSearch /></button>
                            </div>
                        </div>
                        <div className={"mailList-select-wrapper"}>
                            <select className={"mailList-select"} onChange={(e) => setSort(e.target.value)}>
                                <option value="mailList">발송된 메일</option>
                                <option value="autoSendList">정기 발송 메일 정보</option>
                            </select>
                            <select className={"mailList-select2"} onChange={(e) => setAlign(e.target.value)}>
                                <option value="dateDesc">날짜 내림차순</option>
                                <option value="dateAsc">날짜 오름차순</option>
                            </select>
                        </div>
                    </div>

                    {mailList.map((mail) => (
                        <Link
                            key={mail.mailIdx ? mail.mailIdx : mail.secheduleIdx}
                            href={`/component/mail/${mail.mailIdx ? mail.mailIdx : mail.secheduleIdx}`}
                            className={"mailList-item"}>
                            <div className={"mailList-subItem"}>
                                <div className={"mailList-left"}>
                                    <div className={"mailList-title"}>📧 {mail.mailSub}</div>
                                    <div className={"mailList-recipient"}>
                                        {mail.recipient.includes("@") ? "수신인: " : "수신 유저 분류: "}
                                        <span style={{ color: 'white' }}>{mail.recipient}</span>
                                    </div>
                                    <div className={"mailList-member"}>담당자 ID: <span style={{ color: 'white' }}>{mail.memberId}</span></div>
                                </div>
                                <div className={"mailList-right-wrapper"}>
                                    <div className={"mailList-right"}>
                                        📆 {mail.mailDate ? mail.mailDate : mail.createdAt}
                                    </div>
                                    {sort == 'autoSendList' ?
                                        <>
                                            <div className={"mailList-right-autoSend"}>
                                                {mail.active ? "다음 발송 예정일: " + mail.nextSendDate : "다음 발송 예정 없음"}
                                            </div>
                                            <div className={"mailList-right-autoSend"}>
                                                {mail.intervalDays == 0 ? "단기 발송" : mail.intervalDays + "일 간격 발송"}
                                            </div>
                                        </>
                                        :
                                        <>
                                        </>
                                    }
                                    </div>
                            </div>
                        </Link>
                    ))}
                    <div className="mailList-pagination">
                        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>이전</button>
                        {Array.from({ length: totalFilteredPages }, (_, i) => i + 1).map((page) => (
                            <button
                            key={page}
                            className={currentPage === page ? 'active' : ''}
                            onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}
                        <button disabled={currentPage === totalFilteredPages} onClick={() => setCurrentPage(currentPage + 1)}>다음</button>
                    </div>
                </div>
            </div>
        </>
    );
}