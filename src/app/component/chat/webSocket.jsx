'use client';

import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const useWebSocket = ({ token, memberId, currentRoomIdx, onMessageReceived }) => {

    const [currentSubscription, setCurrentSubscription] = useState(null);

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