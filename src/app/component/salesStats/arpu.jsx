import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

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

export default function Arpu() {
    return (
        <>
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
        </>
    );
}