"use client";
import React, { useEffect, useState } from 'react';
import './inquiryStats.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import All_InquiryStats from './all_inquiryStats';
import Period_InquiryStats from './period_inquiryStats';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { format, subDays } from 'date-fns';

const URL = process.env.NEXT_PUBLIC_API_URL;

const InquiryStats = () => {
  const router = useRouter();

  // 기본 날짜
  const today = format(new Date(), 'yyyy-MM-dd'); // 오늘 날짜(종료일 기본값)
  const weekAgo = format(subDays(new Date(), 7), 'yyyy-MM-dd'); // 일주일 전 날짜(시작일 기본값)

  const [inquiryStatsAll, setInquiryStatsAll] = useState([]);
  const [inquiryStatsPeriod, setInquiryStatsPeriod] = useState([]);
  const [inquiryStatsStartDate, setInquiryStatsStartDate] = useState(weekAgo);
  const [inquiryStatsEndDate, setInquiryStatsEndDate] = useState(today);

  // 로그인 체크 (최초 1회만)
  useEffect(() => {
    const id = sessionStorage.getItem('member_id');
    const token = sessionStorage.getItem('token');
    const admin = sessionStorage.getItem('admin_yn');
    const dept = sessionStorage.getItem('dept_name');
    if (!id || !token || !admin || !dept) {
      alert('로그인 후 접근 가능합니다.');
      router.push("/");
    }

    // 접근 허용 부서
    const allowedDepts = ['CS팀', '총괄'];

    // 접근 허용 부서 체크
    if (!allowedDepts.includes(dept)) {
      alert('접근 권한이 없습니다.');
      router.push("/component/main");
    }
    getInquiryStatsAll(token); // 신고/문의 전체 불러오기
    getInquiryStatsPeriod(token, weekAgo, today); // 신고/문의 기간별 불러오기
  }, []);

  // 신고/문의 전체 불러오기
  const getInquiryStatsAll = async (token) => {
    try {
      const { data } = await axios.get(`${URL}/inquiry/stats/all`, {
        headers: {
          Authorization: token
        }
      });
      if (data.success) {
        console.log(data.list);
        setInquiryStatsAll(data.list);
      }
    } catch (error) {
      console.error('전체 통계 데이터 불러오기 실패: ', error);
    }
  };

  // 신고/문의 기간별 불러오기
  const getInquiryStatsPeriod = async (token, start, end) => {
    try {
      const { data } = await axios.get(`${URL}/inquiry/stats`, {
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

  return (
    <>
      <Header />
      <Menu />
      <div className="stats_container">
        <span className={"userStats-mainTitle"}>신고/문의 통계</span>

        <All_InquiryStats inquiryStatsAll={inquiryStatsAll} />

        <Period_InquiryStats
          inquiryStatsPeriod={inquiryStatsPeriod}
          inquiryStatsStartDate={inquiryStatsStartDate}
          inquiryStatsEndDate={inquiryStatsEndDate}
          setInquiryStatsStartDate={setInquiryStatsStartDate}
          setInquiryStatsEndDate={setInquiryStatsEndDate}
          handlePeriodSearch={handlePeriodSearch}
        />
      </div>
    </>
  );
};

export default InquiryStats;