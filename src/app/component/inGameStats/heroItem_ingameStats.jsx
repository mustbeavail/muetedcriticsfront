"use client"
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

    return (
        <div className={"userStats-chartWrapper"}>
            <h2 className={"userStats-title"}>영웅별 보유 아이템 개수</h2>
            <ResponsiveContainer width="100%" height={1200}>
                <BarChart
                    data={chartData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                    barSize={40}
                >
                    <defs>
                        <linearGradient id="itemCountGradient" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#a367f9" stopOpacity={1} />
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
        </div>
    );
}