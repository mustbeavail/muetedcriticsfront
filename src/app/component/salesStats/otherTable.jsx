export default function OtherTable() {
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
                        <div className="cell"></div>
                        <div className="cell"></div>
                    </div>
                    <div className="row">
                        <div className="cell">총 구매 건수</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                    </div>

                    <div className="row">
                        <div className="cell">총 구매 유저수(PU)</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                    </div>

                    <div className="row">
                        <div className="cell">전체 유저 수</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                    </div>

                    <div className="row">
                        <div className="cell">평균 구매 빈도</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                    </div>

                    <div className="row">
                        <div className="cell">ARPU</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                    </div>

                    <div className="row">
                        <div className="cell">ARPPU</div>
                        <div className="cell"></div>
                        <div className="cell"></div>
                    </div>
                </div>

            </div>
        </>
    );
}