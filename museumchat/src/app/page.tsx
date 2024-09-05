"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { GoogleGenerativeAI } from "@google/generative-ai"

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [chatHeight, setChatHeight] = useState("40vh")
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  const handleSendMessage = async () => {
    if (message.trim() === "") return

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ])
    setMessage("")
    setIsLoading(true)

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(message);
      const response = result.response;
      const text = response.text();

      setMessages((prevMessages) => [
        ...prevMessages,
        { text, sender: "bot" },
      ])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, I encountered an error. Please try again.", sender: "bot" },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    
    // Dynamically adjust chat height
    const newHeight = Math.min(80, Math.max(40, messages.length * 10)) + "vh"
    setChatHeight(newHeight)
  }, [messages])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#698474] p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <h1 className="text-[#FCF8F3] text-2xl font-bold">Museumaire</h1>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/faqs"
                className="text-[#FCF8F3] hover:text-[#FFD3B6]"
              >
                FAQs
              </Link>
            </li>
           
            <li>
              <Link
                href="/contact"
                className="text-[#FCF8F3] hover:text-[#FFD3B6]"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/chatbot"
                className="text-[#FCF8F3] hover:text-[#FFD3B6]"
              >
                Chatbot
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-grow bg-white p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            {/* Profile Section */}
            <img
              src="/museum.jpg"
              alt="MuseumBot"
              className="w-20 h-20 mx-auto rounded-full border-4 border-blue-600 mb-4"
            />
            <h1 className="text-3xl font-bold text-blue-800">Museumaire</h1>
            <p className="text-gray-700 mt-2">
              Hello! I'm MuseumBot, your AI assistant for all things museum-related.
            </p>
            <p className="text-gray-700 mb-6">How can I help you today?</p>
          </div>

          {/* Service Options */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <Link href="/exploremuseum.tsx">
              <button className="w-full bg-white border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-xl flex items-center justify-center shadow-sm hover:bg-blue-500 hover:text-white transition">
                🎟️Museums
              </button>
            </Link>
            <Link href="/">
              <button className="w-full bg-white border-2 border-red-500 text-red-500 px-4 py-2 rounded-xl flex items-center justify-center shadow-sm hover:bg-red-500 hover:text-white transition">
                🖼️ View Exhibits
              </button>
            </Link>
            <Link href="/">
              <button className="w-full bg-white border-2 border-green-500 text-green-500 px-4 py-2 rounded-xl flex items-center justify-center shadow-sm hover:bg-green-500 hover:text-white transition">
                🧑‍🏫 Guided Tours
              </button>
            </Link>
            <Link href="/">
              <button className="w-full bg-white border-2 border-purple-500 text-purple-500 px-4 py-2 rounded-xl flex items-center justify-center shadow-sm hover:bg-purple-500 hover:text-white transition">
                🛒 Gift Shop
              </button>
            </Link>
          </div>

          {/* Chat Display Section */}
          <div className="border border-gray-200 rounded-lg shadow-md" ref={chatContainerRef}>
            <div 
              className="overflow-y-auto p-4 transition-all duration-300 ease-in-out" 
              style={{ height: chatHeight }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-blue-500 text-white self-end rounded-br-none"
                        : "bg-gray-200 text-gray-800 self-start rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-2">
                  <div className="bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chatbot Input Section */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="ml-2 bg-blue-500 text-white px-6 py-2 rounded-full shadow-sm hover:bg-blue-600 transition"
                  onClick={handleSendMessage}
                  disabled={isLoading}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-4">
        <p className="text-center text-gray-500 text-sm">
          © 2024 Indian Museums. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Chatbot