'use client';

import React, { useEffect, useState, Suspense } from 'react';
import './userExpenditure.css';
import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

// API URL 환경변수
const URL = process.env.NEXT_PUBLIC_API_URL;

function UserExpenditureContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    // URL에서 사용자 ID 파라미터 가져오기
    const userId = searchParams.get('id');

    // 상태 관리
    const [mergedList, setMergedList] = useState([]); // 아이템과 번들 데이터를 합친 리스트
    const [search, setSearch] = useState(''); // 검색어
    const [sortOrder, setSortOrder] = useState('latest'); // 정렬 순서 (latest/oldest)

    // 페이지네이션 관련 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const itemsPerPage = 10; // 페이지당 아이템 수

    // 컴포넌트 마운트 시 사용자 지출 데이터 가져오기
    useEffect(() => {
        const token = sessionStorage.getItem('token');

        // 토큰이나 사용자 ID가 없으면 로그인 페이지로 리다이렉트
        if (!userId || !token) {
            window.location.href = "/";
            return;
        }

        // 사용자 지출 데이터를 가져오는 함수
        const getUserExpenditure = async () => {
            try {
                // API 호출하여 사용자 지출 데이터 가져오기
                const { data } = await axios.get(`${URL}/user/spending`, {
                    headers: { Authorization: token },
                    params: { userId }
                });

                // item과 bundle 데이터를 하나의 배열로 합치기
                const merged = [
                    // 아이템 데이터 매핑
                    ...(data.item ?? []).map(item => ({
                        name: item.item_name,
                        price: item.item_price,
                        order_date: item.order_date,
                        type: item.item_cate,
                        subType: item.sell_type || "",
                    })),
                    // 번들 데이터 매핑
                    ...(data.bundle ?? []).map(bundle => ({
                        name: bundle.bundle_name,
                        price: bundle.bundle_price,
                        order_date: bundle.order_date,
                        type: "bundle",
                        subType: "배틀패스",
                    }))
                ];

                // 합쳐진 리스트를 상태에 저장
                setMergedList(merged);

            } catch (err) {
                console.error("유저 지출 상세내역 불러오기 에러 : ", err);
            }
        };

        getUserExpenditure();
    }, [userId]);

    // 1. 검색어와 정렬 조건에 따라 데이터 필터링 및 정렬
    const filteredList = mergedList
        .filter(item =>
            // 검색어가 이름이나 서브타입에 포함되어 있는지 확인
            item.name?.toLowerCase().includes(search.toLowerCase()) ||
            item.subType?.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) =>
            // 정렬 순서에 따라 날짜 정렬 (최신순/오래된순)
            sortOrder === 'latest'
                ? new Date(b.order_date) - new Date(a.order_date)
                : new Date(a.order_date) - new Date(b.order_date)
        );

    // 2. 총 페이지 수 계산
    const totalPages = Math.ceil(filteredList.length / itemsPerPage);

    // 3. 현재 페이지에 해당하는 데이터만 슬라이싱
    const pagedList = filteredList.slice(
        (currentPage - 1) * itemsPerPage, // 시작 인덱스
        currentPage * itemsPerPage        // 끝 인덱스
    );

    // 4. 현재 페이지의 데이터를 날짜별로 그룹화
    const groupedByDate = pagedList.reduce((acc, cur) => {
        const date = cur.order_date;
        if (!acc[date]) acc[date] = []; // 해당 날짜가 없으면 빈 배열 생성
        acc[date].push(cur); // 해당 날짜 그룹에 아이템 추가
        return acc;
    }, {});

    return (
        <div className="user-expenditure-container">
            <Header token={token} memberId={memberId}/>
            <Menu />

            {/* 헤더 영역 */}
            <div className="user-expenditure-header">
                <button className="user-expenditure-backBtn" onClick={() => router.back()}>
                    {'< 리스트로'}
                </button>
                <span className="user-expenditure-title">유저 지출 상세내역</span>
            </div>

            {/* 검색 및 정렬 영역 */}
            <div className="user-expenditure-topRow">
                <div className="user-expenditure-searchGroup">
                    <label htmlFor="search" className="user-expenditure-searchLabel">구매 내역 검색</label>
                    <input
                        id="search"
                        className="user-expenditure-searchInput"
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
                <select
                    className="user-expenditure-sortSelect"
                    value={sortOrder}
                    onChange={e => setSortOrder(e.target.value)}
                >
                    <option value="latest">최신순</option>
                    <option value="oldest">오래된순</option>
                </select>
            </div>

            {/* 지출 내역 리스트 */}
            <div className="user-expenditure-list">
                {Object.keys(groupedByDate).length > 0 ? (
                    // 날짜별로 그룹화된 데이터 렌더링
                    Object.keys(groupedByDate).map((date) => (
                        <div key={date} className="user-expenditure-dateGroup">
                            {/* 날짜 헤더 */}
                            <div className="user-expenditure-date">{date}</div>
                            {/* 해당 날짜의 아이템들 */}
                            {groupedByDate[date].map((item, i) => (
                                <div className="user-expenditure-card" key={i}>
                                    <div className="user-expenditure-cardTitle">{item.name}</div>
                                    <div className="user-expenditure-cardMeta">
                                        <span className="user-expenditure-cardPrice">
                                            ₩{item.price?.toLocaleString()}
                                        </span>
                                        <span className="user-expenditure-cardDivider">·</span>
                                        <span className="user-expenditure-cardType">
                                            아이템 분류: {item.type === "bundle" ? "배틀패스" : item.subType}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    // 데이터가 없을 때 표시
                    <div>지출 내역이 없습니다.</div>
                )}
            </div>

            {/* 페이지네이션 */}
            <div className="user-expenditure-pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                        disabled={currentPage === i + 1}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

// Suspense로 감싸서 로딩 상태 처리
export default function UserExpenditure() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UserExpenditureContent />
        </Suspense>
    );
}

