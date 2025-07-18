'use client'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

const COLORS = [
    "#1F77B4",
    "#2CA02C",
    "#FFBB28",
    "#FF7F0E",
    "#9467BD",
    "#D62728",
    "#E377C2",
    "#17BECF",
    "#BCBD22",
    "#F7B267"
];

export default function Usertype_Tier_UserStats() {


    useEffect(() => {
        const token = sessionStorage.getItem('token');

    }, []);

    return (
        <div className="userStats-chartWrapper-tier">
            <div className="userStats-filterBox-wrapper">
                <h2 className={"userStats-title"}>유저 분류별 티어 통계</h2>
                <div className="itemStats-filterBox">
                    유저 분류 선택 <select
                        className="itemStats-select"
                    // value={selectedTier}
                    // onChange={e => setSelectedTier(e.target.value)}
                    >
                        <option value="전체">전체</option>
                        {/* {chartData.map((tier) => (
                            <option key={tier.name} value={tier.name}>
                                {tier.name}
                            </option>
                        ))} */}
                    </select>
                    시즌 선택 <select
                        className="itemStats-select"
                    // value={selectedSeason}
                    // onChange={e => setSelectedSeason(e.target.value)}
                    >
                        <option value="전체">전체</option>
                        {/* {seasonChartData.map((season) => (
                            <option key={season.name} value={season.name}>
                                {season.name}
                            </option>
                        ))} */}
                    </select>
                </div>
            </div>
            <span>
                {(selectedTier !== "전체" || selectedSeason !== "전체") ? (
                    <>
                        {selectedSeason !== "전체" && selectedSeason}&nbsp;
                        {selectedTier !== "전체" && selectedTier}&nbsp;
                        {"유저 수: " + filtered.length + "명"}
                    </>
                ) : (
                    `전체 인원 수: ${filtered.length}명`
                )}
            </span>
            <div className="tierStats-chartWrapper-datalist">
                <div className="tierStats-chartWrapper-chartBox">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={completeChartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius="40%"
                                outerRadius="80%"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                                labelLine={false}
                                onClick={(data) => setSelectedTierFromChart(data.name)}
                            >
                                {completeChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `${value}명`}
                                contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                                cursor={{ fill: '#1c1b23' }}
                            />
                            <Legend verticalAlign="bottom" iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* 테이블 */}
                <div className="tierStats-chartWrapper-tableBox">
                    <div className="row header">
                        <div className="cell">티어 이름</div>
                        <div className="cell">인원 수</div>
                    </div>
                    {completeChartData.map((tier, idx) => (
                        <div className="row" key={idx}>
                            <div className="cell">{tier.name}</div>
                            <div className="cell">{tier.value}명</div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedTierFromChart && (
                <div className="tier-clicked-users">
                    <h3 style={{ color: "#fff" }}>
                        {selectedTierFromChart} 티어 유저 목록 ({selectedTierUsers.length}명)
                    </h3>
                    {currentUsers.map((userObj, idx) => (
                        <div key={idx} className="userStats-user-list-card">
                            <div className="user-list-info">
                                <div className="user-list-header">
                                    <span className="user-list-name">{userObj.user.user_nick}</span>
                                </div>

                                <div className="user-list-email">{userObj.user.user_id}</div>

                                <div className="user-list-info">
                                    <div><span className="label">성별</span> {userObj.user.user_gender}</div>
                                    <div><span className="label">지역</span> {userObj.user.region}</div>
                                    <div><span className="label">가입일</span> {userObj.user.join_date}</div>
                                </div>
                            </div>

                            <div className="user-list-menu">⋮</div>
                        </div>
                    ))}
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
            )}
        </div>
    );
}