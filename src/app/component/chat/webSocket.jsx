'use client';

import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const useWebSocket = ({ token, memberId, currentRoomIdx, onMessageReceived }) => {

    const [currentSubscription, setCurrentSubscription] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {

        if (!token || !memberId) return;
        // STOMP 클라이언트 생성
        const client = new Client({
            brokerURL: 'ws://52.78.198.224/ws',
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

    // 채팅방 구독 관리
    useEffect(() => {
        if (!stompClient || !isConnected || !currentRoomIdx) return;

        // 이전 구독 해제
        if (currentSubscription) {
            currentSubscription.unsubscribe();
        }

        // 새 채팅방 구독
        const subscription = stompClient.subscribe(`/topic/chat/${currentRoomIdx}`, (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log('수신된 메시지:', receivedMessage);

            // 메시지를 page.jsx로 전달
            if (onMessageReceived) {
                onMessageReceived(receivedMessage);
            }
        });

        setCurrentSubscription(subscription);

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [stompClient, isConnected, currentRoomIdx]);

    // 메시지 전송 함수
    const sendMessage = (roomIdx, memberId, receiverId, content) => {
        if (stompClient && isConnected) {
            const message = {
                roomIdx: roomIdx,
                senderId: memberId,
                receiverId: receiverId,
                msgContent: content
            };
            stompClient.publish({
                destination: '/app/chat/' + roomIdx,
                body: JSON.stringify(message)
            });
            setTimeout(() => {
            }, 100);
        }
    };
    return { sendMessage, isConnected };
}

export default useWebSocket;