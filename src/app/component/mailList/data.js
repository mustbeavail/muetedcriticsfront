export const listItem = [
    {
        mail_idx: 1,
        mail_sub: "회원가입을 환영합니다",
        mail_date: "2025.06.30 09:05",
        recipient: "홍길동",
        member_id: "admin01",
        tem_idx: 1,
        tem_name: "회원가입 환영 템플릿",
        mail_content: [
            {
                tem_body: `
                    <div style="width: 100%; margin: 0 auto; background-color: #ffffff; font-family: 'Apple SD Gothic Neo', sans-serif; color: #444; border-radius: 12px; overflow: hidden;">
                        <!-- 헤더 -->
                        <div style="background: linear-gradient(90deg, #6a0dad, #9b59b6); padding: 30px; text-align: center; color: #fff;">
                            <h1 style="margin: 0; font-size: 26px;">✨ 널 코어 7월 업데이트 미리보기 ✨</h1>
                            <p style="margin-top: 8px; font-size: 15px; opacity: 0.95;">새로운 경험이 여러분을 기다립니다!</p>
                        </div>

                        <!-- 본문 -->
                        <div style="padding: 40px 30px; background-color: #fdfdfd;">
                            <p style="font-size: 17px; line-height: 1.8; margin-bottom: 20px;">
                            안녕하세요, <strong style="color: #6a0dad;">Null Core 회원님!</strong>
                            </p>

                            <p style="font-size: 16px; line-height: 1.7; margin-bottom: 30px;">
                            드디어 기다리던 <strong>7월 콘텐츠 업데이트</strong>가 곧 진행됩니다.<br />
                            새롭게 추가될 영웅 스킨과 기능을 미리 확인하고, <strong>특별한 이벤트</strong>에 참여해 보세요!
                            </p>

                            <!-- 주요 업데이트 카드 -->
                            <div style="background-color: #fff; border: 1px solid #eaeaea; border-radius: 10px; padding: 24px; margin-bottom: 40px;">
                            <p style="font-size: 18px; font-weight: bold; margin-bottom: 16px; color: #6a0dad;">🚀 주요 업데이트 내용</p>
                            <ul style="list-style: none; padding-left: 0; margin: 0; font-size: 15px; line-height: 2;">
                                <li>✅ 여름 한정 특별 영웅 스킨 출시</li>
                                <li>✅ 경쟁전 티어 시스템 UI 전면 개편</li>
                                <li>✅ 무기 강화 시스템 추가 및 밸런스 조정</li>
                                <li>✅ 신규 맵 <strong>'환상의 숲'</strong> 추가</li>
                            </ul>
                            </div>

                            <!-- 버튼 -->
                            <div style="text-align: center;">
                            <a href="https://www.nullcore.com/update" 
                                style="display: inline-block; padding: 14px 30px; background-color: #6a0dad; color: white; text-decoration: none; border-radius: 40px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); transition: background-color 0.3s;">
                                자세히 알아보기 →
                            </a>
                            </div>
                        </div>

                        <!-- 푸터 -->
                        <div style="background-color: #f1f1f1; padding: 30px; font-size: 13px; color: #666; text-align: center; line-height: 1.7;">
                            <p style="margin: 0;">
                            본 메일은 발신 전용입니다. 궁금한 점은 고객센터로 문의해주세요.<br />
                            이메일: <a href="mailto:marketing@nullcore.com" style="color: #6a0dad; text-decoration: none;">marketing@nullcore.com</a> |
                            전화: 02-1234-5678
                            </p>
                            <p style="margin-top: 15px; margin-bottom: 0;">
                            (주) NULL CORE | 대표: 널코어<br />
                            서울특별시 강남구 게임로 12길 3<br />
                            <span style="font-size: 12px; color: #999;">© 2025 NULL CORE. All rights reserved.</span>
                            </p>
                        </div>
                    </div>
                `,
            }
        ],
        is_to_all: true,
        created_at: "2025.06.30 09:05"
    },
    {
        mail_idx: 2,
        mail_sub: "시스템 점검 안내",
        mail_date: "2025.06.30 09:05",
        recipient: "홍길동",
        member_id: "admin01",
        tem_idx: 2,
        tem_name: "시스템 점검 안내 템플릿",
        mail_content: [
            {
                tem_body: `
                    <div style="width: 100%; margin: 0 auto; font-family: 'Apple SD Gothic Neo', sans-serif; background: #f5f9ff; border-radius: 14px; overflow: hidden;">
                        <!-- 헤더 -->
                        <div style="background: linear-gradient(135deg, #3a8dde, #174ea6); padding: 32px 24px; color: white; text-align: center;">
                            <h1 style="margin: 0; font-size: 26px;">📢 Null Core 시스템 점검 안내</h1>
                            <p style="margin-top: 8px; font-size: 15px; opacity: 0.9;">더 나은 서비스를 위해 시스템 점검이 예정되어 있습니다.</p>
                        </div>

                        <!-- 본문 -->
                        <div style="padding: 32px; background-color: #ffffff; color: #333; font-size: 16px; line-height: 1.7;">
                            <p>안녕하세요, Null Core 사용자 여러분.</p>
                            <p>안정적인 서비스 제공을 위한 <strong style="color:#3a8dde;">시스템 정기 점검</strong>이 아래 일정으로 진행될 예정입니다.</p>

                            <div style="margin-top: 24px; border: 1px solid #dce7f7; border-radius: 8px; padding: 20px; background-color: #f1f7ff;">
                            <p style="margin: 0;"><strong>📅 점검 일시:</strong> 2025년 8월 1일(목) 오전 2시 ~ 6시</p>
                            <p style="margin: 8px 0 0;"><strong>⚠️ 영향:</strong> 점검 시간 동안 일부 기능 일시 중단</p>
                            </div>

                            <p style="margin-top: 24px;">여러분의 양해 부탁드리며, 더 나은 서비스로 보답하겠습니다.</p>
                        </div>

                        <!-- 푸터 -->
                        <div style="background-color: #e9f1fa; padding: 20px; text-align: center; font-size: 13px; color: #666;">
                            문의: <a href="mailto:support@nullcore.com" style="color:#3a8dde; text-decoration: none;">support@nullcore.com</a> | 02-1234-5678
                            <p style="margin-top: 6px;">© 2025 NULL CORE</p>
                        </div>
                    </div>
                `,
            }
        ],
        is_to_all: true,
        created_at: "2025.06.30 09:05"
    },
    {
        mail_idx: 3,
        mail_sub: "신규 기능 베타 테스터 모집",
        mail_date: "2025.06.30 09:05",
        recipient: "홍길동",
        member_id: "admin01",
        tem_idx: 3,
        tem_name: "신규 기능 베타 테스터 모집 템플릿",
        mail_content: [
            {
                tem_body: `
                    <div style="width: 100%; margin: 0 auto; font-family: 'Apple SD Gothic Neo', sans-serif; background: #111; border-radius: 12px; overflow: hidden; color: #e0e0e0;">
                        <!-- 헤더 -->
                        <div style="background: #00ff9f; color: #111; padding: 28px 20px; text-align: center;">
                            <h1 style="margin: 0; font-size: 26px;">⚡ 신규 기능 베타 테스터 모집!</h1>
                            <p style="margin: 8px 0 0; font-size: 15px;">Null Core의 미래를 미리 경험해보세요.</p>
                        </div>

                        <!-- 본문 -->
                        <div style="padding: 30px; font-size: 15px; line-height: 1.8; background-color: #1c1c1c;">
                            <p>안녕하세요, Null Core 회원님.</p>
                            <p>
                            <strong style="color:#00ff9f;">AI 기반 추천 기능</strong>, <strong style="color:#00ff9f;">실시간 배틀 통계</strong> 등<br/>
                            최신 기술이 적용된 실험적 기능을 가장 먼저 체험해볼 수 있는 기회를 드립니다.
                            </p>

                            <div style="margin: 24px 0; padding: 20px; background: #181818; border: 1px solid #2a2a2a; border-radius: 10px;">
                            <p style="margin: 0; color: #00ff9f;">✅ 모집 기간: 2025년 7월 15일 ~ 7월 31일</p>
                            <p style="margin: 10px 0 0;">🎁 선정 시 특별 보상 지급!</p>
                            </div>

                            <div style="text-align: center; margin-top: 30px;">
                            <a href="https://nullcore.com/beta" style="display: inline-block; padding: 14px 24px; background-color: #00ff9f; color: #111; text-decoration: none; border-radius: 30px; font-weight: bold;">참여 신청하기</a>
                            </div>
                        </div>

                        <!-- 푸터 -->
                        <div style="background-color: #0e0e0e; padding: 24px; text-align: center; font-size: 12px; color: #555;">
                            문의: <a href="mailto:beta@nullcore.com" style="color:#00ff9f; text-decoration: none;">beta@nullcore.com</a> | 02-9999-0000
                            <p style="margin-top: 6px;">© 2025 NULL CORE</p>
                        </div>
                    </div>
                `,
            }
        ],
        is_to_all: false,
        created_at: "2025.06.30 09:05"
    },
    { 
        mail_idx: 4,
        mail_sub: "이달의 특별 콘텐츠 & 업데이트",
        mail_date: "2025.06.30 09:05",
        recipient: "홍길동",
        member_id: "admin01",
        tem_idx: 4,
        tem_name: "이달의 특별 콘텐츠 & 업데이트 템플릿",
        mail_content: [
            {
                tem_body: `
                    <div style="width: 100%; margin: 0 auto; background-color: #ffffff; font-family: 'Noto Sans KR', sans-serif; border: 1px solid #ddd; border-radius: 12px; overflow: hidden;">
                        <!-- 헤더 -->
                        <div style="background: #ffe27a; padding: 32px 24px; text-align: left;">
                            <h2 style="margin: 0; font-size: 26px; font-weight: 800; color: #2f2f2f;">🗞️ JULY INSIDER - Null Core</h2>
                            <p style="margin-top: 10px; font-size: 15px; color: #5f5f5f;">이달의 특별 콘텐츠 & 업데이트를 만나보세요</p>
                        </div>

                        <!-- 콘텐츠 섹션 -->
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0; background-color: #fff;">
                            <div style="padding: 28px;">
                            <h3 style="color: #1f1f1f; margin-top: 0;">🔥 이번 달 주요 소식</h3>
                            <ul style="padding-left: 18px; color: #444; font-size: 15px; line-height: 1.7;">
                                <li>신규 영웅 <strong>카일라</strong> 전격 공개</li>
                                <li>매칭 로직 개선으로 더 빠른 게임 시작</li>
                                <li>여름 이벤트 미션 & 한정 스킨</li>
                            </ul>
                            <a href="https://nullcore.com/july" style="display:inline-block; margin-top: 20px; background: #2f2f2f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px;">자세히 보기</a>
                            </div>
                            <div>
                            <img src="https://via.placeholder.com/340x220?text=Null+Core+Update" alt="이미지" style="width:100%; height:auto; border-left: 1px solid #eee;">
                            </div>
                        </div>

                        <!-- 푸터 -->
                        <div style="padding: 24px; background-color: #f8f8f8; font-size: 13px; text-align: center; color: #777;">
                            문의: <a href="mailto:news@nullcore.com" style="color:#333;">news@nullcore.com</a> | 02-1234-5678<br>
                            © 2025 NULL CORE. All rights reserved.
                        </div>
                    </div>
                `,
            }
        ],
        is_to_all: false,
        created_at: "2025.06.30 09:05"
    },
    { 
        mail_idx: 5,
        mail_sub: "신규 코드 배포 완료",
        mail_date: "2025.06.30 09:05",
        recipient: "홍길동",
        member_id: "admin01",
        tem_idx: 5,
        tem_name: "신규 코드 배포 완료 템플릿",
        mail_content: [
            {
                tem_body: `
                    <div style="width: 100%; margin: 0 auto; background-color: #0f0f0f; font-family: 'Courier New', monospace; color: #00ff66; padding: 32px; border: 3px dashed #00ff66; border-radius: 12px; box-sizing: border-box;">
                        <h1 style="font-size: 24px; text-align: center;">[ SYSTEM ALERT ]</h1>
                        <p style="text-align: center;">>> 신규 코드 배포 완료. 버전: <strong style="color:#00ffff;">v2.7.0-BETA</strong></p>

                        <div style="margin-top: 24px; background: #101010; padding: 20px; border: 1px solid #00ff66; border-radius: 8px;">
                            <p>+ PATCH NOTES:</p>
                            <ul style="list-style-type: square; padding-left: 20px;">
                            <li>New AI engine deployed</li>
                            <li>Latency dropped by 42%</li>
                            <li>Dark Mode performance improved</li>
                            </ul>
                        </div>

                        <p style="margin-top: 24px; text-align: center;">:: 접속해서 직접 확인해보세요 ::</p>
                        <div style="text-align: center; margin-top: 16px;">
                            <a href="https://nullcore.com/patch" style="background-color: #00ff66; color: #0f0f0f; padding: 10px 24px; text-decoration: none; font-weight: bold; border-radius: 4px;">[ DOWNLOAD PATCH ]</a>
                        </div>

                        <hr style="margin-top: 40px; border: none; border-top: 1px dashed #00ff66;" />
                        <p style="font-size: 12px; text-align: center;">contact: patch@nullcore.com | hotline: 02-5678-4321</p>
                    </div>
                `,
            }
        ],
        is_to_all: false,
        created_at: "2025.06.30 09:05"
    },
    { 
        mail_idx: 6,
        mail_sub: "7월 업데이트 안내",
        mail_date: "2025.06.30 09:05",
        recipient: "홍길동",
        member_id: "admin01",
        tem_idx: 6,
        tem_name: "7월 업데이트 안내 템플릿",
        mail_content: [
            {
                tem_body: `
                    <div style="width: 100%; margin: 0 auto; font-family: 'Pretendard', sans-serif; background-color: #0f1624; color: #e0f7ff; border-radius: 12px; overflow: hidden; box-sizing: border-box;">
                        <div style="background: linear-gradient(90deg, #00d4ff, #0077ff); padding: 30px; text-align: center;">
                            <h1 style="margin: 0; font-size: 26px; color: #ffffff;">🔹 Null Core 시스템 리포트 🔹</h1>
                            <p style="margin: 10px 0 0; font-size: 15px; color: #e0f7ff;">미래의 전장이 준비되고 있습니다.</p>
                        </div>
                        <div style="padding: 30px;">
                            <p style="font-size: 16px;">안녕하세요, <strong style="color: #00d4ff;">Null Core 요원님!</strong></p>
                            <p style="font-size: 15px; line-height: 1.8;">
                            새로운 기술과 시스템이 <strong>7월 업데이트</strong>에 적용됩니다. 고도화된 전투 환경을 지금 미리 만나보세요!
                            </p>

                            <div style="margin: 25px 0; padding: 20px; background-color: #141c2c; border-radius: 10px;">
                            <p style="font-size: 16px; font-weight: bold; color: #00f7ff;">📌 업데이트 주요 사항</p>
                            <ul style="padding-left: 18px; line-height: 1.9; font-size: 14px; color: #ccf4ff;">
                                <li>AI 보조 전술 시스템 도입</li>
                                <li>실시간 전장 로그 분석 기능</li>
                                <li>클랜 커뮤니케이션 업그레이드</li>
                            </ul>
                            </div>

                            <div style="text-align: center; margin-top: 30px;">
                            <a href="https://nullcore.com/ai-update" style="display: inline-block; padding: 12px 30px; background: #00d4ff; color: #0f1624; text-decoration: none; border-radius: 30px; font-weight: bold;">업데이트 자세히 보기</a>
                            </div>
                        </div>
                        <div style="background-color: #0b111e; padding: 20px; text-align: center; font-size: 12px; color: #87a7b4;">
                            ⓒ 2025 NULL CORE. All rights reserved.<br />
                            고객센터: <a href="mailto:support@nullcore.com" style="color: #00d4ff;">support@nullcore.com</a>
                        </div>
                    </div>
                `,
            }
        ],
        is_to_all: false,
        created_at: "2025.06.30 09:05"
    },
    { 
        mail_idx: 7,
        mail_sub: "7월 알림편",
        mail_date: "2025.06.30 09:05",
        recipient: "홍길동",
        member_id: "admin01",
        tem_idx: 7,
        tem_name: "7월 알림편 템플릿",
        mail_content: [
            {
                tem_body: `
                    <div style="width: 100%; margin: 0 auto; font-family: 'Noto Sans KR', sans-serif; background-color: #fff8f2; color: #333; border: 1px solid #ffe4cc; border-radius: 12px; overflow: hidden; box-sizing: border-box;">
                        <div style="background-color: #ff9f68; padding: 25px; text-align: center; color: #fff;">
                            <h2 style="margin: 0; font-size: 24px;">🍑 Null Core 7월 알림편</h2>
                            <p style="margin-top: 8px;">기다리셨죠? 다정하게 알려드립니다.</p>
                        </div>
                        <div style="padding: 30px;">
                            <p style="font-size: 16px;">안녕하세요, <strong>Null Core 회원님</strong></p>
                            <p style="font-size: 15px; line-height: 1.8;">
                            이번 달도 활기찬 소식으로 찾아왔어요!<br />
                            7월 업데이트 내용을 살짝 미리 소개해드릴게요.
                            </p>

                            <div style="margin: 30px 0; padding: 18px; background-color: #fff3e8; border-radius: 10px;">
                            <p style="font-weight: bold; font-size: 16px; color: #ff8f3f;">💡 이런 게 새로워졌어요</p>
                            <ul style="padding-left: 20px; line-height: 1.7; font-size: 14px;">
                                <li>유저 피드백 반영 UI 개선</li>
                                <li>초보자 튜토리얼 보강</li>
                                <li>커뮤니티 활성화 이벤트 예정</li>
                            </ul>
                            </div>

                            <p style="font-size: 14px;">늘 Null Core와 함께 해주셔서 감사드립니다 😊</p>
                        </div>
                        <div style="background-color: #ffe6d5; padding: 18px; text-align: center; font-size: 12px; color: #774422;">
                            ⓒ 2025 Null Core<br />
                            문의: <a href="mailto:help@nullcore.com" style="color: #cc4400;">help@nullcore.com</a> | 대표: 널코어
                        </div>
                    </div>
                `,
            }
        ],
        is_to_all: false,
        created_at: "2025.06.30 09:05"
    },
    { mail_idx: 8, mail_sub: "-", mail_date: "2025.06.30 09:05", recipient: "받는 사람 8", member_id: "담당자 8", mail_content: "메일 내용 8", tem_idx: 8, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 9, mail_sub: "-", mail_date: "2025.06.30 09:05", recipient: "받는 사람 9", member_id: "담당자 9", mail_content: "메일 내용 9", tem_idx: 9, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 10, mail_sub: "-", mail_date: "2025.06.30 09:05", recipient: "받는 사람 10", member_id: "담당자 10", mail_content: "메일 내용 10", tem_idx: 10, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 11, mail_sub: "-", mail_date: "2025.06.30 09:05", recipient: "받는 사람 11", member_id: "담당자 11", mail_content: "메일 내용 11", tem_idx: 11, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 12, mail_sub: "-", mail_date: "2025.06.30 09:05", recipient: "받는 사람 12", member_id: "담당자 12", mail_content: "메일 내용 12", tem_idx: 12, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 13, mail_sub: "-", mail_date: "2025.06.30 09:05", recipient: "받는 사람 13", member_id: "담당자 13", mail_content: "메일 내용 13", tem_idx: 13, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 14, mail_sub: "-", mail_date: "2025.06.30 09:05", recipient: "받는 사람 14", member_id: "담당자 14", mail_content: "메일 내용 14", tem_idx: 14, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 15, mail_sub: "-", mail_date: "2025.06.30 09:05", recipient: "받는 사람 15", member_id: "담당자 15", mail_content: "메일 내용 15", tem_idx: 15, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 16, mail_sub: "-", mail_date: "2025.06.30 09:05", recipient: "받는 사람 16", member_id: "담당자 16", mail_content: "메일 내용 16", tem_idx: 16, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 17, mail_sub: "-", mail_date: "2025.06.30 09:05", recipient: "받는 사람 17", member_id: "담당자 17", mail_content: "메일 내용 17", tem_idx: 17, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 18, mail_sub: "-", mail_date: "2025.06.30 09:05", recipient: "받는 사람 18", member_id: "담당자 18", mail_content: "메일 내용 18", tem_idx: 18, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 19, mail_sub: "-", mail_date: "2025.06.30 09:05", recipient: "받는 사람 19", member_id: "담당자 19", mail_content: "메일 내용 19", tem_idx: 19, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 20, mail_sub: "-", mail_date: "2025.06.30 09:05", recipient: "받는 사람 20", member_id: "담당자 20", mail_content: "메일 내용 20", tem_idx: 20, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
];