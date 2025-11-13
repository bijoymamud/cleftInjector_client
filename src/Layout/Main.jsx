

import { ChatButton } from "@/ChatSection/ChatButton";
import { ChatInterface } from "@/ChatSection/ChatInterface";
import Footer from "@/Pages/Shared/Footer";
import { Navbar } from "@/Pages/Shared/Navbar";
import { useState } from "react";
import { Outlet } from "react-router";


const Main = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50">
      <div className="relative min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>

      <ChatButton onClick={() => setIsChatOpen(true)} />
      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Main;
