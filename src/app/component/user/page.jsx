'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaClock, FaGlobe } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import "./user.css";
import Link from 'next/link';
import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

const USER_TYPES = ['전체', '일반', '신규', '복귀', '휴면', '정지', '이탈 위험군', 'VIP'];

export default function User() {
  const router = useRouter();

  // 리스트 state
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // 검색/정렬 state
  const [searchType, setSearchType] = useState('userNick');
  const [keyword, setKeyword] = useState('');
  const [region, setRegion] = useState('');
  const [userType, setUserType] = useState('전체');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  // 기타 state
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // 메모 state
  const [memoList, setMemoList] = useState([]);
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [memoLoading, setMemoLoading] = useState(false);

  const itemsPerPage = 10;

  // 로그인 체크 (최초 1회만)
  // useEffect(() => {
  //   const id = sessionStorage.getItem('id');
  //   const token = sessionStorage.getItem('token');
  //   if (!id || !token) {
  //     alert('로그인 후 접근 가능합니다.');
  //     window.location.href = "/";
  //   }
  // }, []);

  // 유저 리스트는 state 변경될 때마다 불러옴
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      getUserList(token);
    }
    // eslint-disable-next-line
  }, [currentPage, searchType, keyword, region, userType, sortKey, sortOrder]);

  const getUserList = async (token) => {
    try {
      const params = {
        page: currentPage,
        size: itemsPerPage,
        sortBy: sortKey || undefined,
        sortOrder,
      };
      // 검색어 있을 때만
      if (keyword && searchType) {
        params.searchType = searchType;
        params.keyword = keyword;
      }
      // 지역 드롭다운 값 있을 때만
      if (region) params.region = region;
      // 유저타입 있을 때만 (전체 제외)
      if (userType && userType !== '전체') params.userType = userType;

      const { data } = await axios.get(`${URL}/user/list`, {
        headers: { Authorization: token },
        params,
      });
      setUsers(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.log("유저 리스트 불러오기 실패 : ", error);
    }
  };



  // 메모 모달 열기
  const openMemoModal = async (user) => {
    setSelectedUser(user);
    setShowMemoModal(true);
    setMemoLoading(true);
    try {
      const { data } = await axios.get(`${URL}/user/${user.userId}/list`, {
        headers: { Authorization: sessionStorage.getItem('token') }
      });
      setMemoList(data);
    } catch (e) {
      setMemoList([]);
    } finally {
      setMemoLoading(false);
    }
  };

  // 모달 닫기
  const closeMemoModal = () => {
    setShowMemoModal(false);
    setMemoList([]);
  };

  // 검색 타입 변경
  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setKeyword('');
    setCurrentPage(1);
  };

  // 검색 입력
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  // 엔터로 검색
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(1);
    }
  };

  // 검색 버튼 클릭
  const handleSearchBtn = () => {
    setCurrentPage(1);
  };

  // 지역 선택
  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setCurrentPage(1);
  };

  // 유저 타입(분류) 클릭
  const handleUserTypeClick = (type) => {
    setUserType(type);
    setCurrentPage(1);
  };

  // 정렬 기준/순서
  const handleSortKeyChange = (e) => {
    setSortKey(e.target.value);
    setCurrentPage(1);
  };
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  // 페이지네이션
  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    setOpenMenuId(null);
    setSelectedUser(null);
  };

  // 드롭다운 토글
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // 유저 상세보기 열기
  const openUserDetail = (user) => {
    setSelectedUser(user);
    setOpenMenuId(null);
  };

  // 상세 모달 닫기
  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="user-list-container">
      <Header />
      <Menu />
      <h2 className="title">유저 리스트</h2>

      {/* 상단 검색/정렬/필터 영역 */}
      <div className="user-list-topRow">
        <div className="user-list-searchGroup">
          {/* 검색 타입 드롭다운 */}
          <select className="user-list-sortSelect" value={searchType} onChange={handleSearchTypeChange}>
            <option value="userNick">닉네임</option>
            <option value="userId">아이디</option>
          </select>
          {/* 검색 입력창 */}
          <input
            type="text"
            placeholder={searchType === 'userId' ? '아이디로 검색' : '닉네임으로 검색'}
            className="user-list-searchInput"
            value={keyword}
            onChange={handleKeywordChange}
            onKeyDown={handleSearchKeyDown}
          />
          <button className="user-list-searchBtn" onClick={handleSearchBtn}></button>
        </div>
        {/* 지역 드롭다운 */}
        <select className="user-list-sortSelect" value={region} onChange={handleRegionChange}>
          <optgroup label='지역'>
            <option value="">전체</option>
            <option value="아시아">아시아</option>
            <option value="북미">북미</option>
            <option value="유럽">유럽</option>
            <option value="아프리카">아프리카</option>
            <option value="오세아니아">오세아니아</option>
          </optgroup>
        </select>

        {/* 유저 타입(분류) 태그 필터 */}
        <div className="user-list-tagFilterButtons">
          {USER_TYPES.map((type) => (
            <button
              key={type}
              className={`user-list-tagFilterBtn${userType === type ? ' active' : ''}${type !== '전체' ? ' ' + type : ''}`}
              onClick={() => handleUserTypeClick(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* 정렬 */}
        <select className="user-list-sortSelect" value={sortKey} onChange={handleSortKeyChange}>
          <option value="">정렬 기준 선택</option>
          <option value="totalSpent">총 과금액</option>
          <option value="totalPlayTime">플레이 타임</option>
        </select>
        <select className="user-list-sortSelect" value={sortOrder} onChange={handleSortOrderChange}>
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
      </div>

      {/* 유저 카드 리스트 */}
      <div className="user-list-list">
        {users.length > 0 ? (
          users.map((user, idx) => (
            <div className="user-list-card" key={user.userId || idx}>
              <div className="user-list-info">
                <div className="user-list-nameTagWrapper">
                  <div className="user-list-tags">
                    <span className={`user-list-tag user-list-tag_${user.userType}`}>
                      {user.userType}{user.vipYn ? ' (VIP)' : ''}
                    </span>
                  </div>
                  <div className="user-list-name">{user.userNick}</div>
                </div>
                <div className="user-list-email">{user.userId}</div>
                <div className="user-list-meta">
                  <span><FaClock /> {user.totalPlayTime}분</span>
                  <span><FaGlobe /> {user.region}</span>
                </div>
                <div className="user-list-meta">
                  <span>₩ {user.totalSpent?.toLocaleString() || 0}</span>
                </div>
              </div>
              <div className="user-list-menu">
                <button className="user-list-moreBtn" onClick={() => toggleMenu(user.userId || idx)}>
                  <FiMoreVertical />
                </button>
                {openMenuId === (user.userId || idx) && (
                  <div className="user-list-dropdown">
                    <button onClick={() => openUserDetail(user)}>유저 상세보기</button>
                    <Link key={user.userId} href={`/component/user/${user.userId}`} className={"user-list-dropdown-item"}>
                      유저 통계보기
                    </Link>
                    <button onClick={() => router.push(`/component/userExpenditure?id=${user.userId}`)}>
                      유저 지출 상세내역
                    </button>
                    <button onClick={() => router.push(`/component/userMemo?id=${user.userId}`)}>
                      메모 확인하기
                    </button>
                    <button onClick={() => openMemoModal(user)}>메모 작성하기</button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="user-list-pagination">
        <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>이전</button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={currentPage === page ? 'active' : ''}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>다음</button>
      </div>

      {/* 유저 상세 모달 */}
      {selectedUser && (
        <div className="user-list-modalBackdrop">
          <div className="user-list-modal">
            <div className="user-list-modalHeader">
              <div className="user-list-userName">{selectedUser.userNick}</div>
              <div className="user-list-tags">
                <span className={`user-list-tag user-list-tag_${selectedUser.userType}`}>
                  {selectedUser.userType}{selectedUser.vipYn ? ' (VIP)' : ''}
                </span>
              </div>
            </div>
            <hr className="user-list-divider" />
            <div className="user-list-modalContent">
              <ul>
                <li><strong>아이디</strong> {selectedUser.userId}</li>
                <li><strong>접속 지역</strong> {selectedUser.region}</li>
                <li><strong>플레이 타임</strong> {selectedUser.totalPlayTime}시간</li>
                <li><strong>총 과금액</strong> ₩ {selectedUser.totalSpent?.toLocaleString() || 0}</li>
                <li><strong>분류</strong> {selectedUser.userType}{selectedUser.vipYn ? ' (VIP)' : ''}</li>
              </ul>
            </div>
            <div className="user-list-modalFooter">
              <button className="user-list-closeBtn" onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
      {/* 메모 모달 */}
      {showMemoModal && (
        <div className="user-list-modalBackdrop">
          <div className="user-list-modal user-list-otherMemoModal">
            <div className="user-list-modalHeader">
              <div className="user-list-userName">{selectedUser?.userNick}님의 메모</div>
              <button className="user-list-closeBtn" onClick={closeMemoModal}>닫기</button>
            </div>
            <hr className="user-list-divider" />
            {memoLoading ? (
              <div>메모 불러오는 중...</div>
            ) : (
              <div>
                {memoList.length === 0 ? (
                  <div>등록된 메모가 없습니다.</div>
                ) : (
                  <div className="user-list-otherMemoList">
                    {memoList.map((memo) => (
                      <div key={memo.memoIdx} className="user-list-otherMemoItem" style={{ marginBottom: 20 }}>
                        <div className="user-list-memoInfo">
                          <span><b>{memo.memberId}</b> 님</span>
                          <span>
                            {memo.updatedAt?.slice(0, 10) || memo.createdAt?.slice(0, 10)}
                          </span>
                        </div>
                        <textarea
                          className="user-list-memoTextarea"
                          value={memo.memoContent}
                          readOnly
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
