import styles from './mail.module.css';

export default function Mail() {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>발신 메일 상세보기</h1>

            <div className={styles.container}>
                <button className={styles.backButton}>← 리스트로</button>

                <div className={styles.header}>
                    <h2 className={styles.subject}>📧 [안내] 고객 불만 사례 대응 매뉴얼 업데이트</h2>
                    <p className={styles.meta}>수신 유저 분류: <span>전체 유저</span></p>
                    <p className={styles.meta}>담당자 ID: <span>member123</span></p>
                    <p className={styles.date}>📅 2025.06.30 09:05</p>
                </div>

                <div className={styles.body}>
                    <p>안녕하세요 유저 여러분,</p>
                    <br />
                    <p>고객 불만 사례에 대한 대응 매뉴얼이 업데이트되어 공유드립니다.</p>
                    <br />
                    <p>
                        이번 매뉴얼에서는 최근 발생한 주요 고객 불만 유형과 대응 방안을 상세히 다루고 있으며,
                        모든 담당자는 본 내용을 숙지해 주시기 바랍니다.
                    </p>
                    <br />
                    <p>추가 문의사항은 언제든지 연락해 주세요.</p>
                    <br />
                    <p>감사합니다.</p>
                </div>
            </div>
        </div>
    );
}