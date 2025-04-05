import { useState, useEffect, useRef } from "react";
import { CircularProgress } from "@mui/material";
import { ArrowUpward } from "@mui/icons-material";
import { sendHarvestChat } from "../gemini/GeminiFunctions";
import Navbar from "../Components/Navbar.jsx";


const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleSend = async () => {
    const trimmedMsg = message.trim();
    if (trimmedMsg.length === 0) return;

    setChatLog((prev) => [...prev, { sender: "User", text: trimmedMsg }]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await sendHarvestChat(trimmedMsg);
      setChatLog((prev) => [...prev, { sender: "AI", text: response }]);
    } catch (err) {
      setChatLog((prev) => [
        ...prev,
        { sender: "AI", text: "⚠️ Sorry, something went wrong." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await handleSend();
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="h-[calc(100vh-70px)] bg-gradient-to-b from-[#DCEFD8] to-[#F1F9EF] flex flex-col items-center p-6">
        <div
          ref={chatContainerRef}
          className="w-full max-w-3xl flex-1 overflow-y-auto mb-4 p-4"
        >
          {chatLog.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg text-lg shadow ${
                  msg.sender === "User"
                    ? "bg-[#588157] text-white"
                    : "bg-[#F4F1DE] text-black"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="relative flex flex-col items-center z-10">
          <div className="relative w-[837px] h-[155px] bg-white shadow-lg border border-gray-300 rounded-xl p-4 pb-12 pr-12">
            <textarea
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-full text-lg bg-transparent outline-none resize-none"
            />
            <div className="absolute right-4 top-4">
              <button
                className="p-1 bg-[#FFBE0B] text-black rounded-full cursor-pointer flex justify-center hover:bg-[#f3b100] transition"
                onClick={handleSend}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <ArrowUpward fontSize="small" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;