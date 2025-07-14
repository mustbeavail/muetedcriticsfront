"use client"
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HeroPOTG_IngameStats({ inGameStatsData }) {
    const potgByCategory = inGameStatsData.reduce((acc, cur) => {
        const category = cur.heros.heroes_name;
        const potg = cur.potg_count || 0;

        if (!acc[category]) acc[category] = 0;
        acc[category] += potg;

        return acc;
    }, {});

    const potgChartData = Object.entries(potgByCategory).map(([category, potg_count]) => ({
        user_type: category,
        potg_count,
    }));

    // 차트 페이징 처리
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(potgChartData.length / itemsPerPage);

    const pagedData = potgChartData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className={"ingameStats-chartWrapper"}>
            <div className="userStats-filterBox-wrapper">
                <h2 className={"userStats-title"}>전체 유저의 영웅별 최고의 플레이 비중</h2>
                <div className="itemStats-filterBox">
                    <select className="itemStats-select">
                        <option value="전체">시즌 선택</option>
                    </select>
                    <select className="itemStats-select">
                        <option value="전체">높은 순</option>
                    </select>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={1120}>
                <BarChart
                    data={pagedData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                >
                    <defs>
                        <linearGradient id="potgGradient" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#9C27B0" stopOpacity={1} />
                            <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="user_type" type="category" />
                    <Tooltip />
                    <Bar dataKey="potg_count" fill="url(#potgGradient)" />
                </BarChart>
            </ResponsiveContainer>
            {/* 페이징 버튼 */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? "active" : ""}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}