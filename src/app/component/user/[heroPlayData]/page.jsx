'use client'
import Header from "@/Header/page";
import Menu from "@/menu/Menu";
import "./heroPlayData.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { FaCrown } from "react-icons/fa";
import { MdMoreTime } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdDesktopAccessDisabled } from "react-icons/md";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function HeroPlayDataPage() {
  const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;
  const [playData, setPlayData] = useState(null);
  const params = useParams();
  const user_id = params.heroPlayData;

  useEffect(() => {
    if (user_id) {
      getHeroPlayData();
    }
  }, [user_id]);

  const getHeroPlayData = async () => {
    const { data } = await axios.get(`${URL}/user/stats`, {
      params: {
        user_id: user_id
      },
      headers: {
        authorization: token
      }
    });
    console.log(data.userStats);
    setPlayData(data.userStats);
  }

  if (!playData)
    return (
      <div>유저를 찾을 수 없습니다.</div>
    );

  return (
    <div className="user-list-container1">
      <Header />
      <Menu />
      <div className={"user-list-header"}>
        <h2 className="user-list-title">유저 통계 보기</h2>
        <button className="user-list-backBtn" onClick={() => location.href = "/component/user"}>← 리스트로</button>
      </div>
      <div className={"user-list-heroPlayData"}>
        <div style={{ fontSize: "20px" }}><span style={{ fontWeight: 600 }}>{playData.user_id}</span>의 통계 확인</div>
        <div className="user-list-heroPlayData-content">
          {/* 시즌별 데이터 및 전체 데이터 */}
          <div className="user-list-heroPlayData-allData">
            <div className="user-list-heroPlayData-allData-header1">
              <span className="user-list-heroPlayData-allData-mainTitle">시즌별 데이터</span>
              <select className="season-select">
                <option value="1">17시즌</option>
              </select>
            </div>
            <div className="user-list-heroPlayData-allData-data">
              <div className="data-card">
                <FaCrown className="data-icon" />
                <span className="data-value">다이아몬드</span>
                <div className="divider" />
                <span className="data-label">17시즌 티어</span>
              </div>
              <div className="data-card">
                <MdMoreTime className="data-icon" />
                <span className="data-value">50시간</span>
                <div className="divider" />
                <span className="data-label">17시즌 총 플레이 타임</span>
              </div>
              <div className="data-card">
                <FaMoneyBillAlt className="data-icon" />
                <span className="data-value">₩100,000</span>
                <div className="divider" />
                <span className="data-label">17시즌 총 과금액</span>
              </div>
            </div>
            <div className="user-list-heroPlayData-allData-header2">
              <div className="user-list-heroPlayData-allData-mainTitle">전체 데이터</div>
            </div>
            <div className="user-list-heroPlayData-allData-data">
              <div className="data-card">
                <MdDesktopAccessDisabled className="data-icon" />
                <span className="data-value">7월 1일 19:01</span>
                <div className="divider" />
                <span className="data-label">마지막 인게임 접속일</span>
              </div>
              <div className="data-card">
                <MdMoreTime className="data-icon" />
                <span className="data-value">1,000시간</span>
                <div className="divider" />
                <span className="data-label">총 플레이 타임</span>
              </div>
              <div className="data-card">
                <FaMoneyBillAlt className="data-icon" />
                <span className="data-value">₩1,000,000</span>
                <div className="divider" />
                <span className="data-label">총 과금액</span>
              </div>
            </div>
          </div>
          {/* 캐릭터별 플레이 시간 */}
          <div className="user-list-heroPlayData-characterPlaytime">
            <div className="user-list-heroPlayData-allData-header1">
              <span className="user-list-heroPlayData-allData-mainTitle">플레이 시간</span>
              <select className="season-select">
                <option value="1">영웅별</option>
                <option value="2">모드별</option>
              </select>
            </div>
            <div className="user-list-heroPlayData-characterPlaytime-chart">
              {playData.total_play_time}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}