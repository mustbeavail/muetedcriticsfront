'use client'
import React, { useState, useEffect } from 'react';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import { IoSearch } from 'react-icons/io5';
import './report.css';
import axios from 'axios';
import Link from 'next/link';

const URL = process.env.NEXT_PUBLIC_API_URL;

const Report = () => {
  const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;
  const memberId = typeof window !== "undefined" ? sessionStorage.getItem('member_id') : null;

  // 로그인 체크
  useEffect(() => {
    if (!memberId || !token) {
      alert("로그인 후 이용해주세요.");
      location.href = "/";
    }
  }, []);
  if (!memberId || !token) return null;

  const [reportList, setReportList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalFilteredPages, setTotalFilteredPages] = useState(1);
  const currentReportList = reportList;

  const goToPage = (page) => {
    if (page < 1 || page > totalFilteredPages) return;
    setCurrentPage(page);
  };

  const [statusFilter, setStatusFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getReportList();
  }, [currentPage, statusFilter, sortOrder]);

  const getReportList = async () => {
    const { data } = await axios.get(`${URL}/report/list`, {
      params: {
        inquiryIdx: '',
        userId: searchText,
        sortBy: 'createdAt',
        sortOrder: sortOrder,
        status: statusFilter,
        page: currentPage,
        size: 15
      },
      headers: {
        authorization: token
      }
    });
    setReportList(data.content);
    setTotalFilteredPages(Math.ceil(data.totalElements / 15));
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
      <Header />
      <Menu />
      <div className="report-container">
        <span className={"report-mainTitle"}>유저 신고 내역</span>
        <div className={"report-chartWrapper"}>
          <h2 className={"report-title"}>유저 신고 리스트</h2>
          <div className={"report-filterBox-wrapper"}>
            <div className={"report-search"}>
              <span>신고 검색</span>
              <div className={"report-input-wrapper"}>
                <input type="text"
                  placeholder="유저 ID를 입력해주세요."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') getReportList();
                  }} />
                <button className={"report-search-btn"}><IoSearch /></button>
              </div>
            </div>
            <div>
              <select className={"report-select"} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">전체</option>
                <option value="완료">완료</option>
                <option value="미처리">미처리</option>
              </select>
              <select className={"report-select"} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="desc">최신순</option>
                <option value="asc">오래된순</option>
              </select>
            </div>
          </div>
          {/* 테이블 영역 */}
          <div className="report-table">
            <div className="row header">
              <div className="cell">날짜</div>
              <div className="cell">내용</div>
              <div className="cell">신고자 ID</div>
              <div className="cell">피신고자 ID</div>
              <div className="cell">처리 여부</div>
            </div>
            {currentReportList.map((report, index) => (
              <div className={`row ${report.status === "완료" ? "status-complete" : ''}`} key={index}>
                <div className="cell">{formatDate(report.createdAt)}</div>
                <div className="cell">
                  <Link className='report-detail-link' href={`/component/report/${report.inquiryIdx}`}>
                    {report.content}
                  </Link>
                </div>
                <div className="cell">{report.userId}</div>
                <div className="cell">{report.reportedUserId}</div>
                <div className="cell">{report.status}</div>
              </div>
            ))}
          </div>
          <div className="report-pagination">
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

export default Report;