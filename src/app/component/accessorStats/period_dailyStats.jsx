export default function PeriodDailyStats() {
    return (
        <>
            <div className={"accessorStats-chartWrapper"}>
                <h2 className={"accessorStats-title"}>일일 활성 이용자 수</h2>
                <div className={"accessorStats-filterBox"}>
                    기간 시작일 <input type="date" />
                    기간 종료일 <input type="date" />
                    <button>조회</button>
                </div>                
            </div>
        </>
    );
}