import React, { useState, useRef, useEffect } from 'react';
import { ChatHeader } from './components/ChatHeader';
import { MessageList } from './components/MessageList';
import { ChatInput } from './components/ChatInput';
import { ColorProvider } from './contexts/ColorContext';
import { generateResponse } from './services/ollama';
import { Message } from './types/message';

export function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Ruby, powered by Llama 2. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await generateResponse(input);
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <ColorProvider>
      <div className="min-h-screen bg-[#0D0D0D]">
        <div className="max-w-4xl mx-auto p-4 h-screen flex flex-col">
          <ChatHeader />
          <MessageList
            messages={messages}
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
          />
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
          />
        </div>
      </div>
    </ColorProvider>
  );
}