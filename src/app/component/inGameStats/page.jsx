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

const InGameStats = () => {

  useEffect(() => {
    const id = sessionStorage.getItem('member_id');
    const token = sessionStorage.getItem('token');
    // console.log(id, token);

    if (!id || !token) {
      alert('로그인 후 접근 가능합니다.');
      window.location.href = "/";
      return;
    };
  }, []);


  return (
    <>
      <Header />
      <Menu />
      <div className="stats_container">
        <span className={"userStats-mainTitle"}>인게임 통계</span>

        <HeroPlaytime_IngameStats />
        <HeroPOTG_IngameStats />
        <HeroItem_IngameStats />
        <HeroTable_IngameStats />

        <ModePlaytime_IngameStats />
        <HeroWinningRate_IngameStats />
        {/* <HeroPickorBan_IngameStats /> */}
      </div >
    </>
  );
}

export default InGameStats;