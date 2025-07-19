"use client"
import axios from 'axios';
import dayjs from 'dayjs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useEffect, useMemo, useState } from 'react';

const URL = process.env.NEXT_PUBLIC_API_URL;

export default function ModePlaytime_IngameStats() {

    // 모드별 플레이타임 데이터를 저장하는 state
    const [modePlaytimeData, setModePlaytimeData] = useState([]);

    // 오늘 날짜를 'YYYY-MM-DD' 형식으로 저장
    const today = dayjs().format('YYYY-MM-DD');

    // 컴포넌트가 마운트될 때 한 번만 실행
    useEffect(() => {
        // 세션 스토리지에서 토큰을 가져옴
        const token = sessionStorage.getItem('token');
        // 토큰이 없으면 함수 종료
        if (!token) return;
        // 토큰이 있으면 모드별 플레이타임 데이터를 가져오는 함수 호출
        getModePlaytimeData(token);
    }, []);

    // API로부터 모드별 플레이타임 데이터를 가져오는 비동기 함수
    const getModePlaytimeData = async (token) => {
        try {
            // API에 GET 요청을 보내 데이터를 가져옴
            const { data } = await axios.get(`${URL}/get/mode-playtime`, {
                headers: { Authorization: token } // 요청 헤더에 인증 토큰 추가
            });
            console.log(data); // 받아온 데이터를 콘솔에 출력
            // 받아온 데이터 리스트를 state에 저장
            setModePlaytimeData(data.list);
        } catch (error) {
            // 에러 발생 시 콘솔에 에러 메시지 출력
            console.error('모드별 플레이타임 불러오기 실패:', error);
        }
    };

    // useMemo를 사용하여 modePlaytimeData가 변경될 때만 총 플레이타임을 다시 계산
    const total = useMemo(() => {
        // reduce를 사용하여 모든 모드의 플레이타임을 합산
        return modePlaytimeData.reduce((sum, item) => sum + item.totalPlayTime, 0);
    }, [modePlaytimeData]);

    // useMemo를 사용하여 modePlaytimeData나 total이 변경될 때만 차트 데이터를 다시 생성
    const chartDataWithTotal = useMemo(() => {
        return [
            ...modePlaytimeData, // 기존 모드별 데이터
            { matchMode: '총합', totalPlayTime: total } // 총합 데이터 추가
        ];
    }, [modePlaytimeData, total]);



    return (
        <div className={"ingameStats-chartWrapper-modePlaytime"}>
            <h2 className={"userStats-title"}>전체 유저의 모드별 플레이타임 <span className="ingameStats-date">{today} 기준</span></h2>
            <div className="tierStats-chartWrapper-datalist">
                {/* 표 영역: 모드별 플레이타임을 표 형태로 표시 */}
                <div className="tierStats-chartWrapper-tableBox">
                    <div className="row header">
                        <div className="cell">게임 모드</div>
                        <div className="cell">총 플레이 시간</div>
                    </div>
                    {/* chartDataWithTotal 배열을 순회하며 각 모드의 데이터를 행으로 표시 */}
                    {chartDataWithTotal.map((mode, idx) => (
                        <div className="row" key={idx}>
                            <div className="cell">{mode.matchMode}</div>
                            {/* 플레이타임을 분 단위에서 시간 단위로 변환하여 소수점 첫째 자리까지 표시 */}
                            <div className="cell">{(mode.totalPlayTime / 60).toFixed(1)} 시간</div>
                        </div>
                    ))}

                </div>
                {/* 차트 영역: 모드별 플레이타임을 막대 차트로 시각화 */}
                <ResponsiveContainer width="100%" height={600}>
                    <BarChart
                        data={chartDataWithTotal} // 차트에 사용될 데이터
                        margin={{ top: 20, right: 30, left: 40, bottom: 20 }} // 차트 여백 설정
                    >
                        <CartesianGrid strokeDasharray="3 3" /> {/* 차트 배경 그리드 */}
                        <XAxis dataKey="matchMode" /> {/* X축: 게임 모드 */}
                        <YAxis unit="시간" tickFormatter={(value) => (value / 60).toFixed(0)} /> {/* Y축: 단위 '시간', 60으로 나누어 시간 단위로 표시 */}
                        <Tooltip
                            formatter={(value) => `${(value / 60).toFixed(1)} 시간`} // 툴팁 내용 포맷 지정 (시간 단위로 변환)
                            contentStyle={{ fontSize: 15, background: '#1c1b23', color: '#fff' }} // 툴팁 스타일
                            cursor={{ fill: '#1c1b23' }} // 툴팁 커서 스타일
                        />
                        <Bar dataKey="totalPlayTime" fill="#9C27B0" name="총 플레이 시간" /> {/* 막대: 총 플레이 시간 */}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}