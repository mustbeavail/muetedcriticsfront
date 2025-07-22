'use client';
import React, { useEffect, useState } from 'react';
import './inquiry.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import { IoSearch } from "react-icons/io5";
import axios from 'axios';
import Link from 'next/link';

const URL = process.env.NEXT_PUBLIC_API_URL;

const Inquiry = () => {
  const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;

  const [inquiryList, setInquiryList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalFilteredPages, setTotalFilteredPages] = useState(1);
  const currentInquiryList = inquiryList;

  const goToPage = (page) => {
    if (page < 1 || page > totalFilteredPages) return;
    setCurrentPage(page);
  };

  const [categoryFilter, setCategoryFilter] = useState('');
  const [vipFilter, setVipFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getInquiryList();
  }, [currentPage, categoryFilter, vipFilter, statusFilter, sortOrder]);

  const getInquiryList = async () => {
    const { data } = await axios.get(`${URL}/inquiry/list`, {
      params: {
        inquiryIdx: '',
        userId: searchText,
        category: categoryFilter,
        status: statusFilter,
        isVip: vipFilter,
        sortBy: 'createdAt',
        sortOrder: sortOrder,
        page: currentPage,
        size: 15
      },
      headers: {
        authorization: token
      }
    });
    setInquiryList(data.content);
    setTotalFilteredPages(Math.ceil(data.totalElements / 15));
    // console.log(data.content);
  }

  // 날짜를 한국 형식으로 포맷팅하는 함수
  const formatDate = (dateString) => {
    if (!dateString) return '-'; // 날짜 문자열이 없으면 '-' 반환

    const date = new Date(dateString); // 날짜 객체 생성
    // 날짜 부분을 한국어 형식으로 변환하고 공백 제거
    const datePart = date.toLocaleDateString('ko-KR').replace(/ /g, '');
    // 시간 부분을 24시간 형식으로 변환
    const timePart = date.toLocaleTimeString('ko-KR', {
      hour: '2-digit', // 시간: 두 자리 숫자
      minute: '2-digit', // 분: 두 자리 숫자
      hour12: false // 24시간 형식 사용
    });

    return `${datePart} ${timePart}`; // 날짜와 시간 조합하여 반환
  };

  return (
    <>
      <Header token={token}/>
      <Menu />
      <div className="inquiry-list-container">
        <span className={"inquiry-list-mainTitle"}>유저 문의 내역</span>
        <div className={"inquiry-list-chartWrapper"}>
          <h2 className={"inquiry-list-subTitle"}>유저 문의 리스트</h2>

          <div className={"inquiry-list-filterBox-wrapper"}>
            <div className={"inquiry-list-search"}>
              <span>문의 검색</span>
              <div className={"inquiry-list-input-wrapper"}>
                <input type="text"
                  placeholder="유저 ID를 입력해주세요."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getInquiryList();
                  }} />
                <button className={"inquiry-list-search-btn"}><IoSearch /></button>
              </div>
            </div>
            <div>
              <select className={"inquiry-list-select"} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="">카테고리 선택</option>
                <option value="인게임관련">인게임관련</option>
                <option value="결제관련">결제관련</option>
              </select>
              <select className={"inquiry-list-select"} value={vipFilter} onChange={(e) => setVipFilter(e.target.value)}>
                <option value="false">일반 유저 문의</option>
                <option value="true">VIP 유저 문의</option>
              </select>
              <select className={"inquiry-list-select"} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">전체</option>
                <option value="완료">완료</option>
                <option value="미처리">미처리</option>
              </select>
              <select className={"inquiry-list-select"} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="desc">최신순</option>
                <option value="asc">오래된순</option>
              </select>
            </div>
          </div>
          {/* 테이블 영역 */}
          <div className="inquiry-list-table">
            <div className="row header">
              <div className="cell">카테고리</div>
              <div className="cell">제목</div>
              <div className="cell">문의한 유저 ID</div>
              <div className="cell">등록일</div>
              <div className="cell">처리 여부</div>
            </div>
            {currentInquiryList.map((inquiry, index) => (
              <div className={`row ${inquiry.status === "완료" ? "status-complete" : ''}`} key={index}>
                <div className="cell">{inquiry.category}</div>
                <div className="cell">
                  <Link className='inquiry-detail-link' href={`/component/inquiry/${inquiry.inquiryIdx}`}>
                    {inquiry.title}
                  </Link>
                </div>
                <div className="cell">{inquiry.userId}</div>
                <div className="cell">{formatDate(inquiry.createdAt)}</div>
                <div className="cell">
                  {inquiry.status}
                </div>
              </div>
            ))}
          </div>
          <div className="inquiry-list-pagination">
            <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>이전</button>

            {Array.from({ length: totalFilteredPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={currentPage === page ? 'active' : ''}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            <button disabled={currentPage === totalFilteredPages} onClick={() => goToPage(currentPage + 1)}>다음</button>
          </div>


        </div>

      </div>
    </>
  );
};

export default Inquiry;