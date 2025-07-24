import { XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area, Brush } from 'recharts';

export default function DailyInterval({
    token, intervalStartDate, intervalEndDate, setIntervalStartDate, setIntervalEndDate, getInterval, interval, today}) {
    return (
        <>
            <div className={"salesStats-chartWrapper"}>
                <h2 className={"salesStats-title"}>📈 평균 구매 간격</h2>
                <div className={"salesStats-filterBox"}>
                    기간 시작일 <input type="date" value={intervalStartDate} max={today} onChange={(e)=>{setIntervalStartDate(e.target.value)}}/>
                    기간 종료일 <input type="date" value={intervalEndDate} max={today} onChange={(e)=>{setIntervalEndDate(e.target.value)}}/>
                    <button onClick={()=>{getInterval(token, intervalStartDate, intervalEndDate)}}>조회</button>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={interval} margin={{ top: 20, right: 120, bottom: 20, left: 60 }}>
                        <defs>
                            <linearGradient id="purchaseIntervalGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ffb6c1" stopOpacity={1} />
                                <stop offset="100%" stopColor="#d47ea2" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="stats_date" tick={{ fill: '#aaa' }} />
                        <YAxis tick={{ fill: '#aaa' }} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#2b2b35', border: 'none' }}
                            labelStyle={{ color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="daily_interval"
                            stroke="#d47ea2"
                            fill="url(#purchaseIntervalGradient)"
                            strokeWidth={2}
                            dot={{ r: 3, stroke: '#d47ea2', strokeWidth: 2, fill: '#fff' }}
                        />
                        <Brush 
                            dataKey="stats_date" 
                            height={30} 
                            stroke="#8884d8"
                            fill="#3e3e52"
                            travellerWidth={10} 
                            gap={4} 
                        />
                    </AreaChart>
                </ResponsiveContainer>
                <span className="chart-tooltip">*드래그해 범위를 조절하세요</span>
            </div>
        </>
    );
}