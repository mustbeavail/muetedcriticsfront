'use client';
import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './member.css';

import { MdOutlinePhoneAndroid } from "react-icons/md";
import { TbDeviceDesktop } from "react-icons/tb";
import { FiMoreVertical } from 'react-icons/fi';

const URL = process.env.NEXT_PUBLIC_API_URL;

const Member = () => {
  const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;
  const memberId = typeof window !== "undefined" ? sessionStorage.getItem('member_id') : null;
  const adminYn = typeof window !== "undefined" ? sessionStorage.getItem('admin_yn') : null;

  const [page, setPage] = useState(1);

  const [memberList, setMemberList] = useState({ members: [] });
  const [activeDept, setActiveDept] = useState('전체');
  const [activePosition, setActivePosition] = useState('전체');
  const [sortField, setSortField] = useState('memberId');
  const [sortDirection, setSortDirection] = useState('asc');
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [memberInfoEditModal, setMemberInfoEditModal] = useState(false);
  const [search, setSearch] = useState('');
  const [state, setState] = useState('signUp');

  const totalPagesCount = memberList.totalPages ?? 1;

  // 회원 리스트 조회
  const getMemberList = async (page, deptName = null, position = null, sortField = 'memberId', sortDirection = 'asc', search = '', state = '') => {
    const params = new URLSearchParams();

    if (deptName && deptName !== '전체') params.append('dept_name', deptName);
    if (position && position !== '전체') params.append('position', position);
    if (sortField) params.append('sortField', sortField);
    if (sortDirection) params.append('sortDirection', sortDirection);
    if (search && search.trim() !== '' && search.trim() !== 'null') {
      params.append('keyword', search.trim());
    }
    if (state === 'signUp') {
      params.append('acceptYn', 'true');
    } else if (state === 'signUpWait') {
      params.append('acceptYn', 'false');
    }

    const queryString = params.toString();
    const { data } = await axios.get(`${URL}/memberInfo/list/${page}${queryString ? `?${queryString}` : ''}`, {
      headers: { authorization: token }
    });
    setMemberList(data);
  };

  // 부서 및 직급 필터 클릭 시 호출
  const handleClick = (dept, position) => {
    setActiveDept(dept);
    setActivePosition(position);
    console.log(dept, position);
  };

  useEffect(() => {
    getMemberList(page, activeDept, activePosition, sortField, sortDirection, search, state);
    setSelectedMember(null);
    // setMemberInfoEditModal(false);
  }, [page, activeDept, activePosition, sortField, sortDirection, search, state]);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const memberInfoEdit = async () => {
    if (selectedMember) {
      console.log(selectedMember.memberId + ' 정보 수정');
      setMemberInfoEditModal(true);
    }
  };

  const memberInfoUpdate = async () => {
    const { data } = await axios.post(`${URL}/memberInfo/update/${selectedMember.memberId}`, {
      email: selectedMember.email,
      member_name: selectedMember.memberName,
      office_phone: selectedMember.officePhone,
      mobile_phone: selectedMember.mobilePhone,
      dept_name: selectedMember.deptName,
      position: selectedMember.position
    }, { headers: { authorization: token } });
    console.log(data);
    if (data.success) {
      alert('회원 정보가 수정되었습니다.');
      setOpenMenuId(null);
      setSelectedMember(null);
      setMemberInfoEditModal(false);
      getMemberList(page, activeDept, activePosition, sortField, sortDirection, search, state);
    } else {
      alert('회원 정보 수정에 실패했습니다.');
    }
  };

  const adminRevoke = async () => {
    if (selectedMember) {
      const confirmRevoke = window.confirm(
        `${selectedMember.memberName}님의 관리자 권한을 박탈하시겠습니까?`
      );

      if (!confirmRevoke) return;
      const { data } = await axios.get(`${URL}/admin/revoke/${selectedMember.memberId}`, {
        headers: { authorization: token }
      });
      if (data.success) {
        alert('관리자 권한이 박탈되었습니다.');
        getMemberList(page);
      } else {
        alert('관리자 권한 박탈에 실패했습니다.');
      }
    }
  };

  const adminGrant = async () => {
    if (selectedMember) {
      const confirmGrant = window.confirm(
        `${selectedMember.memberName}님에게 관리자 권한을 부여하시겠습니까?`
      );

      if (!confirmGrant) return;
      const { data } = await axios.get(`${URL}/admin/${selectedMember.memberId}`, {
        headers: { authorization: token }
      });
      if (data.success) {
        alert('관리자 권한이 부여되었습니다.');
        getMemberList(page);
      } else {
        alert('관리자 권한 부여에 실패했습니다.');
      }
    }
  };

  const goToPage = (page) => {
    setPage(page);
    getMemberList(page, activeDept, activePosition, sortField, sortDirection, search, state);
  };

  const memberAccept = async (member) => {
    const confirmAccept = window.confirm(
      `${member.memberName}님의 가입을 승인하시겠습니까?`
    );

    if (!confirmAccept) return;
    const { data } = await axios.get(`${URL}/admin/accept/${member.memberId}`, {
      headers: { authorization: token }
    });
    if (data.success) {
      alert('해당 회원의 회원가입이 승인되었습니다.');
      getMemberList(page);
    }
  }

  const memberReject = async (member) => {
    const confirmReject = window.confirm(
      `${member.memberName}님의 가입을 거절하시겠습니까?`
    );

    if (!confirmReject) return;
    const { data } = await axios.get(`${URL}/admin/reject/${member.memberId}`, {
      headers: { authorization: token }
    });
    if (data.success) {
      alert('해당 회원의 회원가입이 거절되었습니다.');
      getMemberList(page);
    }
  }

  // 회원과 채팅하기
  const chatWithMember = async (member) => {
    const { data } = await axios.post(`${URL}/room/private/`, {
      memberId: memberId,
      targetMemberId: member.memberId
    }, {
      headers: {
        authorization: token
      }
    });
    console.log(data);
    alert(member.memberId + ' 채팅하기');
    // 해당 회원과의 채팅방으로 이동
  }

  // 탈퇴 처리
  const memberWithdraw = async (member) => {
    const confirmWithdraw = window.confirm(
      `${member.memberName}님의 회원 탈퇴를 처리하시겠습니까?`
    );

    if (!confirmWithdraw) return;

    try {
      const { data } = await axios.post(`${URL}/memberInfo/withdraw`, {
        memberId: member.memberId,
        requesterId: sessionStorage.getItem('member_id')
      }, {
        headers: { Authorization: token }
      });
      if (data.success) {
        alert('탈퇴 처리가 완료되었습니다.');
        window.location.reload();
      }
    } catch (error) {
      if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert('탈퇴 처리에 실패했습니다.');
      }
    }
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
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
        <select className="memberList-sortSelect" onChange={(e) => {
          setPage(1);
          setSortField(e.target.value);
        }}>
          <option value="memberId">아이디</option>
          <option value="memberName">이름</option>
          <option value="joinDate">가입일</option>
          <option value="withdrawDate">탈퇴일</option>
        </select>
        <select className="memberList-sortSelect" onChange={(e) => {
          setPage(1);
          setSortDirection(e.target.value);
        }}>
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
        <select
          className={`memberList-sortSelect-state ${state === 'signUp' ? 'signUpStyle' : 'signUpWaitStyle'}`}
          value={state}
          onChange={(e) => {
            if (e.target.value === 'signUpWait' && adminYn !== 'true') {
              alert('가입 대기 회원 페이지는 관리자만 확인할 수 있습니다.');
              return;
            }
            setPage(1);
            setState(e.target.value);
          }}
        >
          <option value="signUp">가입 완료</option>
          <option value="signUpWait">가입 대기</option>
        </select>

        <div className="memberList-tagFilterButtons">
          {['전체', 'CS팀', '마케팅팀', '개발팀', '총괄'].map((deptName) => (
            <button
              key={deptName}
              className={`memberList-tagFilterBtn${activeDept === deptName ? ' active ' + deptName : ''}`}
              onClick={() => {
                setPage(1);
                handleClick(deptName, activePosition);
              }}
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
              onClick={() => {
                setPage(1);
                handleClick(activeDept, position);
              }}
            >
              {position}
            </button>
          ))}
        </div>
      </div>

      <div className="memberList-list">
        {memberList.members.map((member) => (
          <div className={`memberList-card ${member.acceptYn === false ? 'memberList-waitCard' : ''}`} key={member.memberId}>
            <div className="memberList-info">
              <div className="memberList-nameTagWrapper">
                <div className="memberList-tagsAndName">
                  <div className="memberList-tags">
                    <span className={`memberList-tag memberList-tag_${member.deptName}`}>{member.deptName}</span>
                    <span className={`memberList-tag memberList-tag_${member.position}`}>{member.position}</span>
                  </div>
                  <div className="memberList-name">
                    {member.adminYn && <span className="memberList-crown">👑 </span>}
                    {member.memberName}
                  </div>
                </div>

                {member.acceptYn === true && (
                  <div className="memberList-menu">
                    <button className="memberList-moreBtn" onClick={() => {
                      setSelectedMember(member);
                      toggleMenu(member.memberId);
                    }}>
                      <FiMoreVertical />
                    </button>
                    {openMenuId === member.memberId && adminYn === 'true' && (
                      <div className="memberList-dropdown">
                        <button onClick={memberInfoEdit}>회원 정보 수정</button>
                        {member.adminYn && <button onClick={adminRevoke}>관리자 권한 박탈</button>}
                        {!member.adminYn && <button onClick={adminGrant}>관리자 권한 부여</button>}
                        <button onClick={() => memberWithdraw(member)}>탈퇴 처리</button>
                        <button onClick={() => chatWithMember(member)}>채팅하기</button>
                      </div>
                    )}
                    {openMenuId === member.memberId && adminYn !== 'true' && (
                      <div className="memberList-dropdown">
                        <button onClick={() => chatWithMember(member)}>채팅하기</button>
                      </div>
                    )}
                  </div>
                )}
                {member.acceptYn === false && (
                  <div className="memberList-menu">
                    <button className="memberList-waitBtn-true" onClick={() => memberAccept(member)}>가입 승인</button>
                    <button className="memberList-waitBtn-false" onClick={() => memberReject(member)}>가입 거절</button>
                  </div>
                )}

              </div>

              <div className="memberList-id">
                <span className="label">아이디 </span>
                <span className="value">{member.memberId}</span>
              </div>

              <div className="memberList-meta">
                <div className="memberList-email">
                  <span className="label">이메일 </span>
                  <span className="value">{member.email || '-'}</span>
                </div>
                <div className="memberList-email">
                  <span className="label">성별 </span>
                  <span className="value">{member.memberGender || '-'}</span>
                </div>
              </div>

              <div className="memberList-meta">
                <div className="memberList-officePhone">
                  <TbDeviceDesktop />
                  <span className="label"> 사내 연락처 </span>
                  <span className="value">{member.officePhone || '-'}</span>
                </div>
                <div className="memberList-mobilePhone">
                  <MdOutlinePhoneAndroid />
                  <span className="label"> 개인 연락처 </span>
                  <span className="value">{member.mobilePhone || '-'}</span>
                </div>
              </div>

              <div className="memberList-joinDate">
                <span className="label">가입일 </span>
                <span className="value">{member.joinDate}</span>
              </div>

              <div className="memberList-withdrawDate">
                <span className="label">탈퇴일 </span>
                <span className="value">{member.withdrawDate || '-'}</span>
              </div>

            </div>
          </div>
        ))}
      </div>

      <div className="memberList-pagination">
        <button disabled={page === 1} onClick={() => goToPage(page - 1)}>이전</button>

        {Array.from({ length: totalPagesCount }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            className={pageNum === page ? 'active' : ''}
            onClick={() => goToPage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
        <button disabled={page === totalPagesCount} onClick={() => goToPage(page + 1)}>다음</button>
      </div>

      {/* 회원 정보 수정을 눌렀을 시 보이는 모달 */}
      {memberInfoEditModal && selectedMember && (
        <div className="memberList-modalBackdrop">
          <div className="memberList-modal">
            <div className="memberList-modalHeader">
              <h3>회원 정보 수정</h3>
            </div>

            <hr className="memberList-divider" />

            <div className="memberList-modalContent">
              <div className="memberList-modalContent-row">
                <label>이메일</label>
                <input type="email" name="email" value={selectedMember.email} onChange={(e) => setSelectedMember({ ...selectedMember, email: e.target.value })} />
              </div>

              <div className="memberList-modalContent-row">
                <label>이름</label>
                <input type="text" name="memberName" value={selectedMember.memberName} onChange={(e) => setSelectedMember({ ...selectedMember, memberName: e.target.value })} />
              </div>

              <div className="memberList-modalContent-row">
                <div className="memberList-modalContent-row-half">
                  <label>사내 연락처</label>
                  <input type="tel" name="officePhone" value={selectedMember.officePhone ?? ''} onChange={(e) => setSelectedMember({ ...selectedMember, officePhone: e.target.value })} />
                </div>
                <div className="memberList-modalContent-row-half">
                  <label>개인 연락처</label>
                  <input type="tel" name="mobilePhone" value={selectedMember.mobilePhone ?? ''} onChange={(e) => setSelectedMember({ ...selectedMember, mobilePhone: e.target.value })} />
                </div>
              </div>

              <div className="memberList-modalContent-row">
                <div className="memberList-modalContent-row-half">
                  <label>부서</label>
                  <select name="deptName" value={selectedMember.deptName} onChange={(e) => setSelectedMember({ ...selectedMember, deptName: e.target.value })}>
                    <option value="전체">전체</option>
                    <option value="CS팀">CS팀</option>
                    <option value="마케팅팀">마케팅팀</option>
                    <option value="개발팀">개발팀</option>
                  </select>
                </div>
                <div className="memberList-modalContent-row-half">
                  <label>직급</label>
                  <select name="position" value={selectedMember.position} onChange={(e) => setSelectedMember({ ...selectedMember, position: e.target.value })}>
                    <option value="전체">전체</option>
                    <option value="사원">사원</option>
                    <option value="대리">대리</option>
                    <option value="과장">과장</option>
                    <option value="차장">차장</option>
                    <option value="부장">부장</option>
                    <option value="이사">이사</option>
                    <option value="상무">상무</option>
                    <option value="전무">전무</option>
                    <option value="사장">사장</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="memberList-modalFooter">
              <button className="memberList-closeBtn" onClick={() => setMemberInfoEditModal(false)}>닫기</button>
              <button className="memberList-submitBtn" onClick={memberInfoUpdate}>완료</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Member;
