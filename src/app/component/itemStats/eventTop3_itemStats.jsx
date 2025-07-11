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
    const chartData = selectedEvents.map(eventName => {
        const sum = itemList
            .filter(item => item.sell_type === eventName)
            .reduce((acc, cur) => acc + cur.item_price, 0); // acc: 누적값, cur: 현재값, 0: 초기값
        return { eventName, totalPrice: sum };
    });

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
                <div>
                    {/* 여기에 선택된 이벤트 이름 3개와 진행 기간 출력됨*/}
                </div>
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

                <h2 className={"itemStats-title"}>이벤트별 아이템 상위 3개 판매액</h2>
                <div>
                    {selectedEvents.map((eventName, idx) => (
                        <div key={idx}>
                            <span style={{ marginRight: 10 }}>
                                {eventName || "선택 안됨"}
                            </span>
                            <div>
                                {/* 여기에 선택된 이벤트별 아이템 상위 3개 판매액 출력 */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}