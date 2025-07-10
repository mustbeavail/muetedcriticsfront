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
                    <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; font-family: 'Apple SD Gothic Neo', sans-serif; color: #444; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);">
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
    { mail_idx: 2, mail_sub: "메일 제목 2", mail_date: "2025.06.30 09:05", recipient: "받는 사람 2", member_id: "담당자 2", mail_content: "메일 내용 2", tem_idx: 2, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 3, mail_sub: "메일 제목 3", mail_date: "2025.06.30 09:05", recipient: "받는 사람 3", member_id: "담당자 3", mail_content: "메일 내용 3", tem_idx: 3, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 4, mail_sub: "메일 제목 4", mail_date: "2025.06.30 09:05", recipient: "받는 사람 4", member_id: "담당자 4", mail_content: "메일 내용 4", tem_idx: 4, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 5, mail_sub: "메일 제목 5", mail_date: "2025.06.30 09:05", recipient: "받는 사람 5", member_id: "담당자 5", mail_content: "메일 내용 5", tem_idx: 5, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 6, mail_sub: "메일 제목 6", mail_date: "2025.06.30 09:05", recipient: "받는 사람 6", member_id: "담당자 6", mail_content: "메일 내용 6", tem_idx: 6, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 7, mail_sub: "메일 제목 7", mail_date: "2025.06.30 09:05", recipient: "받는 사람 7", member_id: "담당자 7", mail_content: "메일 내용 7", tem_idx: 7, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 8, mail_sub: "메일 제목 8", mail_date: "2025.06.30 09:05", recipient: "받는 사람 8", member_id: "담당자 8", mail_content: "메일 내용 8", tem_idx: 8, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 9, mail_sub: "메일 제목 9", mail_date: "2025.06.30 09:05", recipient: "받는 사람 9", member_id: "담당자 9", mail_content: "메일 내용 9", tem_idx: 9, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 10, mail_sub: "메일 제목 10", mail_date: "2025.06.30 09:05", recipient: "받는 사람 10", member_id: "담당자 10", mail_content: "메일 내용 10", tem_idx: 10, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 11, mail_sub: "메일 제목 11", mail_date: "2025.06.30 09:05", recipient: "받는 사람 11", member_id: "담당자 11", mail_content: "메일 내용 11", tem_idx: 11, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 12, mail_sub: "메일 제목 12", mail_date: "2025.06.30 09:05", recipient: "받는 사람 12", member_id: "담당자 12", mail_content: "메일 내용 12", tem_idx: 12, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 13, mail_sub: "메일 제목 13", mail_date: "2025.06.30 09:05", recipient: "받는 사람 13", member_id: "담당자 13", mail_content: "메일 내용 13", tem_idx: 13, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 14, mail_sub: "메일 제목 14", mail_date: "2025.06.30 09:05", recipient: "받는 사람 14", member_id: "담당자 14", mail_content: "메일 내용 14", tem_idx: 14, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 15, mail_sub: "메일 제목 15", mail_date: "2025.06.30 09:05", recipient: "받는 사람 15", member_id: "담당자 15", mail_content: "메일 내용 15", tem_idx: 15, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 16, mail_sub: "메일 제목 16", mail_date: "2025.06.30 09:05", recipient: "받는 사람 16", member_id: "담당자 16", mail_content: "메일 내용 16", tem_idx: 16, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 17, mail_sub: "메일 제목 17", mail_date: "2025.06.30 09:05", recipient: "받는 사람 17", member_id: "담당자 17", mail_content: "메일 내용 17", tem_idx: 17, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 18, mail_sub: "메일 제목 18", mail_date: "2025.06.30 09:05", recipient: "받는 사람 18", member_id: "담당자 18", mail_content: "메일 내용 18", tem_idx: 18, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 19, mail_sub: "메일 제목 19", mail_date: "2025.06.30 09:05", recipient: "받는 사람 19", member_id: "담당자 19", mail_content: "메일 내용 19", tem_idx: 19, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
    { mail_idx: 20, mail_sub: "메일 제목 20", mail_date: "2025.06.30 09:05", recipient: "받는 사람 20", member_id: "담당자 20", mail_content: "메일 내용 20", tem_idx: 20, is_to_all: false, tem_name: null, use_variable: { tem_title: "템플릿 제목", tem_body: "템플릿 내용" }, created_at: "2025.06.30 09:05" },
];