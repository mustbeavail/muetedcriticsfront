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
import { RiUserCommunityFill } from "react-icons/ri";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const URL = process.env.NEXT_PUBLIC_API_URL;

const Menu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const router = useRouter();
  const toggleMenu = (menu) => {
    setActiveMenu(prev => (prev === menu ? null : menu));
  };

  // 로그아웃
  const handleLogout = async () => {
    const { data } = await axios.post(`${URL}/member/logout`, {
      member_id: sessionStorage.getItem('member_id'),
    }, {
      headers: { Authorization: sessionStorage.getItem('token') }
    })
    console.log(data);
    if (data.success) {
      router.push('/');
    } else {
      alert('로그아웃 실패');
    }
  }

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
            <Link href="/component/forum" className={styles.menu_navIcon}>
              <RiUserCommunityFill />
            </Link>
          </div>

          <div className={styles.menu_navItem}>
            <Link href="/component/chat" className={styles.menu_navIcon}>
              <FaComments />
            </Link>
          </div>
        </nav>

        <div>
          <Link href="/" className={styles.menu_logout} onClick={handleLogout}>
            <IoIosLogOut />
          </Link>
        </div>
      </div>

      {activeMenu && (
        <div className={styles.menu_subOverlay}>
          <div className={styles.menu_subInner}>
            {activeMenu === 'stat' && (
              <>
                <Link href="/component/salesStats"> ✦ 매출 통계</Link>
                <Link href="/component/itemStats"> ✦ 아이템 통계</Link>
                <Link href="/component/accessorStats"> ✦ 접속자 통계</Link>
                <Link href="/component/userStats"> ✦ 유저 통계</Link>
                <Link href="/component/inGameStats"> ✦ 인게임 통계</Link>
                <Link href="/component/inquiryStats"> ✦ 신고 및 문의 통계</Link>
              </>
            )}
            {activeMenu === 'inquiry' && (
              <>
                <Link href="/component/inquiry"> ✦ 유저 문의 내역</Link>
                <Link href="/component/report"> ✦ 유저 신고 내역</Link>
              </>
            )}
            {activeMenu === 'mail' && (
              <>
                <Link href="/component/mail"> ✦ 발신 메일 목록</Link>
                <Link href="/component/mailSend"> ✦ 메일 발송</Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
