'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaCheck } from 'react-icons/fa';
import styles from './page.module.css';
import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL;

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
          className={`${styles['login-code-input-circle']} ${value.length > i ? styles['filled'] : ''
            }`}
        >
          {value[i] || ''}
        </div>
      ))}
    </div>
  );
};

const PasswordChangeModal = ({ onClose }) => {
  const [changePwInfo, setChangePwInfo] = useState({
    member_id: sessionStorage.getItem('member_id'),
    member_pw: '',
    confirm_pw: ''
  });

  const [changeError, setChangeError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChangePassword = async () => {
    if (!changePwInfo.member_pw || !changePwInfo.confirm_pw) {
      setChangeError('');
      setChangeError('비밀번호를 모두 입력해주세요.');
      return;
    }
    if (changePwInfo.member_pw !== changePwInfo.confirm_pw) {
      setChangeError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (changePwInfo.member_pw.length < 8 || changePwInfo.member_pw.length > 20) {
      setChangeError('비밀번호는 8자 이상 20자 이하로 입력해주세요.');
      return;
    }

    const { data } = await axios.post(`${URL}/member/change_password`, {
      memberId: changePwInfo.member_id,
      member_pw: changePwInfo.member_pw
    });
    console.log(data);

    if (data.success === true) {
      setChangeError('');
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setChangeError('비밀번호 변경에 실패했습니다.');
    }

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
          placeholder="새 비밀번호 (8~20자)"
          name="member_pw"
          value={changePwInfo.member_pw}
          onChange={(e) => {
            setChangePwInfo({ ...changePwInfo, member_pw: e.target.value });
            if (changeError) setChangeError('');
          }}
          className={styles['login-modalInput']}
          disabled={isSuccess}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          name="confirm_pw"
          value={changePwInfo.confirm_pw}
          onChange={(e) => {
            setChangePwInfo({ ...changePwInfo, confirm_pw: e.target.value });
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
  const [info, setInfo] = useState({
    member_id: '',
    member_pw: ''
  });

  const [error, setError] = useState('');
  const [showFindModal, setShowFindModal] = useState(false);
  const [showPasswordChangeModal, setShowPasswordChangeModal] = useState(false);
  const [modalStep, setModalStep] = useState(0);

  const [findPwInfo, setFindPwInfo] = useState({
    memberId: '',
    email: '',
    authCode: ''
  });

  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState(false);

  const closeModal = () => {
    setShowFindModal(false);
    setModalStep(0);
    setFindPwInfo({
      memberId: '',
      email: ''
    });
    setVerificationCode('');
    setVerificationError(false);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const member_id = sessionStorage.getItem('member_id');
    const dept_name = sessionStorage.getItem('dept_name');
    const admin_yn = sessionStorage.getItem('admin_yn');
    if (member_id != null) {
      sessionStorage.removeItem('member_id');
    }
    if (token != null) {
      sessionStorage.removeItem('token');
    }
    if (dept_name != null) {
      sessionStorage.removeItem('dept_name');
    }
    if (admin_yn != null) {
      sessionStorage.removeItem('admin_yn');
    }
  }, []);

  // 로그인 요청
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!info.member_id.trim()) {
      setError('아이디를 입력해주세요.');
      return;
    }
    if (!info.member_pw.trim()) {
      setError('비밀번호를 입력해주세요.');
      return;
    }

    const { data } = await axios.post(`${URL}/member/login`, info);
    console.log(data);
    if (data.success === true) {
      router.push('/component/main');
      sessionStorage.setItem('member_id', info.member_id);
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('admin_yn', data.adminYn);
      sessionStorage.setItem('dept_name', data.deptName);
    } else {
      if (data.message === '탈퇴한 계정입니다.') {
        setError('탈퇴한 계정입니다.');
      } else if (data.message === '승인되지 않은 계정입니다. 관리자 승인 후 이용 가능합니다.') {
        setError('승인되지 않은 계정입니다. 관리자 승인 후 이용 가능합니다.');
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    }
  };

  // 인증 코드 전송
  const handleSendCode = async () => {
    if (!findPwInfo.email.trim()) {
      alert('이메일을 입력해주세요.');
      return;
    }
    if (!findPwInfo.memberId.trim()) {
      alert('아이디를 입력해주세요.');
      return;
    }
    setModalStep(1);
    setVerificationError(false);

    const { data } = await axios.post(`${URL}/member/send_code`, findPwInfo);
    console.log(data);
    sessionStorage.setItem('member_id', findPwInfo.memberId);
  };

  // 인증 코드 검증
  const handleVerifyCode = async () => {
    const { data } = await axios.post(`${URL}/member/verify_code`, {
      memberId: findPwInfo.memberId,
      email: findPwInfo.email,
      authCode: verificationCode
    });
    console.log(data);
    if (data.success === true) {
      setVerificationError(false);
      setShowPasswordChangeModal(true);
    } else {
      setVerificationError(true);
    }
  };

  return (
    <div className={styles['login-container']}>
      <h2 className={styles['login-title']}>로그인</h2>
      <form onSubmit={handleSubmit} className={styles['login-form']}>
        <input
          type="text"
          placeholder="아이디"
          name="member_id"
          value={info.member_id}
          onChange={(e) => {
            setInfo({ ...info, member_id: e.target.value });
            if (error) setError('');
          }}
          className={styles['login-input']}
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="비밀번호"
          name="member_pw"
          value={info.member_pw}
          onChange={(e) => {
            setInfo({ ...info, member_pw: e.target.value });
            if (error) setError('');
          }}
          className={styles['login-input']}
          autoComplete="current-password"
        />
        {error && <p className={styles['login-error']}>{error}</p>}
        <button type="submit" className={styles['login-button']} onClick={handleSubmit}>
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
          비밀번호 변경
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
              className={`${styles['login-modal-step-container']} ${modalStep === 1 ? styles['login-slide-out-left'] : styles['login-slide-in-right']
                }`}
              style={{ display: modalStep === 0 ? 'block' : 'none' }}
            >
              <h3 className={styles['login-modalTitle']}>비밀번호 변경</h3>
              <input
                type="text"
                className={styles['login-modalInput']}
                placeholder="가입 시 등록한 아이디"
                name="member_id"
                value={findPwInfo.memberId}
                onChange={(e) => setFindPwInfo({ ...findPwInfo, memberId: e.target.value })}
              />
              <input
                className={styles['login-modalInput']}
                placeholder="가입 시 등록한 이메일"
                name="email"
                value={findPwInfo.email}
                onChange={(e) => setFindPwInfo({ ...findPwInfo, email: e.target.value })}
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
              className={`${styles['login-modal-step-container']} ${modalStep === 1 ? styles['login-slide-in-left'] : styles['login-slide-out-right']
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
