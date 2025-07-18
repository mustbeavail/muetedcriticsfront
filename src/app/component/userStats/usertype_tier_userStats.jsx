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
    const [heroData, setHeroData] = useState([]); // 영웅 리스트
    const [completeChartData, setCompleteChartData] = useState([]); // 차트(티어 통계) 데이터

    const [currentUsers, setCurrentUsers] = useState([]); // 선택한 티어의 유저 리스트
    const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

    // 필터 상태들
    const [seasonIdx, setSeasonIdx] = useState(4); // 기본값 4(현재 시즌)
    const [selectedGender, setSelectedGender] = useState(null); // 성별
    const [selectedRegion, setSelectedRegion] = useState(null); // 지역
    const [selectedVip, setSelectedVip] = useState(null); // VIP
    const [selectedHero, setSelectedHero] = useState(null); // 영웅
    const [selectedTier, setSelectedTier] = useState(null); // Pie 에서 클릭한 티어

    useEffect(() => {
        // 최초 마운트 시 영웅 데이터만 불러오기
        const token = sessionStorage.getItem('token');
        if (!token) return;
        getHeroData(token);
    }, []);


    // 영웅 정보 불러오기(최초 1회)
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

    // params 를 값이 있을 때만 동적으로 생성
    const makeParams = (tierName = null, page = null, size = null) => {
        const params = { seasonIdx }; // 필수
        if (selectedGender) params.gender = selectedGender;
        if (selectedRegion) params.region = selectedRegion;
        if (selectedVip !== null) params.vip = selectedVip;
        if (selectedHero) params.heroId = selectedHero;
        if (tierName) params.tierName = tierName;
        if (page) params.page = page;
        if (size) params.size = size;
        return params;
    }

    // ------------------------------ 조회 ------------------------------
    // 조회 버튼 눌렀을 때 전체 Pie 데이터만 불러오기
    // 유저 리스트, 선택 티어 초기화

    // 1. 조회 버튼: Pie, 인원표만 조회, 리스트/티어는 초기화
    const handleSearch = useCallback(async () => {
        const token = sessionStorage.getItem('token');
        if (!token) return;
        try {
            const { data } = await axios.get(`${URL}/user-tier-stats`, {
                headers: { Authorization: token },
                params: makeParams()
            });
            setCompleteChartData(data.tierStats.map(t => ({
                name: t.tierName,
                value: t.userCount
            })));
            setSelectedTier(null); // Pie 클릭 해제
            setCurrentUsers([]); // 유저 리스트 초기화
            setTotalPages(1); // 페이지 수 초기화
            setCurrentPage(1); // 페이지 번호 초기화
        } catch (error) {
            console.log('유저 분류별 티어 통계 조회 실패: ', error);
        }
    }, [seasonIdx, selectedGender, selectedRegion, selectedVip, selectedHero]);

    // 2. Pie 클릭: 해당 Pie(티어)에 현재 모든 필터를 포함해 리스트 조회
    const handlePieClick = useCallback((data) => {
        setSelectedTier(data.name); // 클릭한 티어명
        setCurrentPage(1); // 항상 1페이지부터
    }, []);

    // Pie 클릭 시에만 리스트 불러옴 (필터 & 페이지 바뀔 때마다)
    useEffect(() => {
        if (!selectedTier) {
            setCurrentUsers([]);
            setTotalPages(1);
            return;
        }

        const token = sessionStorage.getItem('token');
        if (!token) return;
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get(`${URL}/user-tier-stats`, {
                    headers: { Authorization: token },
                    params: makeParams(selectedTier, currentPage, 10)
                });
                setCurrentUsers(data.userClassificationPage.content);
                setTotalPages(Math.max(1, Math.ceil(data.userClassificationPage.totalCount / data.userClassificationPage.size)));
            } catch (error) {
                console.log('유저 분류별 티어 통계 조회 실패: ', error);
            }
        };
        fetchUsers();
    }, [selectedTier, currentPage, seasonIdx, selectedGender, selectedRegion, selectedVip, selectedHero]);

    // 드롭다운 필터가 바뀌면 Pie 선택/리스트/페이지도 초기화
    useEffect(() => {
        setCurrentPage(1);
        setSelectedTier(null);
        setCurrentUsers([]);
    }, [seasonIdx, selectedGender, selectedRegion, selectedVip, selectedHero]);


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
                                    <span className="user-list-name">{userObj.userId}</span>
                                </div>
                                <div className="user-list-info">
                                    <div><span className="label">성별: </span> {userObj.userGender}</div>
                                    <div><span className="label">지역: </span> {userObj.region}</div>
                                    <div><span className="label">주 영웅: </span> {userObj.mainHero || '없음'}</div>
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
