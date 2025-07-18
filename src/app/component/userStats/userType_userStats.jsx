'use client'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function UserType_UserStats() {

    const [userList, setUserList] = useState([]); // 현재 보여줄 유저 목록
    const [barChartData, setBarChartData] = useState([]); // 차트용 데이터
    const [selectedCategory, setSelectedCategory] = useState(null); // 클릭된 카테고리
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [pageSize, setPageSize] = useState(10); // 한 페이지당 항목 수
    const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) return;
        getUserCategoryStats(token);
    }, []);

    // 유저 분류 통계 불러오기
    const getUserCategoryStats = async (token) => {
        try {
            const { data } = await axios.get(`${URL}/get-user-category`, {
                headers: { Authorization: token },
                params: {
                    page: currentPage,
                    size: pageSize,
                    category: selectedCategory
                }
            });
            if (data !== null && data !== undefined) {
                setUserList(data);
            } else {
                setUserList([]);
            }
        } catch (error) {
            console.log('유저 분류 통계 조회 실패: ', error);
            setUserList([]);
        }
    }







    return (
        <div className="userStats-chartWrapper-userType">
            <h2 className={"userStats-title"}>유저 분류 통계</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={barChartData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                >
                    <defs>
                        <linearGradient id="userTypeGradient" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stopColor="#a367f9" stopOpacity={1} />
                            <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="user_type" type="category" />
                    <Tooltip
                        formatter={(value) => `${value}명`}
                        contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                        cursor={{ fill: '#1c1b23' }}
                    />
                    <Bar
                        dataKey="count"
                        fill="url(#userTypeGradient)"
                        onClick={handleBarClick}
                        cursor="pointer"
                    />
                </BarChart>
            </ResponsiveContainer>

            {/* 선택된 유저 타입의 유저 목록 */}
            {selectedUserType && (
                <div className="user-type-details">
                    <h3 style={{ color: "#fff", marginTop: "20px", marginBottom: "16px" }}>
                        {selectedUserType} 유저 목록 ({filteredUsers.length}명)
                    </h3>

                    {currentUsers.map((user, idx) => (
                        <div key={idx} className="userStats-user-list-card">
                            <div className="user-list-info">
                                <div className="user-list-header">
                                    <span className="user-list-name">{user.user_nick}</span>
                                </div>

                                <div className="user-list-email">{user.user_id}</div>

                                <div className="user-list-info">
                                    <div><span className="label">성별</span> {user.user_gender}</div>
                                    <div><span className="label">지역</span> {user.region}</div>
                                    <div><span className="label">가입일</span> {user.join_date}</div>
                                </div>
                            </div>

                            <div className="user-list-menu">⋮</div>
                        </div>
                    ))}


                    {/* 페이지네이션 */}
                    {totalPages > 0 && (
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={currentPage === i + 1 ? "active" : ""}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}