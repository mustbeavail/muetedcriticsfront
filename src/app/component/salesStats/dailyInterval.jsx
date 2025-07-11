import { XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

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

export default function DailyInterval() {
    return (
        <>
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
        </>
    );
}