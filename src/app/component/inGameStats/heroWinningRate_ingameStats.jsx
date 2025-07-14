"use client"
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function HeroWinningRate_IngameStats({ inGameStatsData }) {
    const winRateByHero = {};

    inGameStatsData.forEach(data => {
        const hero = data.heros.heroes_name;
        if (!winRateByHero[hero]) {
            winRateByHero[hero] = {
                wins: 0,
                total: 0,
            };
        }

        winRateByHero[hero].total += 1;

        if (data.lose_count === 0) {
            winRateByHero[hero].wins += 1;
        }
    });

    const result = Object.entries(winRateByHero).map(([heroes_name, { wins, total }]) => ({
        heroes_name,
        win_rate: Number(((wins / total) * 100).toFixed(1)),
    }));

    // 차트 페이징 처리
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(result.length / itemsPerPage);

    const pagedData = result.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className={"ingameStats-chartWrapper-heroWinningRate"}>
            <div className="userStats-filterBox-wrapper">
                <h2 className={"userStats-title"}>전체 유저의 영웅별 승률</h2>
                <div className="itemStats-filterBox">
                    <select className="itemStats-select">
                        <option>높은 순</option>
                        <option>낮은 순</option>
                    </select>
                </div>
            </div>
            <div className={"accessorStats-filterBox"}>
                기간 시작일 <input type="date" />
                기간 종료일 <input type="date" />
                &nbsp;&nbsp;티어 선택 <select className="itemStats-select">
                    <option>높은 순</option>
                    <option>낮은 순</option>
                </select>
                <button>조회</button>
            </div>
            전체 유저 중 (선택된 티어) 티어 유저의 영웅별 승률 (기간 시작일~기간 종료일)
            <ResponsiveContainer width="100%" height={1120}>
                <BarChart
                    data={pagedData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                >
                    <defs>
                        <linearGradient id="winRateGradient" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#9C27B0" stopOpacity={1} />
                            <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(tick) => `${tick}%`} />
                    <YAxis dataKey="heroes_name" type="category" />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="win_rate" fill="url(#winRateGradient)" name="승률" />
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