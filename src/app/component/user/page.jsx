'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaClock, FaGlobe } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import "./user.css";
import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import axios from 'axios';

// API URL 환경변수
const URL = process.env.NEXT_PUBLIC_API_URL;

// 유저 타입 목록 (필터링용)
const USER_TYPES = ['전체', '일반', '신규', '복귀', '휴면', '정지', '이탈 위험군', 'VIP'];

// 배지 매핑 (티어/유저 타입 → 이미지 파일명)
const tierMap = {
  // 시즌 티어 매핑
  '골드': 'gold',
  '그랜드마스터': 'grandmaster',
  '마스터': 'master',
  '브론즈': 'bronze',
  '실버': 'silver',
  '언랭크드': 'unranked',
  '챌린저': 'challenger',
  '다이아몬드': 'diamond',
  '플래티넘': 'platinum',
  // 유저 타입 뱃지 매핑
  '일반': 'casual',
  '신규': 'new',
  '복귀': 'returning',
  '휴면': 'dormant',
  '정지': 'suspended',
  '이탈 위험군': 'churn_risk',
  'VIP': 'total_spend',
};

export default function User() {
  const router = useRouter();

  // 리스트 관련 상태
  const [users, setUsers] = useState([]); // 유저 목록
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  // 검색/정렬 관련 상태
  const [searchType, setSearchType] = useState('userNick'); // 검색 타입 (닉네임/아이디)
  const [keyword, setKeyword] = useState(''); // 검색 키워드
  const [region, setRegion] = useState(''); // 지역 필터
  const [userType, setUserType] = useState('전체'); // 유저 타입 필터
  const [sortKey, setSortKey] = useState(''); // 정렬 기준
  const [sortOrder, setSortOrder] = useState('desc'); // 정렬 순서

  // UI 관련 상태
  const [openMenuId, setOpenMenuId] = useState(null); // 현재 열린 드롭다운 메뉴 ID
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 유저 (상세 모달용)

  // 메모 관련 상태
  const [memoList, setMemoList] = useState([]); // 메모 목록
  const [showMemoModal, setShowMemoModal] = useState(false); // 메모 모달 표시 여부
  const [memoLoading, setMemoLoading] = useState(false); // 메모 로딩 상태
  const [showWriteMemoModal, setShowWriteMemoModal] = useState(false); // 메모 작성 모달 표시 여부
  const [memoContent, setMemoContent] = useState(''); // 메모 작성 내용
  const [selectedMemo, setSelectedMemo] = useState(null); // 선택된 메모
  const [showEditMemoModal, setShowEditMemoModal] = useState(false); // 메모 수정 모달 표시 여부
  const [editMemoContent, setEditMemoContent] = useState(''); // 메모 수정 내용

  // 배지 관련 상태 (캐싱용)
  const [userDetail, setUserDetail] = useState({}); // 유저 상세 정보 캐시
  const [userTiers, setUserTiers] = useState({}); // 유저 시즌별 티어 정보 캐시

  const itemsPerPage = 10; // 페이지당 유저 수

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

  // 로그인 체크 (최초 1회만)
  useEffect(() => {
    const id = sessionStorage.getItem('member_id');
    const token = sessionStorage.getItem('token');
    const dept = sessionStorage.getItem('dept_name');
    if (!id || !token || !dept) {
      alert('로그인 후 접근 가능합니다.');
      router.push("/");
    }

    // 접근 허용 부서
    const allowedDepts = ['CS팀', '마케팅팀', '개발팀', '총괄'];

    // 접근 허용 부서 체크
    if (!allowedDepts.includes(dept)) {
      alert('접근 권한이 없습니다.');
      router.push("/component/main");
    }

  }, []);


  // 시즌별 티어 정보를 가져오는 함수 (캐싱 기능 포함)
  const getUserTier = async (userId) => {
    if (userTiers[userId]) return; // 이미 정보가 있으면 실행 안함
    const token = sessionStorage.getItem('token');
    try {
      const tiers = [];
      // 시즌 1~4까지의 티어 정보 가져오기
      for (let season = 1; season <= 4; season++) {
        const { data } = await axios.get(`${URL}/user/stats/season`, {
          params: { userId, season },
          headers: { authorization: token }
        });
        tiers.push(data.userStatsSeason);
      }
      // 캐시에 티어 정보 저장
      setUserTiers(prev => ({ ...prev, [userId]: tiers }));
    } catch (error) {
      console.log("시즌별 티어 정보 불러오기 실패: ", error);
    }
  };

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
      // 검색어 있을 때만 파라미터 추가
      if (keyword && searchType) {
        params.searchType = searchType;
        params.keyword = keyword;
      }
      // 지역 드롭다운 값 있을 때만 파라미터 추가
      if (region) params.region = region;
      // 유저타입 있을 때만 파라미터 추가 (전체 제외)
      if (userType && userType !== '전체') params.userType = userType;

      const { data } = await axios.get(`${URL}/user/list`, {
        headers: { Authorization: token },
        params,
      });
      console.log(data);
      setUsers(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.log("유저 리스트 불러오기 실패 : ", error);
    }
  };

  // 메모 모달 열기 (메모 리스트 불러오기)
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

  // 메모 작성하기 (API 호출)
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

  // 메모 작성 제출 처리
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

  // 메모 작성 모달 열기
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

  // 메모 수정하기 (API 호출)
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

  // 메모 모달 닫기
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

  // 정렬 기준 변경
  const handleSortKeyChange = (e) => {
    setSortKey(e.target.value);
    setCurrentPage(1);
  };

  // 정렬 순서 변경
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

  // 유저 상세 정보 가져오기 (캐싱 기능 포함)
  const getUserDetail = async (userId) => {
    if (userDetail[userId]) {
      setSelectedUser(userDetail[userId]);
      return;
    }
    try {
      const { data } = await axios.get(`${URL}/user/detail`, {
        headers: { Authorization: sessionStorage.getItem('token') },
        params: { userId: userId }
      });
      const detailedInfo = data.userDetail[0];
      setSelectedUser(detailedInfo);
      // 가져온 정보를 캐싱을 위해 state에 저장
      setUserDetail(prev => ({ ...prev, [userId]: detailedInfo }));
    } catch (error) {
      console.log("유저 상세보기 불러오기 실패 : ", error);
    }
  };

  // 유저 상세보기 모달 열기
  const openUserDetail = (user) => {
    getUserDetail(user.userId);
    getUserTier(user.userId); // 뱃지 정보 호출 추가
    setOpenMenuId(null);
  };

  // 상세 모달 닫기
  const closeModal = () => {
    setSelectedUser(null);
  };

  const BadgeDisplay = ({ userId }) => {
    const tiers = userTiers[userId];
    const detail = userDetail[userId];

    if (!tiers || !detail) {
      return <div style={{ padding: '10px 0', textAlign: 'center' }}>뱃지 정보 로딩 중...</div>;
    }

    // 유저 타입에 따른 뱃지 이미지 (없으면 none.png)
    const type = detail?.user_type?.trim();
    const typeBadgeName = tierMap[type] || 'none';

    return (
      <div className="badge-container"
        style={{
          display: 'flex', gap: '8px', flexWrap: 'wrap',
          marginTop: '10px', padding: '0 24px', justifyContent: 'center'
        }}>
        {/* 유저 타입 뱃지 */}
        <img
          style={{ width: '50px', height: '56px' }}
          src={`/badge/${typeBadgeName}.png`}
          alt={type ? `${type} 뱃지` : '뱃지 없음'}
          title={type || '뱃지 없음'}
        />
        {/* 시즌별 티어 뱃지들 */}
        {tiers.map((seasonInfo) => {
          if (!seasonInfo || !seasonInfo.tier_season) {
            return (
              <img
                key={`none-${seasonInfo?.season || Math.random()}`}
                style={{ width: '50px', height: '56px' }}
                src="/badge/none.png"
                alt="기록 없음"
                title={`시즌 ${seasonInfo?.season}: 기록 없음`}
              />
            );
          }
          const tierBadgeName = tierMap[seasonInfo.tier_season] || 'none';
          const imageName = `${seasonInfo.season}${tierBadgeName}.png`;
          return (
            <div key={seasonInfo.season}>
              <img
                style={{ width: '50px', height: '56px' }}
                src={`/badge/${imageName}`}
                alt={`시즌 ${seasonInfo.season} 뱃지`}
                title={`시즌 ${seasonInfo.season}: ${seasonInfo.tier_season}`}
              />
            </div>
          );
        })}
      </div>
    );
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
                {/* 드롭다운 메뉴 */}
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

            {/* 뱃지 디스플레이 컴포넌트 */}
            <BadgeDisplay userId={selectedUser.user_id} />

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
                            작성일 : {formatDate(memo.createdAt)}
                            <br />
                            수정일 : {formatDate(memo.updatedAt)}
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
};