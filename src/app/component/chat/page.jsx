'use client';

import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import React, { useState, useMemo, useEffect } from 'react';
import { FaSearch, FaPlus, FaThumbtack } from 'react-icons/fa';
import { FiSend, FiMoreVertical } from 'react-icons/fi';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import useWebSocket from './webSocket';
import axios from 'axios';

const ChatPage = () => {

  const URL = process.env.NEXT_PUBLIC_API_URL;
  const [token, setToken] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('dateDESC');
  const [isCheckboxMode, setIsCheckboxMode] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [selectedDept, setSelectedDept] = useState('');
  const [memberList, setMemberList] = useState([]);
  const [chatRoomList, setChatRoomList] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [currentMemberDetail, setCurrentMemberDetail] = useState(null);
  const [messageSearch, setMessageSearch] = useState('');
  const [message, setMessage] = useState('');
  const [selectedRoomsToLeave, setSelectedRoomsToLeave] = useState([]);
  const [deptList, setDeptList] = useState([]);
  const [memberId, setMemberId] = useState('');
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // 웹소켓 훅 사용
  const { sendMessage, messages, setMessages } = useWebSocket(token, memberId);

  // 로그인 체크
  useEffect(() => {
    const tokenRaw = sessionStorage.getItem('token');
    const memberIdRaw = sessionStorage.getItem('member_id');

    if (tokenRaw && memberIdRaw) {
      setToken(tokenRaw);
      setMemberId(memberIdRaw);
      setInitialized(true);

    } else {
      alert('로그인 후 이용해주세요.');
      location.href = '/';
    }
  }, []);

  // 로그인 체크 후 데이터 조회
  useEffect(() => {
    if (!initialized) return;
    getChatRoomList(token);
    getMemberList(token);
  }, [initialized]);

  // 정렬기준 바뀔때마다 채팅방 목록 조회
  useEffect(() => {
    if (!initialized) return;
    getChatRoomList(token);
  },[sortBy]);

  // 검색어 바뀔때마다 채팅방 목록 조회
  useEffect(() => {
    if (!initialized || search === '') return;
    getChatRoomList(token);
  }, [search]);

  // 채팅방 선택 시 메시지 내역 조회
  useEffect(() => {
    if (!initialized || !currentRoom) return;
    getChatMessageList(token, currentRoom.roomIdx);
  }, [currentRoom]);

  // 메시지 검색 시 메시지 내역 조회
  useEffect(() => {
    if (!initialized) return;
    if (!messageSearch) { setFilteredMessages(messages); return; }
    setFilteredMessages(messages.filter(msg => msg.msgContent.includes(messageSearch)));
  }, [messageSearch, messages]);

  // 멤버 목록 조회 함수
  const getMemberList = async (token) => {
    const {data} = await axios.get(`${URL}/memberInfo/list/0`, {
      headers: {
        'Authorization': token
      }
    });
    setMemberList(data.members);
    setDeptList([...new Set(data.members.map(member => member.deptName))]);
  };

  // 채팅방 목록 조회 함수
  const getChatRoomList = async (token) => {
    const {data} = await axios.get(`${URL}/rooms`, {
      headers: {
        'Authorization': token
      },
      params: {
        sortBy: sortBy,
        memberId: memberId,
        searchKeyword: search,
        searchType: 'memberName'
      }
    });
    setChatRoomList(data.content);
  };

  // 채팅 메시지 내역 조회 함수
  const getChatMessageList = async (token, roomIdx) => {
    const {data} = await axios.get(`${URL}/room/${roomIdx}/messages`, {
      headers: {
        'Authorization': token
      }
    });
    setMessages(data);
    setFilteredMessages(data);
  };

  // 채팅방 선택 함수
  const handleRoomClick = (roomIdx) => {
    setCurrentRoom(chatRoomList.find(room => room.roomIdx === roomIdx));
  };

  // 채팅방 다중 선택 함수
  const toggleRoomSelection = (roomIdx) => {
    setSelectedRoomsToLeave(prev => prev.includes(roomIdx) ? prev.filter(idx => idx !== roomIdx) : [...prev, roomIdx]);
  };

  // 채팅방 나가기 함수
  const LeaveSelectedRooms = async (roomIdxArray) => {
    try {
      // 모든 요청을 동시에 병렬로 처리
      const promises = roomIdxArray.map(roomIdx => 
        axios.post(`${URL}/room/${roomIdx}/leave`, 
          { memberId: memberId },
          { headers: { 'Authorization': token } }
        )
      );
      
      // 모든 요청이 완료될 때까지 대기
      const results = await Promise.all(promises);
      console.log('모든 방 나가기 완료:', results);
      
      // 성공한 방들만 UI에서 제거
      const succeededRooms = results
        .map((result, index) => result.data.success ? roomIdxArray[index] : null)
        .filter(roomIdx => roomIdx !== null);
      
      // UI 업데이트
      setChatRoomList(prev => 
        prev.filter(room => !succeededRooms.includes(room.roomIdx))
      );
      
      setSelectedRoomsToLeave([]);
      setIsCheckboxMode(false);
      
    } catch (error) {
      console.error('방 나가기 실패:', error);
      alert('일부 방 나가기에 실패했습니다.');
    }
  };

  // 멤버 상세정보 조회 함수
  const getMemberDetail = async (memberId) => {
    const {data} = await axios.get(`${URL}/memberInfo`, {
      headers: {
        'Authorization': token
      },
      params: {
        memberId: memberId
      }
    });
    setCurrentMemberDetail(data);
  };

  // 모달 닫기 함수
  const handleCloseModal = () => {
    setShowMemberModal(false);
    setShowAddMenu(false);
    setCurrentMemberDetail(null);
  };

  // 채팅방 추가 함수
  const createChatRoom = async (targetMemberId) => {
    const {data} = await axios.post(`${URL}/room/private`,
      {
      targetMemberId: targetMemberId,
      memberId: memberId
      },
      {
        headers: {
          'Authorization': token
        }
      }
    );
    setChatRoomList(prev => [...prev, data]);
    setShowAddMenu(false);
  };

  return (
    <>
      {/* === 상단 네비게이션 === */}
      <Header/>
      <Menu/>
      
      {/* === 메인 채팅 컨테이너 === */}
      <div className="chat_container">
        <div className="chat_wrapper">
          
          {/* === 좌측: 채팅방 목록 === */}
          <div className="chat_chatList">

            <div className="chat_searchAndBtn">
              <div className="chat_searchBox">
                <FaSearch />
                <input
                  type="text"
                  placeholder="이름으로 검색"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  disabled={isCheckboxMode}
                />
              </div>

              <select
                className="chat_sortSelect"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                disabled={isCheckboxMode}
                aria-label="채팅방 정렬 기준 선택"
              >
                <option value="dateDESC">날짜 최신순</option>
                <option value="dateASC">날짜 오래된순</option>
              </select>
            </div>

            <div className="chat_actionBtns">
              <FaPlus
                className="chat_icon"
                onClick={() => {
                  setShowAddMenu(prev => !prev);
                }}
                title="채팅방 만들기"
              />
              <FiMoreVertical
                className="chat_icon"
                onClick={() => {
                  setIsCheckboxMode(prev => !prev);
                }}
                title="선택 모드 토글"
              />
            </div>

            {/* 멤버 추가 모달 */}
            {showAddMenu && (
              <div className="chat_modalBackdrop" onClick={() => setShowAddMenu(false)}>
                <div className="chat_addMemberModal" onClick={e => e.stopPropagation()}>
                  <h3>멤버 추가</h3>
                  <div className="chat_teamFilter">
                    {deptList.map(dept => (
                      <button
                        key={dept}
                        className={`chat_teamBtn ${selectedDept === dept ? 'chat_activeTeamBtn' : ''}`}
                        onClick={() => setSelectedDept(dept)}
                      >
                        {dept}
                      </button>
                    ))}
                  </div>

                  <ul className="chat_memberList">
                  {memberList.filter(member =>
                  !selectedDept || member.deptName === selectedDept).length === 0 ? (
                      <li className="chat_noResult">해당 부서에 멤버가 없습니다.</li>
                    ) : (
                      memberList.filter(member => member.deptName === selectedDept).map((name, idx) => {
                        const alreadyAdded = chatRoomList.some(room => 
                          room.participants?.some(p => p.memberId !== memberId && p.memberName === name.memberName)
                        );
                        const position = name.position || '';
                        return (
                          <li
                            key={idx}
                            className={`chat_memberItem ${alreadyAdded ? 'chat_disabled' : ''}`}
                            onClick={() => {
                              if (!alreadyAdded) {
                                createChatRoom(name.memberId);
                              }
                            }}
                            style={{ cursor: alreadyAdded ? 'not-allowed' : 'pointer', opacity: alreadyAdded ? 0.5 : 1 }}
                            title={alreadyAdded ? '이미 대화중인 회원입니다.' : ''}
                          >
                            <span className="chat_memberName">{name.memberName}</span>
                            <span className="chat_memberPosition">{position}</span>
                          </li>
                        );
                      })
                    )}
                  </ul>
                  <button className="chat_modalCloseBtn" onClick={() => setShowAddMenu(false)}>
                    닫기
                  </button>
                </div>
              </div>
            )}

            <ul className="chat_roomList">
              {chatRoomList.length === 0 && <li className="chat_noResult">검색 결과가 없습니다.</li>}

              {chatRoomList.map(room => {
                const isSelected = selectedRoomsToLeave.includes(room.roomIdx);
                const checkboxClass = isCheckboxMode ? 'chat_checkboxModeRoomItem' : '';

                return (
                  <li
                    key={room.roomIdx}
                    className={
                      `chat_roomItem ${checkboxClass}
                      ${currentRoom?.roomIdx === room.roomIdx && !isCheckboxMode ? 'chat_activeRoom' : ''}
                      ${isSelected ? 'chat_selectedRoom' : ''}`}
                    onClick={() => {
                      if (isCheckboxMode) {
                        toggleRoomSelection(room.roomIdx);
                      } else {
                        handleRoomClick(room.roomIdx);
                      }
                    }}
                  >
                    <div className={`chat_roomItemInner`}>
                      <div className="chat_roomName">{room.roomName}</div>
                      <div className="chat_roomMeta">
                        <span className="chat_roomDate">{room.createdAt}</span>
                        <span className="chat_roomPreview">{room.lastMessage?.msgContent || '메시지가 없습니다.'}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* 다중 선택 모드일 때 나가기 버튼 */}
            {isCheckboxMode && (
              <button
                className="chat_leaveBtn"
                disabled={selectedRoomsToLeave.length === 0}
                onClick={() => LeaveSelectedRooms(selectedRoomsToLeave)}
              >
                나가기
              </button>
            )}
          </div>
          {/* === 우측: 채팅창 === */}
          <div className="chat_chatWindow">
            {currentRoom ? (
              <>
                {/* 채팅방 헤더 (상대방 정보) */}
                <div className="chat_chatHeader">
                  <div className="chat_userInfo">
                    <span className="chat_chatName">{currentRoom.roomName}</span>
                    <span className="chat_chatTag">{currentRoom.participants.find(parti => parti.memberId !== memberId).deptName || '팀 정보 없음'}</span>
                    <span className="chat_chatTag">{currentRoom.participants.find(parti => parti.memberId !== memberId).position || '직급 정보 없음'}</span>
                  </div>
                  <div className="chat_chatActions">
                    <button className="chat_headerBtn" onClick={() => {
                      getMemberDetail(currentRoom.participants.find(parti => parti.memberId !== memberId).memberId);
                      setShowMemberModal(true);
                    }}>
                      상세 정보 보기
                    </button>
                  </div>
                </div>
                {/* 메시지 검색창 */}
                <div className="chat_messageSearchBox" style={{ marginBottom: '12px' }}>
                  <FaSearch style={{ marginRight: 6, color: '#a678e2' }} />
                  <input
                    type="text"
                    placeholder="메시지 검색"
                    value={messageSearch}
                    onChange={e => setMessageSearch(e.target.value)}
                  />
                </div>

                {/* 메시지 목록 표시 영역 */}
                <div className="chat_chatBody">
                  {filteredMessages.length === 0 && <div className="chat_noMsg">대화가 없습니다.</div>}
                  {filteredMessages.map(msg => (
                    <div
                      key={msg.msgIdx}
                      className={`${msg.senderId === memberId ? 'chat_myMsg' : 'chat_otherMsg'} ${msg.highlight ? 'chat_highlight' : ''}`}
                    >
                      <div className="chat_bubble">{msg.msgContent}</div>
                      <span className="chat_time">{msg.sentAt}</span>
                    </div>
                  ))}
                </div>

                {/* 메시지 입력창 */}
                <div className="chat_chatInput">
                  {currentRoom.participants.find(parti => parti.memberId !== memberId).withdrawalAt ? (
                    /* 탈퇴한 멤버에게는 메시지 전송 불가 안내 */
                    <div className="chat_leftMemberNotice">
                      이 회원은 탈퇴한 상태이므로 메시지 전송이 불가능합니다.
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="상대방에게 보낼 채팅을 입력해주세요."
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            if (e.nativeEvent.isComposing) return; // 한글 조합 중이면 무시
                            e.preventDefault();
                            if (message.trim() !== '') sendMessage(
                              currentRoom.roomIdx,
                              memberId,
                              currentRoom.participants
                              .filter(parti => parti.memberId !== memberId)[0].memberId,
                              message);
                              setMessage('');
                          }
                        }}
                        disabled={isCheckboxMode}
                      />
                      <button className="chat_sendBtn" onClick={() => {
                        sendMessage(
                        currentRoom.roomIdx,
                        memberId,
                        currentRoom.participants
                        .filter(parti => parti.memberId !== memberId)[0].memberId,
                        message);
                        setMessage('');
                        }}
                        disabled={isCheckboxMode || message.trim() === ''}>
                        <FiSend />
                      </button>
                    </>
                  )}
                </div>
                {/* 멤버 상세정보 모달 */}
                {showMemberModal && currentRoom && (
                <div className="chat_modalBackdrop" onClick={handleCloseModal}>
                  <div className="chat_modal" onClick={e => e.stopPropagation()}>
                    <h3>상세 정보</h3>
                    <div className="chat_memberInfo">
                      <div className="chat_infoRow">
                        <span className="chat_label">이름</span>
                        <span className="chat_value">{currentMemberDetail?.memberName}</span>
                      </div>
                      <div className="chat_infoRow">
                        <span className="chat_label">팀</span>
                        <span className="chat_value">{currentMemberDetail?.deptName || '-'}</span>
                      </div>
                      <div className="chat_infoRow">
                        <span className="chat_label">직급</span>
                        <span className="chat_value">{currentMemberDetail?.position || '-'}</span>
                      </div>
                      {currentMemberDetail.withdrawalAt ? (
                        <div className="chat_infoRow">
                          <span className="chat_label">탈퇴일</span>
                          <span className="chat_value">{currentMemberDetail.withdrawalAt}</span>
                        </div>
                      )
                      : (
                      <>
                      </>)}
                    </div>
                    <button className="chat_modalCloseBtn" onClick={handleCloseModal}>닫기</button>
                  </div>
                </div>
              )}
              </>
            ) : (
              <div className="chat_noResult">선택된 채팅방이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
