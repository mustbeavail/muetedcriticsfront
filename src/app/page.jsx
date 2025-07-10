'use client';
import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import styles from './page.module.css';

const VerificationCodeInput = ({ length = 6, value, onChange }) => {
  const inputRef = useRef();

  const handleChange = (e) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, length);
    onChange(val);
  };

  const handleBoxClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={styles['login-code-input-wrapper']} onClick={handleBoxClick}>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        value={value}
        onChange={handleChange}
        maxLength={length}
        className={styles['login-code-input-hidden']}
      />
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className={`${styles['login-code-input-circle']} ${
            value.length > i ? styles['filled'] : ''
          }`}
        >
          {value[i] || ''}
        </div>
      ))}
    </div>
  );
};

const PasswordChangeModal = ({ onClose }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changeError, setChangeError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChangePassword = () => {
    if (!newPassword || !confirmPassword) {
      setChangeError('');
      setChangeError('비밀번호를 모두 입력해주세요.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setChangeError('비밀번호가 일치하지 않습니다.');
      return;
    }
    setChangeError('');
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className={styles['login-modalOverlay']}>
      <div className={styles['login-modalContent']}>
        <button
          className={styles['login-modalCloseBtn']}
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
        <h3 className={styles['login-modalTitle']}>비밀번호 변경</h3>
        <input
          type="password"
          placeholder="새 비밀번호"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            if (changeError) setChangeError('');
          }}
          className={styles['login-modalInput']}
          disabled={isSuccess}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (changeError) setChangeError('');
          }}
          className={styles['login-modalInput']}
          disabled={isSuccess}
        />
        {changeError && (
          <p className={styles['login-error-msg']}>{changeError}</p>
        )}
        <button
          className={`${styles['login-modalSubmitBtn']} ${isSuccess ? styles['login-success-button'] : ''}`}
          onClick={handleChangePassword}
          disabled={isSuccess}
        >
          {isSuccess ? <FaCheck size={18} color="#fff" /> : '변경하기'}
        </button>
      </div>
    </div>
  );
};

const Login = () => {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showFindModal, setShowFindModal] = useState(false);
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState(false);

  const closeModal = () => {
    setShowFindModal(false);
    setModalStep(0);
    setEmail('');
    setVerificationCode('');
    setVerificationError(false);
  };

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

  const handleSendCode = () => {
    if (!email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    setModalStep(1);
    setVerificationError(false);
  };

  const handleVerifyCode = () => {
    if (verificationCode.length !== 6) {
      return;
    }
    if (verificationCode !== '123456') {
      setVerificationError(true);
      return;
    }
    setVerificationError(false);
    setShowPasswordChangeModal(true);
  };

  return (
    <div className={styles['login-container']}>
      <h2 className={styles['login-title']}>로그인</h2>
      <form onSubmit={handleSubmit} className={styles['login-form']}>
        <input
          type="text"
          placeholder="아이디"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            if (error) setError('');
          }}
          className={styles['login-input']}
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
          className={styles['login-input']}
          autoComplete="current-password"
        />
        {error && <p className={styles['login-error']}>{error}</p>}
        <button type="submit" className={styles['login-button']}>
          로그인
        </button>
      </form>

      <div className={styles['login-footer']}>
        <Link href="/component/join/" className={styles['login-link']}>
          회원가입
        </Link>
        <button
          type="button"
          className={styles['login-link']}
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
              onClick={closeModal}
              aria-label="닫기"
            >
              ×
            </button>

            <div
              className={`${styles['login-modal-step-container']} ${
                modalStep === 1 ? styles['login-slide-out-left'] : styles['login-slide-in-right']
              }`}
              style={{ display: modalStep === 0 ? 'block' : 'none' }}
            >
              <h3 className={styles['login-modalTitle']}>아이디/비밀번호 찾기</h3>
              <input
                className={styles['login-modalInput']}
                placeholder="가입 시 등록한 이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className={styles['login-modalSubmitBtn']}
                onClick={handleSendCode}
              >
                찾기
              </button>
              <p className={styles['login-modalResultMsg']}>
                이메일로 인증코드가 전송됩니다.
              </p>
            </div>

            <div
              className={`${styles['login-modal-step-container']} ${
                modalStep === 1 ? styles['login-slide-in-left'] : styles['login-slide-out-right']
              }`}
              style={{ display: modalStep === 1 ? 'block' : 'none' }}
            >
              <h3 className={styles['login-modalTitle']}>인증코드 입력</h3>
              <VerificationCodeInput
                length={6}
                value={verificationCode}
                onChange={setVerificationCode}
              />
              <button
                className={styles['login-modalSubmitBtn']}
                onClick={handleVerifyCode}
                disabled={verificationCode.length !== 6}
              >
                인증 확인
              </button>
              {verificationError && (
                <div className={styles['login-error-msg']}>
                  인증번호를 다시 입력해주세요.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showPasswordChangeModal && (
        <PasswordChangeModal
          onClose={() => {
            setShowPasswordChangeModal(false);
            closeModal();
          }}
        />
      )}
    </div>
  );
};

export default Login;
