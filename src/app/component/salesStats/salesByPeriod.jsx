import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area } from 'recharts';

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

export default function SalesByPeriod() {
    return (
        <>
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
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}