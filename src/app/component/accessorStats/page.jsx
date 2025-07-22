'use client';
import React, { useState, useEffect } from 'react';
import './accessorStats.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import PeriodDailyStats from './period_dailyStats';
import PeriodWeeklyStats from './period_weeklyStats';
import PeriodMonthlyStats from './period_monthlyStats';

const AccessorStats = () => {
  return (
    <>
      <Header token={token} memberId={memberId}/>
      <Menu />
      <div className="stats_container">
        <span className={"accessorStats-mainTitle"}>접속자 수 통계</span>

        <PeriodDailyStats />
        <PeriodWeeklyStats />
        <PeriodMonthlyStats />
      </div>
    </>
  );
};

export default AccessorStats;