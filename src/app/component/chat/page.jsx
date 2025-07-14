'use client';

import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import React, { useState, useMemo } from 'react';
import { FaSearch, FaPlus, FaThumbtack } from 'react-icons/fa';
import { FiSend, FiMoreVertical } from 'react-icons/fi';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

const initialRooms = [
  { id: 1, name: '유수정', date: '25.07.02', preview: '새로운 메시지가 있습니다' },
  { id: 2, name: '홍민수', date: '25.06.12', preview: '새로운 메시지가 있습니다' },
  { id: 3, name: '박진수', date: '25.04.15', preview: '새로운 메시지가 있습니다' },
];

const initialRoomMessages = {
  1: [{ id: 1, sender: 'other', text: '이거 어때요?', time: '9:42' }],
  2: [{ id: 2, sender: 'me', text: '의견 주시면 반영할게요!', time: '10:02' }],
  3: [{ id: 3, sender: 'other', text: '광고 캠페인 결과 공유 부탁드려요.', time: '8:20' }],
};

const allMembers = [
  { name: '유수정', team: '마케팅팀', position: '팀장' },
  { name: '홍민수', team: '개발팀', position: '사원' },
  { name: '박진수', team: '기획팀', position: '대리' },
  { name: '김민지', team: '마케팅팀', position: '사원' },
  { name: '최준영', team: '개발팀', position: '팀장' },
  { name: '이소영', team: '총괄', position: '대표' },
  { name: '정하늘', team: 'CS팀', position: '사원' },
  { name: '박해민', team: 'CS팀', position: '대리' },
];

const memberDetails = {
  '유수정': { team: '마케팅팀', position: '팀장', leaveDate: '9999-99-99' },
  '홍민수': { team: '개발팀', position: '사원', leaveDate: '9999-99-99' },
  '박진수': { team: '기획팀', position: '대리', leaveDate: '2025-06-30' },
  '김민지': { team: '마케팅팀', position: '사원', leaveDate: '9999-99-99' },
  '최준영': { team: '개발팀', position: '팀장', leaveDate: '9999-99-99' },
  '이소영': { team: '총괄', position: '대표', leaveDate: '9999-99-99' },
  '정하늘': { team: 'CS팀', position: '사원', leaveDate: '9999-99-99' },
  '박해민': { team: 'CS팀', position: '대리', leaveDate: '9999-99-99' },
};

const teamOptions = ['전체', 'CS팀', '마케팅팀', '개발팀', '총괄'];

