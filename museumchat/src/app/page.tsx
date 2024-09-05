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

  // New state for user information
  const [userName, setUserName] = useState("")
  const [userContact, setUserContact] = useState("")
  const [ticketCount, setTicketCount] = useState("")
  const [preferredMuseum, setPreferredMuseum] = useState("")
  const [step, setStep] = useState(0) // Tracks the current step of user info collection

  // Function to handle the flow of collecting user information
  const handleUserInput = async (userMessage: string) => {
    setMessages((prevMessages) => [...prevMessages, { text: userMessage, sender: "user" }])
    
    switch (step) {
      case 0:
        setUserName(userMessage)
        setMessages((prevMessages) => [...prevMessages, { text: "Please provide your contact information.", sender: "bot" }])
        setStep(1)
        break
      case 1:
        setUserContact(userMessage)
        setMessages((prevMessages) => [...prevMessages, { text: "How many tickets would you like to request?", sender: "bot" }])
        setStep(2)
        break
      case 2:
        setTicketCount(userMessage)
        setMessages((prevMessages) => [...prevMessages, { text: "Which museum would you like to visit?", sender: "bot" }])
        setStep(3)
        break
      case 3:
        setPreferredMuseum(userMessage)
        setMessages((prevMessages) => [...prevMessages, { text: `Thank you, ${userName}! You've requested ${ticketCount} ticket(s) for the ${userMessage}. How can I assist you today?`, sender: "bot" }])
        setStep(4)
        break
      default:
        await handleBotResponse(userMessage)
        break
    }
  }

  // Function to generate responses using the Generative AI API
  const handleBotResponse = async (userMessage: string) => {
    setIsLoading(true)
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })
      const result = await model.generateContent(userMessage)
      const response = result.response
      const text = response.text()

      setMessages((prevMessages) => [...prevMessages, { text, sender: "bot" }])
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

  const handleSendMessage = async () => {
    if (message.trim() === "") return
    await handleUserInput(message)
    setMessage("")
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
      <div className="flex-grow bg-white p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            {/* Profile Section */}
            <img
              src="/museum.jpg"
              alt="MuseumBot"
              className="w-20 h-20 mx-auto rounded-full border-4 border-blue-600 mb-4"
            />
            <h1 className="text-3xl font-bold text-blue-800">MuseumBot</h1>
            <p className="text-gray-700 mt-2">
              Hello! I'm MuseumBot, your AI assistant for all things museum-related.
            </p>
            <p className="text-gray-700 mb-6">Please Provide Your Name down below to start conversation</p>
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
