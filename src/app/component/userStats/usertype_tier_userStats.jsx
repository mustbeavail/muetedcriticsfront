'use client'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_URL;

const COLORS = [
    "#1F77B4", "#2CA02C", "#FFBB28", "#FF7F0E", "#9467BD",
    "#D62728", "#E377C2", "#17BECF", "#BCBD22", "#F7B267"
];

export default function Usertype_Tier_UserStats() {
    const [heroData, setHeroData] = useState([]);
    const [completeChartData, setCompleteChartData] = useState([]);

    const [currentUsers, setCurrentUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    // 필터 상태들
    const [seasonIdx, setSeasonIdx] = useState(1);
    const [selectedGender, setSelectedGender] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedVip, setSelectedVip] = useState(null);
    const [selectedHero, setSelectedHero] = useState(null);
    const [selectedTier, setSelectedTier] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) return;
        getHeroData(token);
    }, []);

    // 영웅 정보 불러오기
    const getHeroData = async (token) => {
        try {
            const { data } = await axios.get(`${URL}/get/hero-data`, {
                headers: { Authorization: token }
            });
            setHeroData(data);
        } catch (error) {
            console.log('영웅 정보 조회 실패: ', error);
        }
    };

    // 조회 버튼 클릭시 불러오기
    const handleSearch = useCallback(() => {
        const token = sessionStorage.getItem('token');
        if (!token) return;
        getUserTypeTierStats(token, seasonIdx, selectedGender, selectedVip, selectedHero, selectedTier);
    }, [seasonIdx, selectedGender, selectedVip, selectedHero, selectedTier]);

    // 차트 클릭 핸들러
    const handlePieClick = (data) => {
        setSelectedTier(data.name); // 필터 상태 업데이트
        setCurrentPage(1); // 새 필터링이니 1페이지부터
    };

    // selectedTier 변경 시 필터링된 유저 목록 업데이트
    useEffect(() => {
        handleSearch();
    }, [selectedTier]); // seletedTier 가 바뀔 때도 검색 실행

    const getUserTypeTierStats = async (token) => {
        try {
            const { data } = await axios.get(`${URL}/user-tier-stats`, {
                headers: { Authorization: token },
                params: {
                    seasonIdx,
                    gender: selectedGender,
                    region: selectedRegion,
                    vip: selectedVip,
                    heroId: selectedHero,
                    tierName: selectedTier,
                    page: currentPage,
                    size: 10
                }
            });

            if (data) {
                // Pie chart 데이터
                setCompleteChartData(data.tierStats.map(t => ({
                    name: t.tierName,
                    value: t.userCount
                })));

                setCurrentUsers(data.userClassificationPage.content);
                setTotalPages(Math.ceil(data.userClassificationPage.totalCount / data.userClassificationPage.size));
            }
        } catch (error) {
            console.log('유저 분류별 티어 통계 조회 실패: ', error);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [currentPage]);


    return (
        <div className="userStats-chartWrapper-tier">
            <div className="userStats-filterBox-wrapper">
                <h2 className={"userStats-title"}>유저 분류별 티어 통계</h2>
                <div className="itemStats-filterBox">
                    VIP {/* 이 부분은 체크박스로 */}
                    <input type="checkbox" className="itemStats-checkbox"
                        checked={selectedVip === true}
                        onChange={e => setSelectedVip(e.target.checked ? true : null)} />

                    성별
                    <select className="itemStats-select"
                        value={selectedGender || ""}
                        onChange={e => setSelectedGender(e.target.value || null)}>
                        <option value="">전체</option>
                        <option value="남자">남자</option>
                        <option value="여자">여자</option>
                    </select>

                    지역
                    <select className="itemStats-select"
                        value={selectedRegion || ""}
                        onChange={e => setSelectedRegion(e.target.value || null)}>
                        <option value="">-</option>
                        <option value="아시아">아시아</option>
                        <option value="북미">북미</option>
                        <option value="오세아니아">오세아니아</option>
                        <option value="유럽">유럽</option>
                        <option value="아프리카">아프리카</option>
                    </select>

                    영웅
                    <select className="itemStats-select"
                        value={selectedHero ?? ""}
                        onChange={e => {
                            const val = e.target.value;
                            setSelectedHero(val === "" ? null : Number(val));
                        }}>
                        <option value="">전체</option>
                        {heroData.map(hero => (
                            <option key={hero.heroes_idx} value={hero.heroes_idx}>{hero.heroes_name}</option>
                        ))}
                    </select>

                    티어
                    <select className="itemStats-select"
                        value={selectedTier || ""}
                        onChange={e => setSelectedTier(e.target.value || null)}>
                        <option value="">전체</option>
                        <option value="브론즈">브론즈</option>
                        <option value="실버">실버</option>
                        <option value="골드">골드</option>
                        <option value="플래티넘">플래티넘</option>
                        <option value="다이아몬드">다이아몬드</option>
                        <option value="마스터">마스터</option>
                        <option value="그랜드마스터">그랜드마스터</option>
                        <option value="챌린저">챌린저</option>
                    </select>

                    시즌
                    <select className="itemStats-select"
                        value={seasonIdx}
                        onChange={e => setSeasonIdx(Number(e.target.value))}>
                        <option value="1">시즌 1</option>
                        <option value="2">시즌 2</option>
                        <option value="3">시즌 3</option>
                        <option value="4">시즌 4</option>
                    </select>

                    <button className="itemStats-button" onClick={handleSearch}>조회</button>
                </div>

            </div>

            <div className="tierStats-chartWrapper-datalist">
                <div className="tierStats-chartWrapper-chartBox">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={completeChartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius="40%"
                                outerRadius="80%"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                                labelLine={false}
                                onClick={handlePieClick}
                            >
                                {completeChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `${value}명`}
                                contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                                cursor={{ fill: '#1c1b23' }}
                            />
                            <Legend verticalAlign="bottom" iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="tierStats-chartWrapper-tableBox">
                    <div className="row header">
                        <div className="cell">티어 이름</div>
                        <div className="cell">인원 수</div>
                    </div>
                    {completeChartData.map((tier, idx) => (
                        <div className="row" key={idx}>
                            <div className="cell">{tier.name}</div>
                            <div className="cell">{tier.value}명</div>
                        </div>
                    ))}
                </div>
            </div>

            {currentUsers.length > 0 && (
                <div className="tier-clicked-users">
                    <h3 style={{ color: "#fff" }}>
                        {selectedTier} 티어 유저 목록 ({currentUsers.length}명)
                    </h3>
                    {currentUsers.map((userObj, idx) => (
                        <div key={idx} className="userStats-user-list-card">
                            <div className="user-list-info">
                                <div className="user-list-header">
                                    <span className="user-list-name">{userObj.userNick || userObj.userId}</span>
                                </div>
                                <div className="user-list-email">{userObj.userId}</div>
                                <div className="user-list-info">
                                    <div><span className="label">성별</span> {userObj.userGender}</div>
                                    <div><span className="label">지역</span> {userObj.region}</div>
                                    <div><span className="label">주 영웅</span> {userObj.mainHero}</div>
                                </div>
                            </div>
                            <div className="user-list-menu">⋮</div>
                        </div>
                    ))}
                    <div className="pagination">
                        {(() => {
                            const buttons = [];
                            for (let i = 0; i < totalPages; i++) {
                                buttons.push(
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={currentPage === i + 1 ? "active" : ""}
                                    >
                                        {i + 1}
                                    </button>
                                );
                            }
                            return buttons;
                        })()}
                    </div>
                </div>
            )}
        </div>
    );
}
