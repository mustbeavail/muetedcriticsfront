'use client'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
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

const COLORS = [
    "#1F77B4",
    "#2CA02C",
    "#FFBB28",
    "#FF7F0E",
    "#9467BD",
    "#D62728",
    "#E377C2",
    "#17BECF",
    "#BCBD22",
    "#F7B267"
];

export default function Usertype_Tier_UserStats() {

    const tierCounts = {};
    tierData.forEach(({ tier_name }) => {
        tierCounts[tier_name] = (tierCounts[tier_name] || 0) + 1;
    });
    const chartData = Object.entries(tierCounts).map(([name, value]) => ({
        name,
        value
    }));

    const seasonCounts = {};
    tierData.forEach(({ season_idx }) => {
        const key = `${season_idx}시즌`;
        seasonCounts[key] = (seasonCounts[key] || 0) + 1;
    });
    const seasonChartData = Object.entries(seasonCounts).map(([name, value]) => ({
        name,
        value
    }));

    const [selectedSeason, setSelectedSeason] = useState("전체");
    const [selectedTier, setSelectedTier] = useState("전체");

    const filtered = tierData.filter(item => {
        const matchSeason =
            selectedSeason === "전체" || `${item.season_idx}시즌` === selectedSeason;
        const matchTier =
            selectedTier === "전체" || item.tier_name === selectedTier;
        return matchSeason && matchTier;
    });

    const filteredTierCounts = {};
    filtered.forEach(({ tier_name }) => {
        filteredTierCounts[tier_name] = (filteredTierCounts[tier_name] || 0) + 1;
    });

    const filteredChartData = Object.entries(filteredTierCounts).map(([name, value]) => ({
        name,
        value
    }));

    const completeChartData = chartData.map(tier => {
        const found = filteredChartData.find(item => item.name === tier.name);
        return {
            name: tier.name,
            value: found ? found.value : 0,
        };
    });

    const [selectedTierFromChart, setSelectedTierFromChart] = useState(null);
    const selectedTierUsers = filtered.filter(user => user.tier_name === selectedTierFromChart);

    // 페이징 관련
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentUsers = selectedTierUsers.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(selectedTierUsers.length / itemsPerPage);

    return (
        <div className="userStats-chartWrapper-tier">
            <div className="userStats-filterBox-wrapper">
                <h2 className={"userStats-title"}>유저 분류별 티어 통계</h2>
                <div className="itemStats-filterBox">
                    유저 분류 선택 <select
                        className="itemStats-select"
                        value={selectedTier}
                        onChange={e => setSelectedTier(e.target.value)}
                    >
                        <option value="전체">전체</option>
                        {chartData.map((tier) => (
                            <option key={tier.name} value={tier.name}>
                                {tier.name}
                            </option>
                        ))}
                    </select>
                    시즌 선택 <select
                        className="itemStats-select"
                        value={selectedSeason}
                        onChange={e => setSelectedSeason(e.target.value)}
                    >
                        <option value="전체">전체</option>
                        {seasonChartData.map((season) => (
                            <option key={season.name} value={season.name}>
                                {season.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <span>
                {(selectedTier !== "전체" || selectedSeason !== "전체") ? (
                    <>
                        {selectedSeason !== "전체" && selectedSeason}&nbsp;
                        {selectedTier !== "전체" && selectedTier}&nbsp;
                        {"유저 수: " + filtered.length + "명"}
                    </>
                ) : (
                    `전체 인원 수: ${filtered.length}명`
                )}
            </span>
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
                                onClick={(data) => setSelectedTierFromChart(data.name)}
                            >
                                {completeChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value}명`} />
                            <Legend verticalAlign="bottom" iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                
                {/* 테이블 */}
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
            {selectedTierFromChart && (
                <div className="tier-clicked-users">
                    <h3 style={{ color: "#fff" }}>
                        {selectedTierFromChart} 티어 유저 목록 ({selectedTierUsers.length}명)
                    </h3>
                    {currentUsers.map((userObj, idx) => (
                        <div key={idx} className="tierUserCard">
                            <div className="tierUserCardContent">
                                <div>{userObj.user.user_nick}</div>
                                <div>{userObj.user.user_gender}</div>
                                <div>{userObj.user.region}</div>
                                <div>{userObj.user.join_date}</div>
                            </div>
                            <div className="tierUserCardEmail">{userObj.user.user_id}</div>
                        </div>
                    ))}
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
            )}
        </div>
    );
}