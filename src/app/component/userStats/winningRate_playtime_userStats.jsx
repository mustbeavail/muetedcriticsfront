'use client'
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const match_result = [
    {
        result_idx: 5001,
        match_play_time: 20,
        potg: 0,
        vitory_or_defeat: "victory",
        heroes: {
            heroes_idx: 19,
            heros_name: "소전",
            role: "공격",
        },
        match_table: {
            match_idx: 1,
            match_date: "2025-12-16",
            match_mode: "경쟁전",
            match_end_time: "2025-12-16 21:06:00.000",
            match_start_time: "2025-12-16 20:46:00.000",
        },
        user_id: "annamarie.jast@rogahn.com",
    },
    {
        result_idx: 5002,
        match_play_time: 20,
        potg: 0,
        vitory_or_defeat: "victory",
        heroes: {
            heroes_idx: 32,
            heros_name: "한조",
            role: "공격",
        },
        match_table: {
            match_idx: 1,
            match_date: "2025-12-16",
            match_mode: "경쟁전",
            match_end_time: "2025-12-16 21:06:00.000",
            match_start_time: "2025-12-16 20:46:00.000",
        },
        user_id: "shaunta.bechtelar@prosacco.com"
    },
    {
        result_idx: 5003,
        match_play_time: 20,
        potg: 0,
        vitory_or_defeat: "victory",
        heroes: {
            heroes_idx: 27,
            heros_name: "캐서디",
            role: "공격",
        },
        match_table: {
            match_idx: 1,
            match_date: "2025-12-16",
            match_mode: "경쟁전",
            match_end_time: "2025-12-16 21:06:00.000",
            match_start_time: "2025-12-16 20:46:00.000",
        },
        user_id: "josh.howell@dare.com"
    },
    {
        result_idx: 5004,
        match_play_time: 20,
        potg: 0,
        vitory_or_defeat: "victory",
        heroes: {
            heroes_idx: 3,
            heros_name: "라마트라",
            role: "돌격",
        },
        match_table: {
            match_idx: 1,
            match_date: "2025-12-16",
            match_mode: "경쟁전",
            match_end_time: "2025-12-16 21:06:00.000",
            match_start_time: "2025-12-16 20:46:00.000",
        },
        user_id: "jarod.wuckert@halvorson.com"
    },
    {
        result_idx: 5005,
        match_play_time: 20,
        potg: 0,
        vitory_or_defeat: "victory",
        heroes: {
            heroes_idx: 25,
            heros_name: "위도우메이커",
            role: "공격",
        },
        match_table: {
            match_idx: 1,
            match_date: "2025-12-16",
            match_mode: "경쟁전",
            match_end_time: "2025-12-16 21:06:00.000",
            match_start_time: "2025-12-16 20:46:00.000",
        },
        user_id: "gil.dickens@hahn.com"
    },
    {
        result_idx: 5006,
        match_play_time: 20,
        potg: 0,
        vitory_or_defeat: "defeat",
        heroes: {
            heroes_idx: 31,
            heros_name: "프레야",
            role: "공격",
        },
        match_table: {
            match_idx: 1,
            match_date: "2025-12-16",
            match_mode: "경쟁전",
            match_end_time: "2025-12-16 21:06:00.000",
            match_start_time: "2025-12-16 20:46:00.000",
        },
        user_id: "nathanael.pfeffer@deckow.com"
    },
    {
        result_idx: 5007,
        match_play_time: 20,
        potg: 0,
        vitory_or_defeat: "defeat",
        heroes: {
            heroes_idx: 13,
            heros_name: "해저드",
            role: "돌격",
        },
        match_table: {
            match_idx: 1,
            match_date: "2025-12-16",
            match_mode: "경쟁전",
            match_end_time: "2025-12-16 21:06:00.000",
            match_start_time: "2025-12-16 20:46:00.000",
        },
        user_id: "charolette.johnson@collins.com"
    },
    {
        result_idx: 5008,
        match_play_time: 20,
        potg: 0,
        vitory_or_defeat: "defeat",
        heroes: {
            heroes_idx: 41,
            heros_name: "젠야타",
            role: "지원",
        },
        match_table: {
            match_idx: 1,
            match_date: "2025-12-16",
            match_mode: "경쟁전",
            match_end_time: "2025-12-16 21:06:00.000",
            match_start_time: "2025-12-16 20:46:00.000",
        },
        user_id: "maria.torp@beer.com"
    },
    {
        result_idx: 5009,
        match_play_time: 20,
        potg: 0,
        vitory_or_defeat: "defeat",
        heroes: {
            heroes_idx: 43,
            heros_name: "키리코",
            role: "지원",
        },
        match_table: {
            match_idx: 1,
            match_date: "2025-12-16",
            match_mode: "경쟁전",
            match_end_time: "2025-12-16 21:06:00.000",
            match_start_time: "2025-12-16 20:46:00.000",
        },
        user_id: "malcom.windler@lehner.com"
    },
    {
        result_idx: 5010,
        match_play_time: 20,
        potg: 1,
        vitory_or_defeat: "defeat",
        heroes: {
            heroes_idx: 30,
            heros_name: "파라",
            role: "공격",
        },
        match_table: {
            match_idx: 1,
            match_date: "2025-12-16",
            match_mode: "경쟁전",
            match_end_time: "2025-12-16 21:06:00.000",
            match_start_time: "2025-12-16 20:46:00.000",
        },
        user_id: "doloris.kohler@hane.com"
    },
    {
        result_idx: 5011,
        match_play_time: 36,
        potg: 0,
        vitory_or_defeat: "victory",
        heroes: {
            heroes_idx: 8,
            heros_name: "시그마",
            role: "돌격",
        },
        match_table: {
            match_idx: 2,
            match_date: "2025-08-14",
            match_mode: "빠른대전",
            match_end_time: "2025-08-14 01:09:00.000",
            match_start_time: "2025-08-14 00:33:00.000",
        },
        user_id: "maggie.pfannerstill@witting.com"
    },
    {
        result_idx: 5012,
        match_play_time: 36,
        potg: 1,
        vitory_or_defeat: "victory",
        heroes: {
            heroes_idx: 39,
            heros_name: "아나",
            role: "지원",
        },
        match_table: {
            match_idx: 2,
            match_date: "2025-08-14",
            match_mode: "빠른대전",
            match_end_time: "2025-08-14 01:09:00.000",
            match_start_time: "2025-08-14 00:33:00.000",
        },
        user_id: "ma.kassulke@roob.com"
    },
    {
        result_idx: 5013,
        match_play_time: 36,
        potg: 0,
        vitory_or_defeat: "victory",
        heroes: {
            heroes_idx: 36,
            heros_name: "모이라",
            role: "지원",
        },
        match_table: {
            match_idx: 2,
            match_date: "2025-08-14",
            match_mode: "빠른대전",
            match_end_time: "2025-08-14 01:09:00.000",
            match_start_time: "2025-08-14 00:33:00.000",
        },
        user_id: "xavier.boyle@wuckert.com"
    },
    {
        result_idx: 5014,
        match_play_time: 36,
        potg: 0,
        vitory_or_defeat: "victory",
        heroes: {
            heroes_idx: 42,
            heros_name: "주노",
            role: "지원",
        },
        match_table: {
            match_idx: 2,
            match_date: "2025-08-14",
            match_mode: "빠른대전",
            match_end_time: "2025-08-14 01:09:00.000",
            match_start_time: "2025-08-14 00:33:00.000",
        },
        user_id: "helene.ledner@grimes.com"
    },
    {
        result_idx: 5015,
        match_play_time: 36,
        potg: 0,
        vitory_or_defeat: "victory",
        heroes: {
            heroes_idx: 4,
            heros_name: "라인하르트",
            role: "돌격",
        },
        match_table: {
            match_idx: 2,
            match_date: "2025-08-14",
            match_mode: "빠른대전",
            match_end_time: "2025-08-14 01:09:00.000",
            match_start_time: "2025-08-14 00:33:00.000",
        },
        user_id: "pete.emard@white.com"
    },
    {
        result_idx: 5016,
        match_play_time: 36,
        potg: 0,
        vitory_or_defeat: "defeat",
        heroes: {
            heroes_idx: 11,
            heros_name: "자리야",
            role: "돌격",
        },
        match_table: {
            match_idx: 2,
            match_date: "2025-08-14",
            match_mode: "빠른대전",
            match_end_time: "2025-08-14 01:09:00.000",
            match_start_time: "2025-08-14 00:33:00.000",
        },
        user_id: "kennith.jacobson@brown.com"
    },
    {
        result_idx: 5017,
        match_play_time: 36,
        potg: 0,
        vitory_or_defeat: "defeat",
        heroes: {
            heroes_idx: 24,
            heros_name: "에코",
            role: "공격",
        },
        match_table: {
            match_idx: 2,
            match_date: "2025-08-14",
            match_mode: "빠른대전",
            match_end_time: "2025-08-14 01:09:00.000",
            match_start_time: "2025-08-14 00:33:00.000",
        },
        user_id: "isis.klein@rutherford.com"
    },
    {
        result_idx: 5018,
        match_play_time: 36,
        potg: 0,
        vitory_or_defeat: "defeat",
        heroes: {
            heroes_idx: 43,
            heros_name: "키리코",
            role: "지원",
        },
        match_table: {
            match_idx: 2,
            match_date: "2025-08-14",
            match_mode: "빠른대전",
            match_end_time: "2025-08-14 01:09:00.000",
            match_start_time: "2025-08-14 00:33:00.000",
        },
        user_id: "ronny.sporer@gerlach.com"
    },
    {
        result_idx: 5019,
        match_play_time: 36,
        potg: 0,
        vitory_or_defeat: "defeat",
        heroes: {
            heroes_idx: 2,
            heros_name: "둠피스트",
            role: "돌격",
        },
        match_table: {
            match_idx: 2,
            match_date: "2025-08-14",
            match_mode: "빠른대전",
            match_end_time: "2025-08-14 01:09:00.000",
            match_start_time: "2025-08-14 00:33:00.000",
        },
        user_id: "keturah.oconner@leuschke.com"
    },
    {
        result_idx: 5020,
        match_play_time: 36,
        potg: 0,
        vitory_or_defeat: "defeat",
        heroes: {
            heroes_idx: 21,
            heros_name: "솜브라",
            role: "공격",
        },
        match_table: {
            match_idx: 2,
            match_date: "2025-08-14",
            match_mode: "빠른대전",
            match_end_time: "2025-08-14 01:09:00.000",
            match_start_time: "2025-08-14 00:33:00.000",
        },
        user_id: "daniell.welch@borer.com"
    }
]

