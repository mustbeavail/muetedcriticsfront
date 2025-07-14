'use client';
import '../mail/mail.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import SalesByPeriod from './salesByPeriod';
import Arpu from './arpu';
import Arppu from './arppu';
import DailyInterval from './dailyInterval';
import Pu from './pu';
import OtherTable from './otherTable';

export default function RevenueChart() {
    return (
        <>
            <Header />
            <Menu />
            <div className="stats_container">
                <span className={"salesStats-mainTitle"}>매출 통계</span>
                <div className={"salesStats-filterBox"}>
                    기간 시작일 <input type="date" />
                    기간 종료일 <input type="date" />
                    <button>조회</button>
                </div>
                <div className="salesStats-card-container">
                    <div className="salesStats-card">
                        <div className="salesStats-card-title">LTV (고객 생애 가치)</div>
                        <div className="salesStats-card-value">데이터</div>
                    </div>
                    <div className="salesStats-card">
                        <div className="salesStats-card-title">1인당 평균 구매액</div>
                        <div className="salesStats-card-value">데이터</div>
                    </div>
                    <div className="salesStats-card">
                        <div className="salesStats-card-title">평균 구매 빈도</div>
                        <div className="salesStats-card-value">데이터</div>
                    </div>
                    <div className="salesStats-card">
                        <div className="salesStats-card-title">평균 고객 유지 기간</div>
                        <div className="salesStats-card-value">데이터</div>
                    </div>
                </div>

                <SalesByPeriod />

                <Arpu />

                <Arppu />

                <DailyInterval />

                <Pu />

                <OtherTable />
            </div>
        </>
    );
}