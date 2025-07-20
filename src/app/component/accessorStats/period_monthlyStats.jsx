'use client';
import { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function PeriodMonthlyStats() {
    const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;

    const [fromYear, setFromYear] = useState('');
    const [fromMonth, setFromMonth] = useState('');
    const [toYear, setToYear] = useState('');
    const [toMonth, setToMonth] = useState('');
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        const now = new Date();
        setFromYear(now.getFullYear().toString());
        setFromMonth((now.getMonth() + 1).toString());
        setToYear(now.getFullYear().toString());
        setToMonth((now.getMonth() + 1).toString());
    }, []);

    const monthlyAccessData = async () => {
        if (!fromYear || !fromMonth || !toYear || !toMonth) {
            alert("모든 날짜 값을 선택해 주세요.");
            return;
        }
        if (fromYear > toYear) {
            alert("시작 년도는 종료 년도보다 앞서야 합니다.");
            return;
        }
        if (fromYear === toYear && fromMonth > toMonth) {
            alert("시작 월은 종료 월보다 앞서야 합니다.");
            return;
        }

        const { data } = await axios.get(`${URL}/activity/periodMonthlyUser`, {
            params: {
                fromYear,
                fromMonth,
                toYear,
                toMonth
            },
            headers: {
                authorization: token
            }
        });
        console.log(data.periodMAU);
        setMonthlyData(data.periodMAU);
    }

    return (
        <>
            <div className={"accessorStats-chartWrapper"}>
                <h2 className={"accessorStats-title"}>월간 활성 이용자 수</h2>
                <div className="itemStats-filterBox">
                    <span>시작 년도 선택
                        <select className="itemStats-select" value={fromYear} onChange={(e) => setFromYear(e.target.value)}>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                        </select>
                    </span>
                    <span>시작 월 선택
                        <select className="itemStats-select" value={fromMonth} onChange={(e) => setFromMonth(e.target.value)}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                    </span>
                    <span>종료 년도 선택
                        <select className="itemStats-select" value={toYear} onChange={(e) => setToYear(e.target.value)}>
                            <option>2020</option>
                            <option>2021</option>
                            <option>2022</option>
                            <option>2023</option>
                            <option>2024</option>
                            <option>2025</option>
                        </select>
                    </span>
                    <span>종료 월 선택
                        <select className="itemStats-select" value={toMonth} onChange={(e) => setToMonth(e.target.value)}>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                    </span>
                    <button onClick={monthlyAccessData}>조회</button>
                </div>

                <div className="stats-chart-container" style={{ height: '900px', marginTop: '20px' }}>
                    {Array.isArray(monthlyData) && monthlyData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={monthlyData}
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
                                    dataKey="month"
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
                                    dataKey="MAU"
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
                            선택한 기간의 데이터가 존재하지 않습니다.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}