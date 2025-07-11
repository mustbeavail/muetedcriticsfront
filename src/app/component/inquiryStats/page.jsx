import React from 'react';
import All_InquiryStats from './all_inquiryStats';
import Period_InquiryStats from './period_inquiryStats';

const InquiryStats = () => {
  return (
    <>

      <h1>신고/문의 통계</h1>

      <All_InquiryStats />

      <Period_InquiryStats />
      
    </>
  );
};

export default InquiryStats;