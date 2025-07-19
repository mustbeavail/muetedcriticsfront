"use client"
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function HeroItem_IngameStats() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortOrder, setSortOrder] = useState('desc');
    const [heroItemData, setHeroItemData] = useState([]);

    const itemsPerPage = 10;

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) return;
        getHeroItemData(token);
    }, [sortOrder]);

    // 영웅이 보유한 아이템 수 불러오기
    const getHeroItemData = async (token) => {
        try {
            const { data } = await axios.get(`${URL}/get/hero-item-count`, {
                headers: { Authorization: token },
                params: {
                    sortOrder: sortOrder
                }
            });
            //console.log(data);
            setHeroItemData(data.list);
            setTotalPages(Math.ceil(data.list.length / itemsPerPage));
        } catch (error) {
            console.log('영웅별 보유 아이템 수 조회 실패: ', error);
        }
    }


    // 페이지네이션 데이터
    const pagedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return heroItemData.slice(start, start + itemsPerPage);
    }, [heroItemData, currentPage]);

    return (
        <div className={"ingameStats-chartWrapper"}>
            <div className="userStats-filterBox-wrapper">
                <h2 className={"userStats-title"}>영웅별 보유 아이템 개수</h2>
                <div className="itemStats-filterBox">
                    <select className="itemStats-select"
                        value={sortOrder}
                        onChange={(e) => {
                            setSortOrder(e.target.value);
                            setCurrentPage(1);
                        }}>
                        <option value="desc">높은 순</option>
                        <option value="asc">낮은 순</option>
                    </select>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={1000}>
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
                    <YAxis dataKey="heroName" type="category" />
                    <Tooltip
                        formatter={(value) => `${value} 개`}
                        contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                        cursor={{ fill: '#1c1b23' }}
                    />
                    <Bar dataKey="itemCount" fill="url(#itemCountGradient)" />
                </BarChart>
            </ResponsiveContainer>
            {/* 페이지네이션 */}
            <div className="pagination">
                {(() => {
                    const buttons = [];
                    for (let i = 0; i < totalPages; i++) {
                        buttons.push(
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={currentPage === i + 1 ? "active" : ""}>
                                {i + 1}
                            </button>
                        )
                    }
                    return buttons;
                })()}
            </div>
        </div>
    );
}