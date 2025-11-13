// import { baseUrlToBackend } from "@/redux/features/baseApi";
// import { Loader2, Send, X } from "lucide-react";
// import React, { useEffect, useRef, useState } from "react";

// export const ChatInterface = ({ isOpen, onClose }) => {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hi! I’m here to help you find certified cleft Lip Injector or answer questions about our platform. How can I assist you today?",
//       sender: "bot",
//       timestamp: new Date(),
//     },
//   ]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [sessionId, setSessionId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const sendMessage = async (message) => {
//     setIsLoading(true);

//     try {
//       const response = await fetch(`${baseUrlToBackend}api/chat/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...(sessionId && { session_id: sessionId }),
//           message: message,
//         }),
//       });

//       const data = await response.json();

//       if (!sessionId && data.session_id) {
//         setSessionId(data.session_id);
//       }

//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now(),
//           text: data.response,
//           sender: "bot",
//           timestamp: new Date(),
//         },
//       ]);
//     } catch (error) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now(),
//           text: "Sorry, something went wrong. Please try again.",
//           sender: "bot",
//           timestamp: new Date(),
//           error: true,
//         },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSend = async () => {
//     if (!inputMessage.trim()) return;

//     const userMessage = {
//       id: Date.now(),
//       text: inputMessage,
//       sender: "user",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     const messageToSend = inputMessage;
//     setInputMessage("");

//     await sendMessage(messageToSend);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-[#cf5a16] to-[#e67839] text-white p-4 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
//             <img
//               src="https://i.ibb.co.com/Z6zwBcqr/python.png"
//               className="p-1 shadow-2xl rounded-full"
//               alt="logo"
//             />
//           </div>
//           <div>
//             <h3 className="font-semibold text-lg">SafeSmile Bot</h3>
//           </div>
//         </div>
//         <button
//           onClick={onClose}
//           className="hover:bg-white/20 p-2 rounded-full transition-colors"
//         >
//           <X className="w-5 h-5 cursor-pointer" />
//         </button>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${
//               message.sender === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             <div
//               className={`max-w-[80%] rounded-2xl px-4 py-3 ${
//                 message.sender === "user"
//                   ? "bg-[#cf5a16] text-white rounded-br-sm"
//                   : message.error
//                   ? "bg-red-100 text-red-800 rounded-bl-sm"
//                   : "bg-gray-200 text-gray-900 shadow-md rounded-bl-sm"
//               }`}
//             >
//               <p className="text-sm leading-relaxed">{message.text}</p>
//               <span
//                 className={`text-xs mt-1 block ${
//                   message.sender === "user" ? "text-white/70" : "text-gray-500"
//                 }`}
//               >
//                 {message.timestamp.toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </span>
//             </div>
//           </div>
//         ))}

//         {isLoading && (
//           <div className="flex justify-start">
//             <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-md">
//               <Loader2 className="w-5 h-5 text-[#cf5a16] animate-spin" />
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="p-4 bg-white border-t border-gray-200 ">
//         <div className="flex items-center gap-2">
//           <input
//             type="text"
//             value={inputMessage}
//             onChange={(e) => setInputMessage(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Type your message..."
//             className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#cf5a16] focus:border-transparent"
//             disabled={isLoading}
//           />
//           <button
//             onClick={handleSend}
//             disabled={isLoading || !inputMessage.trim()}
//             className="bg-[#cf5a16] text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#b84e13] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

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
  const typingIntervalRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, typingText]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  const typeMessage = (fullText, messageId) => {
    const words = fullText.split(" ");
    let currentIndex = 0;

    setIsTyping(true);
    setTypingText("");

    typingIntervalRef.current = setInterval(() => {
      if (currentIndex < words.length) {
        const wordsToAdd = words.slice(
          currentIndex,
          currentIndex + Math.floor(Math.random() * 2) + 3
        );
        currentIndex += wordsToAdd.length;

        setTypingText((prev) => {
          const newText = prev + (prev ? " " : "") + wordsToAdd.join(" ");
          return newText;
        });
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
    }, 200);
  };

  const sendMessage = async (message) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrlToBackend}api/chat/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(sessionId && { session_id: sessionId }),
          message: message,
        }),
      });

      const data = await response.json();

      if (!sessionId && data.session_id) {
        setSessionId(data.session_id);
      }

      setIsLoading(false);

      // Start typing effect
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
    <div className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#cf5a16] to-[#e67839] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <img
              src="https://i.ibb.co.com/Z6zwBcqr/python.png"
              className="p-1 shadow-2xl rounded-full"
              alt="logo"
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">SafeSmile Bot</h3>
          </div>
        </div>
        <button
          onClick={onClose}
          className="hover:bg-white/20 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5 cursor-pointer" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === "user"
                  ? "bg-[#cf5a16] text-white rounded-br-sm"
                  : message.error
                  ? "bg-red-100 text-red-800 rounded-bl-sm"
                  : "bg-gray-200 text-gray-900 shadow-md rounded-bl-sm"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <span
                className={`text-xs mt-1 block ${
                  message.sender === "user" ? "text-white/70" : "text-gray-500"
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

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-md flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-[#cf5a16] animate-spin" />
              <span className="text-sm text-gray-600">Thinking...</span>
            </div>
          </div>
        )}

        {isTyping && typingText && (
          <div className="flex justify-start">
            <div className="max-w-[80%] bg-gray-200 text-gray-900 shadow-md rounded-2xl rounded-bl-sm px-4 py-3">
              <p className="text-sm leading-relaxed">{typingText}</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200 ">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#cf5a16] focus:border-transparent"
            disabled={isLoading || isTyping}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || isTyping || !inputMessage.trim()}
            className="bg-[#cf5a16] text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#b84e13] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
