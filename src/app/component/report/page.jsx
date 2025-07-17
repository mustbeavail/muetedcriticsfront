import React from 'react';
import '../mail/mail.css';
import Header from '../../../Header/page';
import Menu from '../../../menu/Menu';

const Report = () => {
  return (
    <>
      <Header />
      <Menu />
      <div className="stats_container">
        <span className={"itemStats-mainTitle"}>유저 신고 내역</span>
        <div className={"itemStats-chartWrapper"}>
          <h2 className={"itemStats-title"}>유저 신고 리스트</h2>
        </div>
      </div>
    </>
  );
};

export default Report;