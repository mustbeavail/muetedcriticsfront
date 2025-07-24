'use client';
import '../salesStats/salesStats.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import SalesByPeriod from './salesByPeriod';
import Arpu from './arpu';
import Arppu from './arppu';
import DailyInterval from './dailyInterval';
import Pu from './pu';
import OtherTable from './otherTable';
import { useEffect, useState } from "react";
import axios from "axios";
import { subMonths } from 'date-fns';

export default function RevenueChart() {

    const [memberId, setMemberId] = useState("");
    const [token, setToken] = useState("");
    const [adminYn, setAdminYn] = useState(false);
    const [dept, setDept] = useState("");
    const [initialized, setInitialized] = useState(false);
    const [loadingCnt, setLoadingCnt] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [ltvStartDate, setLtvStartDate] = useState("");
    const [ltvEndDate, setLtvEndDate] = useState("");
    const [apv, setApv] = useState(0.00);
    const [apf, setApf] = useState(0.00);
    const [acl, setAcl] = useState(0.00);
    const [ltv, setLtv] = useState(0.00);

    const [periodStartDate, setPeriodStartDate] = useState("");
    const [periodEndDate, setPeriodEndDate] = useState("");
    const [salesByPeriod, setSalesByPeriod] = useState([]);

    const [arpuStartDate, setArpuStartDate] = useState("");
    const [arpuEndDate, setArpuEndDate] = useState("");
    const [arpu, setArpu] = useState([]);

    const [arppuStartDate, setArppuStartDate] = useState("");
    const [arppuEndDate, setArppuEndDate] = useState("");
    const [arppu, setArppu] = useState([]);

    const [intervalStartDate, setIntervalStartDate] = useState("");
    const [intervalEndDate, setIntervalEndDate] = useState("");
    const [interval, setInterval] = useState([]);

    const [puStartDate, setPuStartDate] = useState("");
    const [puEndDate, setPuEndDate] = useState("");
    const [pu, setPu] = useState([]);

    const [summary, setSummary] = useState({});

    const today = new Date().toISOString().split('T')[0];
    const URL = process.env.NEXT_PUBLIC_API_URL;

    // 페이지 입장시 로그인체크, 날짜 초기화하기
    useEffect(() => {
        const memberId = sessionStorage.getItem("member_id");
        const tokenRaw = sessionStorage.getItem("token");
        const adminRaw = sessionStorage.getItem("admin_yn");
        const deptRaw  = sessionStorage.getItem("dept_name");
      
        if (!memberId || !tokenRaw || !adminRaw || !deptRaw) {
          alert("로그인 후 이용해주세요.");
          return void (location.href = "/");
        }
      
        // state에 세팅
        setMemberId(memberId);
        setToken(tokenRaw);
        setAdminYn(adminRaw === "true");
        setDept(deptRaw);

        const sixMonthsAgo = subMonths(today, 6).toISOString().split('T')[0];
        const oneMonthAgo = subMonths(today, 1).toISOString().split('T')[0];

        setLtvStartDate(sixMonthsAgo);
        setPeriodStartDate(oneMonthAgo);
        setArpuStartDate(oneMonthAgo);
        setArppuStartDate(oneMonthAgo);
        setIntervalStartDate(oneMonthAgo);
        setPuStartDate(oneMonthAgo);

        setLtvEndDate(today);
        setPeriodEndDate(today);
        setArpuEndDate(today);
        setArppuEndDate(today);
        setIntervalEndDate(today);
        setPuEndDate(today);

        setInitialized(true);
      
    }, []);

    const wrap = async fn => {
        setLoadingCnt(c => c + 1);
        try { await fn(); }
        finally { setLoadingCnt(c => c - 1); }
    };

    // 날짜 초기화되면 함수 실행
    useEffect (()=>{
        if (!initialized) return;
        if (adminYn || dept === "마케팅팀" || dept === "개발팀") {

            wrap(()=>getLtv(token, ltvStartDate, ltvEndDate));
            wrap(()=>getSalesByPeriod(token, periodStartDate, periodEndDate));
            wrap(()=>getArpu(token, arpuStartDate, arpuEndDate));
            wrap(()=>getArppu(token, arppuStartDate, arppuEndDate));
            wrap(()=>getInterval(token, intervalStartDate, intervalEndDate));
            wrap(()=>getPu(token, puStartDate, puEndDate));
            wrap(()=>getSummary(token));
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

    // LTV
    const getLtv = async(token, startDate, endDate) => {
        if (startDate > endDate) {
            alert('시작일은 종료일보다 이전 날짜여야 합니다.');
            return;
        }
        try{
            const {data} = await axios.get(`${URL}/revenue/LTV`, {
                headers : {
                    Authorization: token
                },
                params : {
                    startDate : startDate,
                    endDate : endDate
                }
            });
            const prettyApv = format3digits(data.APV);
            const prettyApf = format3digits(data.APF);
            const prettyAcl = format3digits(data.ACL);
            const prettyLtv = format3digits(data.LTV);
            setApv(prettyApv);
            setApf(prettyApf);
            setAcl(prettyAcl);
            setLtv(prettyLtv);
        } catch(error) {
            alert("LTV 조회중 오류 발생 다시 로그인 후 시도해주세요.");
            location.href = "/";
            return;
        }

    };

    // 기간별 판매액
    const getSalesByPeriod = async (token, startDate, endDate) => {
        if (startDate > endDate) {
            alert('시작일은 종료일보다 이전 날짜여야 합니다.');
            return;
        }
        try{
            const {data} = await axios.get(`${URL}/revenue/period`, {
                headers : {
                    Authorization: token
                },
                params : {
                    startDate : startDate,
                    endDate : endDate
                }
            });
            console.log("기간별 판매액",data);
            setSalesByPeriod(data.list);
        } catch(error) {
            alert("기간별 판매액 조회 중 오류 발생 다시 로그인 후 시도해주세요.");
            location.href = "/";
            return;
        }
    };

    // ARPU
    const getArpu = async (token, startDate, endDate) => {
        if (startDate > endDate) {
            alert('시작일은 종료일보다 이전 날짜여야 합니다.');
            return;
        }
        try{
            const {data} = await axios.get(`${URL}/revenue/ARPU`, {
                headers : {
                    Authorization: token
                },
                params : {
                    startDate : startDate,
                    endDate : endDate
                }
            });
            console.log("ARPU",data);
            setArpu(data.list);
        } catch(error) {
            alert("ARPU 조회 중 오류 발생 다시 로그인 후 시도해주세요.");
            location.href = "/";
            return;
        }
    };

    // ARPPU
    const getArppu = async (token, startDate, endDate) => {
        if (startDate > endDate) {
            alert('시작일은 종료일보다 이전 날짜여야 합니다.');
            return;
        }
        try{
            const {data} = await axios.get(`${URL}/revenue/ARPPU`, {
                headers : {
                    Authorization: token
                },
                params : {
                    startDate : startDate,
                    endDate : endDate
                }
            });
            console.log("ARPPU",data);
            setArppu(data.list);
        } catch(error) {
            alert("ARPPU 조회 중 오류 발생 다시 로그인 후 시도해주세요.");
            location.href = "/";
            return;
        }
    };

    // 평균 구매간격
    const getInterval = async (token, startDate, endDate) => {
        if (startDate > endDate) {
            alert('시작일은 종료일보다 이전 날짜여야 합니다.');
            return;
        }
        try{
            const {data} = await axios.get(`${URL}/revenue/purchaseInterval`, {
                headers : {
                    Authorization: token
                },
                params : {
                    startDate : startDate,
                    endDate : endDate
                }
            });
            console.log("평균 구매간격",data);
            setInterval(data.list);
        } catch(error) {
            alert("평균 구매간격 조회 중 오류 발생 다시 로그인 후 시도해주세요.");
            location.href = "/";
            return;
        }
    };

    // PU
    const getPu = async (token, startDate, endDate) => {
        if (startDate > endDate) {
            alert('시작일은 종료일보다 이전 날짜여야 합니다.');
            return;
        }
        try{
            const {data} = await axios.get(`${URL}/revenue/PU`, {
                headers : {
                    Authorization: token
                },
                params : {
                    startDate : startDate,
                    endDate : endDate
                }
            });
            console.log("PU",data);
            setPu(data.list);
        } catch(error) {
            alert("PU 조회 중 오류 발생 다시 로그인 후 시도해주세요.");
            location.href = "/";
            return;
        }
    };

    // 세부 통계 테이블(전체기간 매출통계)
    const getSummary = async (token) => {
        try{
            const {data} = await axios.get(`${URL}/revenue/total`, {
                headers : {
                    Authorization: token
                }
            });
            console.log("세부 통계 테이블",data);
            setSummary(data);
        } catch(error) {
            alert("세부 통계 테이블 조회 중 오류 발생 다시 로그인 후 시도해주세요.");
            location.href = "/";
            return;
        }
    };

    if (isLoading || loadingCnt > 0) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header/>
            <Menu />
            <div className="common-container">
                <span className={"salesStats-mainTitle"}>매출 통계</span>
                <div className={"salesStats-filterBox"}>
                    기간 시작일 <input type="date" value={ltvStartDate} onChange={(e)=>{setLtvStartDate(e.target.value)}}/>
                    기간 종료일 <input type="date" value={ltvEndDate} onChange={(e)=>{setLtvEndDate(e.target.value)}}/>
                    <button onClick={()=>{getLtv(token, ltvStartDate, ltvEndDate)}}>조회</button>
                </div>
                <div className="salesStats-card-container">
                    <div className="salesStats-card">
                        <div className="salesStats-card-title">LTV (고객 생애 가치)</div>
                        <div className="salesStats-card-value">{ltv} 원</div>
                    </div>
                    <div className="salesStats-card">
                        <div className="salesStats-card-title">1인당 평균 구매액</div>
                        <div className="salesStats-card-value">{apv} 원</div>
                    </div>
                    <div className="salesStats-card">
                        <div className="salesStats-card-title">평균 구매 빈도</div>
                        <div className="salesStats-card-value">{apf} 일</div>
                    </div>
                    <div className="salesStats-card">
                        <div className="salesStats-card-title">평균 고객 유지 기간</div>
                        <div className="salesStats-card-value">{acl} 일</div>
                    </div>
                </div>

                <SalesByPeriod
                token={token}
                periodStartDate={periodStartDate} setPeriodStartDate={setPeriodStartDate}
                periodEndDate={periodEndDate} setPeriodEndDate={setPeriodEndDate}
                getSalesByPeriod={getSalesByPeriod} salesByPeriod={salesByPeriod}
                today={today}
                />

                <Arpu
                token={token}
                arpuStartDate={arpuStartDate} setArpuStartDate={setArpuStartDate}
                arpuEndDate={arpuEndDate} setArpuEndDate={setArpuEndDate}
                getArpu={getArpu} arpu={arpu}
                today={today}
                />

                <Arppu
                token={token}
                arppuStartDate={arppuStartDate} setArppuStartDate={setArppuStartDate}
                arppuEndDate={arppuEndDate} setArppuEndDate={setArppuEndDate}
                getArppu={getArppu} arppu={arppu}
                today={today}
                />

                <DailyInterval
                token={token}
                intervalStartDate={intervalStartDate} setIntervalStartDate={setIntervalStartDate}
                intervalEndDate={intervalEndDate} setIntervalEndDate={setIntervalEndDate}
                getInterval={getInterval} interval={interval}
                today={today}
                />

                <Pu
                token={token}
                puStartDate={puStartDate} setPuStartDate={setPuStartDate}
                puEndDate={puEndDate} setPuEndDate={setPuEndDate}
                getPu={getPu} pu={pu}
                today={today}
                />

                <OtherTable
                format3digits={format3digits}
                summary={summary}/>
            </div>
        </>
    );
}