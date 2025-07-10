// import React from 'react';

// const SalesStats = () => {
//   return (
//     <div>
//       <h1>SalesStats</h1>
//     </div>
//   );
// };

// export default SalesStats;

'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';

const data = [
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

{/* 
    linearGradient	그라데이션 정의 (id="barGradient")
    fill="url(#barGradient)"	바 색상에 그라데이션 적용
    radius={[6, 6, 0, 0]}	바의 상단 라운드 처리
    background: '#1c1b23'	전체 차트 배경 색상
    tick={{ fill: '#aaa' }}	X/Y축 텍스트 색상 변경
    Tooltip 커스텀	다크모드 스타일로 툴팁 설정 
*/}
export default function RevenueChart() {
    return (
        <div
            style={{
                width: '100%',
                height: 1000,
                background: '#1c1b23',
                borderRadius: '16px',
                padding: '20px',
                boxSizing: 'border-box',
            }}
        >
            <h2>💰 기간별 판매액</h2>
            <div style={{ marginBottom: 16 }}>
                기간 시작일 <input type="date" />
                기간 종료일 <input type="date" />
                <button>조회</button>
            </div>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={data}>
                    <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a367f9" />
                            <stop offset="100%" stopColor="#4b00a3" />
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
                    <Bar dataKey="value" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}