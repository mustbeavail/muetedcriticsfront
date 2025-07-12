'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

export default function All_InquiryStats({ inquiryStatsData }) {
    const pastelColors = ["#f28b82", "#aecbfa", "#fff475"];

    const categoryCounts = inquiryStatsData.reduce((acc, curr) => {
        const category = curr.category;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count,
    }));

    return (
        <div className="inquiryStats-chartWrapper">
            <h2 className={"inquiryStats-title"}>전체 신고/문의 건수</h2>
            {/* 신고/문의 건수 통계 차트 */}
            <div className="inquiryStats-chart">
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="문의 수" fill="#8884d8">
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={pastelColors[index % pastelColors.length]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 표 */}
            <div className="inquiryStats-chartWrapper-tableBox">
                <div className="row header">
                    <div className="cell">카테고리</div>
                    <div className="cell">문의 수 (건)</div>
                </div>
                {chartData.map((item, idx) => (
                    <div className="row" key={idx}>
                        <div className="cell">{item.category}</div>
                        <div className="cell">{item.count}건</div>
                    </div>
                ))}
                <div className="row total">
                    <div className="cell">총합</div>
                    <div className="cell">
                        {chartData.reduce((sum, item) => sum + item.count, 0)}건
                    </div>
                </div>
            </div>
        </div>
    );
}