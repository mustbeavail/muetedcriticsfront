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

  const [notiList, setNotiList] = useState([]);
  const [token, setToken] = useState('');
  const [memberId, setMemberId] = useState('');
  const [notiCheckCnt, setNotiCheckCnt] = useState(0);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notifications, setNotifications] = useState(0);

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

  const getNotiList = async (token, memberId) => {
    try {
    const { data } = await axios.get(`${URL}/notice/chat/list`, {
      headers: { Authorization: token },
      params: {
        memberId : memberId
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
    </header>
  );
};

export default Header;
