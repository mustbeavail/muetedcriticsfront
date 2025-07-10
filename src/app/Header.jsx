'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import { IoIosNotificationsOutline, IoIosNotifications } from "react-icons/io";


const Header = () => {
  
  const [user] = useState('김지훈');
  const [depa] = useState('개발팀');
  const [position] = useState('팀장');

  const [profile] = useState({
    name: user,
    department: depa,
    position: position,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const [notificationsList, setNotificationsList] = useState([
    { id: 1, sender: '이효진', message: '새 메시지가 있습니다', date: '2025-07-03' },
    { id: 2, sender: '이효진', message: '새 메시지가 있습니다', date: '2025-07-03' },
    { id: 3, sender: '이효진', message: '새 메시지가 있습니다', date: '2025-07-03' },
    { id: 4, sender: '이효진', message: '새 메시지가 있습니다', date: '2025-07-03' },
    { id: 5, sender: '이효진', message: '새 메시지가 있습니다', date: '2025-07-03' },
  ]);

  const notifications = notificationsList.length;
  const hideTimer = useRef(null);

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSearch(); };

  const toggleNotificationModal = () => setShowNotificationModal(prev => !prev);

  const handleNotificationClick = (id) => {
    setNotificationsList(prev => prev.filter(item => item.id !== id));
  };

  useEffect(() => {
    if (showNotificationModal && notificationsList.length === 0) {
      clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        setShowNotificationModal(false);
      }, 5000);
    }

    return () => clearTimeout(hideTimer.current);
  }, [showNotificationModal, notificationsList]);

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
      </div>

      <div className={styles.userSection}>
        <div
          className={styles.notificationWrapper}
          onClick={toggleNotificationModal}
          tabIndex={0}
          role="button"
          aria-label="알림 보기"
          onKeyDown={(e) => { if (e.key === 'Enter') toggleNotificationModal(); }}
        >
          {notifications > 0 ? (
            <>
              <IoIosNotifications className={styles.bellIcon} />
              <span className={styles.badge}>
                {notifications > 10 ? '10+' : notifications}
              </span>
            </>
          ) : (
            <IoIosNotificationsOutline className={styles.bellIcon} />
          )}
        </div>

        <div className={styles.userInfoWrapper}>
          <div className={styles.userInfo}>
            {profile.department} {profile.position} {profile.name} 님
          </div>
        </div>
      </div>

      

      {showNotificationModal && (
        <div className={styles.notificationModal}>
          <div className={styles.modalContent}>
            {notificationsList.length > 0 ? (
              <ul className={styles.notificationList}>
                {notificationsList.map((notif) => (
                  <li
                    key={notif.id}
                    className={styles.notificationItem}
                    onClick={() => handleNotificationClick(notif.id)}
                  >
                    <div className={styles.notifHeader}>
                      <strong className={styles.notifSender}>{notif.sender}</strong>
                      <span className={styles.notifDate}>{notif.date}</span>
                    </div>
                    <span className={styles.notifMessage}>{notif.message}</span>
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
