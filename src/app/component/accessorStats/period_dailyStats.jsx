'use client';
import axios from 'axios';
import { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function PeriodDailyStats() {
    const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;

    const [dailyData, setDailyData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const dailyAccessData = async () => {
        if (!startDate || !endDate) {
            alert('시작일과 종료일을 입력해주세요.');
            return;
          }
          if (new Date(startDate) > new Date(endDate)) {
            alert('시작일은 종료일보다 앞서야 합니다.');
            return;
          }

        const { data } = await axios.get(`${URL}/activity/periodDailyUser/${startDate}/${endDate}`, {
            params: { startDate, endDate },
            headers: {
                authorization: token
            }
        });
        console.log(data.list);
        setDailyData(data.list);
    }

    return (
        <>
            <div className={"accessorStats-chartWrapper"}>
                <h2 className={"accessorStats-title"}>일일 활성 이용자 수</h2>
                <div className={"accessorStats-filterBox"}>
                    기간 시작일 <input type="date" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    기간 종료일 <input type="date" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    <button onClick={dailyAccessData}>조회</button>
                </div>

                <div className="stats-chart-container" style={{ height: '900px', marginTop: '20px' }}>
                    {dailyData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={dailyData}
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
                                    angle={-45}
                                    dataKey="stats_date"
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
                                    dataKey="DAU"
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
                            선택한 기간의 데이터가 존재하지 않습니다.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}