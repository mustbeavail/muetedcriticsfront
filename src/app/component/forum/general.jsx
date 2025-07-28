import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import api from '../../utils/api';
import forumStyles from './forum.module.css';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function General({ token, forumPosts }) {
    const [openMenuId, setOpenMenuId] = useState(null);
    const [hoverBadgeId, setHoverBadgeId] = useState(null);
    const [hoveredPostId, setHoveredPostId] = useState(null);
    const hoverTimeoutRef = useRef(null);

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
        const { data } = await api.get(`${URL}/user/detail`, {
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
    // 각 유저별 메모 개수 저장
    const [userMemoCount, setUserMemoCount] = useState({});
    const getUserTier = async (userId) => {
        if (userTiers[userId]) return;
        const tiers = [];
        for (let season = 1; season <= 4; season++) {
            const { data } = await api.get(`${URL}/user/stats/season`, {
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

    // 유저별 메모 개수 조회
    const getUserMemoCount = async (userId) => {
        // 이미 조회했으면 skip
        if (userMemoCount[userId] !== undefined) return;
        
        try {
            const { data } = await api.get(`${URL}/user/${userId}/list`, {
                headers: { Authorization: sessionStorage.getItem('token') }
            });
            setUserMemoCount(prev => ({ ...prev, [userId]: data.length }));
        } catch (e) {
            setUserMemoCount(prev => ({ ...prev, [userId]: 0 }));
        }
    };

    // forumPosts가 로드될 때 모든 유저의 메모 개수 조회
    useEffect(() => {
        if (forumPosts && forumPosts.length > 0) {
            forumPosts.forEach(post => {
                getUserMemoCount(post.userId);
            });
        }
    }, [forumPosts]);

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
        '이탈 위험군': 'churn risk',
        'VIP': 'total spend',
    };

    const tierImage = (userId) => {
        const tiers = userTiers[userId];
        if (!tiers) return null;

        const type = userDetail[userId]?.user_type?.trim();
        const badgeName = tierMap[type];

        return (
            <div className={forumStyles.seasonBox}>
                <img
                    style={{ width: '50px', height: '56px' }}
                    src={`/badge/${badgeName}.png`}
                    alt="유저 타입 뱃지 이미지"
                    className={forumStyles.seasonImage}
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
                                className={forumStyles.seasonImage}
                            />
                        </div>
                    );
                })}
            </div>
        );
    };

    // 유저 이름에 0.1초간 hover하면 뱃지 목록 나옴
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
        }, 10);
    };

    // 유저 뱃지 목록 나오는 영역 밖으로 마우스 나갈 시 뱃지 목록 사라짐
    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setHoveredPostId(null);
    };

    // 뱃지 디스플레이
    const BadgeDisplay = ({ userId }) => {
        const tiers = userTiers[userId];
        const detail = userDetail[userId];

        if (!tiers || !detail) {
            return <div style={{ padding: '10px 0', textAlign: 'center' }}>뱃지 정보 로딩 중...</div>;
        }

        // 유저 타입에 따른 뱃지 이미지 (없으면 none.png)
        const type = detail?.user_type?.trim();
        const typeBadgeName = tierMap[type] || 'none';

        return (
            <div className={forumStyles.badgeContainer}>
                <img
                    style={{ width: '50px', height: '56px' }}
                    src={`/badge/${typeBadgeName}.png`}
                    alt="유저 타입 뱃지 이미지"
                    className={forumStyles.seasonImage}
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
                                className={forumStyles.seasonImage}
                            />
                        </div>
                    );
                })}
            </div>
        );
    };

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

    // 메뉴 외부 클릭 시 메뉴 닫기
    const dropdownRefs = useRef({});
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (openMenuId !== null) {
                const ref = dropdownRefs.current[openMenuId];
                if (ref && !ref.contains(event.target)) {
                    setOpenMenuId(null);
                }
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [openMenuId]);

    // 유저 상세보기 버튼을 누를 시 상세보기 모달 출력
    const [selectedDetailUser, setSelectedDetailUser] = useState(null);
    const openUserDetailModal = (userId) => {
        console.log(userId);
        const detail = userDetail[userId];
        if (detail) {
            setSelectedDetailUser(detail);
        } else {
            getUserDetail(userId).then(() => {
                setSelectedDetailUser(userDetail[userId]);
            });
        }
    };

    // 메모 모달 열기 (메모 리스트 불러오기)
    const [selectedMemoUser, setSelectedMemoUser] = useState(null);
    const openMemoModal = async (user) => {
        console.log(user);
        setSelectedMemoUser(user);
        setSelectedMemo(null);
        setShowMemoModal(true);
        setMemoLoading(true);
        try {
            const { data } = await api.get(`${URL}/user/${user.user_id}/list`, {
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
            await api.delete(`${URL}/user/${selectedMemo.memoIdx}/delete`, {
                headers: { Authorization: sessionStorage.getItem('token') },
                data: { memberId: sessionStorage.getItem('member_id') }
            });
            alert("메모가 삭제되었습니다.");
            // 메모 리스트 새로고침
            openMemoModal(selectedMemoUser);
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
        setSelectedMemoUser(null);
        setSelectedMemo(null);
    };

    // 메모 작성 모달
    const openWriteMemoModal = (user) => {
        setSelectedMemoUser(user); // 어느 유저의 메모인지 지정
        setMemoContent('');
        setShowWriteMemoModal(true);
        setOpenMenuId(null);
    };

    // 메모 작성하기
    const writeMemo = async (userId, memoContent) => {
        console.log(userId);
        try {
            const { data } = await api.post(`${URL}/user/write/memo`, {
                memberId: sessionStorage.getItem('member_id'),
                userId: userId,
                memo: memoContent
            },
                {
                    headers: { Authorization: sessionStorage.getItem('token') }
                });
            alert(data.msg); // 메모 작성 완료 메시지 표시
            // 작성 완료 시 메모 리스트 새로고침
            openMemoModal(selectedMemoUser);
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
        setSelectedMemoUser(null);
    };

    // 메모 작성하기
    const handleSubmitMemo = async () => {
        if (!memoContent.trim()) {
            alert("메모 내용을 입력하세요.");
            return;
        }
        console.log(selectedMemoUser);
        await writeMemo(selectedMemoUser.user_id, memoContent);

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
        openMemoModal(selectedMemoUser);
    };


    // 메모 수정하기
    const updateMemo = async (memoIdx, memoContent) => {
        try {
            const { data } = await api.put(`${URL}/user/${memoIdx}/update`, {
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
        setSelectedDetailUser(null);
        setSelectedMemoUser(null);
    };

    return (
        <div>
            <div className={forumStyles.forumTable}>
                <div className={`row ${forumStyles.header}`}>
                    <div className={forumStyles.idxCell}>글 번호</div>
                    <div className={forumStyles.titleCell}>주제</div>
                    <div className={forumStyles.userCell}>글쓴이</div>
                    <div className={forumStyles.dateCell}>작성 날짜</div>
                    <div className={forumStyles.hitCell}>조회수</div>
                    <div className={forumStyles.likesCell}>좋아요</div>
                </div>
                {forumPosts.map((post) => (
                    <div key={post.postIdx}>
                        <div className={`row ${forumStyles.row}`}>
                            <div className={forumStyles.idxCell}>{post.postIdx}</div>
                            <div className={forumStyles.titleCell}>
                                <Link href={`/component/forum/${post.postIdx}`}>
                                    {post.title}
                                </Link>
                            </div>
                            <div className={forumStyles.userCell}>
                                <div
                                    ref={el => { dropdownRefs.current[post.postIdx] = el; }}
                                >
                                    <button
                                        style={{ color: 'white' }}
                                        onClick={() => setOpenMenuId(openMenuId === post.postIdx ? null : post.postIdx)}
                                        onMouseEnter={() => handleMouseEnter(post)}
                                        onMouseLeave={handleMouseLeave}>
                                        {post.userId}
                                        {userMemoCount[post.userId] > 0 && (
                                            <span> 📝</span>
                                        )}
                                    </button>
                                    {openMenuId === post.postIdx && (
                                        <div className={forumStyles.forumDropdown}>
                                            <button onClick={() => openUserDetailModal(post.userId)}>유저 상세보기</button>
                                            <button onClick={() => window.open(`/component/user/${post.userId}`, '_blank')}>유저 통계보기</button>
                                            <button onClick={() => window.open(`/component/userExpenditure?id=${post.userId}`, '_blank')}>유저 지출 상세내역</button>
                                            <button onClick={() => openMemoModal(userDetail[post.userId] || { user_id: post.userId })}>메모 확인하기</button>
                                            <button onClick={() => openWriteMemoModal(userDetail[post.userId] || { user_id: post.userId })}>메모 작성하기</button>
                                        </div>
                                    )}
                                </div>
                                {hoveredPostId === post.postIdx && (
                                    <div className={forumStyles.forumBadge}>
                                        {tierImage(post.userId)}
                                    </div>
                                )}
                            </div>
                            <div className={forumStyles.dateCell}>{formatDate(post.createdAt)}</div>
                            <div className={forumStyles.hitCell}>{post.hit}</div>
                            <div className={forumStyles.likesCell}>{post.likes}</div>
                        </div>
                    </div>
                ))}
            </div>
            {/* 유저 상세보기 모달 */}
            {selectedDetailUser && (
                <div className={forumStyles.forumModalBackdrop}>
                    <div className={forumStyles.forumModal}>
                        <div className={forumStyles.forumModalHeader}>
                            <div className={forumStyles.forumUserName}>{selectedDetailUser?.user_nick}</div>
                        </div>

                        {/* 뱃지 디스플레이 컴포넌트 */}
                        <BadgeDisplay userId={selectedDetailUser?.user_id} />

                        <hr className={forumStyles.forumDivider} />
                        <div className={forumStyles.forumModalContent}>
                            <ul>
                                <li><strong>아이디</strong> {selectedDetailUser?.user_id}</li>
                                <li><strong>성별</strong> {selectedDetailUser?.user_gender}</li>
                                <li><strong>전화번호</strong> {selectedDetailUser?.phone?.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3') || '-'}</li>
                                <li><strong>접속 지역</strong> {selectedDetailUser?.region}</li>
                                <li><strong>가입일</strong> {selectedDetailUser?.join_date}</li>
                                <li><strong>휴면 전환일</strong> {selectedDetailUser?.dormant_date || '-'}</li>
                                <li><strong>탈퇴일</strong> {selectedDetailUser?.withdraw_date || '-'}</li>
                                <li><strong>분류</strong> {selectedDetailUser?.user_type}{selectedDetailUser?.vip_yn ? ' (VIP)' : ''}</li>
                            </ul>
                        </div>
                        <hr className={forumStyles.forumDivider} />
                        <div className={forumStyles.forumModalFooter}>
                            <button className={forumStyles.forumCloseBtn} onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 메모 모달 */}
            {showMemoModal && (
                <div className={forumStyles.forumModalBackdrop}>
                    <div className={forumStyles.forumModal + ' ' + forumStyles.forumOtherMemoModal}>
                        <div className={forumStyles.forumModalHeader}>
                            <div className={forumStyles.forumUserName}>
                                <b>{selectedMemoUser?.user_nick}</b> 님에 대한 메모
                            </div>
                            <div className={forumStyles.forumModalHeaderBtns}>
                                <button className={forumStyles.forumDeleteBtn} onClick={deleteMemo}>삭제</button>
                                <button className={forumStyles.forumEditBtn} onClick={handleEditMemoClick}>수정</button>
                                <button className={forumStyles.forumCloseBtn} onClick={closeMemoModal}>닫기</button>
                            </div>
                        </div>
                        <hr className={forumStyles.forumDivider} />
                        {memoLoading ? (
                            <div>메모 불러오는 중...</div>
                        ) : (
                            <div>
                                {memoList.length === 0 ? (
                                    <div>등록된 메모가 없습니다.</div>
                                ) : (
                                    <div className={forumStyles.forumOtherMemoList}>
                                        {memoList.map((memo) => (
                                            <div key={memo.memoIdx}
                                                className={`${forumStyles.forumOtherMemoItem} ${selectedMemo?.memoIdx === memo.memoIdx ? forumStyles.selected : ''}`}
                                                style={{ marginBottom: 20 }}
                                                onClick={() => setSelectedMemo(memo)}>
                                                <div className={forumStyles.forumMemoInfo}>
                                                    <span><b>{memo.memberId}</b> 님</span>
                                                    <span>
                                                        작성일 : {formatDate(memo.createdAt)}
                                                        <br />
                                                        수정일 : {formatDate(memo.updatedAt)}
                                                    </span>
                                                </div>
                                                <textarea
                                                    className={forumStyles.forumMemoTextarea}
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
                <div className={forumStyles.forumModalBackdrop}>
                    <div className={forumStyles.forumModal + ' ' + forumStyles.forumWriteMemoModal}>
                        <div className={forumStyles.forumModalHeader}>
                            <div className={forumStyles.forumUserName}>
                                <b>{selectedMemoUser?.user_nick}</b> 님에 대한 메모 작성
                            </div>
                        </div>
                        <hr className={forumStyles.forumDivider} />
                        <div className={forumStyles.forumModalContent}>
                            <textarea
                                className={forumStyles.forumMemoTextarea}
                                placeholder="메모 내용을 입력하세요."
                                value={memoContent}
                                onChange={(e) => setMemoContent(e.target.value)}
                                rows={6}
                                maxLength={500}
                            />
                        </div>
                        <div className={forumStyles.forumModalFooter}>
                            <button className={forumStyles.forumCloseBtn} onClick={closeWriteMemoModal}>취소</button>
                            <button className={forumStyles.forumSaveBtn} onClick={handleSubmitMemo}>저장</button>
                        </div>
                    </div>
                </div>
            )}

            {/* 메모 수정 모달 */}
            {showEditMemoModal && (
                <div className={forumStyles.forumModalBackdrop}>
                    <div className={forumStyles.forumModal + ' ' + forumStyles.forumEditMemoModal}>
                        <div className={forumStyles.forumModalHeader}>
                            <div className={forumStyles.forumUserName}>
                                <b>{selectedMemoUser?.user_nick}</b> 님의 메모 수정
                            </div>
                        </div>
                        <hr className={forumStyles.forumDivider} />
                        <div className={forumStyles.forumModalContent}>
                            <textarea
                                className={forumStyles.forumMemoTextarea}
                                value={editMemoContent}
                                onChange={e => setEditMemoContent(e.target.value)}
                                rows={6}
                                maxLength={500}
                            />
                        </div>
                        <div className={forumStyles.forumModalFooter}>
                            <button className={forumStyles.forumCloseBtn} onClick={closeEditMemoModal}>취소</button>
                            <button className={forumStyles.forumSaveBtn} onClick={handleUpdateMemo}>수정하기</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}