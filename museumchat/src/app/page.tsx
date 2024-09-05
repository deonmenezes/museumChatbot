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

  // Define the type for the language keys
  type LanguageKey = 'english' | 'hindi' | 'marathi';

  // State for language selection
  const [language, setLanguage] = useState<LanguageKey>('english');
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);

  // Handle language change
  const handleLanguageChange = (lang: LanguageKey) => {
    setLanguage(lang);
    setIsLanguageSelected(true);
    setMessages([{ text: languageOptions[lang].welcome, sender: "bot" }]);
  };

  // Language options text
  interface LanguageOption {
    welcome: string;
    chooseLanguage: string;
    buttonLabel: string;
    languages: string[];
  }

  const languageOptions: Record<LanguageKey, LanguageOption> = {
    english: {
      welcome: "Hello! I'm MuseumBot, your AI assistant for all things museum-related. How can I help you today?",
      chooseLanguage: "Choose your preferred language:",
      buttonLabel: "Send",
      languages: ['english', 'hindi', 'marathi'],
    },
    hindi: {
      welcome: "नमस्ते! मैं म्यूज़ियमबोट हूं, आपके सभी संग्रहालय से संबंधित सवालों के लिए आपकी AI सहायक। मैं आपकी किस तरह से मदद कर सकता हूँ?",
      chooseLanguage: "अपनी पसंदीदा भाषा चुनें:",
      buttonLabel: "भेजें",
      languages: ['english', 'hindi', 'marathi'],
    },
    marathi: {
      welcome: "नमस्कार! मी म्युझियमबोट आहे, संग्रहालयाशी संबंधित सर्व गोष्टींसाठी तुमचा AI सहाय्यक. मी तुम्हाला कशा प्रकारे मदत करू शकतो?",
      chooseLanguage: "आपली पसंतीची भाषा निवडा:",
      buttonLabel: "पाठवा",
      languages: ['english', 'hindi', 'marathi'],
    },
  };

  // Send a message and handle bot's response
  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: "user" },
    ]);
    setMessage("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(message);
      const response = result.response;
      const text = response.text();

      setMessages((prevMessages) => [
        ...prevMessages,
        { text, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Sorry, I encountered an error. Please try again.", sender: "bot" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle enter key press to send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Scroll to the bottom when a new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    // Dynamically adjust chat height
    const newHeight = Math.min(80, Math.max(40, messages.length * 10)) + "vh";
    setChatHeight(newHeight);
  }, [messages]);

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
              <Link href="/faqs" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/chatbot" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
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
                      onClick={() => handleLanguageChange(lang as LanguageKey)}
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
                <div ref={messagesEndRef} />
              </div>

              {/* Input Section */}
              <div className="flex border-t border-gray-200 p-4">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-grow border-2 border-gray-300 rounded-l-lg p-2 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-r-lg ${
                    isLoading
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {isLoading ? "..." : languageOptions[language].buttonLabel}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#698474] p-4 text-center">
        <p className="text-[#FCF8F3]">
          &copy; {new Date().getFullYear()} Museumaire. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default Chatbot
