'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useState, useEffect } from 'react';

export default function All_InquiryStats({ inquiryStatsAll }) {
    function TodayDate() {
        const [today, setToday] = useState(getFormattedDate());

        useEffect(() => {
            // 매일 자정마다 날짜 갱신
            const now = new Date();
            const msUntilMidnight =
                new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

            const timer = setTimeout(() => {
                setToday(getFormattedDate()); // 자정 지나면 업데이트
            }, msUntilMidnight);

            return () => clearTimeout(timer);
        }, [today]);

        return <div>{today} 기준 (매일 1시마다 갱신)</div>;
    }

    function getFormattedDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (`0${now.getMonth() + 1}`).slice(-2); // 월은 0부터 시작
        const day = (`0${now.getDate()}`).slice(-2);
        return `${year}.${month}.${day}`;
    }

    const pastelColors = ["#f28b82", "#aecbfa", "#fff475"];

    // 1. 전체 신고/문의 건수 데이터
    const allData = inquiryStatsAll.map(item => ({
        category: item.cate,
        count: item.total
    }));

    // 2. 차트에 사용할 데이터 (총합) 항목 제외
    const chartData = allData.filter(item => item.category !== "총합");

    // 3. 총합 데이터만 따로 변수에 저장
    const totalData = allData.find(item => item.category === "총합");

    return (
        <div className="inquiryStats-chartWrapper">
            <h2 className={"inquiryStats-title"}>전체 신고/문의 건수</h2>
            <TodayDate />
            {/* 신고/문의 건수 통계 차트 */}
            <div className="inquiryStats-chart">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis allowDecimals={false} />
                        <Tooltip
                            formatter={(value) => `${value} 건`}
                            contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                            cursor={{ fill: '#1c1b23' }}
                        />
                        {/* Legend 제거 - 각 막대에 다른 색상이 적용되어 있어서 범례가 의미가 없음 */}
                        <Bar dataKey="count" name="신고/문의 건수">
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={pastelColors[index % pastelColors.length]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 표: '총합'이 제외된 chartData로 각 항목을 보여주고, 마지막에 totalData를 따로 표시 */}
            <div className="inquiryStats-chartWrapper-tableBox">
                <div className="row header">
                    <div className="cell">구분</div>
                    <div className="cell">총 건수</div>
                </div>

                {/* '총합'을 제외한 각 항목을 반복해서 보여줌 */}
                {chartData.map((item, idx) => (
                    <div className="row" key={idx}>
                        <div className="cell">{item.category}</div>
                        <div className="cell">{item.count} 건</div>
                    </div>
                ))}

                {/* 백엔드에서 받은 '총합' 데이터를 마지막에 표시 */}
                {totalData && (
                    <div className="row total">
                        <div className="cell">{totalData.category}</div>
                        <div className='cell'>{totalData.count} 건</div>
                    </div>
                )}
            </div>
        </div>
    );
}