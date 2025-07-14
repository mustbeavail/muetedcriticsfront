'use client'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { useState } from "react";

const tierData = [
    {
        tier_idx: 1,
        tier_date: "2025-02-26",
        tier_name: "골드",
        season_idx: 1,
        user: {
            user_id: "aaron.willms@hintz.com",
            dormant_date: "null",
            join_date: "2025-04-02",
            phone: "01056541175",
            receive_yn: true,
            receive_yn_at: "2025-04-02",
            region: "유럽",
            user_gender: "남자",
            user_nick: "SwiftKnight5153",
            user_type: "미분류",
            vip_yn: false
        }
    },
    {
        "tier_idx": 2,
        "tier_date": "2025-02-18",
        "tier_name": "브론즈",
        "season_idx": 1,
        user: {
            "user_id": "adalberto.dickinson@green.com",
            "dormant_date": "null",
            "join_date": "2025-05-24",
            "phone": "01085871441",
            "receive_yn": true,
            "receive_yn_at": "2025-05-24",
            "region": "아프리카",
            "user_gender": "남자",
            "user_nick": "SwiftGuardian501",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 3,
        "tier_date": "2025-02-26",
        "tier_name": "골드",
        "season_idx": 1,
        user: {
            "user_id": "adriene.mraz@hegmann.com",
            "dormant_date": "null",
            "join_date": "2025-04-01",
            "phone": "01049347765",
            "receive_yn": false,
            "receive_yn_at": "null",
            "region": "아프리카",
            "user_gender": "여자",
            "user_nick": "ThunderMaster1800",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 4,
        "tier_date": "2025-01-23",
        "tier_name": "골드",
        "season_idx": 2,
        user: {
            "user_id": "agustina.waters@funk.com",
            "dormant_date": "null",
            "join_date": "2025-03-31",
            "phone": "01041089828",
            "receive_yn": false,
            "receive_yn_at": "null",
            "region": "아프리카",
            "user_gender": "여자",
            "user_nick": "ProGuardian1014",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 5,
        "tier_date": "2025-02-16",
        "tier_name": "플래티넘",
        "season_idx": 2,
        user: {
            "user_id": "alayna.baumbach@moore.com",
            "dormant_date": "null",
            "join_date": "2025-02-07",
            "phone": "01001932388",
            "receive_yn": true,
            "receive_yn_at": "2025-02-07",
            "region": "오세아니아",
            "user_gender": "여자",
            "user_nick": "EliteHunter790",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 6,
        "tier_date": "2025-01-19",
        "tier_name": "실버",
        "season_idx": 2,
        user: {
            "user_id": "alexander.casper@leannon.com",
            "dormant_date": "null",
            "join_date": "2025-03-09",
            "phone": "01091272166",
            "receive_yn": true,
            "receive_yn_at": "2025-03-09",
            "region": "아시아",
            "user_gender": "여자",
            "user_nick": "EliteSlayer6449",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 7,
        "tier_date": "2025-02-26",
        "tier_name": "골드",
        "season_idx": 2,
        user: {
            "user_id": "alfonso.okeefe@rogahn.com",
            "dormant_date": "null",
            "join_date": "2025-04-03",
            "phone": "01089855495",
            "receive_yn": true,
            "receive_yn_at": "2025-04-03",
            "region": "아시아",
            "user_gender": "여자",
            "user_nick": "StormGuardian9675",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 8,
        "tier_date": "2025-02-24",
        "tier_name": "다이아몬드",
        "season_idx": 3,
        user: {
            "user_id": "allen.wisoky@wisozk.com",
            "dormant_date": "null",
            "join_date": "2025-05-04",
            "phone": "01003639835",
            "receive_yn": true,
            "receive_yn_at": "2025-05-04",
            "region": "북미",
            "user_gender": "여자",
            "user_nick": "ShadowWarrior5463",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 9,
        "tier_date": "2025-02-14",
        "tier_name": "실버",
        "season_idx": 3,
        user: {
            "user_id": "altagracia.stark@hamill.com",
            "dormant_date": "null",
            "join_date": "2025-05-07",
            "phone": "01090187581",
            "receive_yn": false,
            "receive_yn_at": null,
            "region": "오세아니아",
            "user_gender": "여자",
            "user_nick": "IceSniper6225",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 10,
        "tier_date": "2025-02-28",
        "tier_name": "골드",
        "season_idx": 3,
        user: {
            "user_id": "andera.daugherty@barrows.com",
            "dormant_date": "null",
            "join_date": "2025-06-11",
            "phone": "01088559145",
            "receive_yn": true,
            "receive_yn_at": "2025-06-11",
            "region": "유럽",
            "user_gender": "남자",
            "user_nick": "StormMaster642",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 11,
        "tier_date": "2025-01-23",
        "tier_name": "실버",
        "season_idx": 4,
        user: {
            "user_id": "andre.kris@smith.com",
            "dormant_date": "null",
            "join_date": "2025-06-18",
            "phone": "01070097944",
            "receive_yn": true,
            "receive_yn_at": "2025-06-18",
            "region": "오세아니아",
            "user_gender": "여자",
            "user_nick": "FireMaster7378",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 12,
        "tier_date": "2025-01-18",
        "tier_name": "플래티넘",
        "season_idx": 4,
        user: {
            "user_id": "andres.bechtelar@pouros.com",
            "dormant_date": "null",
            "join_date": "2025-02-14",
            "phone": "01033717033",
            "receive_yn": true,
            "receive_yn_at": "2025-02-14",
            "region": "북미",
            "user_gender": "남자",
            "user_nick": "DarkKnight6539",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 13,
        "tier_date": "2025-02-10",
        "tier_name": "플래티넘",
        "season_idx": 4,
        user: {
            "user_id": "angel.cummerata@borer.com",
            "dormant_date": "null",
            "join_date": "2025-06-27",
            "phone": "01059618062",
            "receive_yn": false,
            "receive_yn_at": null,
            "region": "아시아",
            "user_gender": "남자",
            "user_nick": "ProSlayer6800",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 14,
        "tier_date": "2025-02-13",
        "tier_name": "마스터",
        "season_idx": 4,
        user: {
            "user_id": "annamae.dickens@becker.com",
            "dormant_date": "null",
            "join_date": "2025-06-10",
            "phone": "01051363000",
            "receive_yn": false,
            "receive_yn_at": "null",
            "region": "아시아",
            "user_gender": "여자",
            "user_nick": "SwiftHero902",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 15,
        "tier_date": "2025-01-12",
        "tier_name": "그랜드마스터",
        "season_idx": 4,
        user: {
            "user_id": "annamarie.jast@rogahn.com",
            "dormant_date": "null",
            "join_date": "2025-05-31",
            "phone": "01059230268",
            "receive_yn": true,
            "receive_yn_at": "2025-05-31",
            "region": "북미",
            "user_gender": "여자",
            "user_nick": "IceSlayer402",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 16,
        "tier_date": "2025-02-20",
        "tier_name": "실버",
        "season_idx": 4,
        user: {
            "user_id": "annie.gerhold@green.com",
            "dormant_date": "null",
            "join_date": "2025-06-21",
            "phone": "01043303878",
            "receive_yn": false,
            "receive_yn_at": "null",
            "region": "아프리카",
            "user_gender": "남자",
            "user_nick": "ShadowStriker4488",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 17,
        "tier_date": "2025-02-25",
        "tier_name": "실버",
        "season_idx": 4,
        user: {
            "user_id": "antony.johns@watsica.com",
            "dormant_date": "null",
            "join_date": "2025-02-24",
            "phone": "01016714982",
            "receive_yn": true,
            "receive_yn_at": "2025-02-24",
            "region": "북미",
            "user_gender": "남자",
            "user_nick": "IceWarrior3644",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 18,
        "tier_date": "2025-01-11",
        "tier_name": "실버",
        "season_idx": 4,
        user: {
            "user_id": "arnold.skiles@bergnaum.com",
            "dormant_date": "null",
            "join_date": "2025-05-12",
            "phone": "01074660854",
            "receive_yn": false,
            "receive_yn_at": "null",
            "region": "아프리카",
            "user_gender": "남자",
            "user_nick": "ShadowMaster1769",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 19,
        "tier_date": "2025-02-12",
        "tier_name": "마스터",
        "season_idx": 4,
        user: {
            "user_id": "arnulfo.funk@stiedemann.com",
            "dormant_date": "null",
            "join_date": "2025-06-24",
            "phone": "01011182707",
            "receive_yn": false,
            "receive_yn_at": "null",
            "region": "북미",
            "user_gender": "여자",
            "user_nick": "LightHunter1404",
            "user_type": "미분류",
            "vip_yn": false
        }
    },
    {
        "tier_idx": 20,
        "tier_date": "2025-02-28",
        "tier_name": "마스터",
        "season_idx": 4,
        user: {
            "user_id": "ashleigh.fay@sanford.com",
            "dormant_date": "null",
            "join_date": "2025-06-12",
            "phone": "01098089613",
            "receive_yn": true,
            "receive_yn_at": "2025-06-12",
            "region": "아시아",
            "user_gender": "여자",
            "user_nick": "StormKnight8336",
            "user_type": "미분류",
            "vip_yn": false
        }
    }
]

export default function SeasonTier_UserStats() {
    const [selectedSeason, setSelectedSeason] = useState("전체");

    const seasonOptions = Array.from(
        new Set(tierData.map(({ season_idx }) => `${season_idx}시즌`))
    );

    const filteredData = selectedSeason === "전체"
        ? tierData
        : tierData.filter(item => `${item.season_idx}시즌` === selectedSeason);

    const tierCounts = {};
    filteredData.forEach(({ tier_name }) => {
        tierCounts[tier_name] = (tierCounts[tier_name] || 0) + 1;
    });

    const chartData = Object.entries(tierCounts).map(([tier, count]) => ({
        tier,
        count
    }));

    return (
        <div className="userStats-chartWrapper-seasonTier">
            <h2 className={"userStats-title"}>시즌별 티어 통계</h2>

            <div style={{ marginBottom: "1rem" }}>
                시즌 선택&nbsp;
                <select
                    value={selectedSeason}
                    onChange={e => setSelectedSeason(e.target.value)}
                    className="itemStats-select"
                >
                    <option value="전체">전체</option>
                    {seasonOptions.map(season => (
                        <option key={season} value={season}>{season}</option>
                    ))}
                </select>
            </div>

            <ResponsiveContainer width="100%" height={600}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
                    <defs>
                        <linearGradient id="tierGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a367f9" stopOpacity={1} />
                            <stop offset="100%" stopColor="#4b00a3" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="tier" tick={{ fill: '#aaa', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#aaa', fontSize: 12 }} allowDecimals={false} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#2b2b35', border: 'none' }}
                        labelStyle={{ color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                    />
                    <Bar
                        dataKey="count"
                        fill="url(#tierGradient)"
                    />
                </BarChart>
            </ResponsiveContainer>
            <div className="tierStats-chartWrapper-tableBox">
                <div className="row header">
                    <div className="cell">시즌</div>
                    <div className="cell">티어명</div>
                    <div className="cell">유저 수 (명)</div>
                </div>
                {chartData.map((tier, idx) => (
                    <div className="row" key={idx}>
                        <div className="cell">{selectedSeason}</div>
                        <div className="cell">{tier.tier}</div>
                        <div className="cell">{tier.count}명</div>
                    </div>
                ))}
            </div>
        </div>
    );
}