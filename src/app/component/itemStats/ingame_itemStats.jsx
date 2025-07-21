import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function IngameItemStats({
    token,
    itemList, itemListStartDate, itemListEndDate,
    itemListAlign, itemListPage, itemListSearch,
    setItemListStartDate, setItemListEndDate, setItemListAlign, setItemListPage,
    setItemListSearch, getItemList, format3digits }) {

    const [totalPage, setTotalPage] = useState(0);

    const [requestCnt, setRequestCnt] = useState("a1");

    useEffect(() => {
        setRequestCnt(prev => {
            const currentNum = parseInt(prev.slice(1)) || 1;
            return `a${currentNum + 1}`;
        });
        if (itemList.length > 0 && itemList[0].total_page) {
            setTotalPage(itemList[0].total_page);
        } else {
            setTotalPage(0);
        }
    }, [itemList])

    useEffect(() => {
        setItemListPage(1);
        getItemList(token, itemListStartDate, itemListEndDate, itemListAlign, 1, itemListSearch);
    }, [itemListAlign, itemListStartDate, itemListEndDate])

    // 현재 페이지 주변의 몇 개 페이지만 보여주는 방식
    const getVisiblePages = (currentPage, totalPages, range = 5) => {
        const start = Math.max(1, currentPage - Math.floor(range / 2));
        const end = Math.min(totalPages, start + range - 1);
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    return (
        <>
            <div className={"itemStats-chartWrapper"}>
                <h2 className={"itemStats-title"}>인게임별 아이템 정보</h2>
                <div className={"itemStats-search"}>
                    <span>검색</span>
                    <div className={"itemStats-input-wrapper"}>
                        <input
                            type="text" placeholder="아이템 이름으로 검색"
                            value={itemListSearch}
                            onChange={(e) => { setItemListSearch(e.target.value) }}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') {
                                    getItemList(token, itemListStartDate, itemListEndDate, itemListAlign, itemListPage, itemListSearch)
                                }
                            }} />
                        <button
                            className={"itemStats-search-btn"}
                            onClick={() => {
                                getItemList(
                                    token, itemListStartDate, itemListEndDate,
                                    itemListAlign, itemListPage, itemListSearch)
                            }}
                        ><IoSearch /></button>
                    </div>
                </div>
                <div className={"itemStats-filterBox-wrapper"}>
                    <div className={"itemStats-filterBox"}>
                        기간 시작일
                        <input
                            type="date"
                            value={itemListStartDate}
                            onChange={(e) => { setItemListStartDate(e.target.value) }} />
                        기간 종료일
                        <input
                            type="date"
                            value={itemListEndDate}
                            onChange={(e) => { setItemListEndDate(e.target.value) }} />
                    </div>
                    <div>
                        <select className={"itemStats-select"}
                            value={itemListAlign}
                            onChange={(e) => { setItemListAlign(e.target.value) }}>
                            <option value="periodRevenueDESC">총 수익 높은순</option>
                            <option value="periodRevenueASC">총 수익 낮은순</option>
                            <option value="periodUserDESC">구매 유저 수 높은순</option>
                            <option value="periodUserASC">구매 유저 수 낮은순</option>
                        </select>
                    </div>
                </div>
                <div className="itemStats-list">
                    {itemList.length === 0 ? (
                        <div className="itemStats-item-card">
                            <div className="itemStats-item-name">아이템 정보가 없습니다.</div>
                        </div>
                    ) : (
                        <>
                            {itemList.map((item, index) => (
                                <div className="itemStats-item-card" key={index + requestCnt}>
                                    <div className="itemStats-item-header">
                                        <span className="itemStats-item-cate">
                                            {item.item_cate === "bundle" ? "묶음 상품" : item.item_cate}
                                        </span>
                                        <span className="itemStats-item-type">{item.sell_type}</span>
                                    </div>
                                    <div className="itemStats-item-name">{item.item_name}</div>
                                    <div className="itemStats-item-price">
                                        판매가: {format3digits(item.item_price).split(".")[0]} 원</div>
                                    <div className="itemStats-item-period-revenue">
                                        기간 내 총 수익: {format3digits(item.period_revenue).split(".")[0]} 원</div>
                                    <div className="itemStats-item-period-sales-count">
                                        기간 내 총 구매횟수: {format3digits(item.period_sales_count).split(".")[0]} 회</div>
                                    <div className="itemStats-item-name">발매 날짜</div>
                                    <div className="itemStats-item-dates">
                                        {item.sell_start_date} ~ {item.sell_end_date === "9999-12-31" ? '상시' : item.sell_end_date}
                                    </div>
                                </div>
                            ))}
                            <div className="itemStats-pagination">
                                <button disabled={itemListPage === 1} onClick={() => setItemListPage(itemListPage - 1)}>이전</button>
                                {getVisiblePages(itemListPage, totalPage).map((page) => (
                                    <button
                                        key={page}
                                        className={itemListPage === page ? 'active' : ''}
                                        onClick={() => {
                                            setItemListPage(page);
                                            getItemList(token, itemListStartDate, itemListEndDate, itemListAlign, page);
                                        }}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button disabled={itemListPage === totalPage} onClick={() => setItemListPage(itemListPage + 1)}>다음</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}