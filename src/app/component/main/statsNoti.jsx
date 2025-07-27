'use client'

import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

export default function StatsNoti({ notiList }) {

    return (
        <>
            <div className={"statsNoti-chartWrapper-otherTable"}>
                <h2 className={"statsNoti-title"}>📋 이번달 통계 알림</h2>
                <div className="statsNoti-table">
                    <div className="row header">
                        <div className="cell">제목</div>
                        <div className="cell">날짜</div>
                    </div>
                    {notiList.length > 0 ? (
                        notiList.map((noti) => (
                            <div className="row" key={noti.notiIdx}>
                                <div className="cell">{noti.contentPre}</div>
                                <div className="cell">{noti.createdAt.split("T")[0]}</div>
                            </div>
                        ))
                    ) : (
                        <div className="row">
                            <div className="cell">통계 알림이 없습니다.</div>
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}