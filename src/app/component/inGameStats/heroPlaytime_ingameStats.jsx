"use client"
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// API URL을 환경 변수에서 가져옵니다.
const URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * HeroPlaytime_IngameStats Component
 * 
 * 전체 유저의 영웅별 플레이타임을 막대 차트로 시각화합니다.
 * 플레이타임이 높은 순 또는 낮은 순으로 정렬할 수 있으며,
 * 페이지네이션을 통해 10명의 영웅 데이터를 나누어 보여줍니다.
 */
export default function HeroPlaytime_IngameStats() {

    // --- STATE MANAGEMENT ---
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [totalPages, setTotalPages] = useState(1);   // 전체 페이지 수
    const [heroPlaytimeData, setHeroPlaytimeData] = useState([]); // API로부터 받은 영웅별 플레이타임 데이터
    const [sortOrder, setSortOrder] = useState('desc'); // 정렬 순서 ('desc': 내림차순, 'asc': 오름차순)

    const itemsPerPage = 10; // 페이지 당 보여줄 아이템(영웅) 수

    // --- DATA FETCHING ---
    // 컴포넌트가 마운트되거나 'sortOrder' 상태가 변경될 때 데이터를 가져옵니다.
    useEffect(() => {
        const token = sessionStorage.getItem('token'); // 세션 스토리지에서 인증 토큰을 가져옵니다.
        if (!token) return; // 토큰이 없으면 함수 실행을 중단합니다.
        getHeroPlaytimeData(token);
    }, [sortOrder]); // 'sortOrder'가 변경될 때마다 이 effect가 다시 실행됩니다.

    /**
     * API를 통해 전체 유저의 영웅별 플레이타임 데이터를 가져오는 함수입니다.
     * @param {string} token - 인증 토큰
     */
    const getHeroPlaytimeData = async (token) => {
        try {
            const { data } = await axios.get(`${URL}/get/hero-playtime`, {
                headers: { Authorization: token },
                params: {
                    sortOrder: sortOrder // 정렬 순서를 쿼리 파라미터로 전달합니다.
                }
            });
            console.log(data);
            setHeroPlaytimeData(data.list); // 받아온 데이터를 상태에 저장합니다.
            setTotalPages(Math.ceil(data.list.length / itemsPerPage)); // 전체 페이지 수를 계산하고 상태를 업데이트합니다.
        } catch (error) {
            console.log('영웅별 플레이타임 조회 실패: ', error);
        }
    }

    // --- PAGINATION ---
    // 현재 페이지에 표시할 데이터를 계산합니다.
    // 'heroPlaytimeData'나 'currentPage'가 변경될 때만 재계산하여 성능을 최적화합니다.
    const pagedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return heroPlaytimeData.slice(start, start + itemsPerPage);
    }, [heroPlaytimeData, currentPage]);


    // --- RENDER ---
    return (
        <div className={"ingameStats-chartWrapper"}>
            {/* 필터 및 제목 영역 */}
            <div className="userStats-filterBox-wrapper">
                <h2 className={"userStats-title"}>전체 유저의 영웅별 플레이타임</h2>
                <div className="itemStats-filterBox">
                    {/* 정렬 순서 변경 드롭다운 */}
                    <select className="itemStats-select"
                        value={sortOrder}
                        onChange={(e) => {
                            setSortOrder(e.target.value);
                            setCurrentPage(1); // 정렬 순서를 변경하면 1페이지로 리셋합니다.
                        }}>
                        <option value="desc">높은 순</option>
                        <option value="asc">낮은 순</option>
                    </select>
                </div>
            </div>

            {/* 차트 영역 */}
            <div>
                <ResponsiveContainer width="100%" height={1120}>
                    <BarChart
                        data={pagedData} // 현재 페이지에 해당하는 데이터를 사용합니다.
                        layout="vertical" // 세로 막대 차트로 설정합니다.
                        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                    >
                        {/* 차트 바의 그라데이션을 정의합니다. */}
                        <defs>
                            <linearGradient id="heroPlaytimeGradient" x1="1" y1="0" x2="0" y2="0">
                                <stop offset="0%" stopColor="#9C27B0" stopOpacity={1} />
                                <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        {/* 그래프의 배경 그리드 선입니다. */}
                        <CartesianGrid stroke='rgba(255, 255, 255, 0.1)' />
                        {/* X축 (플레이타임) */}
                        <XAxis type="number" />
                        {/* Y축 (영웅 이름) */}
                        <YAxis dataKey="heroName" type="category" />
                        {/* 마우스를 올렸을 때 표시되는 툴팁입니다. */}
                        <Tooltip
                            formatter={(value) => `${value} 분`} // 툴팁 값의 형식을 지정합니다.
                            contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                            cursor={{ fill: '#1c1b23' }}
                        />
                        {/* 실제 데이터를 나타내는 막대입니다. */}
                        <Bar
                            dataKey="totalPlayTime" // 데이터 키를 지정합니다.
                            fill="url(#heroPlaytimeGradient)" // 위에서 정의한 그라데이션으로 채웁니다.
                            label={{ position: 'right', formatter: (value) => `${value} 분` }} // 막대 오른쪽에 값을 표시합니다.
                            name="플레이 시간"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            {/* 페이지네이션 버튼 */}
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