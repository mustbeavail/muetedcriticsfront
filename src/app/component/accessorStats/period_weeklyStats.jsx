'use client';
import { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { getISOWeek, subWeeks } from 'date-fns';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function PeriodWeeklyStats({ token }) {
    // const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;

    const [weeklyData, setWeeklyData] = useState([]);
    const [fromYear, setFromYear] = useState('');
    const [fromMonth, setFromMonth] = useState('');
    const [fromWeek, setFromWeek] = useState('');
    const [toYear, setToYear] = useState('');
    const [toMonth, setToMonth] = useState('');
    const [toWeek, setToWeek] = useState('');

    useEffect(() => {
        const now = new Date();
        const fiveWeeksAgo = new Date();
        fiveWeeksAgo.setDate(now.getDate() - 7 * 5);

        const getWeekNumber = (date) => {
            const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const dayOfWeek = firstDayOfMonth.getDay();
            const adjustedDate = date.getDate() + dayOfWeek;
            return Math.ceil(adjustedDate / 7);
        };

        // 계산된 값 저장
        const fromY = fiveWeeksAgo.getFullYear().toString();
        const fromM = (fiveWeeksAgo.getMonth() + 1).toString();
        const fromW = getWeekNumber(fiveWeeksAgo).toString();

        const toY = now.getFullYear().toString();
        const toM = (now.getMonth() + 1).toString();
        const toW = getWeekNumber(now).toString();

        // setState
        setFromYear(fromY);
        setFromMonth(fromM);
        setFromWeek(fromW);
        setToYear(toY);
        setToMonth(toM);
        setToWeek(toW);

        // 👉 직접 계산된 값으로 조회 함수 호출
        weeklyAccessData(fromY, fromM, fromW, toY, toM, toW);
    }, []);

    const weeklyAccessData = async (
        fromY = fromYear,
        fromM = fromMonth,
        fromW = fromWeek,
        toY = toYear,
        toM = toMonth,
        toW = toWeek
    ) => {
        if (!fromY || !fromM || !fromW || !toY || !toM || !toW) {
            alert("모든 날짜 값을 선택해 주세요.");
            return;
        }

        const { data } = await axios.get(`${URL}/activity/periodWeeklyUser`, {
            params: {
                fromYear: fromY,
                fromMonth: fromM,
                fromWeek: fromW,
                toYear: toY,
                toMonth: toM,
                toWeek: toW
            },
            headers: {
                authorization: token
            }
        });
        setWeeklyData(data.periodWAU);
    }

    return (
        <>
            <div className={"accessorStats-chartWrapper"}>
                <h2 className={"accessorStats-title"}>주간 활성 이용자 수</h2>
                <div className="accessorStats-filterBox">
                    <div>
                        <span>시작 년도 선택
                            <select className="accessorStats-select" value={fromYear} onChange={(e) => setFromYear(e.target.value)}>
                                <option>2020</option>
                                <option>2021</option>
                                <option>2022</option>
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                            </select>
                        </span>
                        <span>시작 월 선택
                            <select className="accessorStats-select" value={fromMonth} onChange={(e) => setFromMonth(e.target.value)}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                        </span>
                        <span>시작 주 선택
                            <select className="accessorStats-select" value={fromWeek} onChange={(e) => setFromWeek(e.target.value)}>
                                {[1, 2, 3, 4, 5, 6].map(week => (
                                    <option key={week} value={week}>{week}</option>
                                ))}
                            </select>
                        </span>
                    </div>
                    <div>
                        <span>종료 년도 선택
                            <select className="accessorStats-select" value={toYear} onChange={(e) => setToYear(e.target.value)}>
                                <option>2020</option>
                                <option>2021</option>
                                <option>2022</option>
                                <option>2023</option>
                                <option>2024</option>
                                <option>2025</option>
                            </select>
                        </span>
                        <span>종료 월 선택
                            <select className="accessorStats-select" value={toMonth} onChange={(e) => setToMonth(e.target.value)}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                        </span>
                        <span>종료 주 선택
                            <select className="accessorStats-select" value={toWeek} onChange={(e) => setToWeek(e.target.value)}>
                                {[1, 2, 3, 4, 5, 6].map(week => (
                                    <option key={week} value={week}>{week}</option>
                                ))}
                            </select>
                        </span>
                        <button onClick={() => weeklyAccessData()}>조회</button>
                    </div>
                </div>

                <div className="stats-chart-container" style={{ height: '900px', marginTop: '20px' }}>
                    {Array.isArray(weeklyData) && weeklyData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                                <defs>
                                    <linearGradient id="colorGradientWeekly" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#63BBE0" stopOpacity={1} />
                                        <stop offset="95%" stopColor="#63BBE0" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    angle={-45}
                                    dataKey="week"
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
                                    dataKey="WAU"
                                    stroke="#63BBE0"
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
                            선택한 기간의 데이터가 존재하지 않습니다.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}