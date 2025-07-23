'use client';
import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";

export default function RefundItemStats(
    {token, refundList, refundSummary,
    refundListStartDate, refundListEndDate,
    refundListAlign, refundListPage, refundListSearch,
    setRefundListStartDate, setRefundListEndDate,
    setRefundListAlign, setRefundListPage, setRefundListSearch,
    getRefundList, getRefundSummary, format3digits}) {

    useEffect(() => {
        getRefundList(token, refundListStartDate, refundListEndDate, refundListAlign, refundListPage, refundListSearch);
    }, [refundListStartDate, refundListEndDate, refundListAlign, refundListPage]);

    useEffect(() => {
        getRefundSummary(token, refundListStartDate, refundListEndDate);
    }, [refundListStartDate, refundListEndDate]);


    // 현재 페이지 주변의 몇 개 페이지만 보여주는 방식
    const getVisiblePages = (currentPage, totalPages, range = 5) => {
        const start = Math.max(1, currentPage - Math.floor(range / 2));
        const end = Math.min(totalPages, start + range - 1);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <>
            <div className={"itemStats-chartWrapper-refund"}>
                <h2 className={"itemStats-title"}>아이템별 환불 내역</h2>
                <div className={"itemStats-filterBox-wrapper"}>
                    <div className={"itemStats-filterBox"}>
                        기간 시작일 <input
                        type="date"
                        value={refundListStartDate}
                        onChange={(e) => setRefundListStartDate(e.target.value)} />
                        기간 종료일 <input
                        type="date"
                        value={refundListEndDate}
                        onChange={(e) => setRefundListEndDate(e.target.value)} />
                    </div>
                </div>
                <div className="refundStats-summaryBox">
                    <div className="refundStats-summaryCard">
                        <span className="label">총 환불 금액</span>
                        <strong className="value">
                            {format3digits(refundSummary[0].metric_value).split(".")[0]} 원
                        </strong>
                    </div>
                    <div className="refundStats-summaryCard">
                        <span className="label">총 환불 건수</span>
                        <strong className="value">
                            {format3digits(refundSummary[1].metric_value).split(".")[0]} 건
                        </strong>
                    </div>
                    <div className="refundStats-summaryCard">
                        <span className="label">최다 환불 품목</span>
                        <strong className="value">
                            {refundSummary[2].metric_label}
                            ({format3digits(refundSummary[2].metric_value).split(".")[0]} 건)
                        </strong>
                    </div>
                </div>
                <h2 className={"itemStats-title"}>아이템 환불 리스트</h2>
                <div className={"itemStats-filterBox-wrapper"}>
                    <div className={"itemStats-search"}>
                        <span>유저 ID로 검색</span>
                        <div className={"itemStats-input-wrapper"}>
                            <input type="text" placeholder="유저 ID를 입력하세요."
                            value={refundListSearch}
                            onChange={(e) => setRefundListSearch(e.target.value)}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    getRefundList(token, refundListStartDate, refundListEndDate, refundListAlign, refundListPage, refundListSearch)
                                }
                            }}/>
                            <button
                            className={"itemStats-search-btn"}
                            onClick={() => {
                                getRefundList(token, refundListStartDate, refundListEndDate, refundListAlign, refundListPage, refundListSearch)
                            }}><IoSearch /></button>
                        </div>
                    </div>
                    <div>
                        <select className={"itemStats-select"}
                        value={refundListAlign}
                        onChange={(e) => setRefundListAlign(e.target.value)}>
                            <option value="refundAmountDESC">환불 금액 높은순</option>
                            <option value="refundAmountASC">환불 금액 낮은순</option>
                            <option value="refundDateDESC">환불 날짜 최신순</option>
                            <option value="refundDateASC">환불 날짜 오래된순</option>
                            <option value="refundWhyASC">환불 사유 가나다순</option>
                            <option value="refundWhyDESC">환불 사유 가나다역순</option>
                        </select>
                    </div>
                </div>


                {refundList.length === 0 ? (
                    <div className="row">
                        <div className="cell">환불 내역이 없습니다.</div>
                    </div>
                ) : (
                    <>
                        <div className="row header">
                            <div className="cell">아이템명</div>
                            <div className="cell">환불 금액</div>
                            <div className="cell">환불 유저</div>
                            <div className="cell">환불 날짜</div>
                            <div className="cell">환불 사유</div>
                        </div>
                        {refundList.map((item) => (
                            <div className="row" key={item.refund_idx}>
                                <div className="cell">{item.item_name}</div>
                                <div className="cell">{item.refund_amt} 원</div>
                                <div className="cell">{item.user_id}</div>
                                <div className="cell">{item.refund_date}</div>
                                <div className="cell">{item.why}</div>
                            </div>
                        ))}
                        <div className="itemStats-pagination">
                            <button disabled={refundListPage === 1} onClick={() => setRefundListPage(refundListPage - 1)}>이전</button>
                            {getVisiblePages(refundListPage, refundList[0]?.total_page || 0).map((page) => (
                                <button
                                    key={page}
                                    className={refundListPage === page ? 'active' : ''}
                                    onClick={() => {setRefundListPage(page);
                                        getRefundList(token, refundListStartDate, refundListEndDate, refundListAlign, page, refundListSearch);}}
                                >
                                    {page}
                                </button>
                            ))}
                            <button disabled={refundListPage === (refundList[0]?.total_page || 0)} onClick={() => setRefundListPage(refundListPage + 1)}>다음</button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}