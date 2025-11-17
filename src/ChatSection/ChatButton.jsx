import { Bot } from "lucide-react";

export const ChatButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6  right-6 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-r from-[#cf5a16] to-[#e67839] text-white rounded-full shadow-2xl hover:shadow-3xl flex items-center justify-center z-50 group transition-all duration-200 active:scale-95"
      aria-label="Open Chat"
    >
      <Bot className="w-6 h-6 md:w-7 md:h-7 group-hover:animate-bounce" />
    </button>
  );
};
