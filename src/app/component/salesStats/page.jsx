'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';
import '../mail/mail.css';

// 기간별 판매액
const salesAmountData = [
    { date: '6.16', value: 3800 },
    { date: '6.17', value: 3100 },
    { date: '6.18', value: 4200 },
    { date: '6.19', value: 4600 },
    { date: '6.20', value: 4900 },
    { date: '6.21', value: 4800 },
    { date: '6.22', value: 4400 },
    { date: '6.23', value: 3600 },
    { date: '6.24', value: 3900 },
    { date: '6.25', value: 4600 },
    { date: '6.26', value: 4200 },
    { date: '6.27', value: 5000 },
    { date: '6.28', value: 5000 },
    { date: '6.29', value: 4700 },
    { date: '6.30', value: 4000 },
    { date: '7.01', value: 3900 },
];

// 유저당 평균 소비액 (ARPU)
const arpuData = [
    { date: '6.16', value: 1300 },
    { date: '6.17', value: 900 },
    { date: '6.18', value: 1700 },
    { date: '6.19', value: 1500 },
    { date: '6.20', value: 2100 },
    { date: '6.21', value: 1900 },
    { date: '6.22', value: 1200 },
    { date: '6.23', value: 2300 },
    { date: '6.24', value: 1400 },
    { date: '6.25', value: 1800 },
    { date: '6.26', value: 1600 },
    { date: '6.27', value: 2500 },
    { date: '6.28', value: 1100 },
    { date: '6.29', value: 2400 },
    { date: '6.30', value: 2000 },
    { date: '7.01', value: 2200 },
];

// PU당 평균 소비액 (ARPPU)
const arppuData = [
    { date: '6.16', value: 3100 },
    { date: '6.17', value: 2900 },
    { date: '6.18', value: 3500 },
    { date: '6.19', value: 2700 },
    { date: '6.20', value: 4300 },
    { date: '6.21', value: 3900 },
    { date: '6.22', value: 3300 },
    { date: '6.23', value: 4100 },
    { date: '6.24', value: 2600 },
    { date: '6.25', value: 3800 },
    { date: '6.26', value: 3000 },
    { date: '6.27', value: 4500 },
    { date: '6.28', value: 3400 },
    { date: '6.29', value: 3700 },
    { date: '6.30', value: 2800 },
    { date: '7.01', value: 4200 },
];

// 평균 구매 간격
const purchaseIntervalData = [
    { date: '6.16', value: 4 },
    { date: '6.17', value: 12 },
    { date: '6.18', value: 7 },
    { date: '6.19', value: 15 },
    { date: '6.20', value: 3 },
    { date: '6.21', value: 18 },
    { date: '6.22', value: 6 },
    { date: '6.23', value: 11 },
    { date: '6.24', value: 1 },
    { date: '6.25', value: 9 },
    { date: '6.26', value: 14 },
    { date: '6.27', value: 2 },
    { date: '6.28', value: 17 },
    { date: '6.29', value: 8 },
    { date: '6.30', value: 5 },
    { date: '7.01', value: 13 },
];

// 기간별 구매 유저 수 (PU)
const puData = [
    { date: '6.16', value: 142 },
    { date: '6.17', value: 198 },
    { date: '6.18', value: 120 },
    { date: '6.19', value: 170 },
    { date: '6.20', value: 230 },
    { date: '6.21', value: 145 },
    { date: '6.22', value: 210 },
    { date: '6.23', value: 135 },
    { date: '6.24', value: 190 },
    { date: '6.25', value: 160 },
    { date: '6.26', value: 125 },
    { date: '6.27', value: 220 },
    { date: '6.28', value: 175 },
    { date: '6.29', value: 240 },
    { date: '6.30', value: 205 },
    { date: '7.01', value: 130 },
];

