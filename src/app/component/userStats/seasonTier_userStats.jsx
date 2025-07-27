'use client'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useState, useEffect, useMemo } from "react";
import api from '../../utils/api';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function SeasonTier_UserStats() {
    const [seasonList, setSeasonList] = useState([1, 2, 3, 4]);
    const [selectedSeason, setSelectedSeason] = useState(4);
    const [tierStats, setTierStats] = useState([]);

    // 시즌별 티어 통계
    const getSeasonTierStats = async (token, seasonIdx) => {
        try {
            const { data } = await api.get(`${URL}/season-tier-stats`, {
                headers: { Authorization: token },
                params: {
                    seasonIdx: seasonIdx
                }
            });
            if (data !== null && data !== undefined) {
                // console.log(data);
                setTierStats(data);
            } else {
                setTierStats([]);
            }
        } catch (error) {
            console.log('시즌별 티어 통계 조회 실패: ', error);
            setTierStats([]);
        }
    };

    // 차트 데이터 변환
    const chartData = useMemo(() => {
        return tierStats.map(item => ({
            tier: item.tierName,
            count: item.userCount
        }));
    }, [tierStats]);

    // 시즌이 변경될 때마다 데이터 자동 조회
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) return;
        getSeasonTierStats(token, selectedSeason);
    }, [selectedSeason]);

    // API 결과를 차트 형식으로 변환
    return (
        <div className="userStats-chartWrapper-seasonTier">
            <h2 className={"userStats-title"}>시즌별 티어 통계</h2>

            <div style={{ marginBottom: "1rem" }}>
                시즌 선택&nbsp;
                <select
                    value={selectedSeason}
                    // e.target.value는 문자열이므로 숫자로 변환해주는 게 더 안전
                    onChange={(e) => setSelectedSeason(Number(e.target.value))}
                    className="itemStats-select"
                >
                    {/* seasonList 배열을 사용해서 동적으로 렌더링 */}
                    {seasonList.map(season => (
                        <option key={season} value={season}>{season}</option>
                    ))}
                </select>
            </div>

            <ResponsiveContainer width="100%" height={600}>
                {/* BarChart에 chartData를 직접 전달 */}
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                    <defs>
                        <linearGradient id="tierGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a367f9" stopOpacity={1} />
                            <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="tier" tick={{ fill: '#aaa', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#aaa', fontSize: 12 }} allowDecimals={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#2b2b35', border: 'none' }}
                        labelStyle={{ color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Bar
                        dataKey="count"
                        fill="url(#tierGradient)"
                    />
                </BarChart>
            </ResponsiveContainer>
            <div className="tierStats-chartWrapper-tableBox">
                <div className="row header">
                    <div className="cell">시즌</div>
                    <div className="cell">티어명</div>
                    <div className="cell">유저 수 (명)</div>
                </div>
                {chartData.map((tier, idx) => (
                    <div className="row" key={idx}>
                        <div className="cell">{selectedSeason}</div>
                        <div className="cell">{tier.tier}</div>
                        <div className="cell">{tier.count}명</div>
                    </div>
                ))}
            </div>
        </div>
    );
}