// 영웅별 플레이타임 데이터 추출
const getHeroPlaytimeData = (data) => {
    const heroMap = {};

    data.forEach((item) => {
        const heroName = item.heroes.heros_name;
        const playTime = item.match_play_time;

        if (!heroMap[heroName]) {
            heroMap[heroName] = 0;
        }
        heroMap[heroName] += playTime;
    });

    return Object.entries(heroMap).map(([name, playtime]) => ({ name, playtime }));
};

// 주 플레이 역할군 추출 및 플레이타임 데이터 추출
const getMainRoleInfo = (data) => {
    const roleMap = {};
    let total = 0;

    data.forEach(item => {
        const role = item.heroes.role;
        const time = item.match_play_time;

        if (!roleMap[role]) roleMap[role] = 0;
        roleMap[role] += time;
        total += time;
    });

    const top = Object.entries(roleMap).sort((a, b) => b[1] - a[1])[0];

    if (!top || total === 0) return { roleName: "-", ratio: "0.0" };

    const [roleName, rolePlayTime] = top;
    const ratio = ((rolePlayTime / total) * 100).toFixed(1);

    return { roleName, ratio };
};

// 모드별 플레이타임 데이터 추출
const getModePlaytimeData = (data) => {
    const modeMap = {};

    data.forEach(item => {
        const mode = item.match_table.match_mode;
        const time = item.match_play_time;

        if (!modeMap[mode]) {
            modeMap[mode] = 0;
        }

        modeMap[mode] += time;
    });

    return Object.entries(modeMap).map(([mode, playtime]) => ({ mode, playtime }));
};


