'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserShield, FaClock, FaGlobe } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import Link from 'next/link';
import Header from '@/Header/page';
import Menu from '@/menu/Menu';

const dummyUsers = [{
  id: 1,
  name: '유저123',
  email: 'user123@gmail.com',
  level: 350,
  playTime: 780,
  amountSpent: 200,
  country: '대한민국',
  gender: '남성',
  phone: '010-1234-5678',
  region: '대한민국',
  joinDate: '2014.09.24',
  suspendedDate: '-',
  withdrawalDate: '-',
  userType: 'VIP',
  consent: 'O',
  idValue: 'user123',
  tags: ['이탈위험군'],
  memo: {
    content: '이탈 위험군 유저\n메모 내용이 보여지는 페이지',
    createdAt: '2025.06.31',
    updatedAt: '2025.07.02',
  },
},
{
  id: 2,
  name: '김민지',
  email: 'minji.kim@example.com',
  level: 120,
  playTime: 320,
  amountSpent: 75,
  country: '대한민국',
  gender: '여성',
  phone: '010-9876-5432',
  region: '서울',
  joinDate: '2018.03.15',
  suspendedDate: '-',
  withdrawalDate: '-',
  userType: '일반',
  consent: 'X',
  idValue: 'minjik',
  tags: ['일반', '수신거부'],
  memo: {
    content: '최근 접속 빈도 낮음\n프로모션 메일 수신 거부',
    createdAt: '2024.12.01',
    updatedAt: '2025.01.10',
  },
},
{
  id: 3,
  name: '박준호',
  email: 'junho.park@example.com',
  level: 270,
  playTime: 600,
  amountSpent: 150,
  country: '대한민국',
  gender: '남성',
  phone: '010-2468-1357',
  region: '부산',
  joinDate: '2016.07.22',
  suspendedDate: '2025.05.01',
  withdrawalDate: '-',
  userType: '프리미엄',
  consent: 'O',
  idValue: 'junhop',
  tags: ['휴면', '복귀'],
  memo: {
    content: '휴면 전환 상태\n복귀 유도 필요',
    createdAt: '2025.04.20',
    updatedAt: '2025.06.15',
  },
},
];

const ITEMS_PER_PAGE = 10;

