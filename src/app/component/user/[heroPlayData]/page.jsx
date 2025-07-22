'use client'
import Header from "@/Header/page";
import Menu from "@/menu/Menu";
import "./heroPlayData.css";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { FaMinus } from "react-icons/fa";
import { MdMoreTime } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdDesktopAccessDisabled } from "react-icons/md";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function HeroPlayDataPage({ params }) {
  const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;
  const router = useRouter();
  const [playData, setPlayData] = useState(null);
  const resolvedParams = use(params);
  const user_id = decodeURIComponent(resolvedParams.heroPlayData);

  useEffect(() => {
    if (user_id) {
      getHeroPlayData();
      getSeasonData(1);
    }
  }, [user_id]);

  // 영웅별, 모드별 플레이 타임 가져오기
  const getHeroPlayData = async () => {
    const { data } = await axios.get(`${URL}/user/stats`, {
      params: {
        userId: user_id
      },
      headers: {
        authorization: token
      }
    });
    console.log('영웅별, 모드별 플레이 타임:', data.userStats);
    setPlayData(data.userStats);
  }

  // 영웅별, 모드별 플레이 타임 이미지 매핑
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
    "바티스트": "baptiste",
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

  // 영웅별, 모드별 플레이 타임 이미지 렌더링
  const renderAllHeroImages = (userStats) => {
    if (!userStats) {
      return null;
    }

    const heroPlayTimeEntries = Object.entries(userStats)
      .filter(([key, value]) => key.startsWith("total_play_time_") && !isNaN(value))
      .map(([key, value]) => {
        const heroName = key.replace("total_play_time_", "");
        return { hero: heroName, time: value };
      })
      .sort((a, b) => b.time - a.time); // 많이 한 순으로 정렬

    const maxTime = Math.max(...heroPlayTimeEntries.map(entry => entry.time));

    return (
      <div className="hero-bar-chart">
        {heroPlayTimeEntries.map(({ hero, time }) => {
          const imageKey = heroImageMap[hero];
          const imageName = imageKey ? `${imageKey}.png` : "none.png";
          const imgPath = `/heroes/${imageName}`;
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
                    width: time === 0 ? '0%' : `${(time / maxTime) * 100}%`,
                    backgroundColor: time === 0 ? 'transparent' : '#3498db',
                  }}
                />
                <span className="bar-label">{time}분</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // 영웅별 바 렌더링 (기존 renderAllHeroImages 유지)
  const renderHeroBars = (userStats) => {
    if (!userStats) return null;

    const heroPlayTimeEntries = Object.entries(userStats)
      .filter(([key]) => key.startsWith("total_play_time_") && !isNaN(userStats[key]))
      .map(([key, value]) => {
        const heroName = key.replace("total_play_time_", "");
        return { hero: heroName, time: value };
      })
      .filter(({ hero, time }) => !["공격", "돌격", "지원", "빠른대전", "경쟁전"].includes(hero)) // 포지션/모드 제외
      .sort((a, b) => b.time - a.time);

    const maxTime = Math.max(...heroPlayTimeEntries.map(e => e.time));

    return (
      <div className="hero-bar-chart">
        {heroPlayTimeEntries.map(({ hero, time }) => {
          const imageKey = heroImageMap[hero];
          const imgPath = imageKey ? `/heroes/${imageKey}.png` : '/badge/none.png';

          return (
            <div className="hero-bar-row" key={hero}>
              <div className="hero-name-box-wrapper">
                <div className="hero-name-box">{hero}</div>
                <img className="hero-icon" src={imgPath} alt={`${hero} 이미지`} onError={(e) => e.currentTarget.src = '/badge/none.png'} />
              </div>
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{
                    width: time === 0 ? '0%' : `${(time / maxTime) * 100}%`,
                    backgroundColor: time === 0 ? 'transparent' : '#3498db',
                  }}
                />
                <span className="bar-label">{time}분</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // 모드별, 포지션별 바 렌더링 (key: label, value: time)
  const renderBarsSimple = (data) => {
    if (!data) return null;
    const maxTime = Math.max(...Object.values(data));

    return (
      <div className="hero-bar-chart">
        {Object.entries(data)
          .sort(([, timeA], [, timeB]) => timeB - timeA) // 시간 기준 내림차순 정렬
          .map(([label, time]) => (
            <div className="hero-bar-row" key={label}>
              <div className="hero-name-box-wrapper">
                <div className="hero-name-box">{label}</div>
                <img
                  className="hero-icon"
                  src={`/heroes/${heroImageMap[label] || 'none'}.png`}
                  alt={`${label} 이미지`}
                  onError={(e) => e.currentTarget.src = '/badge/none.png'}
                />
              </div>
              <div className="bar-wrapper">
                <div
                  className="bar"
                  style={{
                    width: time === 0 ? '0%' : `${(time / maxTime) * 100}%`,
                    backgroundColor: time === 0 ? 'transparent' : '#3498db',
                  }}
                />
                <span className="bar-label">{time}분</span>
              </div>
            </div>
          ))}
      </div>
    );
  };


  // 시즌별 데이터 가져오기
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasonData, setSeasonData] = useState(null);
  const getSeasonData = async (season) => {
    const { data } = await axios.get(`${URL}/user/stats/season`, {
      params: {
        userId: user_id,
        season: season
      },
      headers: {
        authorization: token
      }
    });
    console.log('시즌별 데이터:', data.userStatsSeason);
    setSeasonData(data.userStatsSeason);
  }

  // 1: 영웅별, 2: 모드별, 3: 포지션별
  const [viewType, setViewType] = useState('1');

  // 포지션별 플레이 타임 가져오기
  const rolePlayTime = {
    공격: playData?.total_play_time_공격 || 0,
    돌격: playData?.total_play_time_돌격 || 0,
    지원: playData?.total_play_time_지원 || 0,
  };

  // 모드별 플레이 타임 가져오기
  const modePlayTime = {
    빠른대전: playData?.total_play_time_빠른대전 || 0,
    경쟁전: playData?.total_play_time_경쟁전 || 0,
  };

  // 티어 이미지 매핑
  const tierImageMap = {
    "브론즈": "bronze.png",
    "실버": "silver.png",
    "골드": "gold.png",
    "플래티넘": "platinum.png",
    "다이아몬드": "diamond.png",
    "마스터": "master.png",
    "그랜드마스터": "grandmaster.png",
    "챌린저": "challenger.png",
  };

  return (
    <div className="user-list-container1">
      <Header token={token}/>
      <Menu />
      <div className={"user-list-header"}>
        <h2 className="user-list-title">유저 통계 보기</h2>
        {/* 뒤로가기 버튼 */}
        <button className="user-list-backBtn" onClick={() => router.back()}>← 리스트로</button>
      </div>
      <div className={"user-list-heroPlayData"}>
        <div style={{ fontSize: "20px", marginBottom: "20px" }}><span style={{ fontWeight: 600 }}>{playData?.user_id}</span> 의 통계 확인</div>
        <div className="user-list-heroPlayData-content">
          {/* 시즌별 데이터 및 전체 데이터 */}
          <div className="user-list-heroPlayData-allData">
            <div className="user-list-heroPlayData-allData-header1">
              <span className="user-list-heroPlayData-allData-mainTitle">시즌별 데이터</span>
              <select
                className="season-select"
                onChange={(e) => {
                  const season = Number(e.target.value);
                  setSelectedSeason(season);
                  getSeasonData(season);
                }}
                value={selectedSeason}>
                {Array.from({ length: 4 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}시즌
                  </option>
                ))}
              </select>
            </div>
            {/* 시즌별 데이터 렌더링 */}
            {seasonData && (
              <div className="user-list-heroPlayData-allData-data">
                <div className="data-card">
                  {tierImageMap[seasonData?.tier_season] ? (
                    <img
                      src={`/tier/${tierImageMap[seasonData?.tier_season]}`}
                      alt={seasonData?.tier_season}
                      className="data-icon-tier"
                      onError={(e) => (e.currentTarget.src = '/tier/none.png')}
                    />
                  ) : (
                    <FaMinus className="data-icon" />
                  )}
                  <span className="data-value">{seasonData?.tier_season}</span>
                  <div className="divider" />
                  <span className="data-label">{selectedSeason}시즌 티어</span>
                </div>
                <div className="data-card">
                  <MdMoreTime className="data-icon" />
                  <span className="data-value">{seasonData?.total_play_time_season.toLocaleString()}분</span>
                  <div className="divider" />
                  <span className="data-label">{selectedSeason}시즌 총 플레이 타임</span>
                </div>
                <div className="data-card">
                  <FaMoneyBillAlt className="data-icon" />
                  <span className="data-value">
                    ₩{(seasonData?.total_item_price + seasonData?.total_bundle_price).toLocaleString()}
                  </span>
                  <div className="divider" />
                  <span className="data-label">{selectedSeason}시즌 총 과금액</span>
                </div>
              </div>
            )}

            <div className="user-list-heroPlayData-allData-header2">
              <div className="user-list-heroPlayData-allData-mainTitle">전체 데이터</div>
            </div>
            {/* 전체 데이터 렌더링 */}
            {playData && (
              <div className="user-list-heroPlayData-allData-data">
                <div className="data-card">
                  <MdDesktopAccessDisabled className="data-icon" />
                  <span className="data-value">{playData?.last_access.replace('T', ' ')}</span>
                  <div className="divider" />
                  <span className="data-label">마지막 인게임 접속일</span>
                </div>
                <div className="data-card">
                  <MdMoreTime className="data-icon" />
                  <span className="data-value">{playData?.total_play_time.toLocaleString()}분</span>
                  <div className="divider" />
                  <span className="data-label">총 플레이 타임</span>
                </div>
                <div className="data-card">
                  <FaMoneyBillAlt className="data-icon" />
                  <span className="data-value">₩{playData?.total_spending.toLocaleString()}</span>
                  <div className="divider" />
                  <span className="data-label">총 과금액</span>
                </div>
              </div>
            )}
          </div>
          {/* 캐릭터별 플레이 시간 */}
          <div className="user-list-heroPlayData-characterPlaytime">
            <div className="user-list-heroPlayData-allData-header1">
              <span className="user-list-heroPlayData-allData-mainTitle">플레이 시간</span>
              <select
                className="season-select"
                value={viewType}
                onChange={(e) => setViewType(e.target.value)}
              >
                <option value="1">영웅별</option>
                <option value="2">모드별</option>
                <option value="3">포지션별</option>
              </select>
            </div>
            <div className="user-list-heroPlayData-characterPlaytime-chart">
              {viewType === '1' && renderHeroBars(playData)}
              {viewType === '2' && renderBarsSimple(modePlayTime)}
              {viewType === '3' && renderBarsSimple(rolePlayTime)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}