import React from 'react';
import '../mail/mail.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';
import All_InquiryStats from './all_inquiryStats';
import Period_InquiryStats from './period_inquiryStats';

const inquiryStatsData = [
  {
    inquiry_idx: 1,
    category: '유저신고',
    content: '핵 사용 의심되는 행동을 보였습니다.',
    created_at: '2025-05-24 21:25:38.000',
    status: '완료',
    title: 'AFK 플레이어 신고',
    type: '신고',
    reported_id: 'lee.goodwin@treutel.com',
    user_id: 'tim.raynor@russel.com'
  },
  {
    inquiry_idx: 2,
    category: "유저신고",
    content: "핵 사용 의심되는 행동을 보였습니다.",
    created_at: "2025-05-11 10:50:29.000",
    status: "완료",
    title: "비매너 플레이어 신고",
    type: "신고",
    reported_id: "yahaira.ledner@dicki.com",
    user_id: "helga.windler@weissnat.com"
  },
  {
    inquiry_idx: 3,
    category: "유저신고",
    content: "핵 사용 의심되는 행동을 보였습니다.",
    created_at: "2025-06-17 05:52:55.000",
    status: "미처리",
    title: "비매너 플레이어 신고",
    type: "신고",
    reported_id: "donnie.volkman@stokes.com",
    user_id: "clementine.labadie@okon.com"
  },
  {
    inquiry_idx: 4,
    category: "유저신고",
    content: "해당 플레이어가 욕설을 사용했습니다.",
    created_at: "2025-05-24 16:44:35.000",
    status: "미처리",
    title: "비매너 플레이어 신고",
    type: "신고",
    reported_id: "pearlene.herman@keebler.com",
    user_id: "eugene.ledner@larkin.com"
  },
  {
    inquiry_idx: 5,
    category: "유저신고",
    content: "핵 사용 의심되는 행동을 보였습니다.",
    created_at: "2025-06-29 14:57:02.000",
    status: "미처리",
    title: "AFK 플레이어 신고",
    type: "신고",
    reported_id: "nora.goldner@littel.com",
    user_id: "delores.jacobson@goyette.com"
  },
  {
    inquiry_idx: 6,
    category: "유저신고",
    content: "핵 사용 의심되는 행동을 보였습니다.",
    created_at: "2025-05-11 07:57:12.000",
    status: "미처리",
    title: "고의 트롤 신고",
    type: "신고",
    reported_id: "phebe.stoltenberg@franecki.com",
    user_id: "gwendolyn.wuckert@dare.com"
  },
  {
    inquiry_idx: 7,
    category: "유저신고",
    content: "해당 플레이어가 욕설을 사용했습니다.",
    created_at: "2025-02-28 13:31:48.000",
    status: "미처리",
    title: "AFK 플레이어 신고",
    type: "신고",
    reported_id: "rosendo.erdman@paucek.com",
    user_id: "demarcus.block@goldner.com"
  },
  {
    inquiry_idx: 8,
    category: "유저신고",
    content: "상대방을 지속적으로 괴롭혔습니다.",
    created_at: "2025-06-10 17:25:13.000",
    status: "미처리",
    title: "핵 사용 의심 신고",
    type: "신고",
    reported_id: "micah.vonrueden@cruickshank.com",
    user_id: "tamala.mann@okon.com"
  },
  {
    inquiry_idx: 9,
    category: "유저신고",
    content: "해당 플레이어가 욕설을 사용했습니다.",
    created_at: "2025-05-15 21:49:18.000",
    status: "미처리",
    title: "핵 사용 의심 신고",
    type: "신고",
    reported_id: "gwendolyn.wuckert@dare.com",
    user_id: "ernestine.schoen@volkman.com"
  },
  {
    inquiry_idx: 10,
    category: "유저신고",
    content: "상대방을 지속적으로 괴롭혔습니다.",
    created_at: "2025-06-04 13:09:15.000",
    status: "미처리",
    title: "욕설 신고",
    type: "신고",
    reported_id: "ben.mcglynn@gaylord.com",
    user_id: "john.metz@oreilly.com"
  },
  {
    inquiry_idx: 11,
    category: "유저신고",
    content: "핵 사용 의심되는 행동을 보였습니다.",
    created_at: "2025-02-14 05:47:33.000",
    status: "미처리",
    title: "비매너 플레이어 신고",
    type: "신고",
    reported_id: "terrence.stanton@koepp.com",
    user_id: "deloris.gorczany@nienow.com"
  },
  {
    inquiry_idx: 12,
    category: "유저신고",
    content: "고의적으로 게임을 방해했습니다.",
    created_at: "2025-04-15 14:09:32.000",
    status: "미처리",
    title: "AFK 플레이어 신고",
    type: "신고",
    reported_id: "pete.turner@rath.com",
    user_id: "gwendolyn.wuckert@dare.com"
  },
  {
    inquiry_idx: 13,
    category: "유저신고",
    content: "고의적으로 게임을 방해했습니다.",
    created_at: "2025-06-07 17:00:38.000",
    status: "미처리",
    title: "고의 트롤 신고",
    type: "신고",
    reported_id: "betty.homenick@weber.com",
    user_id: "yi.blanda@crona.com"
  },
  {
    inquiry_idx: 14,
    category: "유저신고",
    content: "핵 사용 의심되는 행동을 보였습니다.",
    created_at: "2025-02-08 03:21:02.000",
    status: "미처리",
    title: "비매너 플레이어 신고",
    type: "신고",
    reported_id: "kamala.feest@bailey.com",
    user_id: "julie.dare@roberts.com"
  },
  {
    inquiry_idx: 15,
    category: "유저신고",
    content: "고의적으로 게임을 방해했습니다.",
    created_at: "2025-05-09 19:54:15.000",
    status: "미처리",
    title: "AFK 플레이어 신고",
    type: "신고",
    reported_id: "retha.schaden@medhurst.com",
    user_id: "randal.bailey@cassin.com"
  },
  {
    inquiry_idx: 16,
    category: "유저신고",
    content: "해당 플레이어가 욕설을 사용했습니다.",
    created_at: "2025-05-27 13:40:23.000",
    status: "미처리",
    title: "고의 트롤 신고",
    type: "신고",
    reported_id: "elia.wuckert@mohr.com",
    user_id: "nathanael.pfeffer@deckow.com"
  },
  {
    inquiry_idx: 17,
    category: "유저신고",
    content: "해당 플레이어가 욕설을 사용했습니다.",
    created_at: "2025-05-07 15:45:49.000",
    status: "미처리",
    title: "AFK 플레이어 신고",
    type: "신고",
    reported_id: "erlene.heaney@bashirian.com",
    user_id: "russel.leuschke@pagac.com"
  },
  {
    inquiry_idx: 18,
    category: "유저신고",
    content: "상대방을 지속적으로 괴롭혔습니다.",
    created_at: "2025-06-29 21:11:31.000",
    status: "미처리",
    title: "비매너 플레이어 신고",
    type: "신고",
    reported_id: "russel.leuschke@pagac.com",
    user_id: "leif.douglas@fisher.com"
  },
  {
    inquiry_idx: 19,
    category: "유저신고",
    content: "상대방을 지속적으로 괴롭혔습니다.",
    created_at: "2025-04-16 14:48:32.000",
    status: "미처리",
    title: "비매너 플레이어 신고",
    type: "신고",
    reported_id: "phebe.stoltenberg@franecki.com",
    user_id: "randal.bailey@cassin.com"
  },
  {
    inquiry_idx: 20,
    category: "유저신고",
    content: "상대방을 지속적으로 괴롭혔습니다.",
    created_at: "2025-04-04 22:00:12.000",
    status: "미처리",
    title: "비매너 플레이어 신고",
    type: "신고",
    reported_id: "jon.lindgren@huel.com",
    user_id: "eugene.ledner@larkin.com"
  },
  {
    inquiry_idx: 21,
    category: "인게임관련",
    content: "랭크 포인트가 정상적으로 반영되지 않습니다.",
    created_at: "2025-05-06 23:38:05.000",
    status: "미처리",
    title: "랭크 포인트 반영 오류",
    type: "문의",
    reported_id: "",
    user_id: "ernestine.cronin@morar.com"
  },
  {
    inquiry_idx: 22,
    category: "결제관련",
    content: "구매 내역이 계정에 표시되지 않습니다.",
    created_at: "2025-06-27 12:52:23.000",
    status: "미처리",
    title: "결제 내역 불일치",
    type: "문의",
    reported_id: "",
    user_id: "ashleigh.fay@sanford.com"
  },
  {
    inquiry_idx: 23,
    category: "인게임관련",
    content: "스킬 사용 시 예상과 다른 동작이 발생합니다. 확인 부탁드립니다.",
    created_at: "2025-04-13 00:11:35.000",
    status: "미처리",
    title: "캐릭터 스킬 오류",
    type: "문의",
    reported_id: "",
    user_id: "erlene.heaney@bashirian.com"
  },
  {
    inquiry_idx: 24,
    category: "결제관련",
    content: "결제 진행 중 오류가 발생했습니다. 확인 부탁드립니다.",
    created_at: "2025-06-26 07:28:01.000",
    status: "미처리",
    title: "중복 결제 문제",
    type: "문의",
    reported_id: "",
    user_id: "barbera.ebert@labadie.com"
  },
  {
    inquiry_idx: 25,
    category: "결제관련",
    content: "구매 내역이 계정에 표시되지 않습니다.",
    created_at: "2025-04-03 20:56:46.000",
    status: "미처리",
    title: "환불 요청",
    type: "문의",
    reported_id: "",
    user_id: "graciela.mitchell@pollich.com"
  },
  {
    inquiry_idx: 26,
    category: "인게임관련",
    content: "스킬 사용 시 예상과 다른 동작이 발생합니다. 확인 부탁드립니다.",
    created_at: "2025-06-08 11:43:12.000",
    status: "미처리",
    title: "매칭 지연 문제",
    type: "문의",
    reported_id: "",
    user_id: "kyong.goodwin@okuneva.com"
  },
  {
    inquiry_idx: 27,
    category: "인게임관련",
    content: "랭크 포인트가 정상적으로 반영되지 않습니다.",
    created_at: "2025-06-30 06:18:48.000",
    status: "미처리",
    title: "캐릭터 스킬 오류",
    type: "문의",
    reported_id: "",
    user_id: "kerry.schmidt@schaden.com"
  },
  {
    inquiry_idx: 28,
    category: "인게임관련",
    content: "게임 플레이 중 발생한 버그에 대해 문의드립니다.",
    created_at: "2025-06-26 14:08:30.000",
    status: "미처리",
    title: "캐릭터 스킬 오류",
    type: "문의",
    reported_id: "",
    user_id: "josh.howell@dare.com"
  },
  {
    inquiry_idx: 29,
    category: "인게임관련",
    content: "스킬 사용 시 예상과 다른 동작이 발생합니다. 확인 부탁드립니다.",
    created_at: "2025-06-14 12:31:54.000",
    status: "미처리",
    title: "게임 내 버그 문의",
    type: "문의",
    reported_id: "",
    user_id: "annamarie.jast@rogahn.com"
  },
  {
    inquiry_idx: 30,
    category: "인게임관련",
    content: "랭크 포인트가 정상적으로 반영되지 않습니다.",
    created_at: "2025-07-05 08:28:33.000",
    status: "미처리",
    title: "UI 표시 오류",
    type: "문의",
    reported_id: "",
    user_id: "faustino.paucek@koss.com"
  },
  {
    inquiry_idx: 31,
    category: "인게임관련",
    content: "랭크 포인트가 정상적으로 반영되지 않습니다.",
    created_at: "2025-06-22 20:00:40.000",
    status: "미처리",
    title: "게임 내 버그 문의",
    type: "문의",
    reported_id: "",
    user_id: "mozell.keebler@armstrong.com"
  },
  {
    inquiry_idx: 32,
    category: "인게임관련",
    content: "매칭 대기 시간이 너무 길어 문의드립니다.",
    created_at: "2025-07-03 09:32:47.000",
    status: "미처리",
    title: "매칭 지연 문제",
    type: "문의",
    reported_id: "",
    user_id: "arnulfo.funk@stiedemann.com"
  },
  {
    inquiry_idx: 33,
    category: "인게임관련",
    content: "게임 플레이 중 발생한 버그에 대해 문의드립니다.",
    created_at: "2025-06-27 06:36:21.000",
    status: "미처리",
    title: "캐릭터 스킬 오류",
    type: "문의",
    reported_id: "",
    user_id: "luther.prosacco@donnelly.com"
  },
  {
    inquiry_idx: 34,
    category: "결제관련",
    content: "환불을 요청드립니다.",
    created_at: "2025-04-19 00:28:56.000",
    status: "미처리",
    title: "환불 요청",
    type: "문의",
    reported_id: "",
    user_id: "daniel.crist@buckridge.com"
  },
  {
    inquiry_idx: 35,
    category: "인게임관련",
    content: "매칭 대기 시간이 너무 길어 문의드립니다.",
    created_at: "2025-07-01 10:40:37.000",
    status: "미처리",
    title: "매칭 지연 문제",
    type: "문의",
    reported_id: "",
    user_id: "nickole.reichert@pouros.com"
  },
  {
    inquiry_idx: 36,
    category: "인게임관련",
    content: "스킬 사용 시 예상과 다른 동작이 발생합니다. 확인 부탁드립니다.",
    created_at: "2025-07-05 13:23:53.000",
    status: "완료",
    title: "매칭 지연 문제",
    type: "문의",
    reported_id: "",
    user_id: "jayme.marvin@boehm.com"
  },
  {
    inquiry_idx: 37,
    category: "결제관련",
    content: "환불을 요청드립니다.",
    created_at: "2025-04-27 10:28:25.000",
    status: "미처리",
    title: "결제 내역 불일치",
    type: "문의",
    reported_id: "",
    user_id: "roman.hoeger@hagenes.com"
  },
  {
    inquiry_idx: 38,
    category: "인게임관련",
    content: "UI에서 일부 정보가 보이지 않습니다.",
    created_at: "2025-04-25 20:45:11.000",
    status: "미처리",
    title: "매칭 지연 문제",
    type: "문의",
    reported_id: "",
    user_id: "christy.wunsch@powlowski.com"
  },
  {
    inquiry_idx: 39,
    category: "결제관련",
    content: "결제 진행 중 오류가 발생했습니다. 확인 부탁드립니다.",
    created_at: "2025-03-28 11:00:55.000",
    status: "미처리",
    title: "중복 결제 문제",
    type: "문의",
    reported_id: "",
    user_id: "gil.dickens@hahn.com"
  },
  {
    inquiry_idx: 40,
    category: "결제관련",
    content: "결제 진행 중 오류가 발생했습니다. 확인 부탁드립니다.",
    created_at: "2025-05-15 03:07:40.000",
    status: "미처리",
    title: "구매 내역 미표시",
    type: "문의",
    reported_id: "",
    user_id: "elvira.lueilwitz@walsh.com"
  }
]

const InquiryStats = () => {
  return (
    <>
      <Header />
      <Menu />
      <div className="stats_container">
        <span className={"userStats-mainTitle"}>신고/문의 통계</span>

        <All_InquiryStats inquiryStatsData={inquiryStatsData} />

        <Period_InquiryStats inquiryStatsData={inquiryStatsData} />
      </div>
    </>
  );
};

export default InquiryStats;