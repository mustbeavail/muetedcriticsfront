"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

export default function ModePlaytime_IngameStats() {
    const playTimeByMode = {};

    match_result.forEach((entry) => {
        const mode = entry.match_table?.match_mode ?? "기타";
        const time = entry.match_play_time ?? 0;

        if (!playTimeByMode[mode]) {
            playTimeByMode[mode] = 0;
        }
        playTimeByMode[mode] += time;
    });

    const chartData = Object.entries(playTimeByMode).map(([match_mode, total_play_time]) => ({
        match_mode,
        total_play_time
    }));

    return (
        <div className={"ingameStats-chartWrapper-modePlaytime"}>
            <h2 className={"userStats-title"}>전체 유저의 모드별 플레이타임</h2>
            <div className="tierStats-chartWrapper-datalist">
                {/* 표 영역 */}
                <div className="tierStats-chartWrapper-tableBox">
                    <div className="row header">
                        <div className="cell">게임 모드</div>
                        <div className="cell">총 플레이 시간</div>
                    </div>
                    {chartData.map((mode, idx) => (
                        <div className="row" key={idx}>
                            <div className="cell">{mode.match_mode}</div>
                            <div className="cell">{mode.total_play_time}분</div>
                        </div>
                    ))}
                    <div className="row total">
                        <div className="cell">총합</div>
                        <div className="cell">
                            {
                                chartData.reduce((sum, item) => sum + item.total_play_time, 0)
                            }분
                        </div>
                    </div>
                </div>
                <ResponsiveContainer width="60%" height={310}>
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="match_mode" />
                        <YAxis unit="분" />
                        <Tooltip
                            formatter={(value) => `${value}분`}
                            contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }}
                            cursor={{ fill: '#1c1b23' }}
                        />
                        <Bar dataKey="total_play_time" fill="#9C27B0" name="총 플레이 시간" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}   