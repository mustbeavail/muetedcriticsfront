'use client';
import '../mail/mail.css';
import SalesByPeriod from './salesByPeriod';
import Arpu from './arpu';
import Arppu from './arppu';
import DailyInterval from './dailyInterval';
import Pu from './pu';
import OtherTable from './otherTable';

export default function RevenueChart() {
    return (
        <>
            <span className={"salesStats-mainTitle"}>매출 통계</span>

            <SalesByPeriod />

            <Arpu />

            <Arppu />

            <DailyInterval />

            <Pu />

            <OtherTable />
        </>
    );
}