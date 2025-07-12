'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Period_InquiryStats({ inquiryStatsData }) {
    const categories = Array.from(new Set(inquiryStatsData.map(item => item.category)));

    const grouped = inquiryStatsData.reduce((acc, item) => {
        const date = item.created_at.slice(0, 10);
        if (!acc[date]) {
            acc[date] = { date };
            categories.forEach(cat => acc[date][cat] = 0);
        }
        acc[date][item.category] = (acc[date][item.category] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.values(grouped).sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    const baseColors = ["#f28b82", "#aecbfa", "#fff475"];

    const colors = React.useMemo(() => {
        const map = {};
        categories.forEach((cat, idx) => {
            map[cat] = baseColors[idx % baseColors.length];
        });
        return map;
    }, [categories]);

    return (
        <div className="inquiryStats-chartWrapper-period">
            <h2 className={"inquiryStats-title"}>기간별 신고/문의 건수</h2>
            <div className={"inquiryStats-filterBox-wrapper"}>
                <div className={"inquiryStats-filterBox"}>
                    기간 시작일 <input type="date" />
                    기간 종료일 <input type="date" />
                    <button>조회</button>
                </div>
                <div>
                    {categories.map((cat, idx) => (
                        <div key={cat} style={{ width: "100%", height: 300, marginBottom: 40 }}>
                            <h3 style={{ textAlign: "center" }}>{cat}</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={chartData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey={cat}
                                        stroke={colors[cat]}
                                        strokeWidth={2}
                                        dot={{ r: 3 }}
                                        activeDot={{ r: 6 }}
                                        name={cat}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}