import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChatSession, ChatMessage, AUTO_RESPONSES } from '../types/chat';

type ChatContextType = {
  currentSession: ChatSession | null;
  startNewSession: () => void;
  sendMessage: (content: string) => void;
  closeSession: () => void;
  isChatOpen: boolean;
  toggleChat: () => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const generateAutoResponse = (message: string): string | null => {
  const lowerMessage = message.toLowerCase();
  
  for (const response of AUTO_RESPONSES) {
    if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return response.response;
    }
  }
  
  return 'I\'m here to help! For complex inquiries, our support team is available Monday to Friday, 9 AM to 6 PM EST.';
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const startNewSession = () => {
    const session: ChatSession = {
      id: Math.random().toString(36).substring(7),
      messages: [{
        id: '1',
        type: 'bot',
        content: 'Hello! How can I help you today?',
        timestamp: Date.now()
      }],
      status: 'active',
      startTime: Date.now()
    };
    setCurrentSession(session);
  };

  const sendMessage = (content: string) => {
    if (!currentSession) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      type: 'user',
      content,
      timestamp: Date.now()
    };

    const autoResponse: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      type: 'bot',
      content: generateAutoResponse(content) || "I'll connect you with a support agent shortly.",
      timestamp: Date.now()
    };

    setCurrentSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, userMessage, autoResponse]
      };
    });
  };

  const closeSession = () => {
    if (!currentSession) return;
    
    setCurrentSession(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: 'closed',
        endTime: Date.now()
      };
    });
  };

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
    if (!currentSession) {
      startNewSession();
    }
  };

  // Save chat session to localStorage
  useEffect(() => {
    if (currentSession) {
      localStorage.setItem('chatSession', JSON.stringify(currentSession));
    }
  }, [currentSession]);

  // Load chat session from localStorage
  useEffect(() => {
    const savedSession = localStorage.getItem('chatSession');
    if (savedSession) {
      const session = JSON.parse(savedSession);
      if (session.status === 'active') {
        setCurrentSession(session);
      }
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        currentSession,
        startNewSession,
        sendMessage,
        closeSession,
        isChatOpen,
        toggleChat
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};