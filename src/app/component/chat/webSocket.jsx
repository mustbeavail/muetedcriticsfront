'use client';

import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import axios from 'axios';

const useWebSocket = ({token, memberId}) => {

    const [isConnected, setIsConnected] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {

        if (!token || !memberId) return;
        // STOMP 클라이언트 생성
        const client = new Client({
            brokerURL: 'ws://localhost/ws-test',
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

            // 채팅방 구독
            client.subscribe('/topic/chat/1', (message) => {
                const receivedMessage = JSON.parse(message.body);
                console.log('수신된 메시지:', receivedMessage);

                // 메시지 상태 업데이트
                setMessages(prev => [...prev, receivedMessage]);
            });
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

    // 채팅 메시지 내역 조회 함수
    const getChatMessageList = async (token, roomIdx) => {
        const { data } = await axios.get(`${URL}/room/${roomIdx}/messages`, {
            headers: {
                'Authorization': token
            }
        });
        setMessages(data);
        setFilteredMessages(data);
    };

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
            getChatMessageList(token, roomIdx);
        }
    };
    return { sendMessage, messages, setMessages, filteredMessages, setFilteredMessages };
}

export default useWebSocket;