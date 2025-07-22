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

  // 유저 상세보기 모달 state
  const [selectedUser, setSelectedUser] = useState(null);

  // 메모 state
  const [memoList, setMemoList] = useState([]);
  const [showMemoModal, setShowMemoModal] = useState(false);
  const [memoLoading, setMemoLoading] = useState(false);
  const [showWriteMemoModal, setShowWriteMemoModal] = useState(false);
  const [memoContent, setMemoContent] = useState('');
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [showEditMemoModal, setShowEditMemoModal] = useState(false);
  const [editMemoContent, setEditMemoContent] = useState('');

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const [userDetail, setUserDetail] = useState({});
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

  const getUserDetail = async (userId) => {
    if (userDetail[userId]) return;
    const { data } = await axios.get(`${URL}/user/detail`, {
      params: { userId },
      headers: {
        authorization: token
      }
    });
    setUserDetail(prev => ({ ...prev, [userId]: data.userDetail[0] }));
  };

  // 유저 상세보기 버튼을 누를 시 상세보기 모달 출력
  const openUserDetailModal = (userId) => {
    console.log(userId);
    const detail = userDetail[userId];
    if (detail) {
      setSelectedUser(detail);
    } else {
      getUserDetail(userId).then(() => {
        setSelectedUser(userDetail[userId]);
      });
    }
  };

  // 유저 통계보기 버튼을 누를 시 유저 통계보기 페이지로 이동

  // 유저 지출 상세내역 버튼을 누를 시 유저 지출 상세내역 페이지로 이동

  // 메모 모달 열기(메모 리스트 불러오기)
  const openMemoModal = async (user) => {
    setSelectedUser(user);
    setSelectedMemo(null);
    setShowMemoModal(true);
    setMemoLoading(true);
    try {
      const { data } = await axios.get(`${URL}/user/${user.userId}/list`, {
        headers: { Authorization: sessionStorage.getItem('token') }
      });
      setMemoList(data);
    } catch (e) {
      setMemoList([]);
    } finally {
      setMemoLoading(false);
    }
  };

  // 메모 삭제하기
  const deleteMemo = async () => {
    if (!selectedMemo) {
      alert("삭제할 메모를 선택하세요.");
      return;
    }
    try {
      await axios.delete(`${URL}/user/${selectedMemo.memoIdx}/delete`, {
        headers: { Authorization: sessionStorage.getItem('token') },
        data: { memberId: sessionStorage.getItem('member_id') }
      });
      alert("메모가 삭제되었습니다.");
      // 메모 리스트 새로고침
      openMemoModal(selectedUser);
      setSelectedMemo(null);
    } catch (error) {
      console.log("메모 삭제 실패 : ", error);
      if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("메모 삭제에 실패했습니다.");
      }
    }
  };

  // 메모 수정 모달 열기
  const handleEditMemoClick = () => {
    if (!selectedMemo) {
      alert('수정할 메모를 선택하세요.');
      return;
    }
    setEditMemoContent(selectedMemo.memoContent);
    setShowEditMemoModal(true);
  };

  // 메모 확인하기 모달 닫기
  const closeMemoModal = () => {
    setShowMemoModal(false);
    setMemoList([]);
    setSelectedUser(null);
    setSelectedMemo(null);
  };

  // 메모 작성 모달
  const openWriteMemoModal = (user) => {
    setSelectedUser(user); // 어느 유저의 메모인지 지정
    setMemoContent('');
    setShowWriteMemoModal(true);
    setOpenMenuId(null);
  };

  // 메모 작성하기
  const writeMemo = async (userId, memoContent) => {
    try {
      const { data } = await axios.post(`${URL}/user/write/memo`, {
        memberId: sessionStorage.getItem('member_id'),
        userId: userId,
        memo: memoContent
      },
        {
          headers: { Authorization: sessionStorage.getItem('token') }
        });
      alert(data.msg); // 메모 작성 완료 메시지 표시
      // 작성 완료 시 메모 리스트 새로고침
      openMemoModal(selectedUser);
    } catch (error) {
      console.log("메모 작성 실패 : ", error);
      if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("메모 작성에 실패했습니다.");
      }
    }
  };

  // 메모 작성 모달 닫기
  const closeWriteMemoModal = () => {
    setShowWriteMemoModal(false);
    setMemoContent('');
    setSelectedUser(null);
  };

  const handleSubmitMemo = async () => {
    if (!memoContent.trim()) {
      alert("메모 내용을 입력하세요.");
      return;
    }
    await writeMemo(selectedUser.userId, memoContent);
    setShowWriteMemoModal(false);
    setMemoContent('');
    // 작성 후 바로 메모 리스트 새로고침 하려면 아래 추가
    // openMemoModal(selectedUser);
  };

  // 메모 수정 반영하기
  const handleUpdateMemo = async () => {
    if (!editMemoContent.trim()) {
      alert("메모 내용을 입력하세요.");
      return;
    }
    await updateMemo(selectedMemo.memoIdx, editMemoContent);
    setShowEditMemoModal(false);
    setEditMemoContent('');
    // 메모 리스트 새로고침
    openMemoModal(selectedUser);
  };


  // 메모 수정하기
  const updateMemo = async (memoIdx, memoContent) => {
    try {
      const { data } = await axios.put(`${URL}/user/${memoIdx}/update`, {
        memberId: sessionStorage.getItem('member_id'),
        memo: memoContent
      },
        {
          headers: { Authorization: sessionStorage.getItem('token') }
        });
      alert(data.msg); // 메모 수정 완료 메시지 표시
    } catch (error) {
      console.log("메모 수정 실패 : ", error);
      if (error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("메모 수정에 실패했습니다.");
      }
    }
  };

  // 수정 모달 닫기
  const closeEditMemoModal = () => {
    setShowEditMemoModal(false);
    setEditMemoContent('');
  };

  // 모달 닫기
  const closeModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <Header token={token}/>
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
                <button onClick={() => openUserDetailModal(forumDetailData?.userId)}>
                  유저 상세보기
                </button>
                <button onClick={() => router.push(`/component/user/${forumDetailData?.userId}`)}>
                  유저 통계보기
                </button>
                <button onClick={() => router.push(`/component/userExpenditure?id=${forumDetailData?.userId}`)}>
                  유저 지출 상세내역
                </button>
                <button onClick={() => openMemoModal(userDetail[forumDetailData?.userId] || { userId: forumDetailData?.userId })}>
                  메모 확인하기
                </button>
                <button onClick={() => openWriteMemoModal(userDetail[forumDetailData?.userId] || { userId: forumDetailData?.userId })}>메모 작성하기</button>
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
        {/* 유저 상세보기 모달 */}
        {selectedUser && (
          <div className="forum-modalBackdrop">
            <div className="forum-modal">
              <div className="forum-modalHeader">
                <div className="forum-userName">{forumDetailData?.userId}</div>
              </div>
              <hr className="forum-divider" />
              <div className="forum-modalContent">
                <ul>
                  <li><strong>아이디</strong> : {selectedUser.user_id}</li>
                  <li><strong>성별</strong> : {selectedUser.user_gender}</li>
                  <li><strong>전화번호</strong> : {selectedUser.phone?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') || '-'}</li>
                  <li><strong>접속 지역</strong> : {selectedUser.region}</li>
                  <li><strong>가입일</strong> : {selectedUser.join_date}</li>
                  <li><strong>휴면 전환일</strong> : {selectedUser.dormant_date || '-'}</li>
                  <li><strong>탈퇴일</strong> : {selectedUser.withdraw_date || '-'}</li>
                  <li><strong>분류</strong> : {selectedUser.user_type}{selectedUser.vip_yn ? ' (VIP)' : ''}</li>
                </ul>
              </div>
              <div className="forum-modalFooter">
                <button className="forum-closeBtn" onClick={closeModal}>닫기</button>
              </div>
            </div>
          </div>
        )
        }

        {/* 메모 확인하기 모달 */}
        {selectedUser && showMemoModal && (
          <div className="forum-modalBackdrop">
            <div className="forum-modal">
              <div className="forum-modalHeader">
                <div className="forum-userName">{forumDetailData?.userId}님에 대한 메모</div>
                <div className="forum-modalHeaderBtns">
                  <button className="forum-deleteBtn" onClick={deleteMemo}>삭제</button>
                  <button className="forum-editBtn" onClick={handleEditMemoClick}>수정</button>
                  <button className="forum-closeBtn" onClick={closeMemoModal}>닫기</button>
                </div>
              </div>
              <hr className="forum-divider" />
              {memoLoading ? (
                <div>메모 불러오는 중...</div>
              ) : (
                <div>
                  {memoList.length === 0 ? (
                    <div>등록된 메모가 없습니다.</div>
                  ) : (
                    <div className="forum-otherMemoList">
                      {memoList.map((memo) => (
                        <div key={memo.memoIdx}
                          className={`forum-otherMemoItem ${selectedMemo?.memoIdx === memo.memoIdx ? 'selected' : ''}`}
                          style={{ marginBottom: 20 }}
                          onClick={() => setSelectedMemo(memo)}>
                          <div className="forum-memoInfo">
                            <span><b>{memo.memberId}</b> 님</span>
                            <span>
                              {memo.updatedAt?.slice(0, 10) || memo.createdAt?.slice(0, 10)}
                            </span>
                          </div>
                          <textarea
                            className="forum-memoTextarea"
                            value={memo.memoContent}
                            readOnly
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 메모 작성 모달 */}
        {showWriteMemoModal && (
          <div className="forum-modalBackdrop">
            <div className="forum-modal">
              <div className="forum-modalHeader">
                <div className="forum-userName">
                  <b>{forumDetailData?.userId}</b> 님에 대한 메모 작성
                </div>
              </div>
              <hr className="forum-divider" />
              <div className="forum-modalContent">
                <textarea
                  className="forum-memoTextarea"
                  placeholder="메모 내용을 입력하세요."
                  value={memoContent}
                  onChange={(e) => setMemoContent(e.target.value)}
                  rows={6}
                  maxLength={500}
                />
              </div>
              <div className="forum-modalFooter">
                <button className="forum-closeBtn" onClick={closeWriteMemoModal}>취소</button>
                <button className="forum-saveBtn" onClick={handleSubmitMemo}>저장</button>
              </div>
            </div>
          </div>
        )}

        {/* 메모 수정 모달 */}
        {showEditMemoModal && (
          <div className="forum-modalBackdrop">
            <div className="forum-modal forum-editMemoModal">
              <div className="forum-modalHeader">
                <div className="forum-userName">
                  <b>{selectedUser?.userId}</b> 님의 메모 수정
                </div>
              </div>
              <hr className="forum-divider" />
              <div className="forum-modalContent">
                <textarea
                  className="forum-memoTextarea"
                  value={editMemoContent}
                  onChange={e => setEditMemoContent(e.target.value)}
                  rows={6}
                  maxLength={500}
                />
              </div>
              <div className="forum-modalFooter">
                <button className="forum-closeBtn" onClick={closeEditMemoModal}>취소</button>
                <button className="forum-saveBtn" onClick={handleUpdateMemo}>수정하기</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}