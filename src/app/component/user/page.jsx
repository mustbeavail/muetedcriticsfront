'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserShield, FaClock, FaGlobe } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import Link from 'next/link';
import Header from '@/Header/page';
import Menu from '@/menu/Menu';

const dummyUsers = [
  {
    id: 1,
    name: '유저1',
    email: 'user1@example.com',
    level: 100,
    playTime: 200,
    amountSpent: 50,
    country: '대한민국',
    gender: '남성',
    phone: '010-0001-0001',
    region: '서울',
    joinDate: '2023.01.01',
    suspendedDate: '-',
    withdrawalDate: '-',
    userType: '일반',
    idValue: 'user1',
    tags: ['일반'],
    memo: { content: '일반 유저 메모', createdAt: '2023.01.01', updatedAt: '2023.01.02' },
  },
  {
    id: 2,
    name: '유저2',
    email: 'user2@example.com',
    level: 50,
    playTime: 100,
    amountSpent: 20,
    country: '대한민국',
    gender: '여성',
    phone: '010-0002-0002',
    region: '부산',
    joinDate: '2023.02.15',
    suspendedDate: '-',
    withdrawalDate: '-',
    userType: '신규',
    idValue: 'user2',
    tags: ['신규'],
    memo: { content: '신규 유저 메모', createdAt: '2023.02.15', updatedAt: '2023.02.16' },
  },
  {
    id: 3,
    name: '유저3',
    email: 'user3@example.com',
    level: 300,
    playTime: 700,
    amountSpent: 500,
    country: '대한민국',
    gender: '남성',
    phone: '010-0003-0003',
    region: '대구',
    joinDate: '2022.12.01',
    suspendedDate: '-',
    withdrawalDate: '-',
    userType: '연승유저',
    idValue: 'user3',
    tags: ['연승유저'],
    memo: { content: '연승 중인 유저 메모', createdAt: '2023.03.01', updatedAt: '2023.03.10' },
  },
  {
    id: 4,
    name: '유저4',
    email: 'user4@example.com',
    level: 70,
    playTime: 150,
    amountSpent: 30,
    country: '대한민국',
    gender: '여성',
    phone: '010-0004-0004',
    region: '인천',
    joinDate: '2023.01.20',
    suspendedDate: '-',
    withdrawalDate: '-',
    userType: '연패유저',
    idValue: 'user4',
    tags: ['연패유저'],
    memo: { content: '연패 중인 유저 메모', createdAt: '2023.04.01', updatedAt: '2023.04.05' },
  },
  {
    id: 5,
    name: '유저5',
    email: 'user5@example.com',
    level: 400,
    playTime: 1000,
    amountSpent: 800,
    country: '대한민국',
    gender: '남성',
    phone: '010-0005-0005',
    region: '광주',
    joinDate: '2021.06.10',
    suspendedDate: '-',
    withdrawalDate: '-',
    userType: '정지',
    idValue: 'user5',
    tags: ['정지'],
    memo: { content: '정지된 유저 메모', createdAt: '2023.05.10', updatedAt: '2023.05.20' },
  },
  {
    id: 6,
    name: '유저6',
    email: 'user6@example.com',
    level: 150,
    playTime: 350,
    amountSpent: 120,
    country: '대한민국',
    gender: '여성',
    phone: '010-0006-0006',
    region: '대전',
    joinDate: '2022.07.01',
    suspendedDate: '-',
    withdrawalDate: '-',
    userType: '휴면',
    idValue: 'user6',
    tags: ['휴면'],
    memo: { content: '휴면 유저 메모', createdAt: '2023.06.01', updatedAt: '2023.06.10' },
  },
  {
    id: 7,
    name: '유저7',
    email: 'user7@example.com',
    level: 220,
    playTime: 500,
    amountSpent: 300,
    country: '대한민국',
    gender: '남성',
    phone: '010-0007-0007',
    region: '울산',
    joinDate: '2021.11.15',
    suspendedDate: '-',
    withdrawalDate: '-',
    userType: '복귀',
    idValue: 'user7',
    tags: ['복귀'],
    memo: { content: '복귀 유저 메모', createdAt: '2023.07.01', updatedAt: '2023.07.05' },
  },
  {
    id: 8,
    name: '유저8',
    email: 'user8@example.com',
    level: 90,
    playTime: 180,
    amountSpent: 45,
    country: '대한민국',
    gender: '여성',
    phone: '010-0008-0008',
    region: '강원',
    joinDate: '2023.03.10',
    suspendedDate: '-',
    withdrawalDate: '-',
    userType: '이탈위험군',
    idValue: 'user8',
    tags: ['이탈위험군'],
    memo: { content: '이탈 위험군 유저 메모', createdAt: '2023.08.01', updatedAt: '2023.08.10' },
  },
  {
    id: 9,
    name: '유저9',
    email: 'user9@example.com',
    level: 110,
    playTime: 220,
    amountSpent: 60,
    country: '대한민국',
    gender: '남성',
    phone: '010-0009-0009',
    region: '제주',
    joinDate: '2022.01.05',
    suspendedDate: '-',
    withdrawalDate: '-',
    userType: '수신거부',
    idValue: 'user9',
    tags: ['수신거부'],
    memo: { content: '프로모션 메일 수신 거부', createdAt: '2023.09.01', updatedAt: '2023.09.10' },
  },
  {
    id: 10,
    name: '유저10',
    email: 'user10@example.com',
    level: 130,
    playTime: 250,
    amountSpent: 70,
    country: '대한민국',
    gender: '여성',
    phone: '010-0010-0010',
    region: '서울',
    joinDate: '2022.05.20',
    suspendedDate: '-',
    withdrawalDate: '-',
    userType: 'VIP',
    idValue: 'user10',
    tags: ['VIP'],
    memo: { content: 'VIP 유저 메모', createdAt: '2023.10.01', updatedAt: '2023.10.05' },
  },
  {
    id: 11,
    name: '유저11',
    email: 'user11@example.com',
    level: 80,
    playTime: 160,
    amountSpent: 40,
    country: '대한민국',
    gender: '남성',
    phone: '010-0011-0011',
    region: '부산',
    joinDate: '2023.01.15',
    suspendedDate: '-',
    withdrawalDate: '-',
    userType: '일반',
    idValue: 'user11',
    tags: ['일반'],
    memo: { content: '일반 유저 추가 메모', createdAt: '2023.11.01', updatedAt: '2023.11.05' },
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

  const [selectedTag, setSelectedTag] = useState('');
  const [memoType, setMemoType] = useState(null);
  
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

  const filteredUsers = users
  .filter(user => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(lowerSearch) ||
      user.email.toLowerCase().includes(lowerSearch) ||
      user.idValue.toLowerCase().includes(lowerSearch);

    const matchesTag = selectedTag === '' || user.tags?.includes(selectedTag);

    return matchesSearch && matchesTag;
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
    setMemoType(null);
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
      <Header />
      <Menu />
      <h2 className="title">유저 리스트</h2>

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

      <div className="user-list-tagFilterButtons">
        {['전체', '일반', '신규', '복귀', '휴면', '정지', '이탈위험군'].map((tag) => (
          <button
            key={tag}
            className={`user-list-tagFilterBtn${selectedTag === tag ? ' active' : ''}${tag !== '전체' ? ' ' + tag : ''}`}
            onClick={() => setSelectedTag(tag === '전체' ? '' : tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
    <div className="user-list-list">
      {currentUsers.length > 0 ? (
        currentUsers.map((user) => (
          <div className="user-list-card" key={user.id}>
            <div className="user-list-info">
              <div className="user-list-nameTagWrapper">
                {user.tags?.length > 0 && (
                  <div className="user-list-tags">
                    {user.tags.map((tag) => (
                      <span key={tag} className={`user-list-tag user-list-tag_${tag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="user-list-name">{user.name}</div>
              </div>

              <div className="user-list-email">{user.email}</div>
              <div className="user-list-meta">
                <span><FaUserShield /> {user.level} 레벨</span>
                <div><FaClock /> 플레이 타임 {user.playTime}시간</div>
                <div><FaGlobe /> 접속 국가 {user.country}</div>
              </div>
              <div className="user-list-meta">
                <span>₩ 총 과금액 {user.amountSpent.toLocaleString()}</span>
              </div>
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
                  <button onClick={() => {
                    setSelectedUser(user);
                    setMemoType('others');
                    setShowMemoModal(true);
                    setOpenMenuId(null);
                  }}>다른 유저 메모 보기</button>

                  <button onClick={() => {
                    openMemoModal(user);
                    setMemoType('my');
                  }}>나의 메모 확인하기</button>
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

    {showMemoModal && selectedUser && memoType === 'my' && (
      <div className="user-list-modalBackdrop">
        <div className="user-list-modal">
          <div className="user-list-leftHeader">
            <span className="user-list-userNameWithTags">
              {selectedUser.name}
              {selectedUser.tags?.length > 0 && (
                <span className="user-list-tags-inline">
                  {selectedUser.tags.map((tag) => (
                    <span key={tag} className={`user-list-tag user-list-tag_${tag}`}>
                      {tag}
                    </span>
                  ))}
                </span>
              )}
            </span>
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
      )}

      {showMemoModal && selectedUser && memoType === 'others' && (
        <div className="user-list-modalBackdrop">
          <div className="user-list-modal user-list-otherMemoModal">
          
            <h3 className="user-list-modalTitle">메모 상세보기</h3>
            <div className="user-list-otherMemoUser">유저 닉네임<br /><strong>{selectedUser.name}</strong></div>

            <div className="user-list-otherMemoList">
              {selectedUser.otherMemos?.length > 0 ? (
                selectedUser.otherMemos.map((memo, idx) => (
                  <div key={idx} className="user-list-otherMemoItem">
                    <div className="user-list-otherMemoTop">
                      <span className="user-list-otherMemoWriter">{memo.writer}</span>
                      <span className="user-list-otherMemoDate">{memo.date}</span>
                    </div>
                    <div className="user-list-otherMemoContent">{memo.content}</div>
                  </div>
                ))
              ) : (
                <div className="user-list-otherMemoEmpty">등록된 메모가 없습니다.</div>
              )}
            </div>

            <div className="user-list-modalFooter">
              <button className="user-list-closeBtn" onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
      
      {selectedUser && !showMemoModal && (
        <div className="user-list-modalBackdrop">
          <div className="user-list-modal">
            <div className="user-list-modalHeader">
              <div className="user-list-leftHeader">
                <span className="user-list-userName">{selectedUser.name}</span>
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
            <div className="user-list-modalContent">
              <div className="user-list-leftContent">
                <section>
                  <h4>기본 정보</h4>
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
                  <h4>상태 정보</h4>
                  <ul>
                    <li><strong>유저 분류</strong> {selectedUser.userType}</li>
                  </ul>
                </section>
              </div>
            </div>
            <div className="user-list-modalFooter">
              <button className="user-list-closeBtn" onClick={closeModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;