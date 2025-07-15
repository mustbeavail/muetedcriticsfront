'use client';
import { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function PeriodDailyStats({ access_stats }) {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredStats, setFilteredStats] = useState(access_stats);

    // 날짜별 이용자 수 데이터 가공
    const dailyAccessData = useMemo(() => {
        const dailyCounts = {};
        
        filteredStats.forEach(stat => {
            const date = stat.access_time.split(' ')[0]; // 날짜 부분만 추출
            if (!dailyCounts[date]) {
                dailyCounts[date] = { date, uniqueUsers: new Set() };
            }
            dailyCounts[date].uniqueUsers.add(stat.user_id);
        });
        
        // Set을 배열 길이로 변환하고 날짜순으로 정렬
        return Object.values(dailyCounts)
            .map(item => ({
                날짜: item.date,
                이용자수: item.uniqueUsers.size
            }))
            .sort((a, b) => new Date(a.날짜) - new Date(b.날짜));
    }, [filteredStats]);

    // 기간 필터링 함수
    const handleFilter = () => {
        if (!startDate && !endDate) {
            setFilteredStats(access_stats);
            return;
        }

        const filtered = access_stats.filter(stat => {
            const statDate = stat.access_time.split(' ')[0];
            
            if (startDate && !endDate) {
                return statDate >= startDate;
            }
            
            if (!startDate && endDate) {
                return statDate <= endDate;
            }
            
            return statDate >= startDate && statDate <= endDate;
        });
        
        setFilteredStats(filtered);
    };

    return (
        <>
            <div className={"accessorStats-chartWrapper"}>
                <h2 className={"accessorStats-title"}>일일 활성 이용자 수</h2>
                <div className={"accessorStats-filterBox"}>
                    기간 시작일 <input 
                        type="date" 
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)} 
                    />
                    기간 종료일 <input 
                        type="date" 
                        value={endDate} 
                        onChange={(e) => setEndDate(e.target.value)} 
                    />
                    <button onClick={handleFilter}>조회</button>
                </div>
                
                <div className="stats-chart-container" style={{ height: '900px', marginTop: '20px' }}>
                    {dailyAccessData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={dailyAccessData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                            >
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={1}/>
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="날짜" 
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
                                    stroke="#8884d8" 
                                    strokeWidth={2}
                                    fill="url(#colorGradient)"
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