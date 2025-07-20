'use client'
import { useParams } from "next/navigation";
import Header from "@/Header/page";
import Menu from "@/menu/Menu";
import "../user.css";

import { FaCrown } from "react-icons/fa";
import { MdMoreTime } from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdDesktopAccessDisabled } from "react-icons/md";

const dummyUsers = [{
  id: 1,
  name: '유저123',
  email: 'user123@gmail.com',
  level: 350,
  playTime: 780,
  amountSpent: 200,
  country: '대한민국',
  gender: '남성',
  phone: '010-1234-5678',
  region: '대한민국',
  joinDate: '2014.09.24',
  suspendedDate: '-',
  withdrawalDate: '-',
  userType: 'VIP',
  consent: 'O',
  idValue: 'user123',
  tags: ['이탈위험군'],
  memo: {
    content: '이탈 위험군 유저\n메모 내용이 보여지는 페이지',
    createdAt: '2025.06.31',
    updatedAt: '2025.07.02',
  },
  match_results: [
    {
      result_idx: 1,
      match_play_time: 20,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 19,
      match_idx: 1,
    },
    {
      result_idx: 5001,
      match_play_time: 20,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 19,
      match_idx: 1,
    },
    {
      result_idx: 5033,
      match_play_time: 40,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 14,
      match_idx: 4,
    },
    {
      result_idx: 5332,
      match_play_time: 31,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 29,
      match_idx: 34,
    },
    {
      result_idx: 5345,
      match_play_time: 22,
      potg: 1,
      victory_or_defeat: "victory",
      heroes_idx: 11,
      match_idx: 35,
    },
    {
      result_idx: 5425,
      match_play_time: 21,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 42,
      match_idx: 43,
    },
    {
      result_idx: 5924,
      match_play_time: 27,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 42,
      match_idx: 93,
    },
    {
      result_idx: 6162,
      match_play_time: 33,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 18,
      match_idx: 117,
    },
    {
      result_idx: 6444,
      match_play_time: 33,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 2,
      match_idx: 145,
    },
    {
      result_idx: 6504,
      match_play_time: 37,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 23,
      match_idx: 151,
    },
    {
      result_idx: 6592,
      match_play_time: 29,
      potg: 1,
      victory_or_defeat: "victory",
      heroes_idx: 4,
      match_idx: 160,
    },
    {
      result_idx: 6722,
      match_play_time: 17,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 17,
      match_idx: 173,
    },
    {
      result_idx: 6992,
      match_play_time: 40,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 12,
      match_idx: 200,
    },
    {
      result_idx: 7954,
      match_play_time: 25,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 23,
      match_idx: 296,
    },
    {
      result_idx: 8024,
      match_play_time: 29,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 5,
      match_idx: 303,
    },
    {
      result_idx: 8045,
      match_play_time: 15,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 31,
      match_idx: 305,
    },
    {
      result_idx: 8103,
      match_play_time: 28,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 17,
      match_idx: 311,
    },
    {
      result_idx: 8778,
      match_play_time: 29,
      potg: 0,
      victory_or_defeat: "defeat",
      heroes_idx: 6,
      match_idx: 378,
    },
    {
      result_idx: 9080,
      match_play_time: 40,
      potg: 0,
      victory_or_defeat: "defeat",
      heroes_idx: 13,
      match_idx: 408,
    },
    {
      result_idx: 9377,
      match_play_time: 32,
      potg: 0,
      victory_or_defeat: "defeat",
      heroes_idx: 32,
      match_idx: 438,
    },
    {
      result_idx: 9492,
      match_play_time: 23,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 1,
      match_idx: 450,
    },
    {
      result_idx: 9532,
      match_play_time: 32,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 17,
      match_idx: 454,
    },
    {
      result_idx: 9884,
      match_play_time: 20,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 12,
      match_idx: 489,
    },
    {
      result_idx: 9999,
      match_play_time: 24,
      potg: 0,
      victory_or_defeat: "defeat",
      heroes_idx: 24,
      match_idx: 500,
    },
    {
      result_idx: 10392,
      match_play_time: 20,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 5,
      match_idx: 540,
    },
    {
      result_idx: 10865,
      match_play_time: 20,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 36,
      match_idx: 587,
    },
    {
      result_idx: 10881,
      match_play_time: 20,
      potg: 0,
      victory_or_defeat: "victory",
      heroes_idx: 36,
      match_idx: 589,
    },
  ]
},
{
  id: 2,
  name: '김민지',
  email: 'minji.kim@example.com',
  level: 120,
  playTime: 320,
  amountSpent: 75,
  country: '대한민국',
  gender: '여성',
  phone: '010-9876-5432',
  region: '서울',
  joinDate: '2018.03.15',
  suspendedDate: '-',
  withdrawalDate: '-',
  userType: '일반',
  consent: 'X',
  idValue: 'minjik',
  tags: ['일반', '수신거부'],
  memo: {
    content: '최근 접속 빈도 낮음\n프로모션 메일 수신 거부',
    createdAt: '2024.12.01',
    updatedAt: '2025.01.10',
  },
  match_results: [
    { result_idx: 5002, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 32, match_idx: 1 },
    { result_idx: 5325, match_play_time: 35, potg: 0, victory_or_defeat: "victory", heroes_idx: 42, match_idx: 33 },
    { result_idx: 5471, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 22, match_idx: 48 },
    { result_idx: 5626, match_play_time: 32, potg: 0, victory_or_defeat: "defeat", heroes_idx: 28, match_idx: 63 },
    { result_idx: 5912, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 33, match_idx: 92 },
    { result_idx: 5935, match_play_time: 33, potg: 0, victory_or_defeat: "victory", heroes_idx: 38, match_idx: 94 },
    { result_idx: 5972, match_play_time: 38, potg: 0, victory_or_defeat: "victory", heroes_idx: 24, match_idx: 98 },
    { result_idx: 6062, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 19, match_idx: 107 },
    { result_idx: 6143, match_play_time: 38, potg: 0, victory_or_defeat: "victory", heroes_idx: 8, match_idx: 115 },
    { result_idx: 6168, match_play_time: 33, potg: 0, victory_or_defeat: "defeat", heroes_idx: 36, match_idx: 117 },
    { result_idx: 6241, match_play_time: 40, potg: 0, victory_or_defeat: "victory", heroes_idx: 1, match_idx: 125 },
    { result_idx: 6812, match_play_time: 26, potg: 0, victory_or_defeat: "victory", heroes_idx: 33, match_idx: 182 },
    { result_idx: 7301, match_play_time: 16, potg: 0, victory_or_defeat: "victory", heroes_idx: 9, match_idx: 231 },
    { result_idx: 7992, match_play_time: 18, potg: 0, victory_or_defeat: "victory", heroes_idx: 17, match_idx: 300 },
    { result_idx: 8049, match_play_time: 15, potg: 0, victory_or_defeat: "defeat", heroes_idx: 24, match_idx: 305 },
    { result_idx: 8421, match_play_time: 25, potg: 0, victory_or_defeat: "victory", heroes_idx: 22, match_idx: 343 },
    { result_idx: 8469, match_play_time: 29, potg: 0, victory_or_defeat: "defeat", heroes_idx: 16, match_idx: 347 },
    { result_idx: 9311, match_play_time: 36, potg: 0, victory_or_defeat: "victory", heroes_idx: 29, match_idx: 432 },
    { result_idx: 9462, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 15, match_idx: 447 },
    { result_idx: 9496, match_play_time: 23, potg: 0, victory_or_defeat: "defeat", heroes_idx: 42, match_idx: 450 },
    { result_idx: 9519, match_play_time: 19, potg: 0, victory_or_defeat: "defeat", heroes_idx: 34, match_idx: 452 },
    { result_idx: 9531, match_play_time: 32, potg: 0, victory_or_defeat: "victory", heroes_idx: 29, match_idx: 454 },
    { result_idx: 9597, match_play_time: 31, potg: 0, victory_or_defeat: "defeat", heroes_idx: 36, match_idx: 460 },
    { result_idx: 9725, match_play_time: 40, potg: 0, victory_or_defeat: "victory", heroes_idx: 27, match_idx: 473 },
    { result_idx: 10064, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 12, match_idx: 507 },
    { result_idx: 10385, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 17, match_idx: 539 },
    { result_idx: 10955, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 19, match_idx: 596 },
    { result_idx: 10967, match_play_time: 20, potg: 0, victory_or_defeat: "defeat", heroes_idx: 20, match_idx: 597 },
    { result_idx: 11046, match_play_time: 20, potg: 0, victory_or_defeat: "defeat", heroes_idx: 31, match_idx: 605 },
    { result_idx: 11128, match_play_time: 20, potg: 0, victory_or_defeat: "defeat", heroes_idx: 43, match_idx: 613 },
    { result_idx: 11156, match_play_time: 20, potg: 0, victory_or_defeat: "defeat", heroes_idx: 9, match_idx: 616 },
    { result_idx: 11212, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 33, match_idx: 622 },
    { result_idx: 11250, match_play_time: 20, potg: 1, victory_or_defeat: "defeat", heroes_idx: 29, match_idx: 625 },
    { result_idx: 11406, match_play_time: 20, potg: 0, victory_or_defeat: "defeat", heroes_idx: 38, match_idx: 641 }
  ]
},
{
  id: 3,
  name: '박준호',
  email: 'junho.park@example.com',
  level: 270,
  playTime: 600,
  amountSpent: 150,
  country: '대한민국',
  gender: '남성',
  phone: '010-2468-1357',
  region: '부산',
  joinDate: '2016.07.22',
  suspendedDate: '2025.05.01',
  withdrawalDate: '-',
  userType: '프리미엄',
  consent: 'O',
  idValue: 'junhop',
  tags: ['휴면', '복귀'],
  memo: {
    content: '휴면 전환 상태\n복귀 유도 필요',
    createdAt: '2025.04.20',
    updatedAt: '2025.06.15',
  },
  match_results: [
    { result_idx: 5003, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 27, match_idx: 1 },
    { result_idx: 5428, match_play_time: 21, potg: 0, victory_or_defeat: "defeat", heroes_idx: 28, match_idx: 43 },
    { result_idx: 6061, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 25, match_idx: 107 },
    { result_idx: 6090, match_play_time: 27, potg: 0, victory_or_defeat: "defeat", heroes_idx: 28, match_idx: 109 },
    { result_idx: 6532, match_play_time: 26, potg: 0, victory_or_defeat: "victory", heroes_idx: 27, match_idx: 154 },
    { result_idx: 6679, match_play_time: 27, potg: 0, victory_or_defeat: "defeat", heroes_idx: 35, match_idx: 168 },
    { result_idx: 7374, match_play_time: 26, potg: 1, victory_or_defeat: "victory", heroes_idx: 25, match_idx: 238 },
    { result_idx: 7553, match_play_time: 18, potg: 0, victory_or_defeat: "victory", heroes_idx: 8, match_idx: 256 },
    { result_idx: 7976, match_play_time: 24, potg: 0, victory_or_defeat: "defeat", heroes_idx: 13, match_idx: 298 },
    { result_idx: 8994, match_play_time: 27, potg: 0, victory_or_defeat: "victory", heroes_idx: 21, match_idx: 400 },
    { result_idx: 9129, match_play_time: 39, potg: 0, victory_or_defeat: "defeat", heroes_idx: 10, match_idx: 413 },
    { result_idx: 9165, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 25, match_idx: 417 },
    { result_idx: 9331, match_play_time: 15, potg: 0, victory_or_defeat: "victory", heroes_idx: 16, match_idx: 434 },
    { result_idx: 9578, match_play_time: 28, potg: 0, victory_or_defeat: "defeat", heroes_idx: 7, match_idx: 458 },
    { result_idx: 9760, match_play_time: 20, potg: 0, victory_or_defeat: "defeat", heroes_idx: 31, match_idx: 476 },
    { result_idx: 9820, match_play_time: 34, potg: 0, victory_or_defeat: "defeat", heroes_idx: 42, match_idx: 482 },
    { result_idx: 10063, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 35, match_idx: 507 },
    { result_idx: 10383, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 22, match_idx: 539 },
    { result_idx: 10464, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 9, match_idx: 547 },
    { result_idx: 10591, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 17, match_idx: 560 },
    { result_idx: 10853, match_play_time: 20, potg: 0, victory_or_defeat: "victory", heroes_idx: 7, match_idx: 586 },
    { result_idx: 11189, match_play_time: 20, potg: 0, victory_or_defeat: "defeat", heroes_idx: 20, match_idx: 619 },
    { result_idx: 11269, match_play_time: 20, potg: 0, victory_or_defeat: "defeat", heroes_idx: 15, match_idx: 627 },
  ]
},
];

