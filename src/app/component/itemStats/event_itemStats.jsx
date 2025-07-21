import { useEffect, useState } from "react";

export default function EventItemStats({
    token,
    eventList, eventName, eventAlign,
    getEventList, setEventName, setEventAlign,
    format3digits }) {

    useEffect(() => {
        getEventList(token, eventName, eventAlign);
    }, [eventName, eventAlign]);

    const [eventNameList, setEventNameList] = useState([]);

    useEffect(() => {
        if (eventList.length > 0 && eventNameList.length === 0) {
            setEventNameList([...new Set(eventList.map(item => item.sell_type))]);
        }
    }, [eventList]);

    return (
        <>
            <div className={"itemStats-chartWrapper"}>
                <h2 className={"itemStats-title"}>이벤트별 아이템 정보</h2>
                <div className={"itemStats-filterBox-wrapper"}>
                    <div className={"itemStats-filterBox"}>
                        이벤트 선택 <select
                        className={"itemStats-select"}
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}>
                            <option value="">전체</option>
                            {eventNameList.map((sellType) => (
                                <option
                                key={sellType}
                                value={sellType}>{sellType}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <select className={"itemStats-select"}
                        value={eventAlign}
                        onChange={(e) => setEventAlign(e.target.value)}>
                            <option value="periodRevenueDESC">총 수익 높은순</option>
                            <option value="periodRevenueASC">총 수익 낮은순</option>
                            <option value="periodPayingUsersDESC">구매 유저 수 높은순</option>
                            <option value="periodPayingUsersASC">구매 유저 수 낮은순</option>
                        </select>
                    </div>
                </div>
                <div className="itemStats-list">
                    {eventList.map((item) => (
                        <div className="itemStats-item-card" key={item.item_idx}>
                            <div className="itemStats-item-header">
                                <span className="itemStats-item-name">{item.item_name}</span>
                                <span className="itemStats-item-type">{item.sell_type}</span>
                            </div>
                            총 수익 : {format3digits(item.period_revenue).split(".")[0]} 원<br />
                            구매 유저 : {format3digits(item.period_paying_users).split(".")[0]} 명<br/>
                            아이템 가격 : {format3digits(item.item_price).split(".")[0]} 원<br/>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}