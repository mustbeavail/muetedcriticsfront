'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const dummyUsers = [{
    id: 1,
    name: '유저123',
    email: 'user123@gmail.com',
    level: 350,
    playTime: 780,
    amountSpent: 200,
    country: '대한민국',
    gender: '남성',
    phone: '010-1234-5678',
    region: '대한민국',
    joinDate: '2014.09.24',
    suspendedDate: '-',
    withdrawalDate: '-',
    userType: 'VIP',
    consent: 'O',
    idValue: 'user123',
    tags: ['이탈위험군'],
    memo: {
        content: '이탈 위험군 유저\n메모 내용이 보여지는 페이지',
        createdAt: '2025.06.31',
        updatedAt: '2025.07.02',
    },
},
{
    id: 2,
    name: '김민지',
    email: 'minji.kim@example.com',
    level: 120,
    playTime: 320,
    amountSpent: 75,
    country: '대한민국',
    gender: '여성',
    phone: '010-9876-5432',
    region: '서울',
    joinDate: '2018.03.15',
    suspendedDate: '-',
    withdrawalDate: '-',
    userType: '일반',
    consent: 'X',
    idValue: 'minjik',
    tags: ['일반', '수신거부'],
    memo: {
        content: '최근 접속 빈도 낮음\n프로모션 메일 수신 거부',
        createdAt: '2024.12.01',
        updatedAt: '2025.01.10',
    },
},
{
    id: 3,
    name: '박준호',
    email: 'junho.park@example.com',
    level: 270,
    playTime: 600,
    amountSpent: 150,
    country: '대한민국',
    gender: '남성',
    phone: '010-2468-1357',
    region: '부산',
    joinDate: '2016.07.22',
    suspendedDate: '2025.05.01',
    withdrawalDate: '-',
    userType: '프리미엄',
    consent: 'O',
    idValue: 'junhop',
    tags: ['휴면', '복귀'],
    memo: {
        content: '휴면 전환 상태\n복귀 유도 필요',
        createdAt: '2025.04.20',
        updatedAt: '2025.06.15',
    },
},
];

export default function HeroPlayDataPage() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (id) {
            const found = dummyUsers.find(u => u.id === parseInt(id));
            setUser(found);
        }
    }, [id]);

    if (!user) return <div style={{ padding: '20px' }}>유저 정보를 불러오는 중...</div>;

    return (
        <div>
            <h1>{user.name}님의 히어로 플레이 데이터</h1>
        </div>
    );
}
