'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { IoIosNotificationsOutline, IoIosNotifications } from 'react-icons/io';
import { FiArrowRightCircle, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';

const Header = ({token}) => {

  const router = useRouter();
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const [notiList, setNotiList] = useState([]);

  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notifications, setNotifications] = useState(0);

  const hideTimer = useRef(null);

  const toggleNotificationModal = () => setShowNotificationModal(prev => !prev);

  const goToChatRoom = (idx) => {
    deleteNotificationByIdx(idx);
    router.push(`/chat/${idx}`);
  };

  useEffect(() => {
    if (!token) return;
    getNotiList(token);
  }, [token]);

  const getNotiList = async (token) => {
    try {
    const { data } = await axios.get(`${URL}/notice/chat/list`, {
      headers: { Authorization: token },
      params: {
        memberId: sessionStorage.getItem('memberId'),
      }
      });
      setNotiList(data.notiList);
    } catch (error) {
      alert("알림 목록을 불러오는데 실패했습니다.");
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

            {notiList.length > 0 && (
              <div className={styles.header_deleteAllWrapper}>
                <button
                  className={styles.header_deleteAllBtn}
                  onClick={deleteAllNotifications}
                  aria-label="전체 알림 삭제"
                  type="button"
                >
                  <FiTrash2 style={{ marginRight: 6, fontSize: 18 }} />
                  전체 삭제
                </button>
              </div>
            )}

            {notiList.length > 0 ? (
              <ul className={styles.header_notificationList}>
                {notiList.map((notif) => (
                  <li
                    key={notif.idx}
                    className={styles.header_notificationItem}
                    onClick={() => deleteNotificationByIdx(notif.idx)}
                  >
                    <div className={styles.header_notifHeader}>
                      <strong className={styles.header_notifSender}>{notif.sender}</strong>
                      <span className={styles.header_notifDate}>{notif.date}</span>
                    </div>
                    <div className={styles.header_notifContent}>
                      <span className={styles.header_notifMessage}>{notif.message}</span>
                      <FiArrowRightCircle
                        className={styles.header_goChatIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToChatRoom(notif.idx);
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
