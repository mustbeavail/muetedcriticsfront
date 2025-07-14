"use client"
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HeroItem_IngameStats({ inGameStatsData }) {
    const chartData = inGameStatsData.map(entry => {
        const heroName = entry.heros.heroes_name;
        const items = entry.heros.item_list;

        const itemCount = items ? Object.keys(items).length : 0;

        return {
            heroes_name: heroName,
            item_count: itemCount,
        };
    });

    // 차트 페이징 처리
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(chartData.length / itemsPerPage);

    const pagedData = chartData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className={"ingameStats-chartWrapper"}>
            <div className="userStats-filterBox-wrapper">
                <h2 className={"userStats-title"}>영웅별 보유 아이템 개수</h2>
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
                    margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                >
                    <defs>
                        <linearGradient id="itemCountGradient" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#9C27B0" stopOpacity={1} />
                            <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="heroes_name" type="category" />
                    <Tooltip />
                    <Bar dataKey="item_count" fill="url(#itemCountGradient)" />
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