export const heroesImageMap = {
  1: "디바 초상화.png",
  2: "둠피스트 초상화.png",
  3: "라마트라 초상화.png",
  4: "라인하르트 초상화.png",
  5: "레킹볼 초상화.png",
  6: "로드호그 초상화.png",
  7: "마우가 초상화.png",
  8: "시그마 초상화.png",
  9: "오리사 초상화.png",
  10: "윈스턴 초상화.png",
  11: "자리야 초상화.png",
  12: "정커퀸 초상화.png",
  13: "해저드 초상화.png",
  14: "겐지 초상화.png",
  15: "리퍼 초상화.png",
  16: "메이 초상화.png",
  17: "바스티온 초상화.png",
  18: "벤처 초상화.png",
  19: "소전 초상화.png",
  20: "솔저76 초상화.png",
  21: "솜브라 초상화.png",
  22: "시메트라 초상화.png",
  23: "애쉬 초상화.png",
  24: "에코 초상화.png",
  25: "위도우메이커 초상화.png",
  26: "정크랫 초상화.png",
  27: "캐서디 초상화.png",
  28: "토르비욘 초상화.png",
  29: "트레이서 초상화.png",
  30: "파라 초상화.png",
  31: "프레야 초상화.png",
  32: "한조 초상화.png",
  33: "라이프위버 초상화.png",
  34: "루시우 초상화.png",
  35: "메르시 초상화.png",
  36: "모이라 초상화.png",
  37: "바티스트 초상화.png",
  38: "브리기테 초상화.png",
  39: "아나 초상화.png",
  40: "일리아리 초상화.png",
  41: "젠야타 초상화.png",
  42: "주노 초상화.png",
  43: "키리코 초상화.png",
};

