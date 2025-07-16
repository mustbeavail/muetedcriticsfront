'use client';

import React, { useState } from 'react';
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';

const Join = () => {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    name: '',
    officePhone: '',
    personalPhone: '',
    department: '',
    position: '',
    receiveConsent: false,
  });

  const [idCheckResult, setIdCheckResult] = useState(null);
  const [checking, setChecking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [tempDepartment, setTempDepartment] = useState(formData.department);
  const [tempPosition, setTempPosition] = useState(formData.position);

  const [showConsentModal, setShowConsentModal] = useState(false);

  const departmentList = ['CS팀', '마케팅팀', '개발팀', '총괄'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name === 'userId') setIdCheckResult(null);
    if (errorMsg) setErrorMsg('');
  };

  const handleConsentAgree = () => {
    setFormData((prev) => ({
      ...prev,
      receiveConsent: true,
    }));
    setShowConsentModal(false);
  };

  const handleConsentCancel = () => {
    setFormData((prev) => ({
      ...prev,
      receiveConsent: false,
    }));
    setShowConsentModal(false);
  };

  const handleIdCheck = () => {
    if (!formData.userId.trim()) {
      alert('아이디를 입력하세요.');
      return;
    }
    setChecking(true);
    setIdCheckResult(null);

    setTimeout(() => {
      if (formData.userId.toLowerCase() === 'admin') {
        setIdCheckResult('taken');
      } else {
        setIdCheckResult('available');
      }
      setChecking(false);
    }, 1500);
  };

  const applyDepartmentPosition = () => {
    if (!tempDepartment || !tempPosition) {
      alert('부서와 직급을 모두 선택하세요.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      department: tempDepartment,
      position: tempPosition,
    }));
    setShowModal(false);
  };

  const isPasswordMatch =
    formData.confirmPassword.length > 0 &&
    formData.password === formData.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.userId.trim()) {
      setErrorMsg('아이디를 입력해주십시오.');
      return;
    }
    if (idCheckResult !== 'available') {
      setErrorMsg('아이디 중복체크를 해주세요.');
      return;
    }
    if (formData.password.length < 8 || formData.password.length > 20) {
      setErrorMsg('비밀번호는 8자 이상 20자 이하로 입력해주세요.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!formData.name.trim()) {
      setErrorMsg('이름을 입력해주십시오.');
      return;
    }
    if (!formData.department || !formData.position) {
      setErrorMsg('부서와 직급을 선택해주세요.');
      return;
    }
    if (!formData.receiveConsent) {
      setErrorMsg('마케팅 정보 수신에 동의해 주세요.');
      return;
    }

    setErrorMsg('');
    console.log('가입 데이터:', formData);
  };

  return (
    <div className="join-wrapper">
      <div className="join-container">
        <h2 className="join-title">회원가입</h2>
        <form onSubmit={handleSubmit} className="join-form">
          {errorMsg && <p className="join-errorMsg">{errorMsg}</p>}

          <div className="join-inputWithButton">
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="아이디"
              autoComplete="username"
              className="join-input"
            />
            <button
              type="button"
              onClick={handleIdCheck}
              disabled={checking || idCheckResult === 'available'}
              className={`join-button ${idCheckResult === 'available' ? 'join-available' : ''}`}
            >
              {idCheckResult === 'available' ? (
                <FaCheck size={18} />
              ) : checking ? (
                '확인 중...'
              ) : (
                '중복체크'
              )}
            </button>
          </div>
          {idCheckResult === 'taken' && (
            <p className="join-errorMsg">이미 사용 중인 아이디입니다.</p>
          )}

          <div className="join-inputWithIcon">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호 (8~20자)"
              autoComplete="new-password"
              className="join-input"
              minLength={8}
              maxLength={20}
            />
            <button
              type="button"
              className="join-iconButton"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 재확인"
            autoComplete="new-password"
            className="join-input"
          />
          {formData.confirmPassword.length > 0 && (
            <p className={isPasswordMatch ? 'join-matchMsg' : 'join-notMatchMsg'}>
              {isPasswordMatch
                ? '비밀번호가 일치합니다.'
                : '비밀번호가 일치하지 않습니다.'}
            </p>
          )}

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="이름"
            className="join-input"
          />
          <input
            type="tel"
            name="officePhone"
            value={formData.officePhone}
            onChange={handleChange}
            placeholder="사내 연락처"
            className="join-input"
          />
          <input
            type="tel"
            name="personalPhone"
            value={formData.personalPhone}
            onChange={handleChange}
            placeholder="개인 연락처"
            className="join-input"
          />

          <button
            type="button"
            className="join-selectBox"
            onClick={() => setShowModal(true)}
          >
            {formData.department && formData.position
              ? `${formData.department} / ${formData.position}`
              : '부서 및 직급 선택'}
          </button>

          <div className="join-consentWrapper">
            <div className="join-checkboxLabel">
              <input
                type="checkbox"
                id="receiveConsent"
                name="receiveConsent"
                checked={formData.receiveConsent}
                onClick={(e) => {
                  e.preventDefault();
                  setShowConsentModal(true);
                }}
                readOnly
                className="join-checkboxInput"
              />
              <span />
              <label
                htmlFor="receiveConsent"
                className="join-consentText"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setShowConsentModal(true);
                }}
              >
                마케팅 정보 수신에 동의합니다.
              </label>
            </div>
          </div>

          <button type="submit" className="join-button">
            가입하기
          </button>
        </form>

        <p className="join-loginLink">
          이미 계정이 있으신가요?{' '}
          <Link href="/" className="join-loginAnchor">
            로그인 페이지로 이동
          </Link>
        </p>
      </div>

      {showModal && (
        <DepartmentPositionModal
          tempDepartment={tempDepartment}
          tempPosition={tempPosition}
          setTempDepartment={setTempDepartment}
          setTempPosition={setTempPosition}
          closeModal={() => setShowModal(false)}
          applyDepartmentPosition={applyDepartmentPosition}
          departmentList={departmentList}
        />
      )}

      {showConsentModal && (
        <ConsentModal
          onAgree={handleConsentAgree}
          onCancel={handleConsentCancel}
        />
      )}
    </div>
  );
};

