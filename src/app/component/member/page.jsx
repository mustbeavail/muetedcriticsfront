'use client';
import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './member.css';

const URL = process.env.NEXT_PUBLIC_API_URL;

const Member = () => {
  let page = useRef(1);
  const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;

  const [memberList, setMemberList] = useState({ members: [] });
  useEffect(() => {
    getMemberList(page.current);
  }, []);

  const getMemberList = async (page) => {
    const { data } = await axios.get(`${URL}/memberInfo/list/${page}`, {
      headers: {
        authorization: token
      }
    });
    console.log(data);
    setMemberList(data);
  }

  const [activeDept, setActiveDept] = useState('전체');
  const depts = ['전체', 'CS팀', '마케팅팀', '개발팀', '총괄'];
  const [activePosition, setActivePosition] = useState('전체');
  const positions = ['전체', '사원', '대리', '과장', '차장', '부장', '이사', '상무', '전무', '사장'];

  const handleClick = (dept, position) => {
    setActiveDept(dept);
    setActivePosition(position);
  };

  return (
    <div className="memberList-container">
      <Header />
      <Menu />
      <h2 className="memberList-title">회원 리스트</h2>

      <div className="memberList-topRow">
        <input
          type="text"
          placeholder="Search"
          className="memberList-searchInput"
        />
        <select className="memberList-sortSelect">
          <option value="">정렬 기준 선택</option>
        </select>
        <select className="memberList-sortSelect">
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>

        <div className="memberList-tagFilterButtons">
          {['전체', 'CS팀', '마케팅팀', '개발팀', '총괄'].map((deptName) => (
            <button
              key={deptName}
              className={`memberList-tagFilterBtn${activeDept === deptName ? ' active ' + deptName : ''}`}
              onClick={() => handleClick(deptName, activePosition)}
            >
              {deptName}
            </button>
          ))}
        </div>
        <div className="memberList-tagFilterButtons">
          {['전체', '사원', '대리', '과장', '차장', '부장', '이사', '상무', '전무', '사장'].map((position) => (
            <button
              key={position}
              className={`memberList-tagFilterBtn${activePosition === position ? ' active ' + position : ''}`}
              onClick={() => handleClick(activeDept, position)}
            >
              {position}
            </button>
          ))}
        </div>
        <div className="memberList-list">
          {memberList.members.map((member) => (
            <div className="memberList-card" key={member.memberId}>
              <div className="memberList-info">
                <div className="memberList-nameTagWrapper">
                  <div className="memberList-tags">
                    <span className={`memberList-tag memberList-tag_${member.deptName}`}>
                      {member.deptName}
                    </span>
                    <span className={`memberList-tag memberList-tag_${member.position}`}>
                      {member.position}
                    </span>
                  </div>
                  <div className="memberList-name">
                    {member.adminYn && <span className="memberList-crown">👑 </span>}
                    {member.memberName}
                  </div>
                </div>
                <div className="memberList-id">아이디 {member.memberId}</div>
                {/* <div className="memberList-email">성별 {member.memberGender}</div> */}
                <div className="memberList-email">이메일 {member.email || '이메일 없음'}</div>
                <div className="memberList-officePhone">사내 연락처 {member.officePhone || '사내 연락처 없음'}</div>
                <div className="memberList-mobilePhone">개인 연락처 {member.mobilePhone || '개인 연락처 없음'}</div>
                <div className="memberList-joinDate">가입일 {member.joinDate}</div>
                <div className="memberList-withdrawDate">
                  탈퇴 여부 {member.withdrawDate ? member.withdrawDate : '-'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Member;