import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, AreaChart, Area, Brush } from 'recharts';

export default function Arppu({
    token, arppuStartDate, arppuEndDate, setArppuStartDate, setArppuEndDate, getArppu, arppu, today}) {

    return (
        <>
            <div className={"salesStats-chartWrapper"}>
                <h2 className={"salesStats-title"}>📈 PU당 평균 소비액 (ARPPU)</h2>
                <div className={"salesStats-filterBox"}>
                    기간 시작일 <input type="date" value={arppuStartDate} max={today} onChange={(e)=>{setArppuStartDate(e.target.value)}}/>
                    기간 종료일 <input type="date" value={arppuEndDate} max={today} onChange={(e)=>{setArppuEndDate(e.target.value)}}/>
                    <button onClick={()=>{getArppu(token, arppuStartDate, arppuEndDate)}}>조회</button>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                    <BarChart data={arppu} margin={{ top: 20, right: 120, bottom: 20, left: 60 }}>
                        <defs>
                            <linearGradient id="arppuGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a3f9a3" stopOpacity={1} />
                                <stop offset="100%" stopColor="#3cb371" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="stats_date" tick={{ fill: '#aaa', fontSize: 12 }} />
                        <YAxis tick={{ fill: '#aaa', fontSize: 12 }} />
                        <Tooltip
                            formatter={(arppu) => `${arppu} 원`}
                            contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                            cursor={{ fill: '#1c1b23' }}
                        />
                        <Bar dataKey="arppu" fill="url(#arppuGradient)" name="ARPPU"/>
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