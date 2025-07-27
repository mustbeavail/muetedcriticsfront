'use client'
import React, { useState, useEffect } from 'react';
import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import forumStyles from './forum.module.css';
import { IoSearch } from 'react-icons/io5';
import api from '../../utils/api';

import General from './general';
import Competition from './competition';

const URL = process.env.NEXT_PUBLIC_API_URL;

const Forum = () => {
  const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;
  const memberId = typeof window !== "undefined" ? sessionStorage.getItem('member_id') : null;

  // 로그인 체크
  useEffect(() => {
    if (!memberId || !token) {
      alert("로그인 후 이용해주세요.");
      location.href = "/";
    }
  }, []);
  // if (!memberId || !token) return null;

  const [forumPosts, setForumPosts] = useState([]);
  const [totalFilteredPages, setTotalFilteredPages] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentTab, setCurrentTab] = useState('general'); // topic
  const [sortKey, setSortKey] = useState('dateDesc'); // align


  // 포럼 리스트 불러오기
  const getForumList = async () => {
    const { data } = await api.get(`${URL}/forum/list`, {
      params: {
        page: currentPage,
        topic: currentTab === 'general' ? '일반' : '경쟁전',
        align: sortKey
      },
      headers: {
        authorization: token
      }
    });
    console.log(data);
    setForumPosts(data.forumPosts.content);
    setTotalFilteredPages(data.forumPosts.totalPages);
  }

  useEffect(() => {
    const topic = currentTab === 'general' ? '일반' : '경쟁전';
    if (isSearching) {
      forumSearch();
    } else {
      getForumList(currentPage, topic, sortKey);
    }
  }, [currentPage, currentTab, sortKey]);


  // 페이지 변경
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 탭 변경
  const goToPage = (tab) => {
    setCurrentTab(tab);
  };

  // 포럼 게시글 검색
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [isSearching, setIsSearching] = useState(false); // 검색 중인지 여부
  const forumSearch = async () => {
    setIsSearching(true);
    const { data } = await api.get(`${URL}/forum/search`, {
      params: {
        search: search, // 검색어
        searchType: searchType, // title, content, userId
        page: currentPage,
        topic: currentTab === 'general' ? '일반' : '경쟁전',
      },
      headers: {
        authorization: token
      }
    });
    setForumPosts(data.forumPosts.content);
    setTotalFilteredPages(data.forumPosts.totalPages);
    setIsSearching(false);
  }

  return (
    <>
      <Header />
      <Menu />
      <div className={forumStyles.forumContainer}>
        <span className={forumStyles.forumMainTitle}>유저 포럼 분석</span>
        <div className={forumStyles.forumChartWrapper}>
          <div className={forumStyles.forumFilterBoxWrapper}>
            <div className={forumStyles.forumFilterLeft}>
              <select className={forumStyles.forumSelectCategory} onChange={(e) => setSearchType(e.target.value)}>
                <option value="title">제목</option>
                <option value="content">내용</option>
                <option value="userId">글쓴이</option>
              </select>
              <div className={forumStyles.forumSearch}>
                <div className={forumStyles.forumInputWrapper}>
                  <input type="text" placeholder="포럼 검색" onChange={(e) => setSearch(e.target.value)} onKeyUp={(e) => e.key === 'Enter' && forumSearch()} />
                  <button className={forumStyles.forumSearchBtn} onClick={forumSearch} onKeyUp={(e) => e.key === 'Enter' && forumSearch()}><IoSearch /></button>
                </div>
              </div>
            </div>
            <div className={forumStyles.forumFilterRight}>
              <select className={forumStyles.forumSelect} onChange={(e) => setSortKey(e.target.value)}>
                <option value="dateDesc">작성 날짜 최신순</option>
                <option value="dateAsc">작성 날짜 오래된순</option>
                <option value="hitDesc">조회수 높은순</option>
                <option value="hitAsc">조회수 낮은순</option>
                <option value="likesDesc">좋아요 높은순</option>
                <option value="likesAsc">좋아요 낮은순</option>
              </select>
            </div>
          </div>

          {/* 포럼 탭 컴포넌트 */}
          <div className={forumStyles.forumMenu}>
            <div className={`${forumStyles.forumTab} ${currentTab === 'general' ? forumStyles.active : ''}`} onClick={() => goToPage('general')}>일반 토론장</div>
            <div className={`${forumStyles.forumTab} ${currentTab === 'competition' ? forumStyles.active : ''}`} onClick={() => goToPage('competition')}>경쟁전 토론장</div>
          </div>

          {currentTab === 'general' && <General token={token} forumPosts={forumPosts} />}
          {currentTab === 'competition' && <Competition token={token} forumPosts={forumPosts} />}

          {/* 페이지네이션 */}
          <div className={forumStyles.forumPagination}>
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              이전
            </button>

            {Array.from({ length: totalFilteredPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={page === currentPage ? forumStyles.active : ''}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
            <button
              disabled={currentPage === totalFilteredPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              다음
            </button>
          </div>

        </div>



      </div>
    </>
  );
};

export default Forum;