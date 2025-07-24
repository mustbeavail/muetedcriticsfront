'use client';
import React, { useState, useEffect } from 'react';
import './accessorStats.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import PeriodDailyStats from './period_dailyStats';
import PeriodWeeklyStats from './period_weeklyStats';
import PeriodMonthlyStats from './period_monthlyStats';
import { useRouter } from 'next/navigation';

const AccessorStats = () => {
  const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;
  const memberId = typeof window !== "undefined" ? sessionStorage.getItem('member_id') : null;
  const dept = typeof window !== "undefined" ? sessionStorage.getItem('dept_name') : null;
  const router = useRouter();
  const allowedDepts = ['마케팅팀', '개발팀', '총괄'];

  const [mounted, setMounted] = useState(false);
  
  // 로그인 체크
  useEffect(() => {
    if (!memberId || !token) {
      alert("로그인 후 이용해주세요.");
      location.href = "/";
    }
    // 접근 허용 부서 체크
    if (!allowedDepts.includes(dept)) {
      alert('접근 권한이 없습니다.');
      router.push("/component/main");
    }
    setMounted(true);
  }, []);
  // if (!memberId || !token || !allowedDepts.includes(dept) || !mounted) return null;

  return (
    <>
      <Header/>
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