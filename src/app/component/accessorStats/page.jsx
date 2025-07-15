'use client';
import React, { useState, useEffect } from 'react';
import '../mail/mail.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import PeriodDailyStats from './period_dailyStats';
import PeriodWeeklyStats from './period_weeklyStats';
import PeriodMonthlyStats from './period_monthlyStats';

const access_stats = [
  {
    access_stats_idx: 1,
    access_time: "2025-01-03 20:14:02",
    user_id: "wayne.lemke@dickinson.com"
  },
  {
    access_stats_idx: 2,
    access_time: "2025-01-07 18:07:22",
    user_id: "isis.klein@rutherford.com"
  },
  {
    access_stats_idx: 3,
    access_time: "2025-01-11 04:16:46",
    user_id: "shanita.schneider@baumbach.com"
  },
  {
    access_stats_idx: 4,
    access_time: "2025-01-11 06:28:33",
    user_id: "doloris.kohler@hane.com"
  },
  {
    access_stats_idx: 5,
    access_time: "2025-01-11 23:30:34",
    user_id: "jarod.wuckert@halvorson.com"
  },
  {
    access_stats_idx: 6,
    access_time: "2025-01-12 04:06:45",
    user_id: "kerry.schmidt@schaden.com"
  },
  {
    access_stats_idx: 7,
    access_time: "2025-01-12 23:23:19",
    user_id: "chase.bradtke@kemmer.com"
  },
  {
    access_stats_idx: 8,
    access_time: "2025-01-13 03:09:03",
    user_id: "kerry.schmidt@schaden.com"
  },
  {
    access_stats_idx: 9,
    access_time: "2025-01-13 17:32:11",
    user_id: "bari.ohara@hansen.com"
  },
  {
    access_stats_idx: 10,
    access_time: "2025-01-13 17:40:44",
    user_id: "contessa.sanford@labadie.com"
  },
  {
    access_stats_idx: 11,
    access_time: "2025-01-17 09:19:04",
    user_id: "socorro.von@harris.com"
  },
  {
    access_stats_idx: 12,
    access_time: "2025-01-17 18:14:38",
    user_id: "doloris.kohler@hane.com"
  },
  {
    access_stats_idx: 13,
    access_time: "2025-01-17 18:30:29",
    user_id: "doloris.kohler@hane.com"
  },
  {
    access_stats_idx: 14,
    access_time: "2025-01-18 14:03:56",
    user_id: "lashon.collins@hahn.com"
  },
  {
    access_stats_idx: 15,
    access_time: "2025-01-18 22:54:25",
    user_id: "josh.howell@dare.com"
  }
];

const AccessorStats = () => {
  return (
    <>
      <Header />
      <Menu />
      <div className="stats_container">
        <span className={"accessorStats-mainTitle"}>접속자 수 통계</span>

        <PeriodDailyStats access_stats={access_stats} />
        <PeriodWeeklyStats access_stats={access_stats} />
        <PeriodMonthlyStats access_stats={access_stats} />
      </div>
    </>
  );
};

export default AccessorStats;