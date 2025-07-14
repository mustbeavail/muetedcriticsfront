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
    const [mailList, setMailList] = useState([]);

    useEffect(() => {
        const member_id = sessionStorage.getItem("member_id");
        const token = sessionStorage.getItem("token");
        if (member_id && token) {
            getList(token);
        }
    }, []);

    const getList = async (token) => {
        try {
            const { data } = await axios.get("http://localhost/mail/list", {
                headers: {
                    Authorization: token
                },
                params: {
                    page: 1,
                    sort: "mailList",
                    align: "dateDesc"
                },
            });
            console.log(data);
            setMailList(data.data);
        } catch (error) {
            console.error("메일 목록을 가져오는데 실패했습니다:", error);
        }
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
                                <input type="text" placeholder="메일 검색" />
                                <button className={"search-btn"}><IoSearch /></button>
                            </div>
                        </div>
                        <select className={"mailList-select"}>
                            <option>전체</option>
                            <option>정렬 기준 미정1</option>
                            <option>정렬 기준 미정2</option>
                        </select>
                    </div>

                    {mailList.map((mail) => (
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
                </div>
            </div>
        </>
    );
}