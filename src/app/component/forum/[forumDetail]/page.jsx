'use client';
import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function ForumDetailPage({ params }) {
  const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;

  const router = useRouter();
  const resolvedParams = use(params);
  const postIdx = resolvedParams.forumDetail;

  // 포럼 상세 정보 불러오기
  const [forumDetailData, setForumDetailData] = useState(null);
  const [forumCommentData, setForumCommentData] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const getForumDetail = async () => {
    const { data } = await axios.get(`${URL}/forum/detail/${postIdx}`, {
      params: {
        page: 1
      },
      headers: {
        authorization: token
      }
    });
    console.log(data.forumPost);
    console.log(data.forumComments);
    setForumDetailData(data.forumPost);
    setForumCommentData(data.forumComments);
  }

  useEffect(() => {
    console.log(postIdx);
    getForumDetail();
  }, [postIdx]);

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
          <span>{forumDetailData?.topic} 토론장</span>
          <span>{forumDetailData?.title}</span>
          <div className="forum-detail-user">
            <button style={{ color: 'white' }} onClick={() => toggleMenu(forumDetailData?.postIdx)}>
              {forumDetailData?.userId}
            </button>
            {openMenuId === forumDetailData?.postIdx && (
              <div className="forum-dropdown">
                <button onClick={() => alert('유저 상세보기')}>
                  유저 상세보기
                </button>
                <button onClick={() => alert('유저 통계보기')}>
                  유저 통계보기
                </button>
                <button onClick={() => alert('유저 지출 상세내역')}>
                  유저 지출 상세내역
                </button>
                <button onClick={() => alert('다른 유저 메모 보기')}>
                  다른 유저 메모 보기
                </button>
                <button onClick={() => alert('나의 메모 확인하기')}>
                  나의 메모 확인하기
                </button>
              </div>
            )}
          </div>
          <div className="forum-detail-info">
            <span>작성 날짜 {formatDate(forumDetailData?.createdAt)}</span>
            <span>조회수 {forumDetailData?.hit} | 좋아요 {forumDetailData?.likes}</span>
          </div>

          <div className="forum-detail-content">
            <span>{forumDetailData?.content}</span>
          </div>
        </div>

        <div className="forum-comment-wrapper">
          <span>댓글</span>
          <div className="forum-comment-list">
            {forumCommentData?.content.map((comment) => (
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