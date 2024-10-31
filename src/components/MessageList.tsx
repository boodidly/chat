import React from 'react';
import { User, Gem } from 'lucide-react';
import { Message } from '../types/message';
import { useColor } from '../contexts/ColorContext';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function MessageList({ messages, isTyping, messagesEndRef }: MessageListProps) {
  const { accentColor, brightness } = useColor();
  const glowColor = `${accentColor}${Math.round(brightness * 2.55).toString(16).padStart(2, '0')}`;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0D0D0D]">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`flex gap-3 max-w-[80%] ${
              message.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user'
                  ? ''
                  : 'bg-[#1A1A1A]'
              }`}
              style={{ 
                backgroundColor: message.sender === 'user' ? accentColor : undefined,
                boxShadow: brightness > 0 ? `0 4px 15px -3px ${glowColor}` : 'none',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              {message.sender === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Gem className="w-4 h-4" style={{ color: accentColor }} />
              )}
            </div>
            <div
              className={`rounded-2xl p-4 relative ${
                message.sender === 'user'
                  ? 'text-white'
                  : 'bg-[#1A1A1A] text-white'
              }`}
              style={{ 
                backgroundColor: message.sender === 'user' ? accentColor : undefined,
                boxShadow: brightness > 0 ? `0 4px 15px -3px ${glowColor}` : 'none',
                transition: 'box-shadow 0.3s ease'
              }}
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="flex items-center gap-2">
          <div 
            className="bg-[#1A1A1A] p-4 rounded-2xl"
            style={{ 
              boxShadow: brightness > 0 ? `0 4px 15px -3px ${glowColor}` : 'none',
              transition: 'box-shadow 0.3s ease'
            }}
          >
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-[#666666] rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-[#666666] rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-[#666666] rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}