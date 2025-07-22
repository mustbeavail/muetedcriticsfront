"use client"
import React, { useEffect } from 'react';
import '../userStats/userStats.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import WinningRate_Playtime_UserStats from './winningRate_playtime_userStats';
import Usertype_Tier_UserStats from './usertype_tier_userStats';
import UserType_UserStats from './userType_userStats';
import SeasonTier_UserStats from './seasonTier_userStats';
import { useRouter } from 'next/navigation';

const UserStats = () => {

  const router = useRouter();

  // 로그인 체크 (최초 1회만)
  useEffect(() => {
    const id = sessionStorage.getItem('member_id');
    const token = sessionStorage.getItem('token');
    const dept = sessionStorage.getItem('dept_name');
    if (!id || !token || !dept) {
      alert('로그인 후 접근 가능합니다.');
      router.push("/");
    }

    // 접근 허용 부서
    const allowedDepts = ['마케팅팀', '개발팀', '총괄'];

    // 접근 허용 부서 체크
    if (!allowedDepts.includes(dept)) {
      alert('접근 권한이 없습니다.');
      router.push("/");
    }
  }, []);

  return (
    <>
      <Header/>
      <Menu />
      <div className="stats_container">
        <span className={"userStats-mainTitle"}>유저 통계</span>
        <WinningRate_Playtime_UserStats />
        <Usertype_Tier_UserStats />
        <UserType_UserStats />
        <SeasonTier_UserStats />
      </div>
    </>
  )
};

export default UserStats;