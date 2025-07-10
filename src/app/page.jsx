'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

const Login = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showFindModal, setShowFindModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName.trim()) {
      setError('아이디를 입력해주세요.');
      return;
    }
    if (!password.trim()) {
      setError('비밀번호를 입력해주세요.');
      return;
    }
    if (userName === 'admin' && password === 'passpass') {
      router.push('/component/main');
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">로그인</h2>

      <form onSubmit={handleSubmit} className={styles['login-form']}>
        <input
          type="text"
          placeholder="아이디"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            if (error) setError('');
          }}
          className="login-input"
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError('');
          }}
          className="login-input"
          autoComplete="current-password"
        />
        {error && <p className="login-error">{error}</p>}

        <button type="submit" className="login-button">
          로그인
        </button>
      </form>

      <div className="login-footer">
        <Link href="/component/join/" className="login-link">
          회원가입
        </Link>
        <button
          type="button"
          className="login-link"
          onClick={() => setShowFindModal(true)}
        >
          아이디/비밀번호 찾기
        </button>
      </div>

      {showFindModal && (
        <div className={styles['login-modalOverlay']}>
          <div className={styles['login-modalContent']}>
            <button
              className={styles['login-modalCloseBtn']}
              onClick={() => setShowFindModal(false)}
              aria-label="닫기"
            >
              ×
            </button>
            <h3 className={styles['login-modalTitle']}>아이디/비밀번호</h3>
            <input
              className={styles['login-modalInput']}
              placeholder="가입 시 등록한 이메일"
            />
            <button className={styles['login-modalSubmitBtn']}>찾기</button>
            <p className={styles['login-modalResultMsg']}>
              이메일로 전송됩니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
