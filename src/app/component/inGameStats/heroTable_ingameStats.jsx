'use client'
import React, { useState } from 'react';

export default function HeroTable_IngameStats({ inGameStatsData }) {
    const heroSummaryMap = {};

    inGameStatsData.forEach((data) => {
        const heroName = data.heros.heroes_name;
        const itemCount = Object.keys(data.heros.item_list).length;

        if (!heroSummaryMap[heroName]) {
            heroSummaryMap[heroName] = {
                total_play_time: 0,
                potg_count: 0,
                item_count: 0,
            };
        }

        heroSummaryMap[heroName].total_play_time += data.total_play_time || 0;
        heroSummaryMap[heroName].potg_count += data.potg_count || 0;
        heroSummaryMap[heroName].item_count += itemCount;
    });

    const summaryTableData = Object.entries(heroSummaryMap).map(([heroes_name, values]) => ({
        heroes_name,
        ...values,
    }));

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = summaryTableData.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(summaryTableData.length / itemsPerPage);

    return (
        <div className={"ingameStats-chartWrapper-heroTable"}>
            <div className="userStats-filterBox-wrapper">
                <h2 className={"userStats-title"}></h2>
                <div className="itemStats-filterBox">
                    <select className="itemStats-select">
                        <option value="전체">시즌 선택</option>
                    </select>
                    <select className="itemStats-select">
                        <option value="전체">높은 순</option>
                    </select>
                </div>
            </div>
            {/* 테이블 영역 */}
            <div className="hero-summary-table">
                <div className="row header">
                    <div className="cell">영웅명</div>
                    <div className="cell">총 플레이타임</div>
                    <div className="cell">최고의 플레이 횟수</div>
                    <div className="cell">보유 아이템 개수</div>
                </div>

                {currentItems.map((hero, idx) => (
                    <div className="row" key={idx}>
                        <div className="cell">{hero.heroes_name}</div>
                        <div className="cell">{hero.total_play_time}시간</div>
                        <div className="cell">{hero.potg_count}회</div>
                        <div className="cell">{hero.item_count}개</div>
                    </div>
                ))}
            </div>
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
    );
}