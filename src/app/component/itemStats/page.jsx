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
import axios from 'axios';

const ItemStats = () => {

  const [memberId, setMemberId] = useState("");
  const [token, setToken] = useState("");
  const [adminYn, setAdminYn] = useState(false);
  const [dept, setDept] = useState("");
  const [initialized, setInitialized] = useState(false);
  const [loadingCnt, setLoadingCnt] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [itemListStartDate, setItemListStartDate] = useState("");
  const [itemListEndDate, setItemListEndDate] = useState("");
  const [itemListAlign, setItemListAlign] = useState("");
  const [itemListPage, setItemListPage] = useState(1);
  const [itemListSearch, setItemListSearch] = useState("");
  const [itemList, setItemList] = useState([]);

  const [eventName, setEventName] = useState("");
  const [eventAlign, setEventAlign] = useState("");
  const [eventList, setEventList] = useState([]);

  const [firstEventName, setFirstEventName] = useState("");
  const [secondEventName, setSecondEventName] = useState("");
  const [thirdEventName, setThirdEventName] = useState("");
  const [firstEventList, setFirstEventList] = useState([]);
  const [secondEventList, setSecondEventList] = useState([]);
  const [thirdEventList, setThirdEventList] = useState([]);

  const [refundListStartDate, setRefundListStartDate] = useState("");
  const [refundListEndDate, setRefundListEndDate] = useState("");
  const [refundListAlign, setRefundListAlign] = useState("");
  const [refundListPage, setRefundListPage] = useState(1);
  const [refundListSearch, setRefundListSearch] = useState("");
  const [refundList, setRefundList] = useState([]);

  const [refundSummaryStartDate, setRefundSummaryStartDate] = useState("");
  const [refundSummaryEndDate, setRefundSummaryEndDate] = useState("");
  const [refundSummary, setRefundSummary] = useState([]);

  const today = new Date().toISOString().split('T')[0];
  const URL = process.env.NEXT_PUBLIC_API_URL;

  // 페이지 입장시 로그인체크, 날짜 초기화하기
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

    const oneMonthAgo = subMonths(today, 1).toISOString().split('T')[0];

    setItemListStartDate(oneMonthAgo);
    setItemListEndDate(today);
    setItemListAlign("periodRevenueDESC");
    setItemListPage(1);

    setRefundListStartDate(oneMonthAgo);
    setRefundListEndDate(today);
    setRefundListAlign("refundDateDESC");
    setRefundListPage(1);

    setEventAlign("periodRevenueDESC");

    setRefundSummaryStartDate(oneMonthAgo);
    setRefundSummaryEndDate(today);

    setInitialized(true);

  }, []);

  const wrap = async fn => {
    setLoadingCnt(c => c + 1);
    try { await fn(); }
    finally { setLoadingCnt(c => c - 1); }
  };

  // 날짜 초기화되면 함수 실행
  useEffect(() => {
    if (!initialized) return;
    if (adminYn || dept === "마케팅팀" || dept === "개발팀") {

      wrap(() => getItemList(
        token, itemListStartDate, itemListEndDate,
        itemListAlign, itemListPage, itemListSearch));
      wrap(() => getEventList(
        token, eventName, eventAlign));
      wrap(() => getRefundList(
        token, refundListStartDate, refundListEndDate,
        refundListAlign, refundListPage, refundListSearch));
      wrap(() => getRefundSummary(
        token, refundSummaryStartDate, refundSummaryEndDate));
      setIsLoading(false);

    } else {
      alert("열람 권한이 없습니다.");
      location.href = "/component/main";
    }
  }, [initialized])

  // 숫자 정제
  const format3digits = (num) => {
    // 항상 소수점 아래 둘째 자리까지 표시
    const [intPart, decPart] = Number(num).toFixed(2).split('.');

    // 정수 부분만 3자리마다 콤마 삽입
    const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `${withCommas}.${decPart}`;
  }

  // 아이템 리스트
  const getItemList = async (token, startDate, endDate, align, page, search) => {
    if (startDate > endDate) {
      alert('시작일은 종료일보다 이전 날짜여야 합니다.');
      return;
    }
    try {
      const { data } = await axios.get(`${URL}/item/list`, {
        headers: {
          Authorization: token,
        },
        params: {
          startDate,
          endDate,
          align,
          page,
          search
        }
      });
      console.log("아이템 리스트", data.itemList);
      setItemList(data.itemList);
    } catch (error) {
      alert("아이템 리스트 조회중 오류 발생 다시 로그인 후 시도해주세요.");
      location.href = "/";
    }
  };

  // 이벤트 아이템 리스트
  const getEventList = async (token, eventName, align) => {
    try {
      const { data } = await axios.get(`${URL}/item/event`, {
        headers: {
          Authorization: token,
        },
        params: {
          eventName,
          align
        }
      });
      console.log("이벤트 아이템 리스트", data.eventItemList);
      setEventList(data.eventItemList);
    } catch (error) {
      alert("이벤트 아이템 리스트 조회중 오류 발생 다시 로그인 후 시도해주세요.");
      location.href = "/";
    }
  };

  // 이벤트 3개 비교
  const getFirstEventList = async (token, eventName, align) => {
    try {
      const { data } = await axios.get(`${URL}/item/event`, {
        headers: {
          Authorization: token,
        },
        params: {
          eventName,
          align
        }
      });
      console.log("첫번째 이벤트 리스트", data.eventItemList);
      setFirstEventList(data.eventItemList);
    } catch (error) {
      alert("첫번째 이벤트 조회중 오류 발생 다시 로그인 후 시도해주세요.");
      location.href = "/";
    }
  };
  const getSecondEventList = async (token, eventName, align) => {
    try {
      const { data } = await axios.get(`${URL}/item/event`, {
        headers: {
          Authorization: token,
        },
        params: {
          eventName,
          align
        }
      });
      console.log("두번째 이벤트 리스트", data.eventItemList);
      setSecondEventList(data.eventItemList);
    } catch (error) {
      alert("두번째 이벤트 조회중 오류 발생 다시 로그인 후 시도해주세요.");
      location.href = "/";
    }
  };
  const getThirdEventList = async (token, eventName, align) => {
    try {
      const { data } = await axios.get(`${URL}/item/event`, {
        headers: {
          Authorization: token,
        },
        params: {
          eventName,
          align
        }
      });
      console.log("세번째 이벤트 리스트", data.eventItemList);
      setThirdEventList(data.eventItemList);
    } catch (error) {
      alert("세번째 이벤트 조회중 오류 발생 다시 로그인 후 시도해주세요.");
      location.href = "/";
    }
  };

  // 환불 내역
  const getRefundList = async (token, startDate, endDate, align, page, search) => {
    if (startDate > endDate) {
      alert('시작일은 종료일보다 이전 날짜여야 합니다.');
      return;
    }
    try {
      const { data } = await axios.get(`${URL}/item/refund/list`, {
        headers: {
          Authorization: token,
        },
        params: {
          startDate,
          endDate,
          align,
          page,
          search
        }
      });
      console.log("환불 내역 리스트", data.refundList);
      setRefundList(data.refundList);
    } catch (error) {
      alert("환불 내역 리스트 조회중 오류 발생 다시 로그인 후 시도해주세요.");
      location.href = "/";
    }
  };

  // 환불 내역 요약
  const getRefundSummary = async (token, startDate, endDate) => {
    if (startDate > endDate) {
      alert('시작일은 종료일보다 이전 날짜여야 합니다.');
      return;
    }
    try {
      const { data } = await axios.get(`${URL}/item/refund/summary`, {
        headers: {
          Authorization: token,
        },
        params: {
          startDate,
          endDate
        }
      });
      console.log("환불 내역 요약", data.refundSummary);
      setRefundSummary(data.refundSummary);
    } catch (error) {
      alert("환불 내역 요약 조회중 오류 발생 다시 로그인 후 시도해주세요.");
      location.href = "/";
    }
  };

  if (isLoading || loadingCnt > 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header/>
      <Menu />
      <div className="stats_container">
        <span className={"itemStats-mainTitle"}>아이템 통계</span>

        {/* 인게임별 아이템 정보 */}
        <IngameItemStats
          token={token} itemListpage={itemListPage}
          itemListStartDate={itemListStartDate} itemListEndDate={itemListEndDate}
          setItemListStartDate={setItemListStartDate} setItemListEndDate={setItemListEndDate}
          itemListAlign={itemListAlign} itemListPage={itemListPage} itemListSearch={itemListSearch}
          setItemListAlign={setItemListAlign} setItemListPage={setItemListPage} setItemListSearch={setItemListSearch}
          getItemList={getItemList} itemList={itemList}
          format3digits={format3digits}
          today={today}
          />

        {/* 이벤트별 아이템 정보 */}
        <EventItemStats
          token={token}
          eventList={eventList}
          eventName={eventName} eventAlign={eventAlign}
          setEventName={setEventName} setEventAlign={setEventAlign}
          getEventList={getEventList}
          format3digits={format3digits}
        />

        {/* 이벤트별 총 판매액(상위 3개), 이벤트별 아이템 상위 3개 판매액 */}
        <EventTop3ItemStats
          token={token}
          eventList={eventList}
          firstEventList={firstEventList} secondEventList={secondEventList} thirdEventList={thirdEventList}
          setFirstEventList={setFirstEventList} setSecondEventList={setSecondEventList} setThirdEventList={setThirdEventList}
          firstEventName={firstEventName}
          secondEventName={secondEventName}
          thirdEventName={thirdEventName}
          setFirstEventName={setFirstEventName}
          setSecondEventName={setSecondEventName}
          setThirdEventName={setThirdEventName}
          getFirstEventList={getFirstEventList}
          getSecondEventList={getSecondEventList}
          getThirdEventList={getThirdEventList}
          format3digits={format3digits}
        />

        {/* 아이템별 환불 내역 */}
        <RefundItemStats
          token={token} refundList={refundList} refundSummary={refundSummary}
          refundListStartDate={refundListStartDate} refundListEndDate={refundListEndDate}
          refundListAlign={refundListAlign} refundListPage={refundListPage} refundListSearch={refundListSearch}
          setRefundListStartDate={setRefundListStartDate} setRefundListEndDate={setRefundListEndDate}
          setRefundListAlign={setRefundListAlign} setRefundListPage={setRefundListPage} setRefundListSearch={setRefundListSearch}
          getRefundList={getRefundList} getRefundSummary={getRefundSummary}
          format3digits={format3digits}
          today={today}
          />
      </div>
    </>
  );
};

export default ItemStats;