const DepartmentPositionModal = ({
  tempDepartment,
  tempPosition,
  setTempDepartment,
  setTempPosition,
  closeModal,
  applyDepartmentPosition,
  departmentList,
}) => {
  const positions =
    tempDepartment === '총괄'
      ? ['상무', '전무', '사장']
      : ['사원', '대리', '과장', '차장', '부장', '이사'];

  return (
    <div className="join-modalBackdrop" onClick={closeModal}>
      <div
        className="join-modalContent"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <h3 className="join-modalTitle">부서 및 직급 선택</h3>

        <p className="join-modalLabel">부서 선택</p>
        <div className="join-modalButtonGroup">
          {departmentList.map((dept) => (
            <button
              key={dept}
              type="button"
              className={`join-modalButton ${
                tempDepartment === dept ? 'join-modalButtonSelected' : ''
              }`}
              onClick={() => {
                setTempDepartment(dept);
                setTempPosition('');
              }}
            >
              {dept}
            </button>
          ))}
        </div>

        <p className="join-modalLabel" style={{ marginTop: 24 }}>직급 선택</p>
        <div className="join-modalButtonGroup">
          {positions.map((pos) => (
            <button
              key={pos}
              type="button"
              className={`join-modalButton ${
                tempPosition === pos ? 'join-modalButtonSelected' : ''
              }`}
              onClick={() => setTempPosition(pos)}
            >
              {pos}
            </button>
          ))}
        </div>

        <div className="join-modalActionButtons">
          <button
            type="button"
            className="join-modalConfirmButton"
            onClick={applyDepartmentPosition}
          >
            선택 완료
          </button>
          <button
            type="button"
            className="join-modalCancelButton"
            onClick={closeModal}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

const ConsentModal = ({ onAgree, onCancel }) => (
  <div className="join-modalBackdrop" onClick={onCancel}>
    <div
      className="join-modalContent"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
    >
      <h3 className="join-modalTitle">마케팅 정보 수신 동의서</h3>
      <div
        style={{
          maxHeight: 300,
          overflowY: 'auto',
          marginBottom: 20,
          lineHeight: 1.5,
          fontSize: 14,
          color: '#ddd',
          whiteSpace: 'pre-wrap',
        }}
      >
        {`저는 muted critics가 제공하는 서비스 이용과 관련하여, 서비스 안내, 이벤트 및 프로모션 등 유익한 정보를 이메일, 문자, 앱 푸시 알림 등으로 받아보는 것에 동의합니다.
          또한, 제 개인정보가 회원관리, 서비스 제공, 고객 상담, 맞춤형 서비스 제공 등의 목적을 위해 수집·이용되는 것을 충분히 이해하며 이에 동의합니다. 
          동의하지 않으면 회원가입이 불가능하며, 언제든지 수신 동의를 철회할 수 있습니다.
          개인정보 관리 책임자는 김보연이며, 관련 문의는 kxxn0214@naver.com으로 연락 주시면 신속히 안내해 드립니다.`}
      </div>
      <div className="join-modalActionButtons">
        <button type="button" className="join-modalConfirmButton" onClick={onAgree}>
          동의함
        </button>
        <button type="button" className="join-modalCancelButton" onClick={onCancel}>
          취소
        </button>
      </div>
    </div>
  </div>
);

export default Join;