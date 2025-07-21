'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaClock, FaGlobe } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import "./user.css";
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
  const [showWriteMemoModal, setShowWriteMemoModal] = useState(false);
  const [memoContent, setMemoContent] = useState('');
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [showEditMemoModal, setShowEditMemoModal] = useState(false);
  const [editMemoContent, setEditMemoContent] = useState('');


  const itemsPerPage = 10;

  // 로그인 체크 (최초 1회만)
  useEffect(() => {
    const id = sessionStorage.getItem('member_id');
    const token = sessionStorage.getItem('token');
    if (!id || !token) {
      alert('로그인 후 접근 가능합니다.');
      window.location.href = "/";
    }
  }, []);

  // 유저 리스트는 state 변경될 때마다 불러옴
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      getUserList(token);
    }
  }, [currentPage, searchType, keyword, region, userType, sortKey, sortOrder]);

  // 메뉴 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (openMenuId !== null && !event.target.closest('.user-list-menu')) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [openMenuId]);

  // 유저 리스트 불러오기
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


  // 메모 모달 열기(메모 리스트 불러오기)
  const openMemoModal = async (user) => {
    setSelectedUser(user);
    setSelectedMemo(null);
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

  // 메모 작성하기
  const writeMemo = async (userId, memoContent) => {
    try {
      const { data } = await axios.post(`${URL}/user/write/memo`, {
        memberId: sessionStorage.getItem('member_id'),
        userId: userId,
        memo: memoContent
      },
        {
          headers: { Authorization: sessionStorage.getItem('token') }
        });
      alert(data.msg); // 메모 작성 완료 메시지 표시
    } catch (error) {
      console.log("메모 작성 실패 : ", error);
      if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("메모 작성에 실패했습니다.");
      }
    }
  };

  const handleSubmitMemo = async () => {
    if (!memoContent.trim()) {
      alert("메모 내용을 입력하세요.");
      return;
    }
    await writeMemo(selectedUser.userId, memoContent);
    setShowWriteMemoModal(false);
    setMemoContent('');
    // 작성 후 바로 메모 리스트 새로고침 하려면 아래 추가
    // openMemoModal(selectedUser);
    setSelectedUser(null);
  };


  // 메모 작성 모달
  const openWriteMemoModal = (user) => {
    setSelectedUser(user); // 어느 유저의 메모인지 지정
    setMemoContent('');
    setShowWriteMemoModal(true);
    setOpenMenuId(null);
  };

  // 메모 작성 모달 닫기
  const closeWriteMemoModal = () => {
    setShowWriteMemoModal(false);
    setMemoContent('');
    setSelectedUser(null);
  };


  // // 메모 수정폼 불러오기 (현재 구조에서는 사용할 필요 없음!!!)
  // const updateMemoPage = async (memoIdx) => {
  //   try {
  //     const { data } = await axios.get(`${URL}/user/${memoIdx}/update-page`, {
  //       memberId: sessionStorage.getItem('member_id')
  //     }, {
  //       headers: { Authorization: sessionStorage.getItem('token') }
  //     });
  //     console.log("메모 수정 페이지 열기 성공 : ", data);
  //   } catch (error) {
  //     console.log("메모 수정 페이지 열기 실패 : ", error);
  //   }
  // };

  // 메모 수정 모달 열기
  const handleEditMemoClick = () => {
    if (!selectedMemo) {
      alert('수정할 메모를 선택하세요.');
      return;
    }
    setEditMemoContent(selectedMemo.memoContent);
    setShowEditMemoModal(true);
  };

  // 메모 수정 반영하기
  const handleUpdateMemo = async () => {
    if (!editMemoContent.trim()) {
      alert("메모 내용을 입력하세요.");
      return;
    }
    await updateMemo(selectedMemo.memoIdx, editMemoContent);
    setShowEditMemoModal(false);
    setEditMemoContent('');
    // 메모 리스트 새로고침
    openMemoModal(selectedUser);
  };


  // 메모 수정하기
  const updateMemo = async (memoIdx, memoContent) => {
    try {
      const { data } = await axios.put(`${URL}/user/${memoIdx}/update`, {
        memberId: sessionStorage.getItem('member_id'),
        memo: memoContent
      },
        {
          headers: { Authorization: sessionStorage.getItem('token') }
        });
      alert(data.msg); // 메모 수정 완료 메시지 표시
    } catch (error) {
      console.log("메모 수정 실패 : ", error);
      if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("메모 수정에 실패했습니다.");
      }
    }
  };

  // 수정 모달 닫기
  const closeEditMemoModal = () => {
    setShowEditMemoModal(false);
    setEditMemoContent('');
  };

  // 메모 삭제하기
  const deleteMemo = async () => {
    if (!selectedMemo) {
      alert("삭제할 메모를 선택하세요.");
      return;
    }
    try {
      await axios.delete(`${URL}/user/${selectedMemo.memoIdx}/delete`, {
        headers: { Authorization: sessionStorage.getItem('token') },
        data: { memberId: sessionStorage.getItem('member_id') }
      });
      alert("메모가 삭제되었습니다.");
      // 메모 리스트 새로고침
      openMemoModal(selectedUser);
      setSelectedMemo(null);
    } catch (error) {
      console.log("메모 삭제 실패 : ", error);
      if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("메모 삭제에 실패했습니다.");
      }
    }
  };

  // 모달 닫기
  const closeMemoModal = () => {
    setShowMemoModal(false);
    setMemoList([]);
    setSelectedUser(null);
    setSelectedMemo(null);
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





  // 유저 상세보기 불러오기
  const getUserDetail = async (userId) => {
    try {
      const { data } = await axios.get(`${URL}/user/detail`, {
        headers: { Authorization: sessionStorage.getItem('token') },
        params: {
          userId: userId
        }
      });
      console.log("유저 상세보기 불러오기 성공 : ", data.userDetail[0]);
      setSelectedUser(data.userDetail[0]);
    } catch (error) {
      console.log("유저 상세보기 불러오기 실패 : ", error);
    }
  };

  // 유저 상세보기 열기
  const openUserDetail = (user) => {
    getUserDetail(user.userId);
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
          <option value="">지역 전체</option>
          <option value="아시아">아시아</option>
          <option value="북미">북미</option>
          <option value="유럽">유럽</option>
          <option value="아프리카">아프리카</option>
          <option value="오세아니아">오세아니아</option>
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

        <div className="flex-break"></div>

        {/* 정렬 */}
        <select className="user-list-sortSelect" value={sortKey} onChange={handleSortKeyChange}>
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
                    <button onClick={() => router.push(`/component/user/${user.userId}`)}>유저 통계보기</button>
                    <button onClick={() => router.push(`/component/userExpenditure?id=${user.userId}`)}>유저 지출 상세내역</button>
                    <button onClick={() => openMemoModal(user)}>메모 확인하기</button>
                    <button onClick={() => openWriteMemoModal(user)}>메모 작성하기</button>
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
              <div className="user-list-userName">{selectedUser.user_nick}</div>
              <div className="user-list-tags">
                <span className={`user-list-tag user-list-tag_${selectedUser.user_type}`}>
                  {selectedUser.user_type}{selectedUser.vip_yn ? ' (VIP)' : ''}
                </span>
              </div>
            </div>
            <hr className="user-list-divider" />
            <div className="user-list-modalContent">
              <ul>
                <li><strong>아이디</strong> : {selectedUser.user_id}</li>
                <li><strong>성별</strong> : {selectedUser.user_gender}</li>
                <li><strong>전화번호</strong> : {selectedUser.phone?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') || '-'}</li>
                <li><strong>접속 지역</strong> : {selectedUser.region}</li>
                <li><strong>가입일</strong> : {selectedUser.join_date}</li>
                <li><strong>휴면 전환일</strong> : {selectedUser.dormant_date || '-'}</li>
                <li><strong>탈퇴일</strong> : {selectedUser.withdraw_date || '-'}</li>
                <li><strong>분류</strong> : {selectedUser.user_type}{selectedUser.vip_yn ? ' (VIP)' : ''}</li>
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
              <div className="user-list-userName">{selectedUser?.userNick}님에 대한 메모</div>
              <div className="user-list-modalHeaderBtns">
                <button className="user-list-deleteBtn" onClick={deleteMemo}>삭제</button>
                <button className="user-list-editBtn" onClick={handleEditMemoClick}>수정</button>
                <button className="user-list-closeBtn" onClick={closeMemoModal}>닫기</button>
              </div>
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
                      <div key={memo.memoIdx}
                        className={`user-list-otherMemoItem ${selectedMemo?.memoIdx === memo.memoIdx ? 'selected' : ''}`}
                        style={{ marginBottom: 20 }}
                        onClick={() => setSelectedMemo(memo)}>
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
      {/* 메모 작성 모달 */}
      {showWriteMemoModal && (
        <div className="user-list-modalBackdrop">
          <div className="user-list-modal user-list-writeMemoModal">
            <div className="user-list-modalHeader">
              <div className="user-list-userName">
                <b>{selectedUser?.userNick}</b> 님에 대한 메모 작성
              </div>
            </div>
            <hr className="user-list-divider" />
            <div className="user-list-modalContent">
              <textarea
                className="user-list-memoTextarea"
                placeholder="메모 내용을 입력하세요."
                value={memoContent}
                onChange={(e) => setMemoContent(e.target.value)}
                rows={6}
                maxLength={500}
              />
            </div>
            <div className="user-list-modalFooter">
              <button className="user-list-closeBtn" onClick={closeWriteMemoModal}>취소</button>
              <button className="user-list-saveBtn" onClick={handleSubmitMemo}>저장</button>
            </div>
          </div>
        </div>
      )}
      {/* 메모 수정 모달 */}
      {showEditMemoModal && (
        <div className="user-list-modalBackdrop">
          <div className="user-list-modal user-list-editMemoModal">
            <div className="user-list-modalHeader">
              <div className="user-list-userName">
                <b>{selectedUser?.userNick}</b> 님의 메모 수정
              </div>
            </div>
            <hr className="user-list-divider" />
            <div className="user-list-modalContent">
              <textarea
                className="user-list-memoTextarea"
                value={editMemoContent}
                onChange={e => setEditMemoContent(e.target.value)}
                rows={6}
                maxLength={500}
              />
            </div>
            <div className="user-list-modalFooter">
              <button className="user-list-closeBtn" onClick={closeEditMemoModal}>취소</button>
              <button className="user-list-saveBtn" onClick={handleUpdateMemo}>수정하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
