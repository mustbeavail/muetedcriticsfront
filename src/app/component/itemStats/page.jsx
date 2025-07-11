'use client';
import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import '../mail/mail.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const itemStatsData = [
  {
    item_idx: 1,
    item_cate: '영웅 스킨',
    item_name: 'D.Va 순록',
    item_price: 35000,
    sell_end_date: '2025-03-08',
    sell_start_date: '2025-02-08',
    sell_type: '한정',
  },
  {
    item_idx: 2,
    item_cate: '영웅 스킨',
    item_name: 'D.Va 일리단',
    item_price: 35000,
    sell_start_date: '2025-01-01',
    sell_end_date: '',
    sell_type: '상시',
  },
  {
    item_idx: 3,
    item_cate: '영웅 스킨',
    item_name: 'D.Va 독성',
    item_price: 20000,
    sell_start_date: '2025-06-18',
    sell_end_date: '2025-07-19',
    sell_type: '한정',
  },
  {
    item_idx: 4,
    item_cate: '영웅 스킨',
    item_name: 'D.Va 목재로봇',
    item_price: 15000,
    sell_start_date: '2025-01-01',
    sell_end_date: '',
    sell_type: '상시',
  },
  {
    item_idx: 5,
    item_cate: '영웅 스킨',
    item_name: 'D.Va 호랑',
    item_price: 15000,
    sell_start_date: '2025-08-01',
    sell_end_date: '2025-08-14',
    sell_type: '2025여름',
  },
  {
    item_idx: 6,
    item_cate: '영웅 스킨',
    item_name: 'D.Va 주코',
    item_price: 25000,
    sell_start_date: '2025-01-01',
    sell_end_date: '',
    sell_type: '상시',
  },
  {
    item_idx: 7,
    item_cate: '무기 스킨',
    item_name: 'D.Va 에메랄드 무기',
    item_price: 25000,
    sell_start_date: '2025-01-01',
    sell_end_date: '',
    sell_type: '상시',
  },
  {
    item_idx: 8,
    item_cate: '무기 스킨',
    item_name: 'D.Va 바람 무기',
    item_price: 15000,
    sell_start_date: '2025-08-01',
    sell_end_date: '2025-08-14',
    sell_type: '2025여름',
  },
  {
    item_idx: 9,
    item_cate: '무기 스킨',
    item_name: 'D.Va 아다만트 무기',
    item_price: 10000,
    sell_start_date: '2025-01-01',
    sell_end_date: '',
    sell_type: '상시',
  },
  {
    item_idx: 10,
    item_cate: '하이라이트 연출',
    item_name: 'D.Va 화려한 콤보',
    item_price: 15000,
    sell_start_date: '2025-01-01',
    sell_end_date: '2025-01-14',
    sell_type: '2025설날',
  },
  {
    item_idx: 11,
    item_cate: "영웅 스킨",
    item_name: "둠피스트 불멸자",
    item_price: 25000,
    sell_start_date: "2025-02-28",
    sell_end_date: "2025-03-07",
    sell_type: "한정"
  },
  {
    item_idx: 12,
    item_cate: "영웅 스킨",
    item_name: "둠피스트 블랙워치",
    item_price: 20000,
    sell_start_date: "2025-01-01",
    sell_end_date: null,
    sell_type: "상시"
  },
  {
    item_idx: 13,
    item_cate: "영웅 스킨",
    item_name: "둠피스트 태엽로봇",
    item_price: 15000,
    sell_start_date: "2025-01-01",
    sell_end_date: "2025-01-14",
    sell_type: "2025설날"
  },
  {
    item_idx: 14,
    item_cate: "영웅 스킨",
    item_name: "둠피스트 레트로 퓨처",
    item_price: 30000,
    sell_start_date: "2025-12-15",
    sell_end_date: "2025-12-29",
    sell_type: "2025크리스마스"
  },
  {
    item_idx: 15,
    item_cate: "영웅 스킨",
    item_name: "둠피스트 황혼",
    item_price: 30000,
    sell_start_date: "2025-01-01",
    sell_end_date: null,
    sell_type: "상시"
  }
];

