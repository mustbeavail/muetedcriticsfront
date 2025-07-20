"use client"
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// API URL 환경변수에서 가져오기
const URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 영웅별 보유 아이템 개수를 시각화하는 컴포넌트
 */
export default function HeroItem_IngameStats() {
    // 상태 변수들 선언
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const [sortOrder, setSortOrder] = useState('desc'); // 정렬 순서 (desc: 내림차순, asc: 오름차순)
    const [heroItemData, setHeroItemData] = useState([]); // 영웅별 아이템 데이터

    const itemsPerPage = 10; // 페이지 당 보여줄 아이템 수

    // 컴포넌트 마운트 또는 정렬 순서 변경 시 데이터 로드
    useEffect(() => {
        const token = sessionStorage.getItem('token'); // 세션에서 토큰 가져오기
        if (!token) return; // 토큰 없으면 중단
        getHeroItemData(token); // 데이터 가져오는 함수 호출
    }, [sortOrder]); // sortOrder가 변경될 때마다 실행

    /**
     * API를 통해 영웅별 보유 아이템 수를 가져오는 함수
     * @param {string} token - 인증 토큰
     */
    const getHeroItemData = async (token) => {
        try {
            const { data } = await axios.get(`${URL}/get/hero-item-count`, {
                headers: { Authorization: token }, // 요청 헤더에 토큰 추가
                params: {
                    sortOrder: sortOrder // 정렬 순서 파라미터로 전달
                }
            });
            setHeroItemData(data.list); // 받아온 데이터로 상태 업데이트
            setTotalPages(Math.ceil(data.list.length / itemsPerPage)); // 전체 페이지 수 계산 및 업데이트
        } catch (error) {
            console.log('영웅별 보유 아이템 수 조회 실패: ', error);
        }
    }

    // --- PAGINATION ---
    // 현재 페이지에 표시할 데이터를 계산합니다.
    // 'heroItemData'나 'currentPage'가 변경될 때만 재계산하여 성능을 최적화합니다.
    const pagedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage; // 현재 페이지의 시작 인덱스
        return heroItemData.slice(start, start + itemsPerPage); // heroItemData에서 현재 페이지에 해당하는 부분만 잘라내기
    }, [heroItemData, currentPage]); // heroItemData나 currentPage가 변경될 때만 재계산

    return (
        <div className={"ingameStats-chartWrapper"}>
            <div className="userStats-filterBox-wrapper">
                <h2 className={"userStats-title"}>영웅별 보유 아이템 개수</h2>
                <div className="itemStats-filterBox">
                    {/* 정렬 순서 변경을 위한 드롭다운 메뉴 */}
                    <select className="itemStats-select"
                        value={sortOrder}
                        onChange={(e) => {
                            setSortOrder(e.target.value); // 정렬 순서 상태 업데이트
                            setCurrentPage(1); // 페이지를 1로 초기화
                        }}>
                        <option value="desc">높은 순</option>
                        <option value="asc">낮은 순</option>
                    </select>
                </div>
            </div>
            {/* 차트를 감싸는 컨테이너 */}
            <ResponsiveContainer width="100%" height={1000}>
                <BarChart
                    data={pagedData} // 차트에 표시할 데이터
                    layout="vertical" // 세로 막대 차트
                    margin={{ top: 20, right: 30, left: 120, bottom: 20 }} // 차트 여백
                >
                    <defs>
                        {/* 막대 그래프의 그라데이션 정의 */}
                        <linearGradient id="itemCountGradient" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#9C27B0" stopOpacity={1} />
                            <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    {/* 차트 그리드 선 (투명도 조절) */}
                    <CartesianGrid stroke='rgba(255, 255, 255, 0.1)' />
                    {/* X축 설정 (숫자 타입) */}
                    <XAxis type="number" />
                    {/* Y축 설정 (카테고리 타입, heroName을 키로 사용) */}
                    <YAxis dataKey="heroName" type="category" />
                    {/* 마우스 호버 시 나타나는 툴팁 설정 */}
                    <Tooltip
                        formatter={(value) => `${value} 개`} // 툴팁 내용 포맷
                        contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }} // 툴팁 스타일
                        cursor={{ fill: '#1c1b23' }} // 커서 스타일
                    />
                    {/* 막대 그래프 설정 */}
                    <Bar
                        dataKey="itemCount" // 데이터 키
                        fill="url(#itemCountGradient)" // 위에서 정의한 그라데이션으로 채우기
                        label={{ position: 'right', formatter: (value) => `${value} 개` }} // 막대 옆에 라벨 표시
                        name="아이템 개수"
                    />
                </BarChart>
            </ResponsiveContainer>
            {/* 페이지네이션 버튼들을 렌더링하는 부분 */}
            <div className="pagination">
                {(() => {
                    const buttons = [];
                    for (let i = 0; i < totalPages; i++) {
                        buttons.push(
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)} // 클릭 시 해당 페이지로 이동
                                className={currentPage === i + 1 ? "active" : ""}> {/* 현재 페이지에 active 클래스 적용 */}
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