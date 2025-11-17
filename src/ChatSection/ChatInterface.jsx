import { baseUrlToBackend } from "@/redux/features/baseApi";
import { Loader2, Send, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export const ChatInterface = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm here to help you find certified cleft Lip Injector or answer questions about our platform. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, typingText]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const typeMessage = (fullText, messageId) => {
    const words = fullText.split(" ");
    let currentIndex = 0;

    setIsTyping(true);
    setTypingText("");

    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < words.length) {
        const wordsToAdd = words.slice(currentIndex, currentIndex + 3);
        currentIndex += wordsToAdd.length;

        setTypingText(
          (prev) => prev + (prev ? " " : "") + wordsToAdd.join(" ")
        );
      } else {
        clearInterval(typingIntervalRef.current);
        setIsTyping(false);
        setTypingText("");

        setMessages((prev) => [
          ...prev,
          {
            id: messageId,
            text: fullText,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    }, 80);
  };

  const sendMessage = async (message) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrlToBackend}api/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(sessionId && { session_id: sessionId }),
          message,
        }),
      });

      const data = await response.json();

      if (!sessionId && data.session_id) setSessionId(data.session_id);
      setIsLoading(false);

      typeMessage(data.response, Date.now());
    } catch (error) {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Sorry, something went wrong. Please try again.",
          sender: "bot",
          timestamp: new Date(),
          error: true,
        },
      ]);
    }
  };

  // Handle send
  const handleSend = async () => {
    if (!inputMessage.trim() || isLoading || isTyping) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputMessage;
    setInputMessage("");
    await sendMessage(messageToSend);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      <div
        ref={chatContainerRef}
        className="fixed bottom-20 right-4 md:right-6 w-[92vw] max-w-sm md:max-w-md h-[75vh] md:h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#cf5a16] to-[#e67839] text-white p-3 md:p-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <img
                src="https://i.ibb.co.com/Z6zwBcqr/python.png"
                alt="SafeSmile Bot"
                className="w-full h-full object-contain rounded-full p-1"
              />
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg">
                SafeSmile Bot
              </h3>
              <p className="text-xs md:text-sm opacity-90">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] md:max-w-[80%] rounded-2xl px-3 py-2 md:px-4 md:py-3 text-sm md:text-base leading-relaxed ${
                  message.sender === "user"
                    ? "bg-[#cf5a16] text-white rounded-br-none"
                    : message.error
                    ? "bg-red-100 text-red-800 rounded-bl-none"
                    : "bg-white text-gray-900 shadow-sm rounded-bl-none"
                }`}
              >
                <p>{message.text}</p>
                <span
                  className={`text-xs block mt-1 ${
                    message.sender === "user"
                      ? "text-white/70"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-none px-3 py-2 shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-[#cf5a16] animate-spin" />
                <span className="text-sm text-gray-600">Thinking...</span>
              </div>
            </div>
          )}

          {/* Typing Effect */}
          {isTyping && typingText && (
            <div className="flex justify-start">
              <div className="max-w-[85%] bg-white text-gray-900 shadow-sm rounded-2xl rounded-bl-none px-3 py-2">
                <p className="text-sm md:text-base leading-relaxed">
                  {typingText}
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 md:p-4 bg-white border-t border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#cf5a16] focus:border-transparent transition-all"
              disabled={isLoading || isTyping}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || isTyping || !inputMessage.trim()}
              className="bg-[#cf5a16] text-white w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full hover:bg-[#b84e13] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
