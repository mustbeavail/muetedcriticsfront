"use client"
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function HeroPickorBan_IngameStats({ inGameStatsData }) {
    const banPickCounts = inGameStatsData.reduce((acc, cur) => {
        const heroName = cur.heros.heroes_name;

        if (!acc[heroName]) {
            acc[heroName] = { ban_count: 0, pick_count: 0, total_play_time_count: 0 };
        }

        acc[heroName].ban_count += cur.ban_count;
        acc[heroName].pick_count += cur.pick_count;

        // total_play_time 값이 있으면 count 증가
        if (cur.total_play_time != null && cur.total_play_time > 0) {
            acc[heroName].total_play_time_count += 1;
        }

        return acc;
    }, {});

    const result = Object.entries(banPickCounts).map(([heroes_name, counts]) => ({
        heroes_name,
        ban_count: counts.ban_count,
        pick_count: counts.pick_count,
        total_play_time_count: counts.total_play_time_count,
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
        <div className={"ingameStats-chartWrapper-heroPickorBan"}>
            <h2 className={"userStats-title"}>영웅별 밴률 및 픽률</h2>
            <div className={"accessorStats-filterBox"}>
                기간 시작일 <input type="date" />
                기간 종료일 <input type="date" />
                <button>조회</button>
            </div>
            <ResponsiveContainer width="100%" height={1120}>
                <BarChart
                    data={pagedData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                    barCategoryGap="20%"
                    barGap={5}
                    barSize={40}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="heroes_name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ban_count" fill="#f28b82" name="밴 횟수" />
                    <Bar dataKey="pick_count" fill="#81c995" name="픽 횟수" />
                    <Bar dataKey="total_play_time_count" fill="#75b4f3" name="총 플레이 횟수" />
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