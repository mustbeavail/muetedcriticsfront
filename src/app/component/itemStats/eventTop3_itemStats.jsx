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
        getFirstEventList(token, firstEventName, "periodRevenueDESC");
    }, [firstEventName]);
    useEffect(() => {
        getSecondEventList(token, secondEventName, "periodRevenueDESC");
    }, [secondEventName]);
    useEffect(() => {
        getThirdEventList(token, thirdEventName, "periodRevenueDESC");
    }, [thirdEventName]);

    // 선택된 이벤트 최신 데이터 병합
    const finalData = useMemo(() => {
        const finalData = [];
        
        if (firstEventList.length > 0) {
            const total =
            format3digits(
                firstEventList.reduce((sum, item) => sum + item.period_revenue, 0).split(".")[0]);
            finalData.push({
                eventNo: "first", eventName: firstEventName,
                totalPrice: total, most3Items: firstEventList.slice(0, 3)});
        }
        if (secondEventList.length > 0) {
            const total =
            format3digits(
                secondEventList.reduce((sum, item) => sum + item.period_revenue, 0).split(".")[0]);
            finalData.push({
                eventNo: "second", eventName: secondEventName,
                totalPrice: total, most3Items: secondEventList.slice(0, 3)});
        }
        if (thirdEventList.length > 0) {
            const total =
            format3digits(
                thirdEventList.reduce((sum, item) => sum + item.period_revenue, 0).split(".")[0]);
            finalData.push({
                eventNo: "third", eventName: thirdEventName,
                totalPrice: total, most3Items: thirdEventList.slice(0, 3)});
        }
        
        return finalData;
    }, [firstEventList, secondEventList, thirdEventList]);

    // 보라색 그라데이션 정의
    const purpleGradient = (
        <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#6a0dad" stopOpacity={0.8} />
        </linearGradient>
    );

    // 아이템 차트용 보라색 그라데이션 정의
    const itemPurpleGradient = (
        <linearGradient id="itemPurpleGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#a569bd" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#7d3c98" stopOpacity={0.8} />
        </linearGradient>
    );

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
                                <b style={{ fontWeight: 600 }}>{firstEventList[0].sell_type}</b>
                                진행 기간 {firstEventList[0].sell_start_date} ~ {firstEventList[0].sell_end_date}
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
                                <b style={{ fontWeight: 600 }}>{secondEventList[0].sell_type}</b>
                                진행 기간 {secondEventList[0].sell_start_date} ~ {secondEventList[0].sell_end_date}
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
                                <b style={{ fontWeight: 600 }}>{thirdEventList[0].sell_type}</b>
                                진행 기간 {thirdEventList[0].sell_start_date} ~ {thirdEventList[0].sell_end_date}
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
                        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                    >
                        <defs>
                            <linearGradient id="eventGradient" x1="1" y1="0" x2="0" y2="0">
                                <stop offset="0%" stopColor="#9C27B0" stopOpacity={1} />
                                <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="eventName" />
                        <Tooltip formatter={(finalData) => `${finalData.totalPrice} 원`}
                            contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                            cursor={{ fill: '#1c1b23' }}
                        />
                        <Legend />
                        <Bar dataKey="totalPrice" name="총 매출" fill="url(#eventGradient)" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>

                <h2 className={"itemStats-title"}>이벤트별 아이템 상위 3개 판매액</h2>
                <div className="itemStats-chartWrapper-top3">
                    {finalData.map((eventName, idx) => {
                        const top3Items = getTop3ItemsByEvent(eventName);

                        return (
                            <div key={idx} className="itemStats-chartWrapper-top3-item">
                                <span className="itemStats-chartWrapper-top3-item-title">
                                    <b style={{ fontWeight: 600 }}>{eventName}</b>
                                </span>

                                <div className="itemStats-chartWrapper-top3-item-chart has-data">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart
                                            data={top3Items} // 데이터 삽입
                                            layout="vertical"
                                            margin={{ top: 5, right: 5, left: 50, bottom: 5 }}
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
                                                dataKey="name"
                                                tick={{ fontSize: 10 }}
                                                width={50}
                                            />
                                            <Tooltip
                                                formatter={(value) => `${value} 원`}
                                                labelFormatter={(label) => `${label}`}
                                                contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                                                cursor={{ fill: '#1c1b23' }}
                                            />
                                            <Bar
                                                dataKey="price"
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