'use client'
import React, { useState } from 'react';
import Header from '@/Header/page';
import Menu from '@/menu/Menu';
import './forum.css';
import { IoSearch } from 'react-icons/io5';

import General from './general';
import Competition from './competition';

const Forum = () => {
  const dummyData = {
    "forumPosts": {
      "content": [
        {
          "postIdx": 109,
          "content": "요즘 널코어 경쟁전 돌리면 루시우 픽률이 눈에 띄게 올랐습니다. 플래티넘 구간에서 직접 테스트한 결과입니다.",
          "createdAt": "2025-12-31T22:23:27",
          "hit": 229,
          "likes": 24,
          "title": "널코어 루시우 밸패 후기 #7",
          "topic": "일반",
          "updatedAt": "2025-12-31T23:59:00",
          "userId": "lonna.bosco@emard.com"
        },
        {
          "postIdx": 110,
          "content": "요즘 널코어 경쟁전 돌리면 루시우 픽률이 눈에 띄게 올랐습니다. 플래티넘 구간에서 직접 테스트한 결과입니다.",
          "createdAt": "2025-12-31T22:23:27",
          "hit": 229,
          "likes": 24,
          "title": "널코어 루시우 밸패 후기 #7",
          "topic": "일반",
          "updatedAt": "2025-12-31T23:59:00",
          "userId": "lonna.bosco@emard.com"
        },
        {
          "postIdx": 111,
          "content": "요즘 널코어 경쟁전 돌리면 루시우 픽률이 눈에 띄게 올랐습니다. 플래티넘 구간에서 직접 테스트한 결과입니다.",
          "createdAt": "2025-12-31T22:23:27",
          "hit": 229,
          "likes": 24,
          "title": "널코어 루시우 밸패 후기 #7",
          "topic": "일반",
          "updatedAt": "2025-12-31T23:59:00",
          "userId": "lonna.bosco@emard.com"
        },
        {
          "postIdx": 112,
          "content": "요즘 널코어 경쟁전 돌리면 루시우 픽률이 눈에 띄게 올랐습니다. 플래티넘 구간에서 직접 테스트한 결과입니다.",
          "createdAt": "2025-12-31T22:23:27",
          "hit": 229,
          "likes": 24,
          "title": "널코어 루시우 밸패 후기 #7",
          "topic": "일반",
          "updatedAt": "2025-12-31T23:59:00",
          "userId": "lonna.bosco@emard.com"
        },
        {
          "postIdx": 113,
          "content": "요즘 널코어 경쟁전 돌리면 루시우 픽률이 눈에 띄게 올랐습니다. 플래티넘 구간에서 직접 테스트한 결과입니다.",
          "createdAt": "2025-12-31T22:23:27",
          "hit": 229,
          "likes": 24,
          "title": "널코어 루시우 밸패 후기 #7",
          "topic": "일반",
          "updatedAt": "2025-12-31T23:59:00",
          "userId": "lonna.bosco@emard.com"
        },
        {
          "postIdx": 114,
          "content": "요즘 널코어 경쟁전 돌리면 루시우 픽률이 눈에 띄게 올랐습니다. 플래티넘 구간에서 직접 테스트한 결과입니다.",
          "createdAt": "2025-12-31T22:23:27",
          "hit": 229,
          "likes": 24,
          "title": "널코어 루시우 밸패 후기 #7",
          "topic": "일반",
          "updatedAt": "2025-12-31T23:59:00",
          "userId": "lonna.bosco@emard.com"
        },
        {
          "postIdx": 115,
          "content": "요즘 널코어 경쟁전 돌리면 루시우 픽률이 눈에 띄게 올랐습니다. 플래티넘 구간에서 직접 테스트한 결과입니다.",
          "createdAt": "2025-12-31T22:23:27",
          "hit": 229,
          "likes": 24,
          "title": "널코어 루시우 밸패 후기 #7",
          "topic": "일반",
          "updatedAt": "2025-12-31T23:59:00",
          "userId": "lonna.bosco@emard.com"
        },
        {
          "postIdx": 116,
          "content": "요즘 널코어 경쟁전 돌리면 루시우 픽률이 눈에 띄게 올랐습니다. 플래티넘 구간에서 직접 테스트한 결과입니다.",
          "createdAt": "2025-12-31T22:23:27",
          "hit": 229,
          "likes": 24,
          "title": "널코어 루시우 밸패 후기 #7",
          "topic": "일반",
          "updatedAt": "2025-12-31T23:59:00",
          "userId": "lonna.bosco@emard.com"
        },
        {
          "postIdx": 117,
          "content": "요즘 널코어 경쟁전 돌리면 루시우 픽률이 눈에 띄게 올랐습니다. 플래티넘 구간에서 직접 테스트한 결과입니다.",
          "createdAt": "2025-12-31T22:23:27",
          "hit": 229,
          "likes": 24,
          "title": "널코어 루시우 밸패 후기 #7",
          "topic": "일반",
          "updatedAt": "2025-12-31T23:59:00",
          "userId": "lonna.bosco@emard.com"
        },
        {
          "postIdx": 118,
          "content": "요즘 널코어 경쟁전 돌리면 루시우 픽률이 눈에 띄게 올랐습니다. 플래티넘 구간에서 직접 테스트한 결과입니다.",
          "createdAt": "2025-12-31T22:23:27",
          "hit": 229,
          "likes": 24,
          "title": "널코어 루시우 밸패 후기 #7",
          "topic": "일반",
          "updatedAt": "2025-12-31T23:59:00",
          "userId": "lonna.bosco@emard.com"
        },
      ]
    }
  }

  // const forumPost = async () => {
  //   const {data} = await axios.get('http://localhost:8080/api/forum/post');
  // }

  const [currentTab, setCurrentTab] = useState('general');

  const goToPage = (tab) => {
    setCurrentTab(tab);
  };

  return (
    <>
      <Header />
      <Menu />
      <div className="forum-container">
        <span className={"forum-mainTitle"}>유저 포럼 분석</span>
        <div className={"forum-chartWrapper"}>
          <div className={"forum-filterBox-wrapper"}>
            <div className="forum-filter-left">
              <select className={"forum-select-category"}>
                <option>제목</option>
                <option>내용</option>
                <option>글쓴이</option>
              </select>
              <div className={"forum-search"}>
                <div className={"forum-input-wrapper"}>
                  <input type="text" placeholder="포럼 검색" />
                  <button className={"forum-search-btn"}><IoSearch /></button>
                </div>
              </div>
            </div>
            <div className="forum-filter-right">
              <select className={"forum-select"}>
                <option>전체</option>
                <option>작성 날짜</option>
                <option>조회수</option>
                <option>좋아요</option>
              </select>
              <select className={"forum-select"}>
                <option>최신순 (높은순)</option>
                <option>오래된순 (낮은순)</option>
              </select>
            </div>
          </div>

          {/* 포럼 탭 컴포넌트 */}
          <div className="forum-menu">
            <div className={`forum-tab ${currentTab === 'general' ? 'active' : ''}`} onClick={() => goToPage('general')}>일반 토론장</div>
            <div className={`forum-tab ${currentTab === 'competition' ? 'active' : ''}`} onClick={() => goToPage('competition')}>경쟁전 토론장</div>
          </div>

          {currentTab === 'general' && <General dummyData={dummyData} />}
          {currentTab === 'competition' && <Competition dummyData={dummyData} />}

          {/* 페이지네이션 */}
          <div className="forum-pagination">
            <button
            // disabled={currentPage === 1} 
            // onClick={() => goToPage(currentPage - 1)}
            >
              이전
            </button>

            {Array.from({ length: 10 }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={page === 1 ? 'active' : ''}
              // onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            <button
            // disabled={currentPage === totalFilteredPages} 
            // onClick={() => goToPage(currentPage + 1)}
            >
              다음
            </button>
          </div>

        </div>



      </div>
    </>
  );
};

export default Forum;