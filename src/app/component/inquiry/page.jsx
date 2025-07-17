'use client';
import React, { useEffect } from 'react';
import '../mail/mail.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import { IoSearch } from "react-icons/io5";
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

const Inquiry = () => {

  useEffect(() => {
    const memberId = sessionStorage.getItem('member_id');
    const token = sessionStorage.getItem('token');
    getInquiryList(memberId, token);
  }, []);

  const getInquiryList = async (memberId, token) => {
    const { data } = await axios.get(`${URL}/inquiry/list`, {
      params: {
        userId: memberId,
        category: '',
        status: '',
        isVip: '',
        sortBy: '',
        sortOrder: '',
        page: 1,
        size: 10
      },
      headers: {
        authorization: token
      }
    });
    console.log(data);
  }

  return (
    <>
      <Header />
      <Menu />
      <div className="stats_container">
        <span className={"itemStats-mainTitle"}>유저 문의 내역</span>
        <div className={"itemStats-chartWrapper"}>
          <h2 className={"itemStats-title"}>유저 문의 리스트</h2>
          <div className={"itemStats-filterBox-wrapper"}>
            <div className={"itemStats-search"}>
              <span>문의 검색</span>
              <div className={"itemStats-input-wrapper"}>
                <input type="text" placeholder="Search" />
                <button className={"itemStats-search-btn"}><IoSearch /></button>
              </div>
            </div>
            <div>
              <select className={"itemStats-select"}>
                <option>전체</option>
                <option>일반 유저 문의</option>
                <option>VIP 유저 문의</option>
              </select>
            </div>
          </div>
          {/* 테이블 영역 */}
          <div className="hero-summary-table">
            <div className="row header">
              <div className="cell">카테고리</div>
              <div className="cell">제목</div>
              <div className="cell">문의한 유저 ID</div>
              <div className="cell">등록일</div>
              <div className="cell">처리 여부</div>
            </div>
            <div className="row">
              <div className="cell">1</div>
              <div className="cell">2</div>
              <div className="cell">3</div>
              <div className="cell">4</div>
              <div className="cell">5</div>
            </div>
          </div>
          {/* <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? "active" : ""}
              >
                {i + 1}
              </button>
            ))}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Inquiry;