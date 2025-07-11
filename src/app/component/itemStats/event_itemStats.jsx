export default function EventItemStats({ itemList, uniqueSellTypes }) {
    return (
        <>
            <div className={"itemStats-chartWrapper"}>
                <h2 className={"itemStats-title"}>이벤트별 아이템 정보</h2>
                <div className={"itemStats-filterBox-wrapper"}>
                    <div className={"itemStats-filterBox"}>
                        이벤트 선택 <select className={"itemStats-select"}>
                            {uniqueSellTypes.map((item) => (
                                <option key={item} value={item}>{item}</option>
                            ))}
                        </select>
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
                                <span className="itemStats-item-name">{item.item_name}</span>
                                <span className="itemStats-item-type">{item.sell_type}</span>
                            </div>
                            수익:<br />
                            구매 유저:
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}