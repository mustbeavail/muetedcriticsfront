'use client'

import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {

  const [memberId, setMemberId] = useState("");
  const [token, setToken] = useState("");
  const [adminYn, setAdminYn] = useState(false);
  const [dept, setDept] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();
  const URL = process.env.NEXT_PUBLIC_API_URL;

  // 페이지 입장시 로그인체크, 대쉬보드 데이터 가져오기
    // 페이지 입장시 로그인체크, 통계 데이터 가져오기
    useEffect(() => {
      const memberId = sessionStorage.getItem("member_id");
      const tokenRaw    = sessionStorage.getItem("token");
      const adminRaw = sessionStorage.getItem("admin_yn");
      /* const deptRaw  = sessionStorage.getItem("dept"); */
    
      if (!memberId || !tokenRaw || !adminRaw /* || !deptRaw */) {
        alert("로그인 후 이용해주세요.");
        return void (location.href = "/");
      }
    
      // state에 세팅
      setMemberId(memberId);
      setToken(tokenRaw);
      setAdminYn(adminRaw === "true");
/*         setDept(deptRaw); */
    
      getDashData(tokenRaw, today)
        .catch(console.error)
        .finally(() => setIsLoading(false));

    }, []);

  // 대쉬보드 데이터를 불러오는 함수
  const getDashData = async (token, today) => {
    try{

    } catch(error) {

    }
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header/>
      <Menu/>
      <div className = "main-container">
        <div className = "stats-noti-wrapper">

        </div>
        <div className = {dept === "마케팅팀" || dept === "개발팀" || adminYn === true ? "stats-marketing-dev-wrapper" : "hidden"}>

        </div>
        <div className = {dept === "CS팀" || adminYn === true ? "stats-CS-wrapper" : "hidden"}>

        </div>
      </div>
    </div>
  );
};

export default Main;