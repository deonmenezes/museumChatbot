"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  )
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const handleSendMessage = () => {
    if (message.trim() === "") return // Avoid sending empty messages

    // Add the new message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ])
    setMessage("") // Clear the input after sending
  }

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Navbar */}
      <nav className="bg-[#698474] p-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <h1 className="text-[#FCF8F3] text-2xl font-bold">City Museum</h1>
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
                href="/exhibition"
                className="text-[#FCF8F3] hover:text-[#FFD3B6]"
              >
                Exhibitions
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
      <div className="bg-white rounded-xl p-8 w-full h-full">
        <div className="text-center">
          {/* Profile Section */}
          <img
            src="/museum.jpg"
            alt="MuseumBot"
            className="w-20 h-20 mx-auto rounded-full border-4 border-blue-600 mb-4"
          />
          <h1 className="text-3xl font-bold text-blue-800">MuseumBot</h1>
          <p className="text-gray-700 mt-2">
            Hello! I'm MuseumBot, your AI assistant for all things
            museum-related.
          </p>
          <p className="text-gray-700 mb-6">How can I help you today?</p>
        </div>

        {/* Service Options */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-12 service-options">
          <Link href="/tickets">
            <button className="bg-white border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-xl flex items-center justify-center shadow-sm hover:bg-blue-500 hover:text-white transition">
              🎟️ Book Tickets
            </button>
          </Link>
          <Link href="/">
            <button className="bg-white border-2 border-red-500 text-red-500 px-6 py-3 rounded-xl flex items-center justify-center shadow-sm hover:bg-red-500 hover:text-white transition">
              🖼️ View Exhibits
            </button>
          </Link>
          <Link href="/">
            <button className="bg-white border-2 border-green-500 text-green-500 px-6 py-3 rounded-xl flex items-center justify-center shadow-sm hover:bg-green-500 hover:text-white transition">
              🧑‍🏫 Guided Tours
            </button>
          </Link>
          <Link href="/">
          <button className="bg-white border-2 border-purple-500 text-purple-500 px-6 py-3 rounded-xl flex items-center justify-center shadow-sm hover:bg-purple-500 hover:text-white transition">
            🛒 Gift Shop
            </button>
            </Link>
        </div>

        {/* Chat Display Section */}
        <div className="border-t border-gray-200 pt-4 p-12 max-h-64 overflow-y-auto">
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
          <div ref={messagesEndRef} />
        </div>

        {/* Chatbot Input Section */}
        <div className="border-t border-gray-200 pt-4 p-12">
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress} // Added key press event listener
            />
            <button
              className="ml-2 bg-blue-500 text-white px-6 py-2 rounded-full shadow-sm hover:bg-blue-600 transition"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-6 mb-4">
        <p className="text-center text-gray-500 text-sm">
          © 2024 City Museum. All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default Chatbot
