import React from 'react';
import PeriodDailyStats from './period_dailyStats';
import PeriodWeeklyStats from './period_weeklyStats';
import PeriodMonthlyStats from './period_monthlyStats';

const AccessorStats = () => {
  return (
    <>

      <h1>접속자 수 통계</h1>
      (오늘 날짜) 기준
      <div>
        일일 접속자 수(DAU)
        (사람 수) 명
      </div>
      <div>
        주간 접속자 수(WAU)
        (사람 수) 명
      </div>
      <div>
        월간 접속자 수(MAU)
        (사람 수) 명
      </div>

      <PeriodDailyStats />
      <PeriodWeeklyStats />
      <PeriodMonthlyStats />

    </>
  );
};

export default AccessorStats;