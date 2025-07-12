"use client"
import React from 'react';
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

    return (
        <div className={"userStats-chartWrapper"}>
            <h2 className={"userStats-title"}>전체 유저의 영웅별 플레이타임</h2>
            <div>
                <ResponsiveContainer width="100%" height={1200}>
                    <BarChart
                        data={chartData}
                        layout="vertical"
                        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                    >
                        <defs>
                            <linearGradient id="heroPlaytimeGradient" x1="1" y1="0" x2="0" y2="0">
                                <stop offset="0%" stopColor="#a367f9" stopOpacity={1} />
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
        </div>
    );
}