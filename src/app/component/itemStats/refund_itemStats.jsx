'use client';
import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

export default function RefundItemStats() {
    const refundData = [
        {
            refund_idx: 1,
            refund_amt: 35000,
            refund_date: "2025-09-06",
            why: "지불 오류",
            item_idx: 1,
            order_idx: 221,
            user_id: "null",
        },
        {
            refund_idx: 2,
            refund_amt: 25000,
            refund_date: "2025-07-26",
            why: "아이템 효과 미적용",
            item_idx: 2,
            order_idx: 59,
            user_id: "null"
        },
        {
            refund_idx: 3,
            refund_amt: 10000,
            refund_date: "2025-08-03",
            why: "버그 발생",
            item_idx: 3,
            order_idx: 503,
            user_id: "null"
        },
        {
            refund_idx: 4,
            refund_amt: 10000,
            refund_date: "2025-12-25",
            why: "제품 불만족",
            item_idx: 4,
            order_idx: 453,
            user_id: "null"
        },
        {
            refund_idx: 5,
            refund_amt: 25000,
            refund_date: "2025-11-16",
            why: "제품 불만족",
            item_idx: 5,
            order_idx: 413,
            user_id: "null"
        },
        {
            refund_idx: 6,
            refund_amt: 10000,
            refund_date: "2025-01-30",
            why: "아이템 효과 미적용",
            item_idx: 6,
            order_idx: 262,
            user_id: "null"
        },
        {
            refund_idx: 7,
            refund_amt: 15000,
            refund_date: "2025-06-29",
            why: "아이템 효과 미적용",
            item_idx: 7,
            order_idx: 206,
            user_id: "null"
        },
        {
            refund_idx: 8,
            refund_amt: 15000,
            refund_date: "2025-08-20",
            why: "중복 구매",
            item_idx: 8,
            order_idx: 182,
            user_id: "null"
        },
        {
            refund_idx: 9,
            refund_amt: 10000,
            refund_date: "2025-08-03",
            why: "유저 변심",
            item_idx: 9,
            order_idx: 783,
            user_id: "null"
        },
        {
            refund_idx: 10,
            refund_amt: 30000,
            refund_date: "2025-08-21",
            why: "버그 발생",
            item_idx: 10,
            order_idx: 75,
            user_id: "null"
        },
        {
            refund_idx: 11,
            refund_amt: 35000,
            refund_date: "2025-04-24",
            why: "아이템 효과 미적용",
            item_idx: 11,
            order_idx: 70,
            user_id: "null"
        },
        {
            refund_idx: 12,
            refund_amt: 10000,
            refund_date: "2025-12-27",
            why: "아이템 효과 미적용",
            item_idx: 12,
            order_idx: 188,
            user_id: "null"
        },
        {
            refund_idx: 13,
            refund_amt: 10000,
            refund_date: "2025-08-03",
            why: "중복 구매",
            item_idx: 13,
            order_idx: 407,
            user_id: "null"
        },
        {
            refund_idx: 14,
            refund_amt: 10000,
            refund_date: "2025-02-08",
            why: "유저 변심",
            item_idx: 14,
            order_idx: 434,
            user_id: "null"
        },
        {
            refund_idx: 15,
            refund_amt: 40000,
            refund_date: "2025-08-28",
            why: "유저 변심",
            item_idx: 15,
            order_idx: 962,
            user_id: "null"
        }
    ];

    const [refundList, setRefundList] = useState(refundData);
    useEffect(() => {
        setRefundList(refundData);
    }, []);

    // 페이징 처리
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(refundList.length / itemsPerPage);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = refundList.slice(indexOfFirst, indexOfLast);

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    };

    return (
        <>
            <div className={"itemStats-chartWrapper-refund"}>
                <h2 className={"itemStats-title"}>아이템별 환불 내역</h2>
                <div className={"itemStats-filterBox-wrapper"}>
                    <div className={"itemStats-filterBox"}>
                        기간 시작일 <input type="date" />
                        기간 종료일 <input type="date" />
                        <button>조회</button>
                    </div>
                </div>
                <div className="refundStats-summaryBox">
                    <div className="refundStats-summaryCard">
                        <span className="label">총 환불 금액</span>
                        <strong className="value">(데이터)</strong>
                    </div>
                    <div className="refundStats-summaryCard">
                        <span className="label">총 환불 건수</span>
                        <strong className="value">(데이터)</strong>
                    </div>
                    <div className="refundStats-summaryCard">
                        <span className="label">최다 환불 품목</span>
                        <strong className="value">(데이터)</strong>
                    </div>
                </div>
                <h2 className={"itemStats-title"}>아이템 환불 리스트</h2>
                <div className={"itemStats-filterBox-wrapper"}>
                    <div className={"itemStats-search"}>
                        <span>유저 ID로 검색</span>
                        <div className={"itemStats-input-wrapper"}>
                            <input type="text" placeholder="Search" />
                            <button className={"itemStats-search-btn"}><IoSearch /></button>
                        </div>
                    </div>
                    <div>
                        <select className={"itemStats-select"}>
                            <option>전체</option>
                            <option>총 수익</option>
                            <option>구매 유저</option>
                        </select>
                        <select className={"itemStats-select"}>
                            <option>높은순</option>
                            <option>낮은순</option>
                        </select>
                    </div>
                </div>


                <div className="row header">
                    <div className="cell">아이템명</div>
                    <div className="cell">환불 금액</div>
                    <div className="cell">환불 유저</div>
                    <div className="cell">환불 날짜</div>
                    <div className="cell">환불 사유</div>
                </div>
                {currentItems.map((item, idx) => (
                    <div className="row" key={idx}>
                        <div className="cell">{item.item_idx}</div>
                        <div className="cell">₩{item.refund_amt}</div>
                        <div className="cell">{item.user_id}</div>
                        <div className="cell">{item.refund_date}</div>
                        <div className="cell">{item.why}</div>
                    </div>
                ))}
                <div className="refundStats-pagination">
                    {Array.from({ length: totalPages }, (_, idx) => (
                        <button
                            key={idx}
                            className={`refundStats-page-btn ${currentPage === idx + 1 ? "active" : ""}`}
                            onClick={() => handlePageChange(idx + 1)}
                        >
                            {idx + 1}
                        </button>
                    ))}
                </div>

            </div>
        </>
    )
}