import { 
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
    AreaChart, Area, Brush} from 'recharts';

export default function SalesByPeriod({
    token, periodStartDate, setPeriodStartDate, periodEndDate, setPeriodEndDate, getSalesByPeriod, salesByPeriod, today}) {

    return (
        <>
            <div className={"salesStats-chartWrapper"}>
                <h2 className={"salesStats-title"}>💰 기간별 판매액</h2>
                <div className={"salesStats-filterBox"}>
                기간 시작일 <input type="date" value={periodStartDate} max={today} onChange={(e)=>{setPeriodStartDate(e.target.value)}}/>
                    기간 종료일 <input type="date" value={periodEndDate} max={today} onChange={(e)=>{setPeriodEndDate(e.target.value)}}/>
                    <button onClick={()=>{getSalesByPeriod(token, periodStartDate, periodEndDate)}}>조회</button>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={salesByPeriod} margin={{ top: 20, right: 120, bottom: 20, left: 60 }}>
                        <defs>
                            <linearGradient id="salesByPeriodGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a367f9" stopOpacity={1} />
                                <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="stats_date" tick={{ fill: '#aaa', fontSize: 8}} />
                        <YAxis tick={{ fill: '#aaa', fontSize: 12 }} />
                        <Tooltip
                            formatter={(daily_revenue) => `${daily_revenue} 원`}
                            contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                            cursor={{ fill: '#1c1b23' }}
                        />

                        <Bar
                            dataKey="daily_revenue"
                            fill="url(#salesByPeriodGradient)"
                            name = "매출액"
                        />
                        <Brush 
                            dataKey="stats_date" 
                            height={30} 
                            stroke="#8884d8"
                            fill="#3e3e52"
                            travellerWidth={10} 
                            gap={4} 
                        />
                    </BarChart>
                </ResponsiveContainer>
                <span className="chart-tooltip">*드래그해 범위를 조절하세요</span>
            </div>
        </>
    );
}