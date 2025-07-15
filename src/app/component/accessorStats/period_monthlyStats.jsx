'use client';
import { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function PeriodMonthlyStats({ access_stats }) {
    const [filteredStats, setFilteredStats] = useState(access_stats);

    // 월간 이용자 수 데이터 가공
    const monthlyAccessData = useMemo(() => {
        // 날짜별로 그룹화된 데이터 생성
        const dailyCounts = {};

        filteredStats.forEach(stat => {
            const date = stat.access_time.split(' ')[0]; // 날짜 부분만 추출
            if (!dailyCounts[date]) {
                dailyCounts[date] = { date, uniqueUsers: new Set() };
            }
            dailyCounts[date].uniqueUsers.add(stat.user_id);
        });

        // 월별로 데이터 그룹화
        const monthlyCounts = {};

        Object.values(dailyCounts).forEach(dayData => {
            const date = new Date(dayData.date);
            const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!monthlyCounts[yearMonth]) {
                monthlyCounts[yearMonth] = { month: yearMonth, uniqueUsers: new Set() };
            }

            dayData.uniqueUsers.forEach(user => {
                monthlyCounts[yearMonth].uniqueUsers.add(user);
            });
        });

        // 월별 데이터를 날짜순으로 정렬
        return Object.values(monthlyCounts)
            .map(item => ({
                월: item.month,
                이용자수: item.uniqueUsers.size
            }))
            .sort((a, b) => a.월.localeCompare(b.월));
    }, [filteredStats]);

    return (
        <>
            <div className={"accessorStats-chartWrapper"}>
                <h2 className={"accessorStats-title"}>월간 활성 이용자 수</h2>
                <div className="itemStats-filterBox">
                    <span>년도 선택
                        <select className="itemStats-select" value={""}>
                            <option value="">선택</option>
                        </select>
                    </span>
                    <span>기간 시작일
                        <select className="itemStats-select" value={""}>
                            <option value="">선택</option>
                        </select>
                    </span>
                    <span>기간 종료일
                        <select className="itemStats-select" value={""}>
                            <option value="">선택</option>
                        </select>
                    </span>
                </div>

                <div className="stats-chart-container" style={{ height: '900px', marginTop: '20px' }}>
                    {monthlyAccessData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={monthlyAccessData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                            >
                                <defs>
                                    <linearGradient id="colorGradientMonthly" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2196F3" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#2196F3" stopOpacity={0.1} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="월"
                                    angle={-45}
                                    textAnchor="end"
                                    height={70}
                                    tick={{ fontSize: 12 }}
                                />
                                <YAxis />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1c1b23', color: '#fff', border: 'none' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ stroke: 'rgba(255, 255, 255, 0.3)' }}
                                />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="이용자수"
                                    stroke="#2196F3"
                                    strokeWidth={2}
                                    fill="url(#colorGradientMonthly)"
                                    dot={{ r: 5 }}
                                    activeDot={{ r: 8 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            color: '#fff'
                        }}>
                            선택한 기간에 데이터가 없습니다.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}