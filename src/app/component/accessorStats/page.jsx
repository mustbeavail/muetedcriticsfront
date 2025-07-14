'use client';
import React, { useState, useEffect } from 'react';
import '../mail/mail.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import PeriodDailyStats from './period_dailyStats';
import PeriodWeeklyStats from './period_weeklyStats';
import PeriodMonthlyStats from './period_monthlyStats';

function TodayDate() {
  const [today, setToday] = useState(getFormattedDate());

  useEffect(() => {
    // 매일 자정마다 날짜 갱신
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;

    const timer = setTimeout(() => {
      setToday(getFormattedDate()); // 자정 지나면 업데이트
    }, msUntilMidnight);

    return () => clearTimeout(timer);
  }, [today]);

  return <div>{today} 기준 (매일 1시마다 갱신)</div>;
}

function getFormattedDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (`0${now.getMonth() + 1}`).slice(-2); // 월은 0부터 시작
  const day = (`0${now.getDate()}`).slice(-2);
  return `${year}.${month}.${day}`;
}

const AccessorStats = () => {
  return (
    <>
      <Header />
      <Menu />
      <div className="stats_container">
        <span className={"accessorStats-mainTitle"}>접속자 수 통계</span>
        <div className={"accessorStats-mainTitle-date"}>
          <TodayDate />
        </div>
        <div className="accessorStats-card-container">
          <div className="accessorStats-card">
            <div className="accessorStats-card-title">일일 접속자 수(DAU)</div>
            <div className="accessorStats-card-value">(사람 수) 명</div>
          </div>
          <div className="accessorStats-card">
            <div className="accessorStats-card-title">주간 접속자 수(WAU)</div>
            <div className="accessorStats-card-value">(사람 수) 명</div>
          </div>
          <div className="accessorStats-card">
            <div className="accessorStats-card-title">월간 접속자 수(MAU)</div>
            <div className="accessorStats-card-value">(사람 수) 명</div>
          </div>
        </div>

        <PeriodDailyStats />
        <PeriodWeeklyStats />
        <PeriodMonthlyStats />
      </div>
    </>
  );
};

export default AccessorStats;