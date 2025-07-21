import { useState } from 'react';
import Link from 'next/link';

export default function Competition({ forumPosts }) {
    const [openMenuId, setOpenMenuId] = useState(null);

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
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
                                <button style={{ color: 'white' }} onClick={() => toggleMenu(post.postIdx)}>
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