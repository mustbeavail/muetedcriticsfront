'use client'
import dayjs from 'dayjs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function All_InquiryStats({ inquiryStatsAll }) {
    const today = dayjs().format('YYYY.MM.DD');

    // 차트의 막대 색상으로 사용할 파스텔 톤 색상 배열을 정의합니다.
    const pastelColors = ["#f28b82", "#aecbfa", "#fff475"];

    // 1. 전체 신고/문의 건수 데이터를 'inquiryStatsAll' prop을 기반으로 가공합니다.
    const allData = inquiryStatsAll.map(item => ({
        category: item.cate,
        count: item.total
    }));

    // 2. 차트에 사용할 데이터에서 '총합' 항목을 제외합니다.
    const chartData = allData.filter(item => item.category !== "총합");

    // 3. '총합' 데이터만 따로 변수에 저장합니다.
    const totalData = allData.find(item => item.category === "총합");


    return (
        <div className="inquiryStats-chartWrapper">
            <h2 className={"inquiryStats-title"}>전체 신고/문의 건수</h2>
            <div>{today} 기준</div>
            {/* 신고/문의 건수 통계 차트 */}
            <div className="inquiryStats-chart">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={chartData} // 차트에 표시할 데이터
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }} // 차트 여백 설정
                    >
                        <CartesianGrid strokeDasharray="3 3" /> {/* 차트 배경에 점선 격자 표시 */}
                        <XAxis dataKey="category" /> {/* X축에 'category' 데이터를 표시 */}
                        <YAxis allowDecimals={false} /> {/* Y축에 소수점 이하를 표시하지 않음 */}
                        <Tooltip
                            formatter={(value) => `${value} 건`} // 툴팁에 표시될 값의 형식을 지정
                            contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }} // 툴팁 스타일 지정
                            cursor={{ fill: '#1c1b23' }} // 툴팁 커서 색상 지정
                        />
                        <Bar dataKey="count" name="건수"> {/* 'count' 데이터를 막대로 표시 */}
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={pastelColors[index % pastelColors.length]} // 각 막대에 다른 색상을 적용
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 표: '총합'이 제외된 chartData로 각 항목을 보여주고, 마지막에 totalData를 따로 표시 */}
            <div className="inquiryStats-chartWrapper-tableBox">
                <div className="row header">
                    <div className="cell">구분</div>
                    <div className="cell">총 건수</div>
                </div>

                {/* '총합'을 제외한 각 항목을 반복해서 보여줌 */}
                {chartData.map((item, idx) => (
                    <div className="row" key={idx}>
                        <div className="cell">{item.category}</div>
                        <div className="cell">{item.count} 건</div>
                    </div>
                ))}

                {/* 백엔드에서 받은 '총합' 데이터를 마지막에 표시 */}
                {totalData && (
                    <div className="row total">
                        <div className="cell">{totalData.category}</div>
                        <div className='cell'>{totalData.count} 건</div>
                    </div>
                )}
            </div>
        </div>
    );
}
