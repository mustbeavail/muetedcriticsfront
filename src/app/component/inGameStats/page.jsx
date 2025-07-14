import React from 'react';
import '../mail/mail.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import HeroPlaytime_IngameStats from './heroPlaytime_ingameStats';
import HeroPOTG_IngameStats from './heroPOTG_ingameStats';
import HeroItem_IngameStats from './heroItem_ingameStats';
import HeroTable_IngameStats from './heroTable_ingameStats';
import ModePlaytime_IngameStats from './modePlaytime_ingameStats';
import HeroWinningRate_IngameStats from './heroWinningRate_ingameStats';
import HeroPickorBan_IngameStats from './heroPickorBan_ingameStats';

const inGameStatsData = [
  {
    hero_stats_id: 1,
    ban_count: 0,
    lose_count: 1,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-01",
    tier_name: "브론즈",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 2,
      heroes_name: "둠피스트",
      role: "돌격",
      item_list: {
        item_idx: 11,
        item_idx: 12,
        item_idx: 13,
        item_idx: 14,
        item_idx: 15,
        item_idx: 16,
        item_idx: 17,
        item_idx: 18,
        item_idx: 19,
        item_idx: 20,
      }
    },
  },
  {
    hero_stats_id: 2,
    ban_count: 1,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-01",
    tier_name: "브론즈",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 10,
      heroes_name: "윈스턴",
      role: "돌격",
      item_list: {
        item_idx: 91,
        item_idx: 92,
        item_idx: 93,
        item_idx: 94,
        item_idx: 95,
        item_idx: 96,
        item_idx: 97,
        item_idx: 98,
        item_idx: 99,
        item_idx: 100,
      }
    }
  },
  {
    hero_stats_id: 3,
    ban_count: 1,
    lose_count: 1,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-01",
    tier_name: "플래티넘",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 11,
      heroes_name: "자리야",
      role: "돌격",
      item_list: {
        item_idx: 101,
        item_idx: 102,
        item_idx: 103,
        item_idx: 104,
        item_idx: 105,
        item_idx: 106,
        item_idx: 107,
        item_idx: 108,
        item_idx: 109,
        item_idx: 110,
      }
    }
  },
  {
    hero_stats_id: 4,
    ban_count: 0,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-01",
    tier_name: "플래티넘",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 15,
      heroes_name: "리퍼",
      role: "공격",
      item_list: {
        item_idx: 141,
        item_idx: 142,
        item_idx: 143,
        item_idx: 144,
        item_idx: 145,
        item_idx: 146,
        item_idx: 147,
        item_idx: 148,
        item_idx: 149,
        item_idx: 150,
      }
    }
  },
  {
    hero_stats_id: 5,
    ban_count: 1,
    lose_count: 1,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-01",
    tier_name: "다이아몬드",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 29,
      heroes_name: "트레이서",
      role: "공격",
      item_list: {
        item_idx: 281,
        item_idx: 282,
        item_idx: 283,
        item_idx: 284,
        item_idx: 285,
        item_idx: 286,
        item_idx: 287,
        item_idx: 288,
        item_idx: 289,
        item_idx: 290,
      }
    }
  },
  {
    hero_stats_id: 6,
    ban_count: 0,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-01",
    tier_name: "브론즈",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 31,
      heroes_name: "프레야",
      role: "공격",
      item_list: {
        item_idx: 301,
        item_idx: 302,
        item_idx: 303,
        item_idx: 304,
        item_idx: 305,
        item_idx: 306,
        item_idx: 307,
        item_idx: 308,
        item_idx: 309,
        item_idx: 310,
      }
    }
  },
  {
    hero_stats_id: 7,
    ban_count: 0,
    lose_count: 1,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-01",
    tier_name: "골드",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 33,
      heroes_name: "라이프위버",
      role: "공격",
      item_list: {
        item_idx: 321,
        item_idx: 322,
        item_idx: 323,
        item_idx: 324,
        item_idx: 325,
        item_idx: 326,
        item_idx: 327,
        item_idx: 328,
        item_idx: 329,
        item_idx: 330,
      }
    }
  },
  {
    hero_stats_id: 8,
    ban_count: 0,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-01",
    tier_name: "브론즈",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 36,
      heroes_name: "모이라",
      role: "지원",
      item_list: {
        item_idx: 351,
        item_idx: 352,
        item_idx: 353,
        item_idx: 354,
        item_idx: 355,
        item_idx: 356,
        item_idx: 357,
        item_idx: 358,
        item_idx: 359,
        item_idx: 360,
      }
    }
  },
  {
    hero_stats_id: 9,
    ban_count: 0,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-01",
    tier_name: "다이아몬드",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 37,
      heroes_name: "바티스트",
      role: "지원",
      item_list: {
        item_idx: 361,
        item_idx: 362,
        item_idx: 363,
        item_idx: 364,
        item_idx: 365,
        item_idx: 366,
        item_idx: 367,
        item_idx: 368,
        item_idx: 369,
        item_idx: 370,
      }
    }
  },
  {
    hero_stats_id: 10,
    ban_count: 0,
    lose_count: 1,
    pick_count: 1,
    potg_count: 1,
    stats_date: "2025-01-01",
    tier_name: "브론즈",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 38,
      heroes_name: "브리기테",
      role: "지원",
      item_list: {
        item_idx: 371,
        item_idx: 372,
        item_idx: 373,
        item_idx: 374,
        item_idx: 375,
        item_idx: 376,
        item_idx: 377,
        item_idx: 378,
        item_idx: 379,
        item_idx: 380,
      }
    }
  },
  {
    hero_stats_id: 11,
    ban_count: 0,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-02",
    tier_name: "실버",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 3,
      heroes_name: "라마트라",
      role: "돌격",
      item_list: {
        item_idx: 21,
        item_idx: 22,
        item_idx: 23,
        item_idx: 24,
        item_idx: 25,
        item_idx: 26,
        item_idx: 27,
        item_idx: 28,
        item_idx: 29,
        item_idx: 30,
      }
    }
  },
  {
    hero_stats_id: 12,
    ban_count: 0,
    lose_count: 1,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-02",
    tier_name: "마스터",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 5,
      heroes_name: "레킹볼",
      role: "돌격",
      item_list: {
        item_idx: 41,
        item_idx: 42,
        item_idx: 43,
        item_idx: 44,
        item_idx: 45,
        item_idx: 46,
        item_idx: 47,
        item_idx: 48,
        item_idx: 49,
        item_idx: 50,
      }
    }
  },
  {
    hero_stats_id: 13,
    ban_count: 0,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-02",
    tier_name: "플래티넘",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 8,
      heroes_name: "시그마",
      role: "돌격",
      item_list: {
        item_idx: 71,
        item_idx: 72,
        item_idx: 73,
        item_idx: 74,
        item_idx: 75,
        item_idx: 76,
        item_idx: 77,
        item_idx: 78,
        item_idx: 79,
        item_idx: 80,
      }
    }
  },
  {
    hero_stats_id: 14,
    ban_count: 1,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-02",
    tier_name: "플래티넘",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 11,
      heroes_name: "자리야",
      role: "돌격",
      item_list: {
        item_idx: 101,
        item_idx: 102,
        item_idx: 103,
        item_idx: 104,
        item_idx: 105,
        item_idx: 106,
        item_idx: 107,
        item_idx: 108,
        item_idx: 109,
        item_idx: 110,
      }
    }
  },
  {
    hero_stats_id: 15,
    ban_count: 0,
    lose_count: 1,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-02",
    tier_name: "실버",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 13,
      heroes_name: "해저드",
      role: "돌격",
      item_list: {
        item_idx: 121,
        item_idx: 122,
        item_idx: 123,
        item_idx: 124,
        item_idx: 125,
        item_idx: 126,
        item_idx: 127,
        item_idx: 128,
        item_idx: 129,
        item_idx: 130,
      }
    }
  },
  {
    hero_stats_id: 16,
    ban_count: 0,
    lose_count: 1,
    pick_count: 1,
    potg_count: 1,
    stats_date: "2025-01-02",
    tier_name: "실버",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 22,
      heroes_name: "시메트라",
      role: "공격",
      item_list: {
        item_idx: 211,
        item_idx: 212,
        item_idx: 213,
        item_idx: 214,
        item_idx: 215,
        item_idx: 216,
        item_idx: 217,
        item_idx: 218,
        item_idx: 219,
        item_idx: 220,
      }
    }
  },
  {
    hero_stats_id: 17,
    ban_count: 1,
    lose_count: 1,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-02",
    tier_name: "실버",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 29,
      heroes_name: "트레이서",
      role: "공격",
      item_list: {
        item_idx: 281,
        item_idx: 282,
        item_idx: 283,
        item_idx: 284,
        item_idx: 285,
        item_idx: 286,
        item_idx: 287,
        item_idx: 288,
        item_idx: 289,
        item_idx: 290,
      }
    }
  },
  {
    hero_stats_id: 18,
    ban_count: 0,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-02",
    tier_name: "플래티넘",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 30,
      heroes_name: "파라",
      role: "공격",
      item_list: {
        item_idx: 291,
        item_idx: 292,
        item_idx: 293,
        item_idx: 294,
        item_idx: 295,
        item_idx: 296,
        item_idx: 297,
        item_idx: 298,
        item_idx: 299,
        item_idx: 300,
      }
    }
  },
  {
    hero_stats_id: 19,
    ban_count: 0,
    lose_count: 1,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-02",
    tier_name: "플래티넘",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 37,
      heroes_name: "바티스트",
      role: "지원",
      item_list: {
        item_idx: 361,
        item_idx: 362,
        item_idx: 363,
        item_idx: 364,
        item_idx: 365,
        item_idx: 366,
        item_idx: 367,
        item_idx: 368,
        item_idx: 369,
        item_idx: 370,
      }
    }
  },
  {
    hero_stats_id: 20,
    ban_count: 0,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-02",
    tier_name: "실버",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 43,
      heroes_name: "키리코",
      role: "지원",
      item_list: {
        item_idx: 421,
        item_idx: 422,
        item_idx: 423,
        item_idx: 424,
        item_idx: 425,
        item_idx: 426,
        item_idx: 427,
        item_idx: 428,
        item_idx: 429,
        item_idx: 430,
      }
    }
  },
  {
    hero_stats_id: 21,
    ban_count: 0,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-03",
    tier_name: "마스터",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 1,
      heroes_name: "D.va",
      role: "돌격",
      item_list: {
        item_idx: 1,
        item_idx: 2,
        item_idx: 3,
        item_idx: 2,
        item_idx: 3,
        item_idx: 4,
        item_idx: 5,
        item_idx: 6,
        item_idx: 7,
        item_idx: 8,
        item_idx: 9,
        item_idx: 10,
      }
    }
  },
  {
    hero_stats_id: 22,
    ban_count: 0,
    lose_count: 1,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-03",
    tier_name: "브론즈",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 2,
      heroes_name: "둠피스트",
      role: "돌격",
      item_list: {
        item_idx: 11,
        item_idx: 12,
        item_idx: 13,
        item_idx: 14,
        item_idx: 15,
        item_idx: 16,
        item_idx: 17,
        item_idx: 18,
        item_idx: 19,
        item_idx: 20,
      }
    }
  },
  {
    hero_stats_id: 23,
    ban_count: 0,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-03",
    tier_name: "브론즈",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 3,
      heroes_name: "라마트라",
      role: "돌격",
      item_list: {
        item_idx: 21,
        item_idx: 22,
        item_idx: 23,
        item_idx: 24,
        item_idx: 25,
        item_idx: 26,
        item_idx: 27,
        item_idx: 28,
        item_idx: 29,
        item_idx: 30,
      }
    }
  },
  {
    hero_stats_id: 24,
    ban_count: 0,
    lose_count: 1,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-03",
    tier_name: "플래티넘",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 5,
      heroes_name: "레킹볼",
      role: "돌격",
      item_list: {
        item_idx: 41,
        item_idx: 42,
        item_idx: 43,
        item_idx: 44,
        item_idx: 45,
        item_idx: 46,
        item_idx: 47,
        item_idx: 48,
        item_idx: 49,
        item_idx: 50,
      }
    }
  },
  {
    hero_stats_id: 25,
    ban_count: 0,
    lose_count: 1,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-03",
    tier_name: "챌린저",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 9,
      heroes_name: "오리사",
      role: "돌격",
      item_list: {
        item_idx: 81,
        item_idx: 82,
        item_idx: 83,
        item_idx: 84,
        item_idx: 85,
        item_idx: 86,
        item_idx: 87,
        item_idx: 88,
        item_idx: 89,
        item_idx: 90,
      }
    }
  },
  {
    hero_stats_id: 26,
    ban_count: 0,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-03",
    tier_name: "실버",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 17,
      heroes_name: "바스티온",
      role: "공격",
      item_list: {
        item_idx: 161,
        item_idx: 162,
        item_idx: 163,
        item_idx: 164,
        item_idx: 165,
        item_idx: 166,
        item_idx: 167,
        item_idx: 168,
        item_idx: 169,
        item_idx: 170,
      }
    }
  },
  {
    hero_stats_id: 27,
    ban_count: 0,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-03",
    tier_name: "다이아몬드",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 22,
      heroes_name: "시메트라",
      role: "공격",
      item_list: {
        item_idx: 211,
        item_idx: 212,
        item_idx: 213,
        item_idx: 214,
        item_idx: 215,
        item_idx: 216,
        item_idx: 217,
        item_idx: 218,
        item_idx: 219,
        item_idx: 220,
      }
    }
  },
  {
    hero_stats_id: 28,
    ban_count: 0,
    lose_count: 1,
    pick_count: 1,
    potg_count: 1,
    stats_date: "2025-01-03",
    tier_name: "골드",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 24,
      heroes_name: "에코",
      role: "공격",
      item_list: {
        item_idx: 231,
        item_idx: 232,
        item_idx: 233,
        item_idx: 234,
        item_idx: 235,
        item_idx: 236,
        item_idx: 237,
        item_idx: 238,
        item_idx: 239,
        item_idx: 240,
      }
    }
  },
  {
    hero_stats_id: 29,
    ban_count: 0,
    lose_count: 0,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-03",
    tier_name: "골드",
    total_play_time: 20,
    win_count: 1,
    heros: {
      heroes_idx: 34,
      heroes_name: "루시우",
      role: "지원",
      item_list: {
        item_idx: 331,
        item_idx: 332,
        item_idx: 333,
        item_idx: 334,
        item_idx: 335,
        item_idx: 336,
        item_idx: 337,
        item_idx: 338,
        item_idx: 339,
        item_idx: 340,
      }
    }
  },
  {
    hero_stats_id: 30,
    ban_count: 0,
    lose_count: 1,
    pick_count: 1,
    potg_count: 0,
    stats_date: "2025-01-03",
    tier_name: "다이아몬드",
    total_play_time: 20,
    win_count: 0,
    heros: {
      heroes_idx: 42,
      heroes_name: "주노",
      role: "지원",
      item_list: {
        item_idx: 411,
        item_idx: 412,
        item_idx: 413,
        item_idx: 414,
        item_idx: 415,
        item_idx: 416,
        item_idx: 417,
        item_idx: 418,
        item_idx: 419,
        item_idx: 420,
      }
    }
  }
]

const InGameStats = () => {
  return (
    <>
      <Header />
      <Menu />
      <div className="stats_container">
        <span className={"userStats-mainTitle"}>인게임 통계</span>

        <HeroPlaytime_IngameStats inGameStatsData={inGameStatsData} />
        <HeroPOTG_IngameStats inGameStatsData={inGameStatsData} />
        <HeroItem_IngameStats inGameStatsData={inGameStatsData} />
        <HeroTable_IngameStats inGameStatsData={inGameStatsData} />

        <ModePlaytime_IngameStats />
        <HeroWinningRate_IngameStats inGameStatsData={inGameStatsData} />
        <HeroPickorBan_IngameStats inGameStatsData={inGameStatsData} />
      </div>
    </>
  );
};

export default InGameStats;