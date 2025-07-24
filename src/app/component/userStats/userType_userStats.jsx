'use client'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

// API 서버 URL 환경변수
const URL = process.env.NEXT_PUBLIC_API_URL;

// 유저 분류(카테고리) 매핑 - 서버에서 받은 raw 데이터를 화면에 표시할 label로 변환
const categoryMapping = {
    신규: { raw: "신규", label: "신규" },
    일반: { raw: "일반", label: "일반" },
    VIP: { raw: "vip", label: "VIP" },
    수신동의: { raw: "receive_yes", label: "수신동의" },
    수신거부: { raw: "receive_no", label: "수신거부" },
    복귀: { raw: "복귀", label: "복귀" },
    휴면: { raw: "휴면", label: "휴면" },
    정지: { raw: "정지", label: "정지" },
    이탈위험군: { raw: "이탈위험군", label: "이탈위험군" },
};

// raw → label 로 뒤집기
// categoryMapping 객체를 [키, 값] 배열로 변환
// 각 배열을 [raw, label] 형태로 변환
// 변환된 배열을 객체로 다시 만듦 (raw → label 매핑)
const rawToLabel = Object.fromEntries(
    Object.entries(categoryMapping).map(([label, { raw }]) => [raw, label])
);

export default function UserType_UserStats() {
    // === 상태 관리 ===

    // 통계 전용 상태
    const [barChartData, setBarChartData] = useState([]); // 차트에 표시할 데이터

    // 리스트 전용 상태
    const [userList, setUserList] = useState([]); // 현재 보여줄 유저 목록
    const [totalPage, setTotalPage] = useState(1); // 총 페이지 수
    const [userTotalCount, setUserTotalCount] = useState(0); // 총 유저 수

    // 공용 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
    const [pageSize, setPageSize] = useState(10); // 한 페이지당 표시할 항목 수
    const [selectedCategory, setSelectedCategory] = useState(null); // 차트에서 클릭된 카테고리


    // === API 호출 함수 ===
    // 유저 분류 통계 및 목록을 불러오는 함수
    const getUserCategoryStats = async (token, page, size, category) => {
        try {
            // API 호출
            const { data } = await axios.get(`${URL}/get-user-category`, {
                headers: { Authorization: token },
                params: {
                    page,        // 페이지 번호
                    size,        // 페이지당 항목 수
                    category     // 선택된 카테고리 (비어있으면 전체)
                }
            });
            console.log(data);

            // 응답 데이터로 상태 업데이트
            setUserList(data.userCategoryList);        // 유저 목록
            setTotalPage(data.totalPage);              // 총 페이지 수
            setUserTotalCount(data.totalCount);

            // 차트 데이터 변환 및 설정
            setBarChartData(
                data.categoryStats.map((item) => {
                    // 카테고리 매핑에서 해당하는 정보 찾기
                    const map = categoryMapping[item.category] || { raw: item.category, label: item.category }
                    return {
                        raw: map.raw,      // 원본 카테고리 값
                        label: map.label,  // 화면에 표시할 라벨
                        count: item.count  // 해당 카테고리의 유저 수
                    }
                })
            );
        } catch (error) {
            console.log('유저 분류 통계 조회 실패: ', error);
            // 에러 발생 시 상태 초기화
            setUserList([]);
            setBarChartData([]);
            setTotalPage(0);
        }
    }

    // === useEffect 훅 ===
    // 초기 마운트 및 페이지/카테고리 변경 시 데이터 재호출
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) return; // 토큰이 없으면 API 호출하지 않음

        getUserCategoryStats(token, currentPage, pageSize, selectedCategory);
    }, [currentPage, pageSize, selectedCategory]); // 의존성 배열: 이 값들이 변경될 때마다 실행

    // === 이벤트 핸들러 ===
    // 차트 막대 클릭 시 해당 카테고리 선택
    const handleBarClick = (entry) => {
        setSelectedCategory(entry.raw);  // 선택된 카테고리 설정
        setCurrentPage(1);              // 클릭할 때마다 1페이지로 이동
        // setUserTotalCount(0);
    }

    // === 렌더링 ===
    return (
        <div className="userStats-chartWrapper-userType">
            <h2 className={"userStats-title"}>유저 분류 통계</h2>

            {/* 차트 영역 */}
            <ResponsiveContainer width="100%" height={600}>
                <BarChart
                    data={barChartData}
                    layout="vertical"  // 세로 막대 차트
                    margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                >
                    {/* 차트 그라데이션 정의 */}
                    <defs>
                        <linearGradient id="userTypeGradient" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#a367f9" stopOpacity={1} />
                            <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    {/* 차트 그리드 선 (투명도 조절) */}
                    <CartesianGrid stroke='rgba(255, 255, 255, 0.1)' />
                    <XAxis type="number" />
                    <YAxis dataKey="label" type="category" />
                    <Tooltip
                        formatter={(value) => `${value}명`}  // 툴팁에 "명" 단위 추가
                        contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                        cursor={{ fill: '#1c1b23' }}
                    />
                    <Bar
                        dataKey="count"
                        fill="url(#userTypeGradient)"  // 그라데이션 적용
                        onClick={handleBarClick}       // 클릭 이벤트
                        cursor="pointer"               // 마우스 포인터 변경
                    />
                </BarChart>
            </ResponsiveContainer>

            {/* 선택된 유저 타입의 상세 유저 목록 */}
            {selectedCategory && (
                <div className="user-type-details">
                    <h3 style={{ color: "#fff", marginTop: "20px", marginBottom: "16px" }}>
                        {rawToLabel[selectedCategory] || selectedCategory} 유저 목록 ({userTotalCount}명)
                    </h3>

                    {/* 유저 목록 렌더링 */}
                    {userList.map((user, idx) => (
                        <div key={idx} className="userStats-user-list-card">
                            <div className="user-list-info">
                                <div className="user-list-header">
                                    <span className="user-list-name">{user.user_nick}</span>
                                </div>

                                <div className="user-list-email">{user.user_id}</div>

                                {/* 유저 상세 정보 */}
                                <div className="user-list-info">
                                    <div><span className="label">유저 ID: </span> {user.userId}</div>
                                    <div><span className="label">성별:</span> {user.userGender}</div>
                                    <div><span className="label">지역:</span> {user.region}</div>
                                    <div><span className="label">플레이 타임:</span> {user.totalPlayTime}분</div>
                                    <div><span className="label">총 과금액:</span> {user.totalPayment}원</div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* 페이지네이션 */}
                    {totalPage > 0 && (
                        <div className="pagination">
                            {(() => {
                                const buttons = [];
                                for (let i = 0; i < totalPage; i++) {
                                    buttons.push(
                                        <button
                                            key={i}
                                            onClick={() => setCurrentPage(i + 1)}
                                            className={currentPage === i + 1 ? "active" : ""}>
                                            {i + 1}
                                        </button>
                                    )
                                }
                                return buttons;
                            })()}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}