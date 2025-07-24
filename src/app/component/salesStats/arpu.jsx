import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area, Brush } from 'recharts';

export default function Arpu({
    token, arpuStartDate, arpuEndDate, setArpuStartDate, setArpuEndDate, getArpu, arpu, today}) {

    return (
        <>
            <div className={"salesStats-chartWrapper"}>
                <h2 className={"salesStats-title"}>📈 유저당 평균 소비액 (ARPU)</h2>
                <div className={"salesStats-filterBox"}>
                    기간 시작일 <input type="date" value={arpuStartDate} max={today} onChange={(e)=>{setArpuStartDate(e.target.value)}}/>
                    기간 종료일 <input type="date" value={arpuEndDate} max={today} onChange={(e)=>{setArpuEndDate(e.target.value)}}/>
                    <button onClick={()=>{getArpu(token, arpuStartDate, arpuEndDate)}}>조회</button>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={arpu} margin={{ top: 20, right: 120, bottom: 20, left: 60 }}>
                        <defs>
                            <linearGradient id="arpuGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#fff86b" stopOpacity={1} />
                                <stop offset="100%" stopColor="#ffcf40" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="stats_date" tick={{ fill: '#aaa', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#aaa', fontSize: 12 }} />
                        <Tooltip
                            formatter={(arpu) => `${arpu} 원`}
                            contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                            cursor={{ fill: '#1c1b23' }}
                        />
                        <Bar dataKey="arpu" fill="url(#arpuGradient)" name="ARPU" />
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