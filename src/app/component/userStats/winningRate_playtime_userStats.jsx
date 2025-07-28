'use client'
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../utils/api';
import { format } from 'date-fns-tz';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function WinningRate_Playtime_UserStats() {
    const [userOverview, setUserOverview] = useState({});
    const [searchId, setSearchId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [heroPlaytimeData, setHeroPlaytimeData] = useState([]);
    const [modePlaytimeData, setModePlaytimeData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const itemsPerPage = 15; // 페이지당 항목 수

    // 현재 페이지의 hero 데이터만 추출
    const pagenatedHeroData = heroPlaytimeData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(heroPlaytimeData.length / itemsPerPage); // 총 페이지 수

    const today = format(new Date(), 'yyyy-MM-dd', {timeZone: 'Asia/Seoul'});


    // 조회 버튼 클릭시 실행
    const handleSearch = () => {
        const token = sessionStorage.getItem('token');
        if (!token || !searchId || !startDate || !endDate) {
            alert('검색할 유저 ID 를 입력하고 기간을 설정하세요.');
            return;
        }
        getUserStatsOverview(token, searchId, startDate, endDate);
    };

    // 유저 승리, 패배, 승률 조회   
    const getUserStatsOverview = async (token, userId, startDate, endDate) => {
        try {
            const { data } = await api.get(`${URL}/user-stats/overview`, {
                headers: { Authorization: token },
                params: {
                    userId: userId,
                    startDate: startDate,
                    endDate: endDate
                }
            });
            if (data != null && data != undefined) {
                console.log(data);
                setUserOverview({
                    wins: data.wins,
                    losses: data.losses,
                    winRate: data.winRate,
                    mainRole: data.mainRole,
                    totalPlay: data.totalPlay
                });

                // 추가
                setHeroPlaytimeData(
                    data.heroTimes.map(hero => ({
                        name: hero.heroName, // y축에 쓸 이름
                        playtime: hero.playTime // x축 값
                    }))
                );

                // modePlayTimes -> 객체를 배열로 변환
                const modeArray = Object.entries(data.modePlayTimes).map(([mode, playtime]) => ({
                    mode,
                    playtime
                }));
                setModePlaytimeData(modeArray);

                setCurrentPage(1); // 조회 시 첫 페이지로 초기화
            }
        } catch (error) {
            console.log('유저 승리, 패배, 승률 조회 실패: ', error);

            const errorMsg = error.response.data.msg;
            if (errorMsg) {
                alert(errorMsg);
            } else {
                alert('데이터를 불러오는 중 오류가 발생했습니다.');
            }

            setUserOverview({});
            setHeroPlaytimeData([]);
            setModePlaytimeData([]);
        }
    };



    return (
        <div className={"userStats-chartWrapper"}>
            <h2 className={"userStats-title"}>유저 승률 및 플레이타임</h2>

            <div className={"userStats-search"}>
                <span>유저 검색</span>
                <div className={"userStats-input-wrapper"}>
                    <input
                        type="text"
                        placeholder="유저 ID 입력"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    {/* <button className={"userStats-search-btn"}><IoSearch /></button> */}
                </div>
            </div>

            <div className={"userStats-filterBox-wrapper"}>
                <div className={"userStats-filterBox"}>
                    기간 시작일 <input type="date" onChange={(e) => setStartDate(e.target.value)} />
                    기간 종료일 <input type="date" max={today} onChange={(e) => setEndDate(e.target.value)} />
                    <button onClick={handleSearch}>조회</button>
                </div>
            </div>

            <div className="userStats-result">
                <h3></h3>
                <p>승리 <span className="win">{userOverview.wins}</span>
                    / 패배 <span className="lose">{userOverview.losses}</span></p>

                <div className="userStats-winrate">
                    <label>유저 승률</label>
                    <div className="userStats-progress">
                        <div className="bar"
                            style={{ background: `linear-gradient(to right, #9b59b6 ${userOverview.winRate}%, transparent ${userOverview.winRate}%)` }}
                        />
                        <span className="percentage">{userOverview.winRate}%</span>
                    </div>
                </div>

                <div className="userStats-playtime">
                    <div className="userStats-playtime-title">영웅별 플레이타임</div>
                    {/* 영웅별 플레이타임 그래프 출력 */}
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={pagenatedHeroData}
                            layout="vertical"
                            margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
                        >
                            <XAxis type="number" tick={{ fill: "#fff" }} />
                            <YAxis type="category" dataKey="name" tick={{ fill: "#fff" }} />
                            <Tooltip
                                formatter={(value) => `${value}분`}
                                contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                                cursor={{ fill: '#1c1b23' }}
                            />
                            <Bar dataKey="playtime" barSize={24}>
                                {pagenatedHeroData.map((entry, index) => (
                                    <Cell key={entry.name} fill="#8a2be2" />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="userStats-playtime-role">주 플레이 역할군: <span>
                        <strong>{userOverview.mainRole} </strong></span>
                    </div>

                    <div className="userStats-playtime-title">모드별 플레이타임</div>
                    {/* 모드별 플레이타임 그래프 출력 */}
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={modePlaytimeData}
                            layout="vertical"
                            margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
                        >
                            <XAxis type="number" tick={{ fill: "#fff" }} />
                            <YAxis type="category" dataKey="mode" tick={{ fill: "#fff" }} />
                            <Tooltip
                                formatter={(value) => `${value}분`}
                                contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                                cursor={{ fill: '#1c1b23' }}
                            />
                            <Bar dataKey="playtime" barSize={24} fill="#34d399" />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="userStats-playtime-role">총 플레이타임: <span>
                        <strong>{userOverview.totalPlay}</strong>
                        분</span></div>
                </div>
            </div>

            {/* 페이지네이션 기능 */}
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
        </div>
    );
}