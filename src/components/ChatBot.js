import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Xin chào! Gửi tin nhắn để bắt đầu trò chuyện.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Bot',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
      const userMessage = newMessages[0].text;
      const botResponse = getBotResponse(userMessage);
      setTimeout(() => {
        const botMessage = {
          _id: Math.round(Math.random() * 1000000),
          text: botResponse,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Bot',
          },
        };
        botSend([botMessage]);
      }, 1000);
    
  }, []);

  const botSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  })
  const getBotResponse = (userMessage) => {
    if (userMessage.toLowerCase().includes('xin chào')) {
      return 'Xin chào! Tôi là chatbot.';
    } else {
      return 'Chờ người phản hồi';
    };
  }
  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default ChatScreen;