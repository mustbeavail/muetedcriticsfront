'use client';
import React, { useState, useEffect } from 'react';
import '../itemStats/itemStats.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';

import IngameItemStats from './ingame_itemStats';
import EventItemStats from './event_itemStats';
import EventTop3ItemStats from './eventTop3_itemStats';
import RefundItemStats from './refund_itemStats';
import { subMonths } from 'date-fns';

const ItemStats = () => {

    const [memberId, setMemberId] = useState("");
    const [token, setToken] = useState("");
    const [adminYn, setAdminYn] = useState(false);
    const [dept, setDept] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");



    const today = new Date();
    const URL = process.env.NEXT_PUBLIC_API_URL;

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
      const sixMonthsAgo = subMonths(today, 6);
      setStartDate(sixMonthsAgo);
      setEndDate(today);
    
      // 즉시 사용할 권한 플래그
      const isAdmin = adminRaw === "true";
      /* const isDeptAllowed = ["마케팅팀", "개발팀"].includes(deptRaw); */
    
      if (isAdmin /* || isDeptAllowed */) {
        const requests = [
          getItemStats(tokenRaw, sixMonthsAgo, today),
        ];
  
        // 병렬 실행, 모두 끝나면 finally 실행
        Promise.all(requests)
          .catch(err => {
            console.error("통계 조회 중 에러 발생", err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        alert("열람 권한이 없습니다.");
        location.href = "/component/main";
      }
    }, []);

    // 아이템 리스트
    const getItemStats = async(token, startDate, endDate) => {
      try {

      } catch(error) {

      }
    }

    // 이벤트 아이템 리스트
    // 이벤트 비교
    // 환불 내역 요약
    // 환불 내역

    // 데이터 불러오기 (데이터 추가 시 여기에 추가)
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

    if (isLoading) {
      return <div>Loading...</div>;
    }

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