export default function WinningRate_Playtime_UserStats() {
    const [currentPage, setCurrentPage] = useState(1);

    // 첫 번째 유저의 데이터만 사용
    const firstUserId = match_result.length > 0 ? match_result[0].user_id : "";
    const userData = match_result.filter(item => item.user_id === firstUserId);

    const winCount = userData.filter(i => i.vitory_or_defeat === "victory").length;
    const totalCount = userData.length;
    const winRate = totalCount === 0 ? 0 : (winCount / totalCount) * 100;

    const heroPlaytimeData = getHeroPlaytimeData(userData);
    const mainRoleInfo = getMainRoleInfo(userData);
    const modePlaytimeData = getModePlaytimeData(userData);

    // 더미 페이지네이션 데이터
    const totalPages = 5; // 임의의 페이지 수

    return (
        <div className={"userStats-chartWrapper"}>
            <h2 className={"userStats-title"}>유저 승률 및 플레이타임</h2>

            <div className={"userStats-search"}>
                <span>유저 검색</span>
                <div className={"userStats-input-wrapper"}>
                    <input
                        type="text"
                        placeholder="Search"
                    />
                    <button className={"userStats-search-btn"}><IoSearch /></button>
                </div>
            </div>

            <div className={"userStats-filterBox-wrapper"}>
                <div className={"userStats-filterBox"}>
                    기간 시작일 <input type="date" />
                    기간 종료일 <input type="date" />
                    <button>조회</button>
                </div>
            </div>

            <div className="userStats-result">
                <h3>{firstUserId}</h3>
                <p>승리 <span className="win">{winCount} </span>
                    / 패배 <span className="lose">{totalCount - winCount}</span></p>

                <div className="userStats-winrate">
                    <label>유저 승률</label>
                    <div className="userStats-progress">
                        <div className="bar"
                            style={{ background: `linear-gradient(to right, #9b59b6 ${winRate}%, transparent ${winRate}%)` }}
                        />
                        <span className="percentage">{winRate.toFixed(2)}%</span>
                    </div>
                </div>

                <div className="userStats-playtime">
                    <div className="userStats-playtime-title">영웅별 플레이타임</div>
                    {/* 영웅별 플레이타임 그래프 출력 */}
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                            data={heroPlaytimeData}
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
                                {heroPlaytimeData.map((entry, index) => (
                                    <Cell key={entry.name} fill="#8a2be2" />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="userStats-playtime-role">주 플레이 역할군: <span>
                        <strong>{mainRoleInfo.roleName} </strong>
                        (총 플레이 중 {mainRoleInfo.ratio}%)</span>
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
                        <strong>{userData.reduce((acc, item) => acc + item.match_play_time, 0)}</strong>
                        시간</span></div>
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