const ItemStats = () => {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setItemList(itemStatsData);
  }, []);

  const uniqueSellTypes = [
    ...new Set(
      itemList
        .map(item => item.sell_type)
        .filter(type => type !== '한정')
        .filter(type => type !== '상시')
    )
  ];

  const [selectedEvents, setSelectedEvents] = useState(["", "", ""]);

  // select 변경 시
  const handleChange = (index, value) => {
    const newSelected = [...selectedEvents];
    newSelected[index] = value;
    setSelectedEvents(newSelected);
  };

  // 선택된 이벤트 중 빈 값 제거
  const filteredEvents = selectedEvents.filter(ev => ev !== "");


  // 차트용 데이터 생성
  const chartData = filteredEvents.map(event => {
    const sum = itemStatsData
      .filter(item => item.sell_type === event)
      .reduce((acc, cur) => acc + cur.item_price, 0);
    return { event, totalPrice: sum };
  });

  return (
    <>
      <span className={"itemStats-mainTitle"}>아이템 통계</span>

      {/* 인게임별 아이템 정보 */}
      <div className={"itemStats-chartWrapper"}>
        <h2 className={"itemStats-title"}>인게임별 아이템 정보</h2>
        <div className={"itemStats-search"}>
          <span>검색</span>
          <div className={"itemStats-input-wrapper"}>
            <input type="text" placeholder="아이템 검색" />
            <button className={"itemStats-search-btn"}><IoSearch /></button>
          </div>
        </div>
        <div className={"itemStats-filterBox-wrapper"}>
          <div className={"itemStats-filterBox"}>
            기간 시작일 <input type="date" />
            기간 종료일 <input type="date" />
            <button>조회</button>
          </div>
          <div>
            <select className={"itemStats-select"}>
              <option>전체</option>
              <option>총 수익</option>
              <option>구매 유저</option>
            </select>
            <select className={"itemStats-select"}>
              <option>높은순</option>
              <option>낮은순</option>
            </select>
          </div>
        </div>
        <div className="itemStats-list">
          {itemList.map((item) => (
            <div className="itemStats-item-card" key={item.item_idx}>
              <div className="itemStats-item-header">
                <span className="itemStats-item-cate">{item.item_cate}</span>
                <span className="itemStats-item-type">{item.sell_type}</span>
              </div>
              <div className="itemStats-item-name">{item.item_name}</div>
              <div className="itemStats-item-dates">
                {item.sell_start_date} ~ {item.sell_end_date || '상시'}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 이벤트별 아이템 정보 */}
      <div className={"itemStats-chartWrapper"}>
        <h2 className={"itemStats-title"}>이벤트별 아이템 정보</h2>
        <div className={"itemStats-filterBox-wrapper"}>
          <div className={"itemStats-filterBox"}>
            이벤트 선택 <select className={"itemStats-select"}>
              {uniqueSellTypes.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <button>조회</button>
          </div>
          <div>
            <select className={"itemStats-select"}>
              <option>전체</option>
              <option>총 수익</option>
              <option>구매 유저</option>
            </select>
            <select className={"itemStats-select"}>
              <option>높은순</option>
              <option>낮은순</option>
            </select>
          </div>
        </div>
        <div className="itemStats-list">
          {itemList.map((item) => (
            <div className="itemStats-item-card" key={item.item_idx}>
              <div className="itemStats-item-header">
                <span className="itemStats-item-name">{item.item_name}</span>
                <span className="itemStats-item-type">{item.sell_type}</span>
              </div>
              수익:<br />
              구매 유저:
            </div>
          ))}
        </div>
      </div>

      {/* 이벤트별 총 판매액(상위 3개), 이벤트별 아이템 상위 3개 판매액 */}
      <div className={"itemStats-chartWrapper"}>
        <h2 className={"itemStats-title"}>이벤트별 아이템 정보</h2>
        <div className="itemStats-filterBox">
          {selectedEvents.map((selected, idx) => (
            <span key={idx}>
              이벤트 선택 {idx + 1}{" "}
              <select
                className="itemStats-select"
                value={selected}
                onChange={(e) => handleChange(idx, e.target.value)}
              >
                <option value="">선택</option>
                {uniqueSellTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>{" "}
            </span>
          ))}
        </div>
        <div>
          {/* 여기에 선택된 이벤트 이름 3개와 진행 기간 출력됨*/}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <XAxis type="number" />
            <YAxis type="category" dataKey="event" />
            <Tooltip formatter={(value) => `${value} 원`} />
            <Legend />
            <Bar dataKey="totalPrice" fill="#8884d8" barSize={30} />
          </BarChart>
        </ResponsiveContainer>

        <h2 className={"itemStats-title"}>이벤트별 아이템 상위 3개 판매액</h2>
        <div>
          {selectedEvents.map((eventName, idx) => (
            <div key={idx}>
              <span style={{ marginRight: 10 }}>
                {eventName || "선택 안됨"}
              </span>
              <div>
                {/* 여기에 선택된 이벤트별 아이템 상위 3개 판매액 출력 */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 아이템별 환불 내역 */}
      <div className={"itemStats-chartWrapper"}>
        <h2 className={"itemStats-title"}>아이템별 환불 내역</h2>
      </div>
    </>
  );
};

export default ItemStats;