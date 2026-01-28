'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Message } from '@/types';

const API_URL = '/api/chat';

const WELCOME_MESSAGE = `Hey 👋 Ich bin dein Social Coach by Tristan – dein persönlicher KI-Coach für Social Media Wachstum.
Gemeinsam bringen wir deine Social-Media-Präsenz aufs nächste Level – strategisch, authentisch und mit Spaß an der Umsetzung! 🚀

Womit möchtest du starten?
• 🚀 Reichweite & Wachstum
• 🎯 Positionierung & Branding
• 📸 Content & Reels
• 💬 Community & Engagement
• 💰 Monetarisierung`;

// Simple markdown renderer
function renderMarkdown(text: string): JSX.Element[] {
  const lines = text.split('\n');
  const elements: JSX.Element[] = [];

  lines.forEach((line, index) => {
    // Headings: ###, ##, #
    const h3Match = line.match(/^###\s+(.*)$/);
    if (h3Match) {
      elements.push(
        <div key={index} className="font-semibold text-base mt-3 mb-1 text-red-400">{processInlineMarkdown(h3Match[1])}</div>
      );
      return;
    }

    const h2Match = line.match(/^##\s+(.*)$/);
    if (h2Match) {
      elements.push(
        <div key={index} className="font-semibold text-lg mt-3 mb-1 text-red-400">{processInlineMarkdown(h2Match[1])}</div>
      );
      return;
    }

    const h1Match = line.match(/^#\s+(.*)$/);
    if (h1Match) {
      elements.push(
        <div key={index} className="font-bold text-xl mt-3 mb-1 text-red-400">{processInlineMarkdown(h1Match[1])}</div>
      );
      return;
    }

    // List items: • or - or * at start (but not **)
    const listMatch = line.match(/^[\t\s]*[•\-]\s+(.*)$/) || line.match(/^[\t\s]*\*\s+([^*].*)$/);
    if (listMatch) {
      elements.push(
        <div key={index} className="flex items-start gap-2 ml-1 my-1">
          <span className="text-red-500 mt-0.5">•</span>
          <span>{processInlineMarkdown(listMatch[1])}</span>
        </div>
      );
      return;
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<div key={index} className="h-2" />);
      return;
    }

    // Regular text
    elements.push(
      <div key={index}>{processInlineMarkdown(line)}</div>
    );
  });

  return elements;
}

function processInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(remaining.slice(0, boldMatch.index));
      }
      parts.push(<strong key={key++} className="font-semibold text-white">{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch.index + boldMatch[0].length);
      continue;
    }

    // Italic: *text* (but not **)
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/);
    if (italicMatch && italicMatch.index !== undefined) {
      if (italicMatch.index > 0) {
        parts.push(remaining.slice(0, italicMatch.index));
      }
      parts.push(<em key={key++}>{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch.index + italicMatch[0].length);
      continue;
    }

    // No more matches, add the rest
    parts.push(remaining);
    break;
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content: WELCOME_MESSAGE,
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Fehler: ${response.status}`);
      }

      const data = await response.text();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        content: data || 'Keine Antwort erhalten.',
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ein Fehler ist aufgetreten. Bitte versuche es erneut.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen bg-black">
      {/* Header */}
      <div className="flex-shrink-0 bg-gradient-to-r from-black via-gray-900 to-black text-white px-4 py-4 shadow-lg border-b border-red-600/30">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center overflow-hidden flex-shrink-0 border border-red-600/50">
            <img
              src="https://cdn.prod.website-files.com/6690ef66366329732cd9ae97/66cc446438c49017aa9237cf_Logo%20-%20Tristan%20Weithaler%20(TW)%20(1).avif"
              alt="Tristan Weithaler"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold">KI Chat Assistant</h1>
            <a
              href="https://www.tristanweithaler.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              Tristan Weithaler - Social Media & Business Coach
            </a>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-md ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white rounded-br-md'
                  : 'bg-gray-900 text-gray-100 rounded-bl-md border border-gray-800'
              }`}
            >
              {message.role === 'assistant' ? (
                <div className="space-y-1 break-words text-[15px] leading-relaxed">{renderMarkdown(message.content)}</div>
              ) : (
                <p className="whitespace-pre-wrap break-words text-[15px]">{message.content}</p>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-900 px-4 py-3 rounded-2xl rounded-bl-md border border-gray-800">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex justify-center">
            <div className="bg-red-900/30 text-red-400 px-4 py-2 rounded-lg text-sm border border-red-800/50">
              {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex-shrink-0 border-t border-gray-800 px-4 py-3 bg-black"
      >
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Deine Nachricht..."
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-gray-900 border border-gray-800 text-white placeholder-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-900/50 disabled:text-gray-500 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-medium hover:from-red-500 hover:to-red-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-red-500/20"
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
