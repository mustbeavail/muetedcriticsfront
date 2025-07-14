'use client';
import React, { useState, useEffect } from 'react';
import '../mail/mail.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';

import IngameItemStats from './ingame_itemStats';
import EventItemStats from './event_itemStats';
import EventTop3ItemStats from './eventTop3_itemStats';
import RefundItemStats from './refund_itemStats';

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

  // 이벤트 아이템, 상위 3개 이벤트 아이템 통계에 전부 쓰임 (event_itemStats.jsx, eventTop3_itemStats.jsx)
  const uniqueSellTypes = [
    ...new Set(
      itemList
        .map(item => item.sell_type)
        .filter(type => type !== '한정')
        .filter(type => type !== '상시')
    )
  ];

  return (
    <>
      <Header />
      <Menu />
      <div className="stats_container">
        <span className={"itemStats-mainTitle"}>아이템 통계</span>

        {/* 인게임별 아이템 정보 */}
        <IngameItemStats itemList={itemList} />

        {/* 이벤트별 아이템 정보 */}
        <EventItemStats itemList={itemList} uniqueSellTypes={uniqueSellTypes} />

        {/* 이벤트별 총 판매액(상위 3개), 이벤트별 아이템 상위 3개 판매액 */}
        <EventTop3ItemStats itemList={itemList} uniqueSellTypes={uniqueSellTypes} />

        {/* 아이템별 환불 내역 */}
        <RefundItemStats />
      </div>
    </>
  );
};

export default ItemStats;