export default function RevenueChart() {
    return (
        <>
            <span className={"salesStats-mainTitle"}>매출 통계</span>
            <div className={"salesStats-chartWrapper"}>
                <h2 className={"salesStats-title"}>💰 기간별 판매액</h2>
                <div className={"salesStats-filterBox"}>
                    기간 시작일 <input type="date" />
                    기간 종료일 <input type="date" />
                    <button>조회</button>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={salesAmountData}>
                        <defs>
                            <linearGradient id="salesAmountGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a367f9" stopOpacity={1} />
                                <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="date" tick={{ fill: '#aaa', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#aaa', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#2b2b35', border: 'none' }}
                            labelStyle={{ color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />

                        <Bar
                            dataKey="value"
                            fill="url(#salesAmountGradient)"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className={"salesStats-chartWrapper"}>
                <h2 className={"salesStats-title"}>📈 유저당 평균 소비액 (ARPU)</h2>
                <div className={"salesStats-filterBox"}>
                    기간 시작일 <input type="date" />
                    기간 종료일 <input type="date" />
                    <button>조회</button>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={arpuData}>
                        <defs>
                            <linearGradient id="arpuGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#fff86b" stopOpacity={1} />
                                <stop offset="100%" stopColor="#ffcf40" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="date" tick={{ fill: '#aaa', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#aaa', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#2b2b35', border: 'none' }}
                            labelStyle={{ color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="value" fill="url(#arpuGradient)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className={"salesStats-chartWrapper"}>
                <h2 className={"salesStats-title"}>📈 PU당 평균 소비액 (ARPPU)</h2>
                <div className={"salesStats-filterBox"}>
                    기간 시작일 <input type="date" />
                    기간 종료일 <input type="date" />
                    <button>조회</button>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={arppuData}>
                        <defs>
                            <linearGradient id="arppuGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a3f9a3" stopOpacity={1} />
                                <stop offset="100%" stopColor="#3cb371" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="date" tick={{ fill: '#aaa', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#aaa', fontSize: 12 }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#2b2b35', border: 'none' }}
                            labelStyle={{ color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="value" fill="url(#arppuGradient)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className={"salesStats-chartWrapper"}>
                <h2 className={"salesStats-title"}>📈 평균 구매 간격</h2>
                <div className={"salesStats-filterBox"}>
                    기간 시작일 <input type="date" />
                    기간 종료일 <input type="date" />
                    <button>조회</button>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={purchaseIntervalData}>
                        <defs>
                            <linearGradient id="purchaseIntervalGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ffb6c1" stopOpacity={1} />
                                <stop offset="100%" stopColor="#d47ea2" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="date" tick={{ fill: '#aaa' }} />
                        <YAxis tick={{ fill: '#aaa' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#2b2b35', border: 'none' }}
                            labelStyle={{ color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#d47ea2"
                            fill="url(#purchaseIntervalGradient)"
                            strokeWidth={2}
                            dot={{ r: 3, stroke: '#d47ea2', strokeWidth: 2, fill: '#fff' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className={"salesStats-chartWrapper"}>
                <h2 className={"salesStats-title"}>📈 기간별 구매 유저 수 (PU)</h2>
                <div className={"salesStats-filterBox"}>
                    기간 시작일 <input type="date" />
                    기간 종료일 <input type="date" />
                    <button>조회</button>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={puData}>
                        <defs>
                            <linearGradient id="puGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a0d8f7" stopOpacity={1} />
                                <stop offset="100%" stopColor="#4ca3dd" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="date" tick={{ fill: '#aaa' }} />
                        <YAxis tick={{ fill: '#aaa' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#2b2b35', border: 'none' }}
                            labelStyle={{ color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#4ca3dd"
                            fill="url(#puGradient)"
                            strokeWidth={2}
                            dot={{ r: 3, stroke: '#4ca3dd', strokeWidth: 2, fill: '#fff' }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className={"salesStats-chartWrapper"}>
                <h2 className={"salesStats-title"}>📋 세부 통계 테이블</h2>
                <span>모든 항목은 매일 1시마다 갱신됩니다.</span>
                <div className="salesStats-table">

                </div>
                <div className="row header">
                    <div className="cell">항목</div>
                    <div className="cell">수치</div>
                    <div className="cell">비고</div>
                </div>
                <div className="row">
                    <div className="cell">총 매출</div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                </div>
                <div className="row">
                    <div className="cell">총 구매 건수</div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                </div>

                <div className="row">
                    <div className="cell">총 구매 유저수(PU)</div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                </div>

                <div className="row">
                    <div className="cell">전체 유저 수</div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                </div>

                <div className="row">
                    <div className="cell">평균 구매 빈도</div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                </div>

                <div className="row">
                    <div className="cell">PU당 평균 구매액</div>
                    <div className="cell"></div>
                    <div className="cell"></div>
                </div>
            </div>
        </>
    );
}