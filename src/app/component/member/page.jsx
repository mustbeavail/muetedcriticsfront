'use client';
import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import axios from 'axios';
import React, { useEffect } from 'react';

const URL = process.env.NEXT_PUBLIC_API_URL;

const Member = () => {
  const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;

  useEffect(() => {
    getMemberList();
  }, []);

  const getMemberList = async () => {
    const { data } = await axios.get(`${URL}/member/list`, {
      headers: {
        authorization: token
      }
    });
    console.log(data);
  }
  
  return (
    <div className="user-list-container">
      <Header/>
      <Menu/>
      <h2 className="title">회원 리스트</h2>

      <div className="user-list-topRow">
        <input
          type="text"
          placeholder="Search"
          className="user-list-searchInput"
        />
        <select className="user-list-sortSelect">
          <option value="">정렬 기준 선택</option>
          <option value="name">이름</option>
          <option value="level">레벨</option>
          <option value="joinDate">가입일</option>
          <option value="playTime">플레이 타임</option>
          <option value="amountSpent">총 과금액</option>
        </select>
        <select className="user-list-sortSelect">
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>

        <div className="user-list-tagFilterButtons">
          {['전체', '일반', '신규', '복귀', '휴면', '정지', '이탈위험군'].map((tag) => (
            <button
              key={tag}
              className={`user-list-tagFilterBtn${tag !== '전체' ? ' ' + tag : ''}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Member;