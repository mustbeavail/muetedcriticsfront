import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function Competition({ forumPosts }) {
    const token = typeof window !== "undefined" ? sessionStorage.getItem('token') : null;

    const [openMenuId, setOpenMenuId] = useState(null);
    const [hoverBadgeId, setHoverBadgeId] = useState(null);
    const [hoveredPostId, setHoveredPostId] = useState(null);
    const hoverTimeoutRef = useRef(null);

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
        </div>
    );
}