"use client"
import React from 'react';
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

    return (
        <div className={"userStats-chartWrapper"}>
            <h2 className={"userStats-title"}>전체 유저의 영웅별 최고의 플레이 비중</h2>
            <ResponsiveContainer width="100%" height={1200}>
                <BarChart
                    data={potgChartData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                >
                    <defs>
                        <linearGradient id="potgGradient" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#a367f9" stopOpacity={1} />
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
        </div>
    );
}