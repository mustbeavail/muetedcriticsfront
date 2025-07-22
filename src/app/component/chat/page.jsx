'use client';

import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import React, { useState, useMemo } from 'react';
import { FaSearch, FaPlus, FaThumbtack } from 'react-icons/fa';
import { FiSend, FiMoreVertical } from 'react-icons/fi';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

const ChatPage = () => {

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
                }}
                title="채팅방 만들기"
              />
              <FiMoreVertical
                className="chat_icon"
                onClick={() => {

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
                    {!memberList.find(member => member.dept === selectedDept) ? (
                      <li className="chat_noResult">해당 부서에 멤버가 없습니다.</li>
                    ) : (
                      memberList.find(member => member.dept === selectedDept).map((name, idx) => {
                        const alreadyAdded = chatRoomList.participants.some(parti => parti.memberName === name.memberName);
                        const position = name.position || '';
                        return (
                          <li
                            key={idx}
                            className={`chat_memberItem ${alreadyAdded ? 'chat_disabled' : ''}`}
                            onClick={() => {
                              if (!alreadyAdded) {
                                handleAddMember(name.memberId);
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
                const isPinned = pinnedRooms.includes(room.roomIdx);

                return (
                  <li
                    key={room.roomIdx}
                    className={
                      `chat_roomItem ${checkboxClass}
                      ${currentRoom?.roomIdx === room.roomIdx && !isCheckboxMode ? 'chat_activeRoom' : ''}
                      ${isPinned ? 'chat_pinned' : ''}
                      ${isSelected ? 'chat_selectedRoom' : ''}`}
                    onClick={() => {
                      if (isCheckboxMode) {
                        toggleRoomSelection(room.roomIdx);
                      } else {
                        handleRoomClick(room.roomIdx);
                      }
                    }}
                  >
                    <FaThumbtack
                      className={`chat_pinIcon ${isPinned ? 'chat_pinned' : ''}`}
                      onClick={e => {
                        e.stopPropagation();
                        togglePinRoom(room.roomIdx);
                      }}
                      title={isPinned ? '고정 해제' : '고정'}
                    />
                    <div className={`chat_roomItemInner ${room.pinned ? 'chat_pinnedRoom' : ''}`}>
                      <div className="chat_roomName">{room.roomName}</div>
                      <div className="chat_roomMeta">
                        <span className="chat_roomDate">{room.createdAt}</span>
                        <span className="chat_roomPreview">{room.lastMessage.msgContent}</span>
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
                onClick={LeaveSelectedRooms}
              >
                나가기
              </button>
            )}
          </div>
          {/* 여기까지봄 */}
          {/* === 우측: 채팅창 === */}
          <div className="chat_chatWindow">
            {currentRoom ? (
              <>
                {/* 채팅방 헤더 (상대방 정보) */}
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
                {/* 메시지 검색창 */}
                <div className="chat_messageSearchBox" style={{ marginBottom: '12px' }}>
                  <FaSearch style={{ marginRight: 6, color: '#a678e2' }} />
                  <input
                    type="text"
                    placeholder="메시지 검색"
                    value={messageSearchTerm}
                    onChange={e => setMessageSearchTerm(e.target.value)}
                  />
                </div>

                {/* 메시지 목록 표시 영역 */}
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

                {/* 메시지 입력창 */}
                <div className="chat_chatInput">
                  {isLeftMember ? (
                    /* 탈퇴한 멤버에게는 메시지 전송 불가 안내 */
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
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            if (e.nativeEvent.isComposing) return; // 한글 조합 중이면 무시
                            e.preventDefault();
                            if (input.trim() !== '' && !isSending) handleSend(e.target.value);
                          }
                        }}
                        disabled={isCheckboxMode}
                      />
                      <button className="chat_sendBtn" onClick={() => handleSend(input)} disabled={isCheckboxMode || input.trim() === '' || isSending}>
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