// maxMinutes 계산 및 data 생성 (중복 선언 방지, 플레이타임 합산)
const matchResults = dummyUsers[0].match_results;
const heroPlaytimeMap = {};
matchResults.forEach((result) => {
  const imageName = heroesImageMap[result.heroes_idx];
  const imagePath = `/heroes/${imageName}`;
  if (!heroPlaytimeMap[imageName]) {
    heroPlaytimeMap[imageName] = { name: imageName, minutes: 0, image: imagePath };
  }
  heroPlaytimeMap[imageName].minutes += result.match_play_time;
});
const heroPlayDataChart = Object.values(heroPlaytimeMap);
const maxMinutes = Math.max(...heroPlayDataChart.map((hero) => hero.minutes), 1);

export default function HeroPlayDataPage() {
  const { heroPlayData } = useParams();
  const user_detail = dummyUsers.find((m) => m.id === Number(heroPlayData));

  if (!user_detail)
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
        <div style={{ fontSize: "20px" }}><span style={{ fontWeight: 600 }}>{user_detail.name}</span>의 통계 확인</div>
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
              {heroPlayDataChart.map((hero, idx) => (
                <div className="chart-row" key={idx}>
                  <img src={hero.image} alt={hero.name} className="hero-icon" />
                  <div className="bar-container">
                    <div
                      className="bar"
                      style={{
                        width: `${(hero.minutes / maxMinutes) * 100}%`,
                      }}
                    >
                      <span className="bar-label">{hero.minutes}분</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}