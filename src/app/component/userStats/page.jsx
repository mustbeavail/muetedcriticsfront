import React from 'react';
import '../mail/mail.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import WinningRate_Playtime_UserStats from './winningRate_playtime_userStats';
import Usertype_Tier_UserStats from './usertype_tier_userStats';
import UserType_UserStats from './userType_userStats';
import SeasonTier_UserStats from './seasonTier_userStats';

const UserStats = () => {
  return (
    <>
      <Header />
      <Menu />
      <div className="stats_container">
        <span className={"userStats-mainTitle"}>유저 통계</span>
        <WinningRate_Playtime_UserStats />
        <Usertype_Tier_UserStats />
        <UserType_UserStats />
        <SeasonTier_UserStats />
      </div>
    </>
  );
};

export default UserStats;