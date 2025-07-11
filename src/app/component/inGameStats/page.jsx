import React from 'react';
import HeroPlaytime_IngameStats from './heroPlaytime_ingameStats';
import HeroPOTG_IngameStats from './heroPOTG_ingameStats';
import HeroItem_IngameStats from './heroItem_ingameStats';
import ModePlaytime_IngameStats from './modePlaytime_ingameStats';
import HeroWinningRate_IngameStats from './heroWinningRate_ingameStats';
import HeroPickorBan_IngameStats from './heroPickorBan_ingameStats';

const InGameStats = () => {
  return (
    <>

      <h1>인게임 통계</h1>

      <HeroPlaytime_IngameStats />
      <HeroPOTG_IngameStats />
      <HeroItem_IngameStats />
      {/* 위 3개 통계의 테이블 필요 */}

      <ModePlaytime_IngameStats />
      <HeroWinningRate_IngameStats />
      <HeroPickorBan_IngameStats />

    </>
  );
};

export default InGameStats;