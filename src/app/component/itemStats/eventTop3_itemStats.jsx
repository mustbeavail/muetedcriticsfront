'use client'
import { useEffect, useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function EventTop3ItemStats({
    token, eventList,
    firstEventList, secondEventList, thirdEventList,
    setFirstEventList, setSecondEventList, setThirdEventList,
    firstEventName, secondEventName, thirdEventName,
    setFirstEventName, setSecondEventName, setThirdEventName,
    getFirstEventList, getSecondEventList, getThirdEventList,
    format3digits }) {

    const [eventNameList, setEventNameList] = useState([]);

    // 이벤트 리스트 조회
    useEffect(() => {
        if (eventList.length > 0 && eventNameList.length === 0) {
            setEventNameList([...new Set(eventList.map(item => item.sell_type))]);
        }
    }, [eventList]);

    // 이벤트 선택할때마다 데이터조회
    useEffect(() => {
        if ((firstEventName === secondEventName || firstEventName === thirdEventName) && firstEventName !== "") {
            alert("이미 표시된 이벤트 입니다.");
            setFirstEventName("");
            return;
        }
        if (firstEventName !== "") {
            getFirstEventList(token, firstEventName, "periodRevenueDESC");
        } else if (firstEventName === "") {
            setFirstEventList([]);
        }
    }, [firstEventName]);
    useEffect(() => {
        if ((secondEventName === firstEventName || secondEventName === thirdEventName) && secondEventName !== "") {
            alert("이미 표시된 이벤트 입니다.");
            setSecondEventName("");
            return;
        }
        if (secondEventName !== "") {
            getSecondEventList(token, secondEventName, "periodRevenueDESC");
        } else if (secondEventName === "") {
            setSecondEventList([]);
        }
    }, [secondEventName]);
    useEffect(() => {
        if ((thirdEventName === firstEventName || thirdEventName === secondEventName) && thirdEventName !== "") {
            alert("이미 표시된 이벤트 입니다.");
            setThirdEventName("");
            return;
        }
        if (thirdEventName !== "") {
            getThirdEventList(token, thirdEventName, "periodRevenueDESC");
        } else if (thirdEventName === "") {
            setThirdEventList([]);
        }
    }, [thirdEventName]);

    // 아직 판매 아이템이 3개 이하일경우 빈 아이템 추가
    const padItems = (items, targetLength = 3) => {
        const result = [...items];
        while (result.length < targetLength) {
            result.push({
                item_name: "판매 아이템 없음",
                period_revenue: 0
            });
        }
        return result;
    };

    // 선택된 이벤트 최신 데이터 병합
    const finalData = useMemo(() => {
        const finalData = [];
        
        if (firstEventList.length > 0 && firstEventList.some(item => item.period_revenue !== undefined)) {
            const total = firstEventList.reduce((sum, item) => sum + (item.period_revenue || 0), 0);
            finalData.push({
                eventNo: "first", eventName: firstEventName,
                totalPrice: total, totalPriceFormat: format3digits(total).split(".")[0],
                most3Items: padItems(
                    firstEventList.filter(item => (item.period_revenue || 0) > 0).slice(0, 3)
                )});
        }
        if (secondEventList.length > 0 && secondEventList.some(item => item.period_revenue !== undefined)) {
            const total = secondEventList.reduce((sum, item) => sum + (item.period_revenue || 0), 0);
            finalData.push({
                eventNo: "second", eventName: secondEventName,
                totalPrice: total, totalPriceFormat: format3digits(total).split(".")[0],
                most3Items: padItems(
                    secondEventList.filter(item => (item.period_revenue || 0) > 0).slice(0, 3)
                )});
        }
        if (thirdEventList.length > 0 && thirdEventList.some(item => item.period_revenue !== undefined)) {
            const total = thirdEventList.reduce((sum, item) => sum + (item.period_revenue || 0), 0);
            finalData.push({
                eventNo: "third", eventName: thirdEventName,
                totalPrice: total, totalPriceFormat: format3digits(total).split(".")[0],
                most3Items: padItems(
                    thirdEventList.filter(item => (item.period_revenue || 0) > 0).slice(0, 3)
                )});
        }
        return finalData;
    }, [firstEventList, secondEventList, thirdEventList]);

    return (
        <>
            <div className={"itemStats-chartWrapper"}>
                <h2 className={"itemStats-title"}>이벤트별 아이템 정보</h2>
                <div className="itemStats-filterBox">
                    <span>이벤트 선택 1
                        <select
                        className="itemStats-select"
                        value={firstEventName}
                        onChange={(e) => setFirstEventName(e.target.value)}>
                            <option value="">선택</option>
                            {eventNameList.map((eventName) => (
                                <option key={eventName} value={eventName}>{eventName}</option>
                            ))}
                        </select>
                    </span>
                    <span>이벤트 선택 2
                        <select
                        className="itemStats-select"
                        value={secondEventName}
                        onChange={(e) => setSecondEventName(e.target.value)}>
                            <option value="">선택</option>
                            {eventNameList.map((eventName) => (
                                <option key={eventName} value={eventName}>{eventName}</option>
                            ))}
                        </select>
                    </span>
                    <span>이벤트 선택 3
                        <select
                        className="itemStats-select"
                        value={thirdEventName}
                        onChange={(e) => setThirdEventName(e.target.value)}>
                            <option value="">선택</option>
                            {eventNameList.map((eventName) => (
                                <option key={eventName} value={eventName}>{eventName}</option>
                            ))}
                        </select>
                    </span>
                </div>

                <div style={{ height: '100px' }}>
                    <div>
                        <div>
                            {firstEventList.length > 0 ? (
                            <span style={{ marginRight: 10, marginBottom: 5, display: 'block' }}>
                                <b style={{ fontWeight: 600, fontSize: 22 }}>{firstEventList[0].sell_type}</b>
                                <b style={{ fontSize: 15 }}>&nbsp;&nbsp;&nbsp;진행 기간 {firstEventList[0].sell_start_date} ~ {firstEventList[0].sell_end_date}</b>
                            </span>
                            ) : (
                                <span style={{ marginRight: 10, marginBottom: 5, display: 'block' }}>
                                    <b style={{ fontWeight: 600 }}>첫번째 이벤트를 선택해 주세요.</b>
                                </span>
                            )}
                        </div>
                        <div>
                            {secondEventList.length > 0 ? (
                            <span style={{ marginRight: 10, marginBottom: 5, display: 'block' }}>
                                <b style={{ fontWeight: 600, fontSize: 22 }}>{secondEventList[0].sell_type}</b>
                                <b style={{ fontSize: 15 }}>&nbsp;&nbsp;&nbsp;진행 기간 {secondEventList[0].sell_start_date} ~ {secondEventList[0].sell_end_date}</b>
                            </span>
                            ) : (
                                <span style={{ marginRight: 10, marginBottom: 5, display: 'block' }}>
                                    <b style={{ fontWeight: 600 }}>두번째 이벤트를 선택해 주세요.</b>
                                </span>
                            )}
                        </div>
                        <div>
                            {thirdEventList.length > 0 ? (
                            <span style={{ marginRight: 10, marginBottom: 5, display: 'block' }}>
                                <b style={{ fontWeight: 600, fontSize: 22 }}>{thirdEventList[0].sell_type}</b>
                                <b style={{ fontSize: 15 }}>&nbsp;&nbsp;&nbsp;진행 기간 {thirdEventList[0].sell_start_date} ~ {thirdEventList[0].sell_end_date}</b>
                            </span>
                            ) : (
                                <span style={{ marginRight: 10, marginBottom: 5, display: 'block' }}>
                                    <b style={{ fontWeight: 600 }}>세번째 이벤트를 선택해 주세요.</b>
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={finalData} // 데이터 삽입
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
                        <defs>
                            <linearGradient id="eventGradient" x1="1" y1="0" x2="0" y2="0">
                                <stop offset="0%" stopColor="#9C27B0" stopOpacity={1} />
                                <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="eventName" />
                        <Tooltip formatter={(value, name, props) => `${props.payload?.totalPriceFormat || value} 원`}
                            contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                            cursor={{ fill: '#1c1b23' }}
                        />
                        <Legend />
                        <Bar dataKey="totalPrice" name="총 매출" fill="url(#eventGradient)" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>

                <h2 className={"itemStats-title"}>이벤트별 아이템 상위 3개 판매액</h2>
                <div className="itemStats-chartWrapper-top3">
                    {finalData.map((eventData, idx) => {

                        return (
                            <div key={idx} className="itemStats-chartWrapper-top3-item">
                                <span className="itemStats-chartWrapper-top3-item-title">
                                    <b style={{ fontWeight: 600 }}>{eventData.eventName}</b>
                                </span>

                                <div className="itemStats-chartWrapper-top3-item-chart has-data">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={eventData.most3Items} // 데이터 삽입
                                            layout="vertical"
                                            margin={{ top: 5, right: 60, left: 60, bottom: 5 }}
                                        >
                                            <defs>
                                                <linearGradient id="itemGradient" x1="1" y1="0" x2="0" y2="0">
                                                    <stop offset="0%" stopColor="#9C27B0" stopOpacity={1} />
                                                    <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis type="number" domain={[0, 'dataMax']} />
                                            <YAxis
                                                type="category"
                                                dataKey="item_name"
                                                tick={{ fontSize: 10 }}
                                                width={50}
                                            />
                                            <Tooltip
                                                formatter={(value) => `${format3digits(value).split(".")[0]} 원`}
                                                labelFormatter={(label) => `아이템: ${label}`}
                                                contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                                                cursor={{ fill: '#1c1b23' }}
                                            />
                                            <Bar
                                                dataKey="period_revenue"
                                                name="판매가"
                                                fill="url(#itemGradient)"
                                                barSize={20}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}