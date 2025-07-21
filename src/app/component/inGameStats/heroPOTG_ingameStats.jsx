"use client"
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function HeroPOTG_IngameStats() {

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [totalPages, setTotalPages] = useState(1);   // 전체 페이지 수
    const [potgData, setPotgData] = useState([]); // API로부터 받은 영웅별 최고의 플레이 비중 데이터
    const [sortOrder, setSortOrder] = useState('desc'); // 정렬 순서 ('desc': 내림차순, 'asc': 오름차순)

    const itemsPerPage = 10; // 페이지 당 보여줄 영웅 수

    const today = format(new Date(), 'YYYY-MM-DD');

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) return;
        getPotgData(token);
        setCurrentPage(1);
    }, [sortOrder]);


    // 영웅별 최고의 플레이 비중 불러오기
    const getPotgData = async (token) => {
        try {
            const { data } = await axios.get(`${URL}/get/hero-potg-rate`, {
                headers: { Authorization: token },
                params: {
                    sortOrder: sortOrder,
                    startDate: '2025-01-01',
                    endDate: today
                }
            });
            console.log(data);
            setPotgData(data.list);
            setTotalPages(Math.ceil(data.list.length / itemsPerPage));
        } catch (error) {
            console.log("영웅별 최고의 플레이 비중 불러오기 실패", error);
        }
    };

    // --- PAGINATION ---
    // 현재 페이지에 표시할 데이터를 계산합니다.
    // 'heroPlaytimeData'나 'currentPage'가 변경될 때만 재계산하여 성능을 최적화합니다.
    const pagedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return potgData.slice(start, start + itemsPerPage);
    }, [potgData, currentPage]);


    // 커스텀 툴팁 컴포넌트
    // recharts의 <Tooltip content={...}/>에서 자동으로 active, payload, label을 props로 넘겨줌
    // active: 툴팁 활성화 여부, payload: hover된 데이터, label: 축 값(영웅 이름)
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload; // 툴팁에 표시될 현재 데이터
            return (
                <div className="custom-tooltip" style={{ background: '#1c1b23', border: '1px solid #ddd', padding: '10px', color: '#fff', fontSize: 15 }}>
                    <p className="label">{`영웅: ${label}`}</p>
                    <p className="intro">{`총 매치 수: ${data.totalMatches}회`}</p>
                    <p className="intro">{`최고의 플레이 수: ${data.potgCount}회`}</p>
                    <p className="intro">{`최고의 플레이 비중: ${data.potgRate.toFixed(1)}%`}</p>
                </div>
            );
        }
        return null;
    };


    return (
        <div className={"ingameStats-chartWrapper"}>
            <div className="userStats-filterBox-wrapper">
                <h2 className={"userStats-title"}>전체 유저의 영웅별 최고의 플레이 비중</h2>
                <div className="itemStats-filterBox">
                    <select className="itemStats-select"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="desc">높은 순</option>
                        <option value="asc">낮은 순</option>
                    </select>
                </div>
            </div>
            <ResponsiveContainer width="100%" height={1120}>
                <BarChart
                    data={pagedData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                >
                    <defs>
                        <linearGradient id="potgGradient" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#9C27B0" stopOpacity={1} />
                            <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    {/* 그래프의 배경 그리드 선입니다. */}
                    <CartesianGrid stroke='rgba(255, 255, 255, 0.1)' />
                    <XAxis type="number" />
                    <YAxis dataKey="heroName" type="category" />
                    <Tooltip
                        formatter={(value) => `${value}%`}
                        contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                        cursor={{ fill: '#1c1b23' }}
                        content={<CustomTooltip />}
                    />
                    <Bar dataKey="potgRate"
                        fill="url(#potgGradient)"
                        label={{ position: 'right', formatter: (value) => `${value}%` }}
                        name="최고의 플레이 비중"
                    />
                </BarChart>
            </ResponsiveContainer>
            {/* 페이징 버튼 */}
            <div className="pagination">
                {(() => {
                    const buttons = [];
                    for (let i = 0; i < totalPages; i++) {
                        buttons.push(
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={currentPage === i + 1 ? "active" : ""} // 현재 페이지일 경우 'active' 클래스를 적용합니다.
                            >
                                {i + 1}
                            </button>
                        );
                    }
                    return buttons;
                })()}
            </div>
        </div>
    );
}