"use client"
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HeroPlaytime_IngameStats({ inGameStatsData }) {
    const totalPlayTimeByHero = inGameStatsData.reduce((acc, cur) => {
        const heroId = cur.heros.heroes_name;
        if (!acc[heroId]) acc[heroId] = 0;
        acc[heroId] += cur.total_play_time;
        return acc;
    }, {});

    const chartData = Object.entries(totalPlayTimeByHero).map(([heroes_name, total_play_time]) => ({
        heroes_name,
        total_play_time,
    }));

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
                <h2 className={"userStats-title"}>전체 유저의 영웅별 플레이타임</h2>
                <div className="itemStats-filterBox">
                    <select className="itemStats-select">
                        <option value="전체">시즌 선택</option>
                    </select>
                    <select className="itemStats-select">
                        <option value="전체">높은 순</option>
                    </select>
                </div>
            </div>

            <div>
                <ResponsiveContainer width="100%" height={1120}>
                    <BarChart
                        data={pagedData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                    >
                        <defs>
                            <linearGradient id="heroPlaytimeGradient" x1="1" y1="0" x2="0" y2="0">
                                <stop offset="0%" stopColor="#9C27B0" stopOpacity={1} />
                                <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="heroes_name" type="category" />
                        <Tooltip />
                        <Bar dataKey="total_play_time" fill="url(#heroPlaytimeGradient)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
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