const ChatPage = () => {
  const [chatRooms, setChatRooms] = useState(initialRooms);
  const [roomMessages, setRoomMessages] = useState(initialRoomMessages);
  const [currentRoom, setCurrentRoom] = useState(initialRooms[0]);
  const [messages, setMessages] = useState(initialRoomMessages[initialRooms[0].id]);
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [messageSearchTerm, setMessageSearchTerm] = useState('');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [isCheckboxMode, setIsCheckboxMode] = useState(false);
  const [selectedRoomsToLeave, setSelectedRoomsToLeave] = useState([]);

  
  const [lastReadMessageIds, setLastReadMessageIds] = useState(() => {
    const init = {};
    for (const room of initialRooms) {
      init[room.id] = 0;
    }
    return init;
  });
  
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [pinnedRooms, setPinnedRooms] = useState([]);
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('전체');

  const getToday = () => {
    const today = new Date();
    return `${today.getFullYear() % 100}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
  };

  const getNextRoomId = () => {
    if (chatRooms.length === 0) return 1;
    return Math.max(...chatRooms.map(r => r.id)) + 1;
  };

  const handleRoomClick = (room) => {
    if (isCheckboxMode) return;

    const msgs = roomMessages[room.id] || [];
    setCurrentRoom(room);
    setMessages(msgs);
    setInput('');
    setShowAddMenu(false);

    if (msgs.length > 0) {
      const lastMsgId = msgs[msgs.length - 1].id;
      setLastReadMessageIds(prev => ({ ...prev, [room.id]: lastMsgId }));
    }
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    const now = new Date();

    const currentMemberDetail = currentRoom ? memberDetails[currentRoom.name] : null;
    const isLeftMember = currentMemberDetail && currentMemberDetail.leaveDate !== '9999-99-99';
    if (isLeftMember) return;

    const newMessage = {
      id: messages.length > 0 ? messages[messages.length - 1].id + 1 : 1,
      sender: 'me',
      text: input,
      time: `${now.getHours()}시 ${String(now.getMinutes()).padStart(2, '0')}분`,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setRoomMessages(prev => ({ ...prev, [currentRoom.id]: updatedMessages }));

    setChatRooms(prevRooms =>
      prevRooms.map(room =>
        room.id === currentRoom.id ? { ...room, preview: newMessage.text, date: getToday() } : room
      )
    );

    setInput('');
    setLastReadMessageIds(prev => ({ ...prev, [currentRoom.id]: newMessage.id }));
  };

  const toggleRoomSelection = (roomId) => {
    setSelectedRoomsToLeave(prev =>
      prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]
    );
  };

  const handleLeaveSelectedRooms = () => {
    if (selectedRoomsToLeave.length === 0) return;

    const updatedRooms = chatRooms.filter(room => !selectedRoomsToLeave.includes(room.id));
    setChatRooms(updatedRooms);
    setSelectedRoomsToLeave([]);
    setIsCheckboxMode(false);

    if (currentRoom && selectedRoomsToLeave.includes(currentRoom.id)) {
      if (updatedRooms.length > 0) {
        const newRoom = updatedRooms[0];
        setCurrentRoom(newRoom);
        const msgs = roomMessages[newRoom.id] || [];
        setMessages(msgs);
        if (msgs.length > 0) {
          setLastReadMessageIds(prev => ({ ...prev, [newRoom.id]: msgs[msgs.length - 1].id }));
        }
      } else {
        setCurrentRoom(null);
        setMessages([]);
      }
    }
  };

  const handleAddMember = (name) => {
    setShowAddMenu(false);
    setSelectedTeamFilter('전체');
    const existingRoom = chatRooms.find(room => room.name === name);
    if (existingRoom) {
      if (!isCheckboxMode) {
        handleRoomClick(existingRoom);
      }
      return;
    }
    const newId = getNextRoomId();
    const today = getToday();
    const newRoom = {
      id: newId,
      name: name,
      date: today,
      preview: '',
    };
    setRoomMessages(prev => ({ ...prev, [newId]: [] }));
    setChatRooms(prev => [...prev, newRoom]);
    if (!isCheckboxMode) {
      handleRoomClick(newRoom);
    }
    setLastReadMessageIds(prev => ({ ...prev, [newId]: 0 }));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const togglePinRoom = (roomId) => {
    setPinnedRooms(prev => {
      if (prev.includes(roomId)) return prev.filter(id => id !== roomId);
      return [...prev, roomId];
    });
  };

  const sortedRooms = useMemo(() => {
    const pinnedSet = new Set(pinnedRooms);
    const pinned = chatRooms.filter(r => pinnedSet.has(r.id));
    const notPinned = chatRooms.filter(r => !pinnedSet.has(r.id));

    const sortFn = (a, b) => {
      if (sortBy === 'date') {
        const parseDate = (str) => {
          const [yy, mm, dd] = str.split('.').map(Number);
          return new Date(2000 + yy, mm - 1, dd);
        };
        return parseDate(b.date) - parseDate(a.date);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    };

    pinned.sort(sortFn);
    notPinned.sort(sortFn);

    return [...pinned, ...notPinned];
  }, [chatRooms, pinnedRooms, sortBy]);

  const filteredRooms = sortedRooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMessages = useMemo(() => {
    if (!messageSearchTerm.trim()) return messages;
    const term = messageSearchTerm.toLowerCase();
    return messages.map(msg => ({
      ...msg,
      highlight: msg.text.toLowerCase().includes(term),
    }));
  }, [messages, messageSearchTerm]);

  const filteredMembers = useMemo(() => {
    if (selectedTeamFilter === '전체') return allMembers.map(m => m.name);
    return allMembers.filter(m => m.team === selectedTeamFilter).map(m => m.name);
  }, [selectedTeamFilter]);

  const handleShowMemberDetail = () => setShowMemberModal(true);
  const handleCloseModal = () => setShowMemberModal(false);

  const currentMemberDetail = currentRoom ? memberDetails[currentRoom.name] : null;
  const isLeftMember = currentMemberDetail && currentMemberDetail.leaveDate !== '9999-99-99';

  return (
    <>
      <Header/>
      <Menu/>
      <div className="chat_container">
        <div className="chat_wrapper">
          <div className="chat_chatList">

            <div className="chat_searchAndBtn">
              <div className="chat_searchBox">
                <FaSearch />
                <input
                  type="text"
                  placeholder="이름으로 검색"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  disabled={isCheckboxMode}
                />
              </div>

              <select
                className="chat_sortSelect"
                value={sortBy}
                onChange={handleSortChange}
                disabled={isCheckboxMode}
                aria-label="채팅방 정렬 기준 선택"
              >
                <option value="date">날짜순</option>
                <option value="name">이름순</option>
              </select>
            </div>

            <div className="chat_actionBtns">
              <FaPlus
                className="chat_icon"
                onClick={() => {
                  setShowAddMenu(prev => !prev);
                  setIsCheckboxMode(false);
                  setSelectedRoomsToLeave([]);
                }}
                title="채팅방 만들기"
              />
              <FiMoreVertical
                className="chat_icon"
                onClick={() => {
                  setIsCheckboxMode(prev => !prev);
                  setShowAddMenu(false);
                  setSelectedRoomsToLeave([]);
                }}
                title="선택 모드 토글"
              />
            </div>

            {showAddMenu && (
              <div className="chat_modalBackdrop" onClick={() => setShowAddMenu(false)}>
                <div className="chat_addMemberModal" onClick={e => e.stopPropagation()}>
                  <h3>멤버 추가</h3>
                  <div className="chat_teamFilter">
                    {teamOptions.map(team => (
                      <button
                        key={team}
                        className={`chat_teamBtn ${selectedTeamFilter === team ? 'chat_activeTeamBtn' : ''}`}
                        onClick={() => setSelectedTeamFilter(team)}
                      >
                        {team}
                      </button>
                    ))}
                  </div>

                  <ul className="chat_memberList">
                    {filteredMembers.length === 0 ? (
                      <li className="chat_noResult">해당 부서에 멤버가 없습니다.</li>
                    ) : (
                      filteredMembers.map((name, idx) => {
                        const alreadyAdded = chatRooms.some(room => room.name === name);
                        const position = memberDetails[name]?.position || '';
                        return (
                          <li
                            key={idx}
                            className={`chat_memberItem ${alreadyAdded ? 'chat_disabled' : ''}`}
                            onClick={() => {
                              if (!alreadyAdded) {
                                handleAddMember(name);
                              }
                            }}
                            style={{ cursor: alreadyAdded ? 'not-allowed' : 'pointer', opacity: alreadyAdded ? 0.5 : 1 }}
                            title={alreadyAdded ? '이미 채팅방이 존재하는 회원입니다.' : ''}
                          >
                            <span className="chat_memberName">{name}</span>
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
              {filteredRooms.length === 0 && <li className="chat_noResult">검색 결과가 없습니다.</li>}

              {filteredRooms.map(room => {
                const isSelected = selectedRoomsToLeave.includes(room.id);
                const checkboxClass = isCheckboxMode ? 'chat_checkboxModeRoomItem' : '';
                const isPinned = pinnedRooms.includes(room.id);

                return (
                  <li
                    key={room.id}
                    className={`chat_roomItem ${checkboxClass} ${currentRoom?.id === room.id && !isCheckboxMode ? 'chat_activeRoom' : ''} ${isPinned ? 'chat_pinned' : ''} ${isSelected ? 'chat_selectedRoom' : ''}`}
                    onClick={() => {
                      if (isCheckboxMode) {
                        toggleRoomSelection(room.id);
                      } else {
                        handleRoomClick(room);
                      }
                    }}
                  >
                    <FaThumbtack
                      className={`chat_pinIcon ${isPinned ? 'chat_pinned' : ''}`}
                      onClick={e => {
                        e.stopPropagation();
                        togglePinRoom(room.id);
                      }}
                      title={isPinned ? '고정 해제' : '고정'}
                    />
                    <div className={`chat_roomItemInner ${room.pinned ? 'chat_pinnedRoom' : ''}`}>
                      <div className="chat_roomName">{room.name}</div>
                      <div className="chat_roomMeta">
                        <span className="chat_roomDate">{room.date}</span>
                        <span className="chat_roomPreview">{room.preview}</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {isCheckboxMode && (
              <button
                className="chat_leaveBtn"
                disabled={selectedRoomsToLeave.length === 0}
                onClick={handleLeaveSelectedRooms}
              >
                나가기
              </button>
            )}
          </div>

          <div className="chat_chatWindow">
            {currentRoom ? (
              <>
                <div className="chat_chatHeader">
                  <div className="chat_userInfo">
                    <span className="chat_chatName">{currentRoom.name}</span>
                    <span className="chat_chatTag">{currentMemberDetail?.team || '팀 정보 없음'}</span>
                    <span className="chat_chatTag">{currentMemberDetail?.position || '직급 정보 없음'}</span>
                  </div>
                  <div className="chat_chatActions">
                    <button className="chat_headerBtn" onClick={handleShowMemberDetail}>
                      상세 정보 보기
                    </button>
                  </div>
                </div>
                <div className="chat_messageSearchBox" style={{ marginBottom: '12px' }}>
                  <FaSearch style={{ marginRight: 6, color: '#a678e2' }} />
                  <input
                    type="text"
                    placeholder="메시지 검색"
                    value={messageSearchTerm}
                    onChange={e => setMessageSearchTerm(e.target.value)}
                  />
                </div>

                <div className="chat_chatBody">
                  {filteredMessages.length === 0 && <div className="chat_noMsg">대화가 없습니다.</div>}
                  {filteredMessages.map(msg => (
                    <div
                      key={msg.id}
                      className={`${msg.sender === 'me' ? 'chat_myMsg' : 'chat_otherMsg'} ${msg.highlight ? 'chat_highlight' : ''}`}
                    >
                      <div className="chat_bubble">{msg.text}</div>
                      <span className="chat_time">{msg.time}</span>
                    </div>
                  ))}
                </div>

                <div className="chat_chatInput">
                  {isLeftMember ? (
                    <div className="chat_leftMemberNotice">
                      이 회원은 탈퇴한 상태이므로 메시지 전송이 불가능합니다.
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="상대방에게 보낼 채팅을 입력해주세요."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        disabled={isCheckboxMode}
                      />
                      <button className="chat_sendBtn" onClick={handleSend} disabled={isCheckboxMode || input.trim() === ''}>
                        <FiSend />
                      </button>
                    </>
                  )}
                </div>
                {showMemberModal && currentRoom && (
                <div className="chat_modalBackdrop" onClick={handleCloseModal}>
                  <div className="chat_modal" onClick={e => e.stopPropagation()}>
                    <h3>상세 정보</h3>
                    <div className="chat_memberInfo">
                      <div className="chat_infoRow">
                        <span className="chat_label">이름</span>
                        <span className="chat_value">{currentRoom.name}</span>
                      </div>
                      <div className="chat_infoRow">
                        <span className="chat_label">팀</span>
                        <span className="chat_value">{currentMemberDetail?.team || '-'}</span>
                      </div>
                      <div className="chat_infoRow">
                        <span className="chat_label">직급</span>
                        <span className="chat_value">{currentMemberDetail?.position || '-'}</span>
                      </div>
                      {currentMemberDetail?.leaveDate !== '9999-99-99' && currentMemberDetail?.leaveDate && (
                        <div className="chat_infoRow">
                          <span className="chat_label">탈퇴일</span>
                          <span className="chat_value">{currentMemberDetail.leaveDate}</span>
                        </div>
                      )}
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
