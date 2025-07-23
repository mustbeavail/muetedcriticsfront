'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { IoIosNotificationsOutline, IoIosNotifications } from 'react-icons/io';
import { FiArrowRightCircle, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';

const Header = () => {

  const router = useRouter();
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const id = typeof window !== "undefined" ? sessionStorage.getItem('member_id') : null;
  const [myInfo, setMyInfo] = useState(null);

  const [notiList, setNotiList] = useState([]);
  const [token, setToken] = useState('');
  const [memberId, setMemberId] = useState('');
  const [notiCheckCnt, setNotiCheckCnt] = useState(0);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notifications, setNotifications] = useState(0);
  const [showMyInfoModal, setShowMyInfoModal] = useState(false);

  const hideTimer = useRef(null);

  const toggleNotificationModal = () => setShowNotificationModal(prev => !prev);

  const goToChatRoom = (idx) => {
    setNotiCheck(token, idx);
    router.push(`/chat/${idx}`);
  };

  useEffect(() => {
    const tokenRaw = sessionStorage.getItem('token');
    const memberIdRaw = sessionStorage.getItem('member_id');
    setToken(tokenRaw);
    setMemberId(memberIdRaw);
    getNotiList(tokenRaw, memberIdRaw);
  }, []);

  useEffect(() => {
    if (notiCheckCnt === 0) return;
    getNotiList(token, memberId);
  }, [notiCheckCnt]);

  // 내 정보 띄우기
  useEffect(() => {
    if (token && memberId && id) {
      getMyInfo();
    }
  }, [token, memberId, id]);

  const getNotiList = async (token, memberId) => {
    try {
      const { data } = await axios.get(`${URL}/notice/chat/list`, {
        headers: { Authorization: token },
        params: {
          memberId: memberId
        }
      });
      setNotiList(data.notiList);
    } catch (error) {
      alert("알림 목록을 불러오는데 실패했습니다.");
    }
  };

  const setNotiCheck = async (token, notiIdx) => {
    try {
      const { data } = await axios.put(`${URL}/notice/read`,
        { notiIdx: notiIdx },
        { headers: { Authorization: token } }
      );
      setNotiCheckCnt(prev => prev + 1);
    } catch (error) {
      alert("알림 읽음 처리를 실패했습니다.");
    }
  };

  useEffect(() => {
    setNotifications(notiList.length);
    if (showNotificationModal && notiList.length === 0) {
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        setShowNotificationModal(false);
      }, 5000);
    }
    return () => clearTimeout(hideTimer.current);
  }, [showNotificationModal, notiList]);

  // 내 정보 가져오기
  const getMyInfo = async () => {
    const { data } = await axios.get(`${URL}/memberInfo`,
      {
        headers: { Authorization: token },
        params: {
          member_id: id
        }
      }
    );
    setMyInfo(data);
  };

  const toggleMyInfoModal = () => setShowMyInfoModal(prev => !prev);

  return (
    <header className={styles.header}>
      <div className={styles.header_leftSection}></div>

      <div className={styles.header_userSection}>
        <div
          className={styles.header_notificationWrapper}
          onClick={toggleNotificationModal}
          tabIndex={0}
          role="button"
          aria-label="알림 보기"
          onKeyDown={(e) => { if (e.key === 'Enter') toggleNotificationModal(); }}
        >
          {notifications > 0 ? (
            <>
              <IoIosNotifications className={styles.header_bellIcon} />
              <span className={styles.header_badge}>
                {notifications > 10 ? '10+' : notifications}
              </span>
            </>
          ) : (
            <IoIosNotificationsOutline className={styles.header_bellIcon} />
          )}
        </div>

        <div className={styles.header_userInfoWrapper}>
          <div className={styles.header_userInfo}>
            <button className={styles.header_userInfoName} onClick={toggleMyInfoModal}>
              {myInfo?.deptName} {myInfo?.positionName} {myInfo?.memberName} 님
            </button>
          </div>
        </div>
      </div>

      {showNotificationModal && (
        <div className={styles.header_notificationModal}>
          <div className={styles.header_modalContent}>
            {notiList.length > 0 ? (
              <ul className={styles.header_notificationList}>
                {notiList.map((notif) => (
                  <li
                    key={notif.notiIdx}
                    className={styles.header_notificationItem}
                    onClick={() => setNotiCheck(token, notif.notiIdx)}
                  >
                    <div className={styles.header_notifHeader}>
                      <strong className={styles.header_notifSender}>{notif.memberName}</strong>
                      <span className={styles.header_notifDate}>{notif.createdAt.split('T')[0]}</span>
                    </div>
                    <div className={styles.header_notifContent}>
                      <span className={styles.header_notifMessage}>{notif.contentPre}</span>
                      <FiArrowRightCircle
                        className={styles.header_goChatIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToChatRoom(notif.notiIdx);
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>새로운 알림이 없습니다.</p>
            )}
          </div>
        </div>
      )}



      {showMyInfoModal && myInfo && (
        <div className={styles.fullscreen_modalOverlay}>
          <div className={styles.fullscreen_modalContent}>
            {/* 이름 + 태그 */}
            <div className={styles.modalTitle}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', display: 'inline-block', marginRight: '8px' }}>
                {myInfo.memberName}
              </h2>
              <span className={styles.badge}>{myInfo.deptName}</span>
              <span className={styles.badge}>{myInfo.positionName}</span>
            </div>

            {/* 정보 리스트 */}
            <ul className={styles.infoList}>
              <li>
                <span className={styles.modalLabel}>아이디</span>
                <span>{myInfo.memberId}</span>
              </li>
              <li>
                <span className={styles.modalLabel}>이메일</span>
                <span>{myInfo.email}</span>
              </li>
              <li>
                <span className={styles.modalLabel}>사내 연락처</span>
                <span>{myInfo.officePhone}</span>
              </li>
              <li>
                <span className={styles.modalLabel}>개인 연락처</span>
                <span>{myInfo.mobilePhone}</span>
              </li>
            </ul>

            <div className={styles.modalButtonGroup}>
              <button className={styles.modalCloseButton} onClick={toggleMyInfoModal}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}




    </header>
  );
};

export default Header;
