'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import {
  FaUser,
  FaUserFriends,
  FaChartBar,
  FaRegQuestionCircle,
  FaEnvelope,
  FaComments,
} from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menu) => {
    setActiveMenu(prev => (prev === menu ? null : menu));
  };

  return (
    <>
      <div className={styles.menu}>
        <div className={styles.menu_logo}>
          <Link href="/component/main">
            <img src="/MainLogo.png" className={styles.menu_logoImage} />
          </Link>
        </div>

        <nav className={styles.menu_nav}>
          <div className={styles.menu_navItem}>
            <Link href="/component/user" className={styles.menu_navIcon}>
              <FaUser />
            </Link>
          </div>

          <div className={styles.menu_navItem}>
            <Link href="/component/member" className={styles.menu_navIcon}>
              <FaUserFriends />
            </Link>
          </div>

          <div className={styles.menu_navItem}>
            <a
              onClick={() => toggleMenu('stat')}
              className={activeMenu === 'stat' ? styles.menu_activeIcon : ''}
            >
              <FaChartBar />
            </a>
          </div>

          <div className={styles.menu_navItem}>
            <a
              onClick={() => toggleMenu('inquiry')}
              className={activeMenu === 'inquiry' ? styles.menu_activeIcon : ''}
            >
              <FaRegQuestionCircle />
            </a>
          </div>

          <div className={styles.menu_navItem}>
            <a
              onClick={() => toggleMenu('mail')}
              className={activeMenu === 'mail' ? styles.menu_activeIcon : ''}
            >
              <FaEnvelope />
            </a>
          </div>

          <div className={styles.menu_navItem}>
            <Link href="/component/chat" className={styles.menu_navIcon}>
              <FaComments />
            </Link>
          </div>
        </nav>

        <div>
          <Link href="/" className={styles.menu_logout}>
            <IoIosLogOut />
          </Link>
        </div>
      </div>

      {activeMenu && (
        <div className={styles.menu_subOverlay}>
          <div className={styles.menu_subInner}>
            {activeMenu === 'stat' && (
              <>
                <Link href="/#"> ✦ 매출 통계</Link>
                <Link href="/#"> ✦ 아이템 통계</Link>
                <Link href="/#"> ✦ 접속자 통계</Link>
                <Link href="/#"> ✦ 유저 통계</Link>
                <Link href="/#"> ✦ 인게임 통계</Link>
                <Link href="/#"> ✦ 신고 및 문의 통계</Link>
              </>
            )}
            {activeMenu === 'inquiry' && (
              <>
                <Link href="/#"> ✦ 유저 문의 내역</Link>
                <Link href="/#"> ✦ 유저 신고 내역</Link>
                <Link href="/#"> ✦ 문의 답변 내역</Link>
                <Link href="/#"> ✦ VIP 문의 내역</Link>
              </>
            )}
            {activeMenu === 'menu_mail' && (
              <>
                <Link href="/#"> ✦ 발신 메일 목록</Link>
                <Link href="/#"> ✦ 메일 발송</Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
