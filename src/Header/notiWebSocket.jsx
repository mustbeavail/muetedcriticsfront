'use client';

import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const useNotiWebSocket = ({ token, memberId, onNotiReceived }) => {

    const [isConnected, setIsConnected] = useState(false);
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {

        if (!token || !memberId) return;
        // STOMP 클라이언트 생성
        const client = new Client({
            brokerURL: 'ws://localhost:80/ws',
            debug: function (str) {
                console.log('STOMP: ' + str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        // 연결 성공
        client.onConnect = (frame) => {
            setIsConnected(true);
            console.log('STOMP 연결 성공:', frame);
        };

        // 연결 실패
        client.onStompError = (frame) => {
            console.error('STOMP 오류:', frame.headers['message']);
            setIsConnected(false);
        };

        // 연결 끊김
        client.onWebSocketClose = () => {
            setIsConnected(false);
            console.log('STOMP 연결 끊김');
        };

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [token, memberId]);

    // 알림방 구독 관리
    useEffect(() => {
        if (!stompClient || !isConnected) return;

        // 새 알림방 구독
        const subscription = stompClient.subscribe(`/topic/noti/${memberId}`, (message) => {
            const receivedNoti = JSON.parse(message.body);
            console.log('수신된 알림:', receivedNoti);

            // 알림을 page.jsx로 전달
            if (onNotiReceived) {
                onNotiReceived(receivedNoti);
            }
        });

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [stompClient, isConnected, memberId]);

    return { isConnected };
}

export default useNotiWebSocket;