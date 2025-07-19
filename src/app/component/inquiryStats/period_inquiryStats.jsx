'use client'
import React from 'react';
import dayjs from 'dayjs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Period_InquiryStats({
    inquiryStatsPeriod,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handlePeriodSearch
}) {
    const today = dayjs().format('YYYY-MM-DD'); // 오늘 날짜

    // 부모 컴포넌트에서 받은 데이터를 차트에 사용할 형식으로 변환
    const chartData = inquiryStatsPeriod.map(item => ({
        date: item.stats_date,
        '문의': item.inquiry_count,
        '신고': item.report_count,
        '총합': item.inquiry_count + item.report_count // 총합 필드 추가
    })).sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <div className="inquiryStats-chartWrapper-period">
            <h2 className={"inquiryStats-title"}>기간별 신고/문의 건수</h2>
            <div className={"inquiryStats-filterBox-wrapper"}>
                <div className={"inquiryStats-filterBox"}>
                    기간 시작일 <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    기간 종료일 <input type="date" value={endDate} max={today} onChange={(e) => setEndDate(e.target.value)} />
                    <button onClick={handlePeriodSearch}>조회</button>
                </div>
                <div>

                    <div style={{ width: "100%", height: 800, marginBottom: 40 }}>
                        <h3 style={{ textAlign: "center" }}>신고/문의</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 90 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" angle={-45} textAnchor="end" height={120} />
                                <YAxis allowDecimals={false} />
                                <Tooltip
                                    contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                                />

                                {/* 차트 아래 글로벌 Legend */}
                                <Legend />
                                {/* 라인 차트 */}
                                <Line type={'monotone'} dataKey={'문의'} stroke='#aecbfa' strokeWidth={2} />
                                <Line type={'monotone'} dataKey={'신고'} stroke='#f28b82' strokeWidth={2} />
                                <Line type={'monotone'} dataKey={'총합'} stroke='#8884d8' strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}