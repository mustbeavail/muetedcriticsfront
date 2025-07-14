'use client'
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function EventTop3ItemStats({ itemList, uniqueSellTypes }) {
    const [selectedEvents, setSelectedEvents] = useState(["", "", ""]);

    // select 변경 시
    const handleChange = (index, value) => {
        const newSelected = [...selectedEvents];
        newSelected[index] = value;
        setSelectedEvents(newSelected);
    };

    // 차트용 데이터 생성
    const chartData = selectedEvents
        .filter(eventName => eventName !== "") // 선택된 이벤트만 필터링
        .map(eventName => {
            const sum = itemList
                .filter(item => item.sell_type === eventName)
                .reduce((acc, cur) => acc + cur.item_price, 0); // acc: 누적값, cur: 현재값, 0: 초기값
            return { eventName, totalPrice: sum };
        });

    // 이벤트별 날짜 정보 가져오기
    const getEventDates = (eventName) => {
        if (!eventName) return { start: '', end: '' };

        const eventItems = itemList.filter(item => item.sell_type === eventName);
        if (eventItems.length === 0) return { start: '', end: '' };

        // 가장 빠른 시작일과 가장 늦은 종료일 찾기
        const startDates = eventItems.map(item => item.sell_start_date).filter(Boolean);
        const endDates = eventItems.map(item => item.sell_end_date).filter(Boolean);

        const start = startDates.length > 0 ? new Date(Math.min(...startDates.map(d => new Date(d)))).toISOString().split('T')[0] : '';
        const end = endDates.length > 0 ? new Date(Math.max(...endDates.map(d => new Date(d)))).toISOString().split('T')[0] : '진행중';

        return { start, end };
    };

    // 선택된 이벤트가 하나라도 있는지 확인
    const hasSelectedEvents = selectedEvents.some(event => event !== "");

    return (
        <>
            <div className={"itemStats-chartWrapper"}>
                <h2 className={"itemStats-title"}>이벤트별 아이템 정보</h2>
                <div className="itemStats-filterBox">
                    {selectedEvents.map((selected, idx) => (
                        <span key={idx}>
                            이벤트 선택 {idx + 1}{" "}
                            <select
                                className="itemStats-select"
                                value={selected}
                                onChange={(e) => handleChange(idx, e.target.value)}
                            >
                                <option value="">선택</option>
                                {uniqueSellTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </span>
                    ))}
                </div>

                {hasSelectedEvents && (
                    <div>
                        {selectedEvents.map((eventName, idx) => {
                            if (!eventName) return null; // 선택되지 않은 이벤트는 표시하지 않음
                            const { start, end } = getEventDates(eventName);
                            return (
                                <div key={idx}>
                                    <span style={{ marginRight: 10, marginBottom: 5, display: 'block' }}>
                                        <b style={{ fontWeight: 600 }}>{eventName}</b> 진행 기간 {start && `${start} ~ ${end}`}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                )}

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                    >
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="eventName" />
                        <Tooltip formatter={(value) => `${value} 원`} />
                        <Legend />
                        <Bar dataKey="totalPrice" name="총 매출" fill="#8884d8" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>
                <>
                    <h2 className={"itemStats-title"}>이벤트별 아이템 상위 3개 판매액</h2>
                    <div>
                        <div>
                            {/* 여기에 선택된 이벤트별 아이템 상위 3개 판매액 그래프 출력 */}
                        </div>
                    </div>
                </>
            </div>
        </>
    )
}