import { XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

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

export default function Pu() {
    return (
        <>
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
        </>
    );
}