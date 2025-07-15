'use client';
import { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function PeriodWeeklyStats({ access_stats }) {
    const [filteredStats, setFilteredStats] = useState(access_stats);

    // 주간 이용자 수 데이터 가공
    const weeklyAccessData = useMemo(() => {
        // 날짜별로 그룹화된 데이터 생성
        const dailyCounts = {};
        
        filteredStats.forEach(stat => {
            const date = stat.access_time.split(' ')[0]; // 날짜 부분만 추출
            if (!dailyCounts[date]) {
                dailyCounts[date] = { date, uniqueUsers: new Set() };
            }
            dailyCounts[date].uniqueUsers.add(stat.user_id);
        });

        // 날짜별 데이터를 날짜순으로 정렬
        const sortedDailyData = Object.values(dailyCounts)
            .map(item => ({
                date: item.date,
                uniqueUsers: item.uniqueUsers
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        // 주간 데이터로 변환
        const weeklyData = [];
        let currentWeek = { weekStart: '', weekEnd: '', uniqueUsers: new Set() };
        
        sortedDailyData.forEach((dayData, index) => {
            const currentDate = new Date(dayData.date);
            const dayOfWeek = currentDate.getDay(); // 0: 일요일, 6: 토요일
            
            // 새 주의 시작 (월요일) 또는 첫 번째 항목
            if (dayOfWeek === 1 || index === 0) {
                if (currentWeek.weekStart && currentWeek.uniqueUsers.size > 0) {
                    // 이전 주 데이터 저장
                    weeklyData.push({
                        주간: `${currentWeek.weekStart} ~ ${currentWeek.weekEnd}`,
                        이용자수: currentWeek.uniqueUsers.size
                    });
                }
                // 새 주 시작
                currentWeek = { 
                    weekStart: dayData.date, 
                    weekEnd: dayData.date, 
                    uniqueUsers: new Set([...dayData.uniqueUsers])
                };
            } else {
                // 현재 주에 데이터 추가
                currentWeek.weekEnd = dayData.date;
                dayData.uniqueUsers.forEach(user => currentWeek.uniqueUsers.add(user));
            }
            
            // 마지막 항목 처리
            if (index === sortedDailyData.length - 1 && currentWeek.uniqueUsers.size > 0) {
                weeklyData.push({
                    주간: `${currentWeek.weekStart} ~ ${currentWeek.weekEnd}`,
                    이용자수: currentWeek.uniqueUsers.size
                });
            }
        });
        
        return weeklyData;
    }, [filteredStats]);

    return (
        <>
            <div className={"accessorStats-chartWrapper"}>
                <h2 className={"accessorStats-title"}>주간 활성 이용자 수</h2>
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
                    {weeklyAccessData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={weeklyAccessData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                            >
                                <defs>
                                    <linearGradient id="colorGradientWeekly" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#4CAF50" stopOpacity={0.1}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="주간" 
                                    angle={-45} 
                                    textAnchor="end"
                                    height={100}
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
                                    stroke="#4CAF50" 
                                    strokeWidth={2}
                                    fill="url(#colorGradientWeekly)"
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