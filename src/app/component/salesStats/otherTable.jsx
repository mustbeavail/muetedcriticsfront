export default function OtherTable({
    format3digits, summary}) {

    const prettyTotalRevenue = format3digits(summary.total_revenue).split(".")[0];
    const prettyTotalPurchaseCount = format3digits(summary.total_purchase_count).split(".")[0];
    const prettyTotalPayingUsers = format3digits(summary.total_paying_users).split(".")[0];
    const prettyTotalUserCount = format3digits(summary.total_user_count).split(".")[0];
    const prettyTotalArpu = format3digits(summary.total_arpu).split(".")[0];
    const prettyTotalArppu = format3digits(summary.total_arppu).split(".")[0];

    return (
        <>
            <div className={"salesStats-chartWrapper-otherTable"}>
                <h2 className={"salesStats-title"}>📋 세부 통계 테이블</h2>
                <span>모든 항목은 매일 1시마다 갱신됩니다.</span>
                <div className="salesStats-table">
                    <div className="row header">
                        <div className="cell">항목</div>
                        <div className="cell">수치</div>
                    </div>
                    <div className="row">
                        <div className="cell">총 매출</div>
                        <div className="cell">{prettyTotalRevenue} 원</div>
                    </div>
                    <div className="row">
                        <div className="cell">총 구매 건수</div>
                        <div className="cell">{prettyTotalPurchaseCount} 건</div>
                    </div>

                    <div className="row">
                        <div className="cell">총 구매 유저수(PU)</div>
                        <div className="cell">{prettyTotalPayingUsers} 명</div>
                    </div>

                    <div className="row">
                        <div className="cell">전체 유저 수</div>
                        <div className="cell">{prettyTotalUserCount} 명</div>
                    </div>
                    <div className="row">
                        <div className="cell">ARPU</div>
                        <div className="cell">{prettyTotalArpu} 원</div>
                    </div>

                    <div className="row">
                        <div className="cell">ARPPU</div>
                        <div className="cell">{prettyTotalArppu} 원</div>
                    </div>
                </div>

            </div>
        </>
    );
}