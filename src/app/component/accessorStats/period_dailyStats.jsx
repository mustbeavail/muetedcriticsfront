'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { format } from 'date-fns';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function PeriodDailyStats() {
    const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;

    const [dailyData, setDailyData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // 오늘 날짜를 yyyy-MM-DD 형식으로 가져옴 (종료일 최대값으로 사용)
    const today = format(new Date(), 'yyyy-MM-dd');

    const dailyAccessData = async (s, e) => {
        const start = s ?? startDate;
        const end = e ?? endDate;

        if (!start || !end) {
            alert('시작일과 종료일을 입력해주세요.');
            return;
        }
        if (new Date(start) > new Date(end)) {
            alert('시작일은 종료일보다 앞서야 합니다.');
            return;
        }

        const { data } = await axios.get(`${URL}/activity/periodDailyUser/${start}/${end}`, {
            params: { startDate: start, endDate: end },
            headers: { authorization: token }
        });
        setDailyData(data.list);
    };

    //최초 렌더링 시 기본 기간 설정 (최근 7일)
    useEffect(() => {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 6);

        const format = (date) => date.toISOString().split('T')[0];

        const sDate = format(sevenDaysAgo);
        const eDate = format(today);

        setStartDate(sDate);
        setEndDate(eDate);

        dailyAccessData(sDate, eDate);  // 초기값 직접 전달해서 호출
    }, []);

    // // 통계 저장
    // useEffect(() => {
    //     if (!startDate || !endDate) return;
    //     const sendHistoricalStats = async () => {
    //         const { data } = await axios.post(`${URL}/activity/historical`, null, {
    //             params: {
    //                 startDate,
    //                 endDate
    //             },
    //             headers: {
    //                 authorization: token
    //             }
    //         });
    //         console.log('통계 생성/갱신 완료:', data);
    //     };
    //     sendHistoricalStats();
    // }, [startDate, endDate]);

    return (
        <>
            <div className={"accessorStats-chartWrapper"}>
                <h2 className={"accessorStats-title"}>일일 활성 이용자 수</h2>
                <div className={"accessorStats-filterBox"}>
                    기간 시작일 <input type="date" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    기간 종료일 <input type="date" name="endDate" value={endDate} max={today} onChange={(e) => setEndDate(e.target.value)} />
                    <button onClick={() => dailyAccessData()}>조회</button>
                </div>

                <div className="stats-chart-container" style={{ height: '900px', marginTop: '20px' }}>
                    {dailyData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={dailyData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                            >
                                <defs>
                                    <linearGradient id="colorGradientDaily" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FFEB50" stopOpacity={1} />
                                        <stop offset="95%" stopColor="#FFEB50" stopOpacity={0} />
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
                                    stroke="#FFEB50"
                                    strokeWidth={2}
                                    fill="url(#colorGradientDaily)"
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