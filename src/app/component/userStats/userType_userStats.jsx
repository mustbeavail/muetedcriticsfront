'use client'
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const userData = [
    {
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
    },
    {
        "user_id": "adalberto.dickinson@green.com",
        "dormant_date": "2025-05-24",
        "join_date": "2025-05-24",
        "phone": "01085871441",
        "receive_yn": true,
        "receive_yn_at": "2025-05-24",
        "region": "아프리카",
        "user_gender": "남자",
        "user_nick": "SwiftGuardian501",
        "user_type": "미분류",
        "vip_yn": false
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
        "user_id": "altagracia.stark@hamill.com",
        "dormant_date": "null",
        "join_date": "2025-05-07",
        "phone": "01090187581",
        "receive_yn": false,
        "receive_yn_at": "null",
        "region": "오세아니아",
        "user_gender": "여자",
        "user_nick": "IceSniper6225",
        "user_type": "미분류",
        "vip_yn": false
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
        "user_id": "angel.cummerata@borer.com",
        "dormant_date": "null",
        "join_date": "2025-06-27",
        "phone": "01059618062",
        "receive_yn": false,
        "receive_yn_at": "null",
        "region": "아시아",
        "user_gender": "남자",
        "user_nick": "ProSlayer6800",
        "user_type": "미분류",
        "vip_yn": false
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
]

export default function UserType_UserStats() {
    const userTypeCounts = {};

    userData.forEach(({ user_type }) => {
        userTypeCounts[user_type] = (userTypeCounts[user_type] || 0) + 1;
    });

    const barChartData = Object.entries(userTypeCounts).map(([type, count]) => ({
        user_type: type,
        count: count,
    }));

    return (
        <div className="userStats-chartWrapper">
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
                    <Tooltip />
                    <Bar dataKey="count" fill="url(#userTypeGradient)" radius={[6, 6, 6, 6]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}