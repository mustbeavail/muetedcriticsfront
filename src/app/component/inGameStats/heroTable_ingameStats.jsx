'use client'
import api from '../../utils/api';
import React, { useEffect, useState, useMemo } from 'react';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function HeroTable_IngameStats() {
    // 영웅 데이터, 정렬, 페이지네이션 상태 관리
    const [heroData, setHeroData] = useState([]);
    const [sortBy, setSortBy] = useState("totalPlayTime"); // 기본 정렬 기준
    const [sortOrder, setSortOrder] = useState("desc"); // 기본 정렬 순서
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const [itemsPerPage] = useState(10); // 페이지당 아이템 수

    // --- PAGINATION ---
    // 현재 페이지에 표시할 데이터를 계산합니다.
    // 'heroData'나 'currentPage'가 변경될 때만 재계산하여 성능을 최적화합니다.
    const pagedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return heroData.slice(start, start + itemsPerPage);
    }, [heroData, currentPage]);

    // 정렬 기준이 변경될 때마다 데이터 다시 불러오기
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) return;
        getHeroTableData(token, sortBy, sortOrder);
    }, [sortBy, sortOrder]);

    // 영웅 통계 데이터 불러오기
    const getHeroTableData = async (token, currentSortBy, currentSortOrder) => {
        try {
            const { data } = await api.get(`${URL}/get/hero-playtime-potg-item-count`, {
                headers: { Authorization: token },
                params: {
                    sortBy: currentSortBy,
                    sortOrder: currentSortOrder
                }
            });
            setHeroData(data.list);
            setTotalPages(Math.ceil(data.list.length / itemsPerPage));
            setCurrentPage(1); // 데이터 새로고침 시 1페이지로 초기화
        } catch (error) {
            console.log("영웅별 통계 불러오기 실패", error);
            setHeroData([]); // 에러 발생 시 데이터 초기화
        }
    };

    // 정렬 기준 변경 핸들러
    const handleSortChange = (e) => {
        const { value } = e.target;
        const [newSortBy, newSortOrder] = value.split('_');
        setSortBy(newSortBy);
        setSortOrder(newSortOrder);
    };


    return (
        <div className={"ingameStats-chartWrapper-heroTable"}>
            {/* 제목 및 정렬 필터 */}
            <div className="userStats-filterBox-wrapper">
                <h2 className={"userStats-title"}>영웅별 총 플레이 타임, POTG 수, 아이템 보유 현황</h2>
                <div className="itemStats-filterBox">
                    <select className="itemStats-select" onChange={handleSortChange} value={`${sortBy}_${sortOrder}`}>
                        <option value="totalPlayTime_desc">플레이 타임 높은 순</option>
                        <option value="totalPlayTime_asc">플레이 타임 낮은 순</option>
                        <option value="potg_desc">최고의 플레이 횟수 높은 순</option>
                        <option value="potg_asc">최고의 플레이 횟수 낮은 순</option>
                        <option value="itemCount_desc">보유 아이템 많은 순</option>
                        <option value="itemCount_asc">보유 아이템 적은 순</option>
                    </select>
                </div>
            </div>
            {/* 영웅 데이터 테이블 */}
            <div className="hero-summary-table">
                <div className="row header">
                    <div className="cell">영웅명</div>
                    <div className="cell">총 플레이 타임(시간)</div>
                    <div className="cell">최고의 플레이(POTG) 횟수</div>
                    <div className="cell">보유 아이템 개수</div>
                </div>

                {/* 테이블 내용 */}
                {pagedData.length > 0 ? (
                    pagedData.map((hero, idx) => (
                        <div className="row" key={idx}>
                            <div className="cell">{hero.heroName}</div>
                            <div className="cell">{(hero.totalPlayTime / 60).toFixed(1)}시간</div>
                            <div className="cell">{hero.totalPotgCount}회</div>
                            <div className="cell">{hero.itemCount}개</div>
                        </div>
                    ))
                ) : (
                    <div className="row">
                        <div className="cell" colSpan="4">데이터가 없습니다.</div>
                    </div>
                )}
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
                                className={currentPage === i + 1 ? "active" : ""}
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