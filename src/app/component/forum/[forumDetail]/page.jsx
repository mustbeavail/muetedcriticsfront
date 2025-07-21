'use client';
import { useParams } from 'next/navigation';
import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import { useRouter } from 'next/navigation';

const dummyData = {
  "forumPost": {
    "postIdx": 1,
    "content": "이번 시즌 2 너무 지루했음. 메타 고정.",
    "createdAt": "2025-12-08T03:52:25",
    "hit": 799,
    "likes": 56,
    "title": "시즌 2 총평해보자",
    "topic": "일반",
    "updatedAt": "2025-12-21T15:56:25",
    "userId": "paige.wehner@bergnaum.com"
  },
  "forumComments": {
    "content": [
      {
        "comIdx": 10,
        "comContent": "밴픽에 밸런스 남으면 솔직히 선픽각이지;;",
        "createdAt": "2025-12-14T17:57:25",
        "updatedAt": "2025-12-14T21:41:25",
        "postIdx": 1,
        "userId": "jean.luettgen@raynor.com"
      },
      {
        "comIdx": 7,
        "comContent": "솔직히 널코어에서 밸런스 없으면 게임 안 된다.",
        "createdAt": "2025-12-14T13:08:25",
        "updatedAt": "9999-12-31T23:59:59",
        "postIdx": 1,
        "userId": "lizabeth.kuhn@fahey.com"
      },
      {
        "comIdx": 1,
        "comContent": "솔직히 널코어에서 밸런스 없으면 게임 안 된다.",
        "createdAt": "2025-12-13T23:23:25",
        "updatedAt": "9999-12-31T23:59:59",
        "postIdx": 1,
        "userId": "jayson.glover@frami.com"
      },
      {
        "comIdx": 2,
        "comContent": "솔직히 널코어에서 밸런스 없으면 게임 안 된다.",
        "createdAt": "2025-12-13T09:29:25",
        "updatedAt": "9999-12-31T23:59:59",
        "postIdx": 1,
        "userId": "birdie.bednar@tromp.com"
      },
      {
        "comIdx": 5,
        "comContent": "나도 밸런스만 믿고 돌렸는데 오늘 널코어 기분 좋았다.",
        "createdAt": "2025-12-13T03:41:25",
        "updatedAt": "2025-12-13T05:13:25",
        "postIdx": 1,
        "userId": "faustino.paucek@koss.com"
      },
      {
        "comIdx": 8,
        "comContent": "오늘 밸런스 플레이하다가 멘탈 나감…",
        "createdAt": "2025-12-13T02:07:25",
        "updatedAt": "9999-12-31T23:59:59",
        "postIdx": 1,
        "userId": "phebe.stoltenberg@franecki.com"
      },
      {
        "comIdx": 9,
        "comContent": "밸런스 궁극기 버그 아직도 안 고침?",
        "createdAt": "2025-12-11T20:03:25",
        "updatedAt": "9999-12-31T23:59:59",
        "postIdx": 1,
        "userId": "travis.cassin@pouros.com"
      },
      {
        "comIdx": 6,
        "comContent": "밴픽에 밸런스 남으면 솔직히 선픽각이지;;",
        "createdAt": "2025-12-10T04:28:25",
        "updatedAt": "2025-12-11T01:40:25",
        "postIdx": 1,
        "userId": "laverna.lockman@oberbrunner.com"
      },
      {
        "comIdx": 4,
        "comContent": "지금 메타는 밸런스랑 그 친구들이 다 함. 인정?",
        "createdAt": "2025-12-09T20:29:25",
        "updatedAt": "2025-12-11T15:41:25",
        "postIdx": 1,
        "userId": "quentin.mraz@torp.com"
      },
      {
        "comIdx": 3,
        "comContent": "널코어 돈질은 해도 밸런스 스킨은 인정이지.",
        "createdAt": "2025-12-09T01:00:25",
        "updatedAt": "9999-12-31T23:59:59",
        "postIdx": 1,
        "userId": "jaymie.wiza@huels.com"
      }
    ],
    "pageable": {
      "sort": {
        "empty": false,
        "sorted": true,
        "unsorted": false
      },
      "offset": 0,
      "pageNumber": 0,
      "pageSize": 15,
      "unpaged": false,
      "paged": true
    },
    "last": true,
    "totalElements": 10,
    "totalPages": 1,
    "size": 15,
    "number": 0,
    "sort": {
      "empty": false,
      "sorted": true,
      "unsorted": false
    },
    "numberOfElements": 10,
    "first": true,
    "empty": false
  }
}

export default function ForumDetailPage() {
  const router = useRouter();
  const params = useParams();
  const forumDetail = params?.forumDetail;

  // 포럼 상세 정보 불러오기
  // const getForumDetail = async () => {
  //   const { data } = await axios.get(`${URL}/forum/detail/${forumDetail}`, {
  //     headers: {
  //       authorization: token
  //     }
  //   });
  //   console.log(data);
  // }

  // 날짜를 한국 형식으로 포맷팅하는 함수
  const formatDate = (dateString) => {
    if (!dateString) return '-'; // 날짜 문자열이 없으면 '-' 반환

    const date = new Date(dateString); // 날짜 객체 생성
    // 날짜 부분을 한국어 형식으로 변환하고 공백 제거
    const datePart = date.toLocaleDateString('ko-KR').replace(/ /g, '');
    // 시간 부분을 24시간 형식으로 변환
    const timePart = date.toLocaleTimeString('ko-KR', {
      hour: '2-digit', // 시간: 두 자리 숫자
      minute: '2-digit', // 분: 두 자리 숫자
      hour12: false // 24시간 형식 사용
    });

    return `${datePart} ${timePart}`; // 날짜와 시간 조합하여 반환
  };

  return (
    <>
      <Header />
      <Menu />
      <div className="forum-container">
        <div className="forum-chart-wrapper">
          <span>{dummyData.forumPost.topic} 토론장</span>
          <span>{dummyData.forumPost.title}</span>
          <span>{dummyData.forumPost.userId}</span>
          <div className="forum-detail-info">
            <span>작성 날짜 {formatDate(dummyData.forumPost.createdAt)}</span>
            <span>조회수 {dummyData.forumPost.hit} | 좋아요 {dummyData.forumPost.likes}</span>
          </div>

          <div className="forum-detail-content">
            <span>{dummyData.forumPost.content}</span>
          </div>
        </div>

        <div className="forum-comment-wrapper">
          <span>댓글</span>
          <div className="forum-comment-list">
            {dummyData.forumComments.content.map((comment) => (
              <div className="forum-comment-item" key={comment.comIdx}>
                <span>{comment.userId}</span>
                <span>{formatDate(comment.createdAt)}</span>
                <span>{comment.comContent}</span>
              </div>
            ))}
            <button onClick={() => router.push('/component/forum')}>게시글 목록</button>
          </div>
        </div>
      </div>
    </>
  );
}