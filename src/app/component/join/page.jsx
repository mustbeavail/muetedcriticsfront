'use client';

import React, { useState } from 'react';
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import api from '../../utils/api';
import './join.css';

const JoinPage = () => {
  const URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    memberId: '',
    memberPw: '',
    confirmPw: '',
    memberName: '',
    officePhone: '',
    mobilePhone: '',
    deptName: '',
    position: '',
    receiveConsent: false,
    email: '',
    memberGender: '',
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
    if (name === 'memberId') setIdCheckResult(null);
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

  const handleIdCheck = async () => {
    if (!formData.memberId.trim()) {
      alert('아이디를 입력하세요.');
      return;
    }
    setChecking(true);
    setIdCheckResult(null);

    const { data } = await api.post(`${URL}/member/overlay_id`, { member_id: formData.memberId });
    console.log(data);

    if (data.used) {
      setIdCheckResult('taken');
    } else {
      setIdCheckResult('available');
    }
    setChecking(false);
  };

  const applyDepartmentPosition = () => {
    if (!tempDepartment || !tempPosition) {
      alert('부서와 직급을 모두 선택하세요.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      deptName: tempDepartment,
      position: tempPosition,
    }));
    setShowModal(false);
  };

  const isPasswordMatch =
    formData.confirmPw.length > 0 &&
    formData.memberPw === formData.confirmPw;

  const join = async (e) => {
    e.preventDefault();

    if (!formData.memberId.trim()) {
      setErrorMsg('아이디를 입력해주세요.');
      return;
    }
    if (idCheckResult !== 'available') {
      setErrorMsg('아이디 중복체크를 해주세요.');
      return;
    }
    if (formData.memberPw.length < 8 || formData.memberPw.length > 20) {
      setErrorMsg('비밀번호는 8자 이상 20자 이하로 입력해주세요.');
      return;
    }
    if (formData.memberPw !== formData.confirmPw) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!formData.memberName.trim()) {
      setErrorMsg('이름을 입력해주세요.');
      return;
    }
    if (!formData.memberGender) {
      setErrorMsg('성별을 선택해주세요.');
      return;
    }
    if (!formData.email.trim()) {
      setErrorMsg('이메일을 입력해주세요.');
      return;
    }
    if (!formData.officePhone.trim()) {
      setErrorMsg('사내 연락처를 입력해주세요.');
      return;
    }
    if (!formData.mobilePhone.trim()) {
      setErrorMsg('개인 연락처를 입력해주세요.');
      return;
    }
    if (!formData.deptName || !formData.position) {
      setErrorMsg('부서와 직급을 선택해주세요.');
      return;
    }
    if (!formData.receiveConsent) {
      setErrorMsg('마케팅 정보 수신에 동의해 주세요.');
      return;
    }
    // 사내 연락처 - 010-1234-5678 형식 체크
    if (!/^\d{3}-\d{4}-\d{4}$/.test(formData.officePhone)) {
      setErrorMsg('사내 연락처는 000-0000-0000 형식으로 입력해주세요.');
      return;
    }
    // 개인 연락처 - 010-1234-5678 형식 체크
    if (!/^\d{3}-\d{4}-\d{4}$/.test(formData.mobilePhone)) {
      setErrorMsg('개인 연락처는 000-0000-0000 형식으로 입력해주세요.');
      return;
    }

    setErrorMsg('');
    console.log('가입 데이터:', formData);

    const { data } = await api.post(`${URL}/member/join`, formData);
    console.log(data);

    if (data.success) {
      alert('회원가입 요청을 성공적으로 접수했습니다. 관리자 승인 후 서비스 이용이 가능합니다.');
      location.href = '/';
    } else {
      alert('회원가입에 실패했습니다.');
    }
  };


  return (
    <div className="join-wrapper">
      <div className="join-container">
        <h2 className="join-title">회원가입</h2>
        <form onSubmit={join} className="join-form">
          {errorMsg && <p className="join-errorMsg">{errorMsg}</p>}

          <div className="join-inputWithButton">
            <input
              type="text"
              name="memberId"
              value={formData.memberId}
              onChange={handleChange}
              placeholder="아이디"
              autoComplete="username"
              className="join-input"
            />
            <button
              type="button"
              onClick={handleIdCheck}
              disabled={checking || idCheckResult === 'available'}
              className={`join-overlay-button ${idCheckResult === 'available' ? 'join-available' : ''}`}
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
          {formData.memberId && idCheckResult && (
            <p className={idCheckResult === 'available' ? 'join-matchMsg' : 'join-notMatchMsg'}>
              {idCheckResult === 'available'
                ? '사용 가능한 아이디입니다.'
                : '이미 사용 중인 아이디입니다.'}
            </p>
          )}

          <div className="join-inputWithIcon">
            <input
              type={showPassword ? 'text' : 'password'}
              name="memberPw"
              value={formData.memberPw}
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
              {/* {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />} */}
            </button>
          </div>

          <input
            type="password"
            name="confirmPw"
            value={formData.confirmPw}
            onChange={handleChange}
            placeholder="비밀번호 재확인"
            autoComplete="new-password"
            className="join-input"
          />
          {formData.confirmPw.length > 0 && (
            <p className={isPasswordMatch ? 'join-matchMsg' : 'join-notMatchMsg'}>
              {isPasswordMatch
                ? '비밀번호가 일치합니다.'
                : '비밀번호가 일치하지 않습니다.'}
            </p>
          )}

          <input
            type="text"
            name="memberName"
            value={formData.memberName}
            onChange={handleChange}
            placeholder="이름"
            className="join-input"
          />

          <div className="join-gender-wrapper">
            <div className="join-gender-buttons">
              {['남성', '여성'].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  className={`join-gender-btn ${formData.memberGender === gender ? 'active' : ''}`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      memberGender: gender,
                    }))
                  }
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일"
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
            name="mobilePhone"
            value={formData.mobilePhone}
            onChange={handleChange}
            placeholder="개인 연락처"
            className="join-input"
          />

          <button
            type="button"
            className="join-selectBox"
            onClick={() => setShowModal(true)}
          >
            {formData.deptName && formData.position
              ? `${formData.deptName} / ${formData.position}`
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
                className="join-consentCheckbox"
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

          <button type="submit" className="join-button" onClick={join}>
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
              className={`join-modalButton ${tempDepartment === dept ? 'join-modalButtonSelected' : ''
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
              className={`join-modalButton ${tempPosition === pos ? 'join-modalButtonSelected' : ''
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

export default JoinPage;