"use client"
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function HeroWinningRate_IngameStats() {
    const [heroWinningRateData, setHeroWinningRateData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수

    // 필터 상태들
    const [startDate, setStartDate] = useState(''); // 기간 시작일
    const [endDate, setEndDate] = useState(''); // 기간 종료일
    const [tierName, setTierName] = useState(''); // 티어 선택
    const [sortOrder, setSortOrder] = useState('desc'); // 정렬 기준

    const itemsPerPage = 10; // 페이지당 아이템 수
    const today = dayjs().format('YYYY-MM-DD');

    // 영웅별 승률 데이터 불러오기
    const getHeroWinningRateData = async (token, startDate, endDate, tierName, sortOrder) => {
        try {
            const { data } = await axios.get(`${URL}/get/hero-winrate`, {
                headers: { Authorization: token },
                params: {
                    startDate: startDate || '',
                    endDate: endDate || '',
                    tierName: tierName || '',
                    sortOrder: sortOrder || ''
                }
            });
            if (data != null && data != undefined) {
                console.log(data);
                setHeroWinningRateData(data.list);
                setTotalPages(Math.ceil(data.list.length / itemsPerPage));
            }
        } catch (error) {
            console.log("영웅별 승률 데이터 불러오기 실패", error);
            setHeroWinningRateData([]);
            setTotalPages(1);
        }
    };

    // 조회 버튼 클릭시 불러오기
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
        getHeroWinningRateData(token, startDate, endDate, tierName, sortOrder);
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (startDate && endDate) {
            getHeroWinningRateData(token, startDate, endDate, tierName, sortOrder);
        }
    }, [tierName, sortOrder]);


    // 현재 페이지에 표시할 데이터를 계산합니다.
    // 'heroWinningRateData'나 'currentPage'가 변경될 때만 재계산하여 성능을 최적화합니다.
    const pagedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return heroWinningRateData.slice(start, start + itemsPerPage);
    }, [heroWinningRateData, currentPage]);

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
                    <p className="intro">{`승리 수: ${data.winCount}회`}</p>
                    <p className="intro">{`패배 수: ${data.loseCount}회`}</p>
                    <p className="intro">{`승률: ${data.winRate}%`}</p>
                </div>
            );
        }
        return null;
    };



    return (
        <div className={"ingameStats-chartWrapper-heroWinningRate"}>
            <div className="userStats-filterBox-wrapper">
                <h2 className={"userStats-title"}>전체 유저의 영웅별 승률</h2>
                <div className="itemStats-filterBox">
                    <select className="itemStats-select"
                        value={sortOrder}
                        onChange={(e) => {
                            setSortOrder(e.target.value);
                            handleSearch();
                            setCurrentPage(1);
                        }}
                    >
                        <option value="desc">높은 순</option>
                        <option value="asc">낮은 순</option>
                    </select>
                </div>
            </div>
            <div className={"accessorStats-filterBox"}>
                기간 시작일 <input type="date"
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                기간 종료일 <input type="date"
                    value={endDate}
                    max={today}
                    onChange={(e) => {
                        setEndDate(e.target.value);
                        setCurrentPage(1);
                    }}
                />
                &nbsp;&nbsp;티어 선택 <select className="itemStats-select"
                    value={tierName}
                    onChange={(e) => {
                        setTierName(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <optgroup label="티어 선택">
                        <option value="">전체</option>
                        <option value="브론즈">브론즈</option>
                        <option value="실버">실버</option>
                        <option value="골드">골드</option>
                        <option value="플래티넘">플래티넘</option>
                        <option value="다이아몬드">다이아몬드</option>
                        <option value="마스터">마스터</option>
                        <option value="그랜드마스터">그랜드마스터</option>
                        <option value="챌린저">챌린저</option>
                    </optgroup>
                </select>
                <button onClick={handleSearch}>조회</button>
            </div>
            전체 유저 중 <span style={{ fontWeight: 'bold' }}>{tierName || '전체'}</span> 유저의 영웅별 승률
            <ResponsiveContainer width="100%" height={1120}>
                <BarChart
                    data={pagedData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
                >
                    <defs>
                        <linearGradient id="winRateGradient" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#9C27B0" stopOpacity={1} />
                            <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    {/* 그래프의 배경 그리드 선입니다. */}
                    <CartesianGrid stroke='rgba(255, 255, 255, 0.1)' />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <YAxis dataKey="heroName" type="category" />
                    <Tooltip
                        formatter={(value) => `${value}%`}
                        contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                        cursor={{ fill: '#1c1b23' }}
                        content={<CustomTooltip />}
                    />
                    <Bar dataKey="winRate"
                        fill="url(#winRateGradient)"
                        label={{ position: 'right', formatter: (value) => `${value}%` }}
                        name="승률" />
                </BarChart>
            </ResponsiveContainer>
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