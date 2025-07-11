import { IoSearch } from "react-icons/io5";

export default function IngameItemStats({ itemList }) {
    return (
        <>
            <div className={"itemStats-chartWrapper"}>
                <h2 className={"itemStats-title"}>인게임별 아이템 정보</h2>
                <div className={"itemStats-search"}>
                    <span>검색</span>
                    <div className={"itemStats-input-wrapper"}>
                        <input type="text" placeholder="Search" />
                        <button className={"itemStats-search-btn"}><IoSearch /></button>
                    </div>
                </div>
                <div className={"itemStats-filterBox-wrapper"}>
                    <div className={"itemStats-filterBox"}>
                        기간 시작일 <input type="date" />
                        기간 종료일 <input type="date" />
                        <button>조회</button>
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
                <div className="itemStats-list">
                    {itemList.map((item) => (
                        <div className="itemStats-item-card" key={item.item_idx}>
                            <div className="itemStats-item-header">
                                <span className="itemStats-item-cate">{item.item_cate}</span>
                                <span className="itemStats-item-type">{item.sell_type}</span>
                            </div>
                            <div className="itemStats-item-name">{item.item_name}</div>
                            <div className="itemStats-item-dates">
                                {item.sell_start_date} ~ {item.sell_end_date || '상시'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}