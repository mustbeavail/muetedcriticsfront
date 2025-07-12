"use client"
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

    return (
        <div className={"userStats-chartWrapper"}>
            <h2 className={"userStats-title"}>영웅별 밴률 및 픽률</h2>
            <ResponsiveContainer width="100%" height={2400}>
                <BarChart
                    data={result}
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
        </div>
    );
}