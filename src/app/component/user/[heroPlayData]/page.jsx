'use client'
import Header from "@/Header/page";
import Menu from "@/menu/Menu";
import "./heroPlayData.css";
import axios from "axios";
import { use, useEffect, useState } from "react";

import { FaCrown } from "react-icons/fa";
import { MdMoreTime } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdDesktopAccessDisabled } from "react-icons/md";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function HeroPlayDataPage({ params }) {
  const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;
  const [playData, setPlayData] = useState(null);
  const resolvedParams = use(params);
  // const user_id = resolvedParams.heroPlayData;
  const user_id = decodeURIComponent(resolvedParams.heroPlayData);

  useEffect(() => {
    if (user_id) {
      getHeroPlayData();
    }
  }, [user_id]);

  const getHeroPlayData = async () => {
    const { data } = await axios.get(`${URL}/user/stats`, {
      params: {
        userId: user_id
      },
      headers: {
        authorization: token
      }
    });
    console.log(data.userStats);
    setPlayData(data.userStats);
  }

  const heroImageMap = {
    "DVa": "d.va",
    "둠피스트": "doomfist",
    "라마트라": "ramattra",
    "라인하르트": "reinhardt",
    "레킹볼": "wrecking ball",
    "로드호그": "roadhog",
    "마우가": "mauga",
    "시그마": "sigma",
    "오리사": "orisa",
    "윈스턴": "winston",
    "자리야": "zarya",
    "정커퀸": "junkrat",
    "해저드": "hanzo",
    "겐지": "genji",
    "리퍼": "reaper",
    "메이": "mei",
    "바스티온": "bastion",
    "벤처": "venture",
    "소전": "sombra",
    "솔저": "soldier76",
    "솜브라": "sombra",
    "시메트라": "simetra",
    "애쉬": "ashe",
    "에코": "echo",
    "위도우메이커": "widowmaker",
    "정크랫": "junkrat",
    "캐서디": "cassidy",
    "토르비욘": "torbjorn",
    "트레이서": "tracer",
    "파라": "pharah",
    "프레야": "freja",
    "한조": "hanzo",
    "라이프위버": "lifeweaver",
    "루시우": "lucio",
    "메르시": "mercy",
    "모이라": "moira",
    "바티스트": "brigitte",
    "브리기테": "brigitte",
    "아나": "ana",
    "일리아리": "illari",
    "젠야타": "zenyatta",
    "주노": "junkrat",
    "키리코": "kiriko",
    // 포지션별, 모드별 사진 추가
    "돌격": "tank",
    "공격": "damage",
    "지원": "support",
    "빠른대전": "unranked",
    "경쟁전": "competitive",
  };

  const renderAllHeroImages = (userStats) => {
    if (!userStats) {
      console.log("userStats is null or undefined");
      return null;
    }

    const entries = Object.entries(userStats);
    console.log("entries:", entries);

    const heroPlayTimeEntries = Object.entries(userStats)
      .filter(([key, value]) => key.startsWith("total_play_time_") && !isNaN(value))
      .map(([key, value]) => {
        const heroName = key.replace("total_play_time_", "");
        return { hero: heroName, time: value };
      })
      .sort((a, b) => b.time - a.time); // 많이 한 순으로 정렬

    const maxTime = Math.max(...heroPlayTimeEntries.map(entry => entry.time));

    console.log("filtered heroPlayTimeEntries:", heroPlayTimeEntries);

    return (
      <div className="hero-bar-chart">
        {heroPlayTimeEntries.map(({ hero, time }) => {
          console.log(`hero: ${hero}, time: ${time}`);
          const imageKey = heroImageMap[hero];
          const imageName = imageKey ? `${imageKey}.png` : "none.png";
          const imgPath = `/heroes/${imageName}`;
          const heroKeys = Object.keys(playData)
            .filter(key => key.startsWith("total_play_time_"))
            .map(key => key.replace("total_play_time_", ""));

          return (
            <div className="hero-bar-row" key={hero}>
              <div className="hero-name-box-wrapper">
                <div className="hero-name-box">{hero}</div>
                <img
                  className="hero-icon"
                  src={imgPath}
                  alt={`${hero} 이미지`}
                  onError={(e) => (e.currentTarget.src = '/badge/none.png')}
                />
              </div>
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{
                    width: `${(time / maxTime) * 100}%`,
                  }}
                />
                <span className="bar-label">{time}시간</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="user-list-container1">
      <Header />
      <Menu />
      <div className={"user-list-header"}>
        <h2 className="user-list-title">유저 통계 보기</h2>
        <button className="user-list-backBtn" onClick={() => location.href = "/component/user"}>← 리스트로</button>
      </div>
      <div className={"user-list-heroPlayData"}>
        <div style={{ fontSize: "20px" }}><span style={{ fontWeight: 600 }}>{playData?.user_id}</span> 의 통계 확인</div>
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
              {renderAllHeroImages(playData)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}