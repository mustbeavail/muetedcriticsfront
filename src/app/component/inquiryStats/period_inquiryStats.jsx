'use client'
import React from 'react';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/**
 * 기간별 신고/문의 건수를 라인 차트로 표시하는 컴포넌트
 * @param {object} props - 컴포넌트 props
 * @param {Array<object>} props.inquiryStatsPeriod - 기간별 통계 데이터 배열
 * @param {string} props.startDate - 시작일
 * @param {string} props.endDate - 종료일
 * @param {function} props.setStartDate - 시작일 변경 핸들러
 * @param {function} props.setEndDate - 종료일 변경 핸들러
 * @param {function} props.handlePeriodSearch - 조회 버튼 클릭 핸들러
 */
export default function Period_InquiryStats({
    inquiryStatsPeriod,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    handlePeriodSearch
}) {
    // 오늘 날짜를 YYYY-MM-DD 형식으로 가져옴 (종료일 최대값으로 사용)
    const today = format(new Date(), 'YYYY-MM-DD');

    // 부모 컴포넌트로부터 받은 통계 데이터를 차트에 적합한 형식으로 변환하고 날짜순으로 정렬
    const chartData = inquiryStatsPeriod.map(item => ({
        date: item.stats_date, // 날짜
        '문의': item.inquiry_count, // 문의 건수
        '신고': item.report_count, // 신고 건수
        '총합': item.inquiry_count + item.report_count // 문의와 신고 건수의 총합
    })).sort((a, b) => new Date(a.date) - new Date(b.date)); // 날짜 오름차순 정렬

    return (
        <div className="inquiryStats-chartWrapper-period">
            <h2 className={"inquiryStats-title"}>기간별 신고/문의 건수</h2>
            <div className={"inquiryStats-filterBox-wrapper"}>
                {/* 기간 선택 및 조회 UI */}
                <div className={"inquiryStats-filterBox"}>
                    기간 시작일 <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    기간 종료일 <input type="date" value={endDate} max={today} onChange={(e) => setEndDate(e.target.value)} />
                    <button onClick={handlePeriodSearch}>조회</button>
                </div>
                <div>
                    {/* 차트를 감싸는 컨테이너 */}
                    <div style={{ width: "100%", height: 750, marginBottom: 40 }}>
                        {/* 반응형 차트 컨테이너 */}
                        <ResponsiveContainer width="100%" height={750}>
                            <LineChart
                                data={chartData} // 차트에 표시할 데이터
                                margin={{ top: 20, right: 30, left: 20, bottom: 90 }} // 차트 여백 설정
                            >
                                {/* 차트 배경 그리드 */}
                                <CartesianGrid strokeDasharray="3 3" />
                                {/* X축 설정 (날짜) */}
                                <XAxis dataKey="date" angle={-45} textAnchor="end" height={120} />
                                {/* Y축 설정 (건수) */}
                                <YAxis allowDecimals={false} />
                                {/* 마우스 호버 시 표시될 툴팁 */}
                                <Tooltip
                                    contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                                />
                                {/* 차트 범례 */}
                                <Legend />
                                {/* '문의' 데이터 라인 */}
                                <Line type={'monotone'} dataKey={'문의'} stroke='#aecbfa' strokeWidth={2} />
                                {/* '신고' 데이터 라인 */}
                                <Line type={'monotone'} dataKey={'신고'} stroke='#f28b82' strokeWidth={2} />
                                {/* '총합' 데이터 라인 */}
                                <Line type={'monotone'} dataKey={'총합'} stroke='#8884d8' strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
