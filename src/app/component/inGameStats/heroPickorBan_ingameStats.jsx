"use client"
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// API URL 환경변수에서 가져오기
const URL = process.env.NEXT_PUBLIC_API_URL;

export default function HeroPickorBan_IngameStats() {

    const [heroPickOrBanData, setHeroPickOrBanData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

    const itemsPerPage = 10; // 페이지 당 보여줄 아이템 수

    // 1. 초기 상태를 빈 값으로 설정
    const [startDate, setStartDate] = useState(''); // 기간 시작일
    const [endDate, setEndDate] = useState(''); // 기간 종료일
    const [sortOrder, setSortOrder] = useState('desc'); // 정렬 기준

    const today = dayjs().format('YYYY-MM-DD');

    // 2. 영웅별 밴률 및 픽률 데이터 불러오기
    const getHeroPickOrBanData = async (token, startDate, endDate, sortOrder) => {
        try {
            const { data } = await axios.get(`${URL}/get/hero-banpick-rate`, {
                headers: { Authorization: token },
                params: {
                    startDate: startDate,
                    endDate: endDate,
                    sortOrder: sortOrder
                }
            });
            console.log(data);
            setHeroPickOrBanData(data.list);
            setTotalPages(Math.ceil(data.list.length / itemsPerPage));
        } catch (error) {
            console.log('영웅별 밴률 및 픽률 데이터 조회 실패: ', error);
        }
    };

    // 3. '조회' 버튼 클릭 핸들러
    const handleSearch = () => {
        if (!startDate || !endDate) {
            alert('기간을 설정해 주세요.');
            return;
        }
        if (new Date(startDate) > new Date(endDate)) {
            alert('시작일은 종료일보다 이전 날짜여야 합니다.');
            return;
        }
        const token = sessionStorage.getItem('token');
        getHeroPickOrBanData(token, startDate, endDate, sortOrder);
    };

    // 4. 'sortOrder'가 바뀔 때만 실행되는 useEffect (API 중복 호출 방지)
    // 단, 날짜가 이미 설정되어 있을 때만 데이터를 다시 불러옴
    useEffect(() => {
        if (startDate && endDate) {
            handleSearch();
        }
    }, [sortOrder]);


    // --- PAGINATION ---
    // 현재 페이지에 표시할 데이터를 계산합니다.
    // 'heroPickOrBanData'나 'currentPage'가 변경될 때만 재계산하여 성능을 최적화합니다.
    const pagedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage; // 현재 페이지의 시작 인덱스
        return heroPickOrBanData.slice(start, start + itemsPerPage); // heroPickOrBanData 에서 현재 페이지에 해당하는 부분만 잘라내기
    }, [heroPickOrBanData, currentPage]); // heroPickOrBanData 에서 currentPage 가 변경될 때만 재계산


    // --- 컴포넌트 렌더링 ---
    return (
        <div className={"ingameStats-chartWrapper-heroPickorBan"}>
            <h2 className={"userStats-title"}>영웅별 밴률 및 픽률</h2>
            <div className={"accessorStats-filterBox"}>
                기간 시작일 <input type="date" onChange={(e) => setStartDate(e.target.value)} />
                기간 종료일 <input type="date" max={today} onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={handleSearch}>조회</button>
                <select className='itemStats-select' onChange={(e) => {
                    setSortOrder(e.target.value);
                    handleSearch();
                    setCurrentPage(1);
                }} value={sortOrder}>
                    <option value="desc">높은 순</option>
                    <option value="asc">낮은 순</option>
                </select>
            </div>
            <ResponsiveContainer width="100%" height={1120}>
                <BarChart
                    data={pagedData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                    barCategoryGap="20%"
                    barGap={5}
                    barSize={40}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="heroName" type="category" />
                    <Tooltip
                        formatter={(value) => `${value} 건`}
                        contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                        cursor={{ fill: '#1c1b23' }}
                    />
                    <Legend />
                    <Bar dataKey="banCount" fill="#f28b82" name="밴 횟수" />
                    <Bar dataKey="pickCount" fill="#81c995" name="픽 횟수" />
                    <Bar dataKey="totalGames" fill="#75b4f3" name="총 플레이 횟수" />
                    <Bar dataKey="banRate" fill="#75b4f3" name="밴률" />
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