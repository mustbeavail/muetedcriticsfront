'use client'

import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import React from 'react';
import { useEffect, useState } from "react";
import api from '../../utils/api';
import StatsNoti from './statsNoti';
import './main.css';
import '../salesStats/salesStats.css';
import '../accessorStats/accessorStats.css';
import '../userStats/userStats.css';
import '../inGameStats/inGameStats.css';
import '../inquiryStats/inquiryStats.css';
import SalesByPeriod from '../salesStats/salesByPeriod';
import Period_dailyStats from '../accessorStats/period_dailyStats';
import Period_weeklyStats from '../accessorStats/period_weeklyStats';
import Period_monthlyStats from '../accessorStats/period_monthlyStats';
import { subMonths } from 'date-fns';
import UserType_UserStats from '../userStats/userType_userStats';
import HeroWinningRate_IngameStats from '../inGameStats/heroWinningRate_ingameStats';
import Period_InquiryStats from '../inquiryStats/period_inquiryStats';
import { Lilita_One } from "next/font/google";

const lilitaOne = Lilita_One({
  weight: '400',
  subsets: ['latin'],
});

const Main = () => {

  const [memberId, setMemberId] = useState("");
  const [token, setToken] = useState("");
  const [adminYn, setAdminYn] = useState(false);
  const [dept, setDept] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingCnt, setLoadingCnt] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const today = new Date().toISOString().split('T')[0];
  const oneMonthAgo = subMonths(today, 1).toISOString().split('T')[0];
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const [notiList, setNotiList] = useState([]);

  const [periodStartDate, setPeriodStartDate] = useState("");
  const [periodEndDate, setPeriodEndDate] = useState("");
  const [salesByPeriod, setSalesByPeriod] = useState([]);

  const [inquiryStatsPeriod, setInquiryStatsPeriod] = useState([]);
  const [inquiryStatsStartDate, setInquiryStatsStartDate] = useState("");
  const [inquiryStatsEndDate, setInquiryStatsEndDate] = useState("");

  // 페이지 입장시 로그인체크, 대쉬보드 데이터 가져오기
  // 페이지 입장시 로그인체크, 통계 데이터 가져오기
  useEffect(() => {
    const memberId = sessionStorage.getItem("member_id");
    const tokenRaw = sessionStorage.getItem("token");
    const adminRaw = sessionStorage.getItem("admin_yn");
    const deptRaw = sessionStorage.getItem("dept_name");

    if (!memberId || !tokenRaw || !adminRaw || !deptRaw) {
      alert("로그인 후 이용해주세요.");
      return void (location.href = "/");
    }

    // state에 세팅
    setMemberId(memberId);
    setToken(tokenRaw);
    setAdminYn(adminRaw === "true");
    setDept(deptRaw);

    setPeriodStartDate(oneMonthAgo);
    setPeriodEndDate(today);

    setInquiryStatsStartDate(oneMonthAgo);
    setInquiryStatsEndDate(today);

    setInitialized(true);
  }, []);

  // 초기화 되면 대쉬보드 데이터 조회
  useEffect(() => {
    if (!initialized) return;
    getDashData(token, oneMonthAgo);
  }, [initialized]);

  const wrap = async fn => {
    setLoadingCnt(c => c + 1);
    try { await fn(); }
    finally { setLoadingCnt(c => c - 1); }
  };

  // 대쉬보드 데이터를 불러오는 함수
  const getDashData = async (token, oneMonthAgo) => {
    try {
      wrap(() => getNotiList(token));
      wrap(() => getSalesByPeriod(token, oneMonthAgo, today));
      wrap(() => getInquiryStatsPeriod(token, oneMonthAgo, today));
      setIsLoading(false);
    } catch (error) {
      alert('대쉬보드 조회중 오류 발생, 다시 로그인 후 시도해주세요.');
      location.href = '/';
    }
  };
  // 통계 알림 조회
  const getNotiList = async (token) => {
    try {
      const { data } = await api.get(`${URL}/notice/stat/list`, {
        headers: {
          'Authorization': token
        }
      });
      setNotiList(data.notiList);
    } catch (error) {
      alert('통계 알림 조회중 오류 발생, 다시 로그인 후 시도해주세요.');
      location.href = '/';
    }
  };
  // 기간별 판매액
  const getSalesByPeriod = async (token, startDate, endDate) => {
    if (startDate > endDate) {
      alert('시작일은 종료일보다 이전 날짜여야 합니다.');
      return;
    }
    try {
      const { data } = await api.get(`${URL}/revenue/period`, {
        headers: {
          Authorization: token
        },
        params: {
          startDate: startDate,
          endDate: endDate
        }
      });
      console.log("기간별 판매액", data);
      setSalesByPeriod(data.list);
    } catch (error) {
      alert("기간별 판매액 조회 중 오류 발생 다시 로그인 후 시도해주세요.");
      location.href = "/";
    }
  };
  // 신고/문의 기간별 불러오기
  const getInquiryStatsPeriod = async (token, start, end) => {
    try {
      const { data } = await api.get(`${URL}/inquiry/stats`, {
        headers: { Authorization: token },
        params: {
          startDate: start,
          endDate: end
        }
      });
      if (data.success) {
        console.log(data.data);
        setInquiryStatsPeriod(data.data);
      } else {
        setInquiryStatsPeriod([]);
      }
    } catch (error) {
      console.error("기간별 통계 데이터 불러오기 실패: ", error);
      setInquiryStatsPeriod([]);
    }
  };
  // Period_InquiryStats 에서 조회 버튼이 클릭되면 실행
  const handlePeriodSearch = () => {
    // 조회 버튼 클릭 시 날짜 선택 여부 확인
    if (!inquiryStatsStartDate || !inquiryStatsEndDate) {
      alert('기간을 설정해 주세요.');
      return;
    }
    if (new Date(inquiryStatsStartDate) > new Date(inquiryStatsEndDate)) {
      alert('시작일은 종료일보다 이전 날짜여야 합니다.');
      return;
    }

    const token = sessionStorage.getItem('token');
    getInquiryStatsPeriod(token, inquiryStatsStartDate, inquiryStatsEndDate);
  }


  if (isLoading && loadingCnt > 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Menu />
      <div className="common-container">
        <h1 className="dashboard-title">Dashboard</h1>
        <StatsNoti
          notiList={notiList}
        />
        <div className={dept === "마케팅팀" || dept === "개발팀" || adminYn === true ? "stats-marketing-dev-wrapper" : "hidden"}>
          <SalesByPeriod
            token={token}
            periodStartDate={periodStartDate}
            setPeriodStartDate={setPeriodStartDate}
            periodEndDate={periodEndDate}
            setPeriodEndDate={setPeriodEndDate}
            salesByPeriod={salesByPeriod}
            getSalesByPeriod={getSalesByPeriod}
            today={today}
          />
          <UserType_UserStats />
          <Period_dailyStats />
          <Period_weeklyStats />
          <Period_monthlyStats />
          <HeroWinningRate_IngameStats />
        </div>
        <div className={dept === "CS팀" || adminYn === true ? "stats-CS-wrapper" : "hidden"}>
          <Period_InquiryStats
            inquiryStatsPeriod={inquiryStatsPeriod}
            inquiryStatsStartDate={inquiryStatsStartDate}
            inquiryStatsEndDate={inquiryStatsEndDate}
            setInquiryStatsStartDate={setInquiryStatsStartDate}
            setInquiryStatsEndDate={setInquiryStatsEndDate}
            handlePeriodSearch={handlePeriodSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;