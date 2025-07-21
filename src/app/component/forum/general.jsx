import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function General({ forumPosts }) {
    const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;

    const [openMenuId, setOpenMenuId] = useState(null);
    const [hoverBadgeId, setHoverBadgeId] = useState(null);
    const [hoveredPostId, setHoveredPostId] = useState(null);
    const hoverTimeoutRef = useRef(null);

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



    // 각각의 유저 디테일 불러오기 (유저 타입 뱃지)
    const [userDetail, setUserDetail] = useState({});
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
    useEffect(() => {
        if (hoverBadgeId && !userDetail[hoverBadgeId]) {
            getUserDetail(hoverBadgeId);
        }
    }, [hoverBadgeId]);

    // 각각의 유저 시즌별 티어 불러오기 (뱃지 목록)
    const [userTiers, setUserTiers] = useState({});
    const getUserTier = async (userId) => {
        if (userTiers[userId]) return;
        const tiers = [];
        for (let season = 1; season <= 6; season++) {
            const { data } = await axios.get(`${URL}/user/stats/season`, {
                params: {
                    userId,
                    season: season
                },
                headers: {
                    authorization: token
                }
            });
            tiers.push(data.userStatsSeason);
        }
        setUserTiers(prev => ({ ...prev, [userId]: tiers }));
    };
    useEffect(() => {
        if (hoverBadgeId && !userTiers[hoverBadgeId]) {
            getUserTier(hoverBadgeId);
        }
    }, [hoverBadgeId]);

    const tierMap = {
        '골드': 'gold',
        '그랜드마스터': 'grandmaster',
        '마스터': 'master',
        '브론즈': 'bronze',
        '실버': 'silver',
        '언랭크드': 'unranked',
        '챌린저': 'challenger',
        '다이아몬드': 'diamond',
        '플래티넘': 'platinum',
        // 유저 타입 뱃지 추가
        '일반': 'casual',
        '신규': 'new',
        '복귀': 'returning',
        '휴면': 'dormant',
        '정지': 'suspended',
        '이탈 위험군': 'churn_risk',
        'VIP': 'total spend',
    };

    const tierImage = (userId) => {
        const tiers = userTiers[userId];
        if (!tiers) return null;

        const type = userDetail[userId]?.user_type?.trim();
        const badgeName = tierMap[type];

        return (
            <div className="season-box">
                <img
                    style={{ width: '50px', height: '56px' }}
                    src={`/badge/${badgeName}.png`}
                    alt="유저 타입 뱃지 이미지"
                    className="season-image"
                />
                {tiers.map((seasonInfo) => {
                    // 만약 tier_season이 없으면 none.png 이미지 출력
                    const imageCode = tierMap[seasonInfo.tier_season];
                    const imageName = imageCode
                        ? `${seasonInfo.season}${imageCode}.png`
                        : 'none.png';
                    return (
                        <div key={seasonInfo.season}>
                            <img
                                style={{ width: '50px', height: '56px' }}
                                src={`/badge/${imageName}`}
                                alt="시즌 뱃지 이미지"
                                className="season-image"
                            />
                        </div>
                    );
                })}
            </div>
        );
    };

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    // 유저 이름에 1초간 hover하면 뱃지 목록 나옴
    const handleMouseEnter = (post) => {
        hoverTimeoutRef.current = setTimeout(() => {
            setHoveredPostId(post.postIdx);
            setHoverBadgeId(post.userId);
            if (!userDetail[post.userId]) {
                getUserDetail(post.userId);
            }
            if (!userTiers[post.userId]) {
                getUserTier(post.userId);
            }
        }, 1000);
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setHoveredPostId(null);
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
        <div>
            <div className="forum-table">
                <div className="row header">
                    <div className="idx-cell">글 번호</div>
                    <div className="title-cell">주제</div>
                    <div className="user-cell">글쓴이</div>
                    <div className="date-cell">작성 날짜</div>
                    <div className="hit-cell">조회수</div>
                    <div className="likes-cell">좋아요</div>
                </div>
                {forumPosts.map((post) => (
                    <div key={post.postIdx}>
                        <div className="row">
                            <div className="idx-cell">{post.postIdx}</div>
                            <div className="title-cell">
                                <Link href={`/component/forum/${post.postIdx}`}>
                                    {post.title}
                                </Link>
                            </div>
                            <div className="user-cell">
                                <button
                                    style={{ color: 'white' }}
                                    onClick={() => toggleMenu(post.postIdx)}
                                    onMouseEnter={() => handleMouseEnter(post)}
                                    onMouseLeave={handleMouseLeave}>
                                    {post.userId}
                                </button>
                                {openMenuId === post.postIdx && (
                                    <div className="forum-dropdown">
                                        <button onClick={() => openUserDetailModal(post.userId)}>
                                            유저 상세보기
                                        </button>
                                        <button onClick={() => alert('유저 통계보기')}>
                                            유저 통계보기
                                        </button>
                                        <button onClick={() => alert('유저 지출 상세내역')}>
                                            유저 지출 상세내역
                                        </button>
                                        <button onClick={() => openMemoModal(userDetail[post.userId] || { userId: post.userId })}>
                                            메모 확인하기
                                        </button>
                                        <button onClick={() => openWriteMemoModal(userDetail[post.userId] || { userId: post.userId })}>메모 작성하기</button>
                                    </div>
                                )}
                                {hoveredPostId === post.postIdx && (
                                    <div className="forum-badge">
                                        {tierImage(post.userId)}
                                    </div>
                                )}
                            </div>
                            <div className="date-cell">{post.createdAt.slice(0, 10)}</div>
                            <div className="hit-cell">{post.hit}</div>
                            <div className="likes-cell">{post.likes}</div>
                        </div>
                    </div>
                ))}
            </div>
            {/* 유저 상세보기 모달 */}
            {selectedUser && (
                    <div className="forum-modalBackdrop">
                        <div className="forum-modal">
                            <div className="forum-modalHeader">
                                <div className="forum-userName">{selectedUser.user_id}</div>
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
                            <div className="forum-userName">{selectedUser.user_id}님에 대한 메모</div>
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
                                <b>{selectedUser.user_id}</b> 님에 대한 메모 작성
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
        </div >
    );
}