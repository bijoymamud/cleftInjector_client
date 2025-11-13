import { Bot, MessageCircle } from "lucide-react";

export const ChatButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 hover:cursor-pointer right-6 w-14 h-14 bg-gradient-to-r from-[#cf5a16] to-[#e67839] text-white rounded-full shadow-2xl hover:shadow-3xl  flex items-center justify-center z-40 group"
    >
      <Bot className="w-7 h-7 group-hover:animate-bounce " />
    </button>
  );
};
