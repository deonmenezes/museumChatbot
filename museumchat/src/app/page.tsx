"use client"

import React, { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { GoogleGenerativeAI } from "@google/generative-ai"
import MuseumSearch from "./components/search.tsx"
// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  )
  const [isLoading, setIsLoading] = useState(false)
  const [chatHeight, setChatHeight] = useState("40vh")
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  const [language, setLanguage] = useState("")
  const [isLanguageSelected, setIsLanguageSelected] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    // price: "",
    email: "",
    phone: "",
    nationality: "",
    // ticket_type: "",
    visit_date: "",
    visit_time: "",
    adult_tickets: "",
    child_tickets: "",
    language: "",
  })

  const languageOptions: {
    [key: string]: {
      welcome: string
      chooseLanguage: string
      buttonLabel: string
      languages: string[]
    }
  } = {
    english: {
      welcome:
        "Hello! I'm MuseumBot, your AI assistant for booking museum tickets. How can I help you today?",
      chooseLanguage:
        "Please select your preferred language to start the chat:",
      buttonLabel: "Send",
      languages: ["English", "हिन्दी", "मराठी"],
    },
    hindi: {
      welcome:
        "नमस्ते! मैं म्यूजियम बोट हूं, संग्रहालय से संबंधित सभी चीजों के लिए आपका एआई सहायक। मैं आपकी किस प्रकार सहायता कर सकता हूं?",
      chooseLanguage:
        "कृपया चैट शुरू करने के लिए अपनी पसंदीदा भाषा का चयन करें:",
      buttonLabel: "भेजें",
      languages: ["अंग्रेजी", "हिंदी", "मराठी"],
    },
    marathi: {
      welcome:
        "नमस्कार! मी म्युझियम बॉट आहे, संग्रहालयाशी संबंधित सर्व गोष्टींसाठी तुमचा एआय सहायक. मी तुम्हाला कशी मदत करू शकतो?",
      chooseLanguage: "कृपया चॅट सुरू करण्यासाठी तुमची आवडती भाषा निवडा:",
      buttonLabel: "पाठवा",
      languages: ["इंग्रजी", "हिंदी", "मराठी"],
    },
  }

  const handleLanguageSelection = (selectedLanguage: string) => {
    const lowerCaseLanguage = selectedLanguage.toLowerCase()
    setLanguage(lowerCaseLanguage)
    setIsLanguageSelected(true)
    setFormData((prevFormData) => ({
      ...prevFormData,
      language: lowerCaseLanguage,
    }))
    setMessages([
      {
        text: languageOptions[lowerCaseLanguage].welcome,
        sender: "bot",
      },
    ])
  }

  const handleSendMessage = async (inputValue: string) => {
    if (inputValue.trim() === "") return

    setMessages((prev) => [...prev, { text: inputValue, sender: "user" }])
    setIsLoading(true)

    try {
      const response = await handleApiRequest(inputValue)
      processApiResponse(response)
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, there was an error processing your request.",
          sender: "bot",
        },
      ])
    } finally {
      setIsLoading(false)
      setMessage("")
    }
  }

  const handleApiRequest = async (input: string) => {
    const response = await fetch(
      "https://museum-chatbot-api.onrender.com/chatGemini",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: input, formData }),
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  }

  const processApiResponse = (data: any) => {
    const [jsonString, aiResponse] = data.message.split("\n")

    try {
      const parsedData = JSON.parse(jsonString)
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...parsedData,
      }))
      console.log("Updated form data:", parsedData)
    } catch (error) {
      console.error("Error parsing JSON:", error)
    }

    setMessages((prev) => [...prev, { text: aiResponse, sender: "bot" }])
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    const newHeight = Math.min(80, Math.max(40, messages.length * 10)) + "vh"
    setChatHeight(newHeight)
  }, [messages])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(message)
    }
  }

  /* ----warmup server---- */

  const warmUpServer = async () => {
    try {
      const response = await fetch(
        "https://museum-chatbot-api.onrender.com/warmup",
        { method: "GET" }
      )
      if (response.ok) {
        console.log("Server warmed up successfully")
      } else {
        console.warn("Server warm-up request failed")
      }
    } catch (error) {
      console.error("Error warming up server:", error)
    }
  }

  // Use this in a useEffect hook or before making your first request
  useEffect(() => {
    warmUpServer()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      
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

            {/* Language Selection */}
            {!isLanguageSelected ? (
              <div>
                <p className="text-gray-700 mt-2">
                  {languageOptions.english.chooseLanguage}
                </p>
                <div className="flex justify-center mt-4 space-x-4">
                  {languageOptions.english.languages.map((lang, index) => (
                    <button
                      key={index}
                      onClick={() => handleLanguageSelection(lang)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-700 mt-2">
                  {languageOptions[language].welcome}
                </p>
              </>
            )}
          </div>

          {/* Service Options - Display only after language selection */}
          {isLanguageSelected && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <Link href="/exploremuseum.tsx">
                <button className="w-full bg-white border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-xl flex items-center justify-center shadow-sm hover:bg-blue-500 hover:text-white transition">
                  🎟️ Museums
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
          )}

          {/* Chat Display Section */}
          {isLanguageSelected && (
            <div
              className="border border-gray-200 rounded-lg shadow-md"
              ref={chatContainerRef}
            >
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
                    onClick={() => handleSendMessage(message)}
                    disabled={isLoading}
                  >
                    {languageOptions[language].buttonLabel || "Send"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      
    </div>
  )
}

export default Chatbot