const User = () => {
  const router = useRouter();

  const [openMenuId, setOpenMenuId] = useState(null);
  const [users, setUsers] = useState(dummyUsers);
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [memoContent, setMemoContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const parseDate = (dateStr) => {
    if (!dateStr || dateStr === '-') return new Date(0);
    const [year, month, day] = dateStr.split('.').map(Number);
    return new Date(year, month - 1, day);
  };

  const compare = (a, b) => {
    let res = 0;
    switch (sortKey) {
      case 'name':
        res = a.name.localeCompare(b.name);
        break;
      case 'level':
        res = a.level - b.level;
        break;
      case 'joinDate':
        res = parseDate(a.joinDate) - parseDate(b.joinDate);
        break;
      case 'playTime':
        res = a.playTime - b.playTime;
        break;
      case 'amountSpent':
        res = a.amountSpent - b.amountSpent;
        break;
      default:
        res = 0;
    }
    return sortOrder === 'asc' ? res : -res;
  };

  const filteredUsers = dummyUsers
    .filter(user => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        user.name.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch) ||
        user.idValue.toLowerCase().includes(lowerSearch)
      );
    })
    .sort(compare);

  const totalFilteredPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const openUserDetail = (user) => {
    setSelectedUser(user);
    setShowMemoModal(false);
    setOpenMenuId(null);
    setIsEditing(false);
  };

  const openMemoModal = (user) => {
    setSelectedUser(user);
    setMemoContent(user.memo?.content || '');
    setShowMemoModal(true);
    setIsEditing(false);
    setOpenMenuId(null);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setShowMemoModal(false);
    setIsEditing(false);
  };

  const saveMemo = () => {
    if (selectedUser) {
      selectedUser.memo = {
        ...selectedUser.memo,
        content: memoContent,
        updatedAt: new Date().toISOString().split('T')[0],
      };
    }
    setIsEditing(false);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    if (page < 1 || page > totalFilteredPages) return;
    setCurrentPage(page);
    setOpenMenuId(null);
    setSelectedUser(null);
    setShowMemoModal(false);
    setIsEditing(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSortKeyChange = (e) => {
    setSortKey(e.target.value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  return (
  <div className="user-list-container">
    <Header/>
    <Menu/>
    <h2 className="user-list-title">유저 리스트</h2>

    <div className="user-list-topRow">
      <input
        type="text"
        placeholder="Search"
        className="user-list-searchInput"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select className="user-list-sortSelect" value={sortKey} onChange={handleSortKeyChange}>
        <option value="">정렬 기준 선택</option>
        <option value="name">이름</option>
        <option value="level">레벨</option>
        <option value="joinDate">가입일</option>
        <option value="playTime">플레이 타임</option>
        <option value="amountSpent">총 과금액</option>
      </select>
      <select className="user-list-sortSelect" value={sortOrder} onChange={handleSortOrderChange}>
        <option value="asc">오름차순</option>
        <option value="desc">내림차순</option>
      </select>
    </div>

    <div className="user-list-list">
      {currentUsers.length > 0 ? (
        currentUsers.map((user) => (
          <div className="user-list-card" key={user.id}>
            <div className="user-list-info">
              <div className="user-list-name">{user.name}</div>
              <div className="user-list-email">{user.email}</div>
              <div className="user-list-meta">
                <span><FaUserShield /> {user.level} 레벨</span>
                <div><FaClock /> 플레이 타임 {user.playTime}시간</div>
                <div><FaGlobe /> 접속 국가 {user.country}</div>
              </div>
              <div className="user-list-meta">
                <span>₩ 총 과금액 {user.amountSpent.toLocaleString()}</span>
              </div>
              {user.tags?.length > 0 && (
                <div className="user-list-tags">
                  {user.tags.map((tag) => (
                    <span key={tag} className={`user-list-tag user-list-tag_${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="user-list-menu">
              <button className="user-list-moreBtn" onClick={() => toggleMenu(user.id)}>
                <FiMoreVertical />
              </button>
              {openMenuId === user.id && (
                <div className="user-list-dropdown">
                  <button onClick={() => openUserDetail(user)}>유저 상세보기</button>
                  {/* <button onClick={() => router.push(`/component/heroPlayData?id=${user.id}`)}> */}
                  <Link key={user.id} href={`/component/user/${user.id}`} className={"user-list-dropdown-item"}>
                    유저 통계보기
                  </Link>
                  {/* </button> */}
                  <button onClick={() => router.push(`/component/userExpenditure?id=${user.id}`)}>
                    유저 지출 상세내역
                  </button>
                  <button onClick={() => router.push(`/component/userMemo?id=${user.id}`)}>
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

    <div className="user-list-pagination">
      <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>이전</button>
      {[...Array(totalFilteredPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            className={currentPage === page ? "active" : ''}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        );
      })}
      <button disabled={currentPage === totalFilteredPages} onClick={() => goToPage(currentPage + 1)}>다음</button>
    </div>
    {showMemoModal && selectedUser && (
      <div className="user-list-modalBackdrop">
        <div className="user-list-modal">
          <div className="user-list-modalHeader">
            <div className="user-list-leftHeader">
              <span className="user-list-userName">{selectedUser.name} - 메모</span>
              {selectedUser.tags?.length > 0 && (
                <div className="user-list-tags">
                  {selectedUser.tags.map((tag) => (
                    <span key={tag} className={`user-list-tag user-list-tag_${tag}`}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <hr className="user-list-divider" />
          <div className="user-list-memoInfo">
            <div><strong>유저 닉네임</strong><br />{selectedUser.name}</div>
            <div><strong>최초 작성일</strong><br />{selectedUser.memo?.createdAt || '-'}</div>
            <div><strong>메모 수정일</strong><br />{selectedUser.memo?.updatedAt || '-'}</div>
          </div>
          <div>
            <strong>내용</strong>
            <textarea
              className="user-list-memoTextarea"
              value={memoContent}
              onChange={(e) => setMemoContent(e.target.value)}
              readOnly={!isEditing}
            />
          </div>
          <div className="user-list-modalFooter">
            <button className="user-list-closeBtn" onClick={closeModal}>닫기</button>
            {isEditing ? (
              <button className="user-list-saveBtn" onClick={saveMemo}>저장</button>
            ) : (
              <button className="user-list-editBtn" onClick={() => setIsEditing(true)}>수정</button>
            )}
          </div>
        </div>
      </div>
    )};

{selectedUser && !showMemoModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div className={styles.leftHeader}>
                <span className={styles.userName}>{selectedUser.name}</span>
                {selectedUser.tags?.length > 0 && (
                  <div className={styles.tags}>
                    {selectedUser.tags.map((tag) => (
                      <span key={tag} className={`${styles.tag} ${styles[`tag_${tag}`]}`}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <hr className={styles.divider} />
            <div className={styles.modalContent}>
              <div className={styles.leftContent}>
                <section>
                  <h4 className={styles.sectionTitle}>기본 정보</h4>
                  <ul>
                    <li><strong>아이디</strong> {selectedUser.idValue}</li>
                    <li><strong>성별</strong> {selectedUser.gender}</li>
                    <li><strong>전화번호</strong> {selectedUser.phone}</li>
                    <li><strong>접속 지역</strong> {selectedUser.region}</li>
                    <li><strong>가입일</strong> {selectedUser.joinDate}</li>
                    <li><strong>휴면 전환일</strong> {selectedUser.suspendedDate}</li>
                    <li><strong>탈퇴일</strong> {selectedUser.withdrawalDate}</li>
                  </ul>
                </section>
                <section>
                  <h4 className={styles.sectionTitle}>상태 정보</h4>
                  <ul>
                    <li><strong>유저 분류</strong> {selectedUser.userType}</li>
                    <li><strong>마케팅 수신 동의</strong> {selectedUser.consent}</li>
                  </ul>
                </section>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.closeBtn} onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;