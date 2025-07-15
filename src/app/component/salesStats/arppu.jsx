import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

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

export default function Arppu() {
    return (
        <>
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
                            formatter={(value) => `${value} 원`}
                            contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                            cursor={{ fill: '#1c1b23' }}
                        />
                        <Bar dataKey="value" fill="url(#arppuGradient)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}