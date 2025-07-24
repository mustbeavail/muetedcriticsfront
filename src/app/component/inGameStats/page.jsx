"use client"
import React, { useEffect } from 'react';
import './inGameStats.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import HeroPlaytime_IngameStats from './heroPlaytime_ingameStats';
import HeroPOTG_IngameStats from './heroPOTG_ingameStats';
import HeroItem_IngameStats from './heroItem_ingameStats';
import HeroTable_IngameStats from './heroTable_ingameStats';
import ModePlaytime_IngameStats from './modePlaytime_ingameStats';
import HeroWinningRate_IngameStats from './heroWinningRate_ingameStats';
import HeroPickorBan_IngameStats from './heroPickorBan_ingameStats';
import { useRouter } from 'next/navigation';

const InGameStats = () => {
  const router = useRouter();

  // 로그인 체크 (최초 1회만)
  useEffect(() => {
    const id = sessionStorage.getItem('member_id');
    const token = sessionStorage.getItem('token');
    const adminYn = sessionStorage.getItem('admin_yn');
    const dept = sessionStorage.getItem('dept_name');
    if (!id || !token || !dept || !adminYn) {
      alert('로그인 후 접근 가능합니다.');
      router.push("/");
    }

    // 접근 허용 부서
    const allowedDepts = ['마케팅팀', '개발팀'];

    if (adminYn === 'false' && !allowedDepts.includes(dept)) {
      alert('접근 권한이 없습니다.');
      router.push("/component/main");
    }
  }, []);


  return (
    <>
      <Header />
      <Menu />
      <div className="common-container">
        <span className={"userStats-mainTitle"}>인게임 통계</span>

        <HeroPlaytime_IngameStats />
        <HeroPOTG_IngameStats />
        <HeroItem_IngameStats />
        <HeroTable_IngameStats />

        <ModePlaytime_IngameStats />
        <HeroWinningRate_IngameStats />
        <HeroPickorBan_IngameStats />
      </div >
    </>
  );
}

export default InGameStats;