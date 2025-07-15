'use client'
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function EventTop3ItemStats({ itemList, uniqueSellTypes }) {

    // 더미 이벤트 데이터 (고정값)
    const dummyEvents = ["여름 이벤트", "할로윈 이벤트", "크리스마스 이벤트"];

    // 차트용 더미 데이터 생성
    const chartData = dummyEvents.map(eventName => {
        return { eventName, totalPrice: Math.floor(Math.random() * 1000000) + 500000 };
    });

    // 이벤트별 상위 3개 아이템 더미 데이터 생성
    const getTop3ItemsByEvent = (eventName) => {
        return [
            { name: `${eventName} 아이템 1`, price: Math.floor(Math.random() * 100000) + 50000, category: "의상" },
            { name: `${eventName} 아이템 2`, price: Math.floor(Math.random() * 80000) + 40000, category: "무기" },
            { name: `${eventName} 아이템 3`, price: Math.floor(Math.random() * 60000) + 30000, category: "장식" }
        ];
    };

    // 빈 데이터 생성 (그래프 뼈대 표시용)
    const emptyData = [
        { name: "아이템 1", price: 0 },
        { name: "아이템 2", price: 0 },
        { name: "아이템 3", price: 0 }
    ];

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
                        <select className="itemStats-select" value={""}>
                            <option value="">선택</option>
                        </select>
                    </span>
                    <span>이벤트 선택 2
                        <select className="itemStats-select" value={""}>
                            <option value="">선택</option>
                        </select>
                    </span>
                    <span>이벤트 선택 3
                        <select className="itemStats-select" value={""}>
                            <option value="">선택</option>
                        </select>
                    </span>
                </div>

                <div style={{ height: '100px' }}>
                    <div>
                        {dummyEvents.map((eventName, idx) => (
                            <div key={idx}>
                                <span style={{ marginRight: 10, marginBottom: 5, display: 'block' }}>
                                    <b style={{ fontWeight: 600 }}>{eventName}</b> 진행 기간 2023-01-{idx + 1} ~ 2023-01-{idx + 15}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={chartData} // 데이터 삽입
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
                        <Tooltip formatter={(value) => `${value} 원`}
                            contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                            cursor={{ fill: '#1c1b23' }}
                        />
                        <Legend />
                        <Bar dataKey="totalPrice" name="총 매출" fill="url(#eventGradient)" barSize={30} />
                    </BarChart>
                </ResponsiveContainer>

                <h2 className={"itemStats-title"}>이벤트별 아이템 상위 3개 판매액</h2>
                <div className="itemStats-chartWrapper-top3">
                    {dummyEvents.map((eventName, idx) => {
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