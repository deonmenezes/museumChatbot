// App.tsx
"use client"
import React, { useState } from "react"
import { Mail, Phone, MapPin, Calendar, Clock } from "lucide-react"
import TypingEffect from "../components/TypingEffect/TypingEffect"

// Main App component
const App = () => {
  const [ticketType, setTicketType] = useState("")
  const [visitDate, setVisitDate] = useState("")
  const [visitTime, setVisitTime] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [responses, setResponses] = useState<
    { message: string; isError: boolean }[]
  >([])

  const addResponse = (message: string, isError = false) => {
    setResponses((prev) => [...prev, { message, isError }])
  }

  const handleTicketSelection = (type: string) => {
    setTicketType(type)
    addResponse(`You've selected a ${type} ticket.`)
  }

  const handleDateSelection = (date: string) => {
    setVisitDate(date)
    if (date) {
      addResponse(`Your visit is scheduled for ${date}.`)
    } else {
      addResponse("Please select a valid date.", true)
    }
  }

  const handleTimeSelection = (time: string) => {
    setVisitTime(time)
    if (time) {
      addResponse(`You've chosen ${time} as your visit time.`)
    } else {
      addResponse("Please select a valid time.", true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (ticketType && visitDate && visitTime && name && email && phone) {
      addResponse("Booking complete! See you at the museum.")
    } else {
      addResponse("Please complete all fields before submitting.", true)
    }
  }

  const [showPersonalInfoChat, setShowPersonalInfoChat] = useState(false)
  const [showDateChat, setShowDateChat] = useState(false)
  const [showTimeChat, setShowTimeChat] = useState(false)
  const [showSeperateInfoChat, setShowSeperateInfoChat] = useState(false)
  const handleUserInput = (input: any) => {
    // Regex patterns for personal info, date, and time
    const personalInfoPattern = /(name|phone|email|address|contact)/i
    const datePattern = /(date|birthday|anniversary)/i
    const timePattern = /(time|clock|hour|minute|second)/i

    // Check if input matches any of the patterns
    const isPersonalInfo = personalInfoPattern.test(input)
    const isDateRelated = datePattern.test(input)
    const isTimeRelated = timePattern.test(input)

    // Update states based on matches
    if (isPersonalInfo) {
      setShowPersonalInfoChat(true)
    } else if (isDateRelated) {
      setShowDateChat(true)
    } else if (isTimeRelated) {
      setShowTimeChat(true)
    } else {
      setShowSeperateInfoChat(true)
    }
  }
  // Handle button click event
  const handleClick = (): void => {
    const userInput = (
      document.getElementById("user-input") as HTMLInputElement
    ).value
    handleUserInput(userInput)
  }
  return (
    <div className="min-h-screen bg-[#FCF8F3] font-sans">
      {/* Navbar */}
      <nav className="bg-[#698474] p-4">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <h1 className="text-[#FCF8F3] text-2xl font-bold">City Museum</h1>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
                Exhibitions
              </a>
            </li>
            <li>
              <a href="#" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
                Book Tickets
              </a>
            </li>
            <li>
              <a href="#" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
                FAQs
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto p-8">
        <h2 className="text-[#698474] text-2xl mb-4">Book Your Tickets</h2>

        {/* Booking Section */}
        <div className="bg-[#DCA47C] p-4 rounded-md mb-6">
          <form onSubmit={handleSubmit}>
            {/* Ticket Selection */}
            <div className="mb-4">
              <h3 className="text-lg text-white mb-2">Select Ticket Type:</h3>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => handleTicketSelection("adult")}
                  className={`${
                    ticketType === "adult" ? "bg-[#5a7163]" : "bg-[#698474]"
                  } text-[#FCF8F3] px-4 py-2 rounded-md hover:bg-[#5a7163] transition-colors`}
                >
                  🧑 Adult
                </button>
                <button
                  type="button"
                  onClick={() => handleTicketSelection("child")}
                  className={`${
                    ticketType === "child" ? "bg-[#5a7163]" : "bg-[#698474]"
                  } text-[#FCF8F3] px-4 py-2 rounded-md hover:bg-[#5a7163] transition-colors`}
                >
                  👶 Child
                </button>
                <button
                  type="button"
                  onClick={() => handleTicketSelection("senior")}
                  className={`${
                    ticketType === "senior" ? "bg-[#5a7163]" : "bg-[#698474]"
                  } text-[#FCF8F3] px-4 py-2 rounded-md hover:bg-[#5a7163] transition-colors`}
                >
                  👴 Senior
                </button>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-4 date-component">
              <h3 className="text-lg text-white mb-2">Select Date:</h3>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => handleDateSelection(e.target.value)}
                className="border p-2 rounded-md w-full"
              />
              <div
                className={`chat-response ${
                  showDateChat ? `visible` : `hidden`
                }`}
              >
                {showDateChat && (
                  <TypingEffect
                    text="Today's date is August 31, 2024. If you need information about specific dates, events, or deadlines, just let me know."
                    speed={240} // You can adjust the speed here
                  />
                )}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-4 time-component">
              <h3 className="text-lg text-white mb-2">Select Time:</h3>
              <input
                type="time"
                value={visitTime}
                onChange={(e) => handleTimeSelection(e.target.value)}
                className="border p-2 rounded-md w-full"
              />
              <div
                className={`chat-response ${
                  showTimeChat ? `visible` : `hidden`
                }`}
              >
                {showTimeChat && (
                  <TypingEffect
                    text="The current time is 3:45 PM. If you need help converting time zones or setting reminders, feel free to ask!"
                    speed={240} // You can adjust the speed here
                  />
                )}
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-4 personal-info-container">
              <h3 className="text-lg text-white mb-2">Personal Information:</h3>
              <div className="chat-individual-container">
                <div className="personal-info-component">
                  <img src="/user.png" alt="name"></img>
                  <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded-md w-full mb-2"
                  />
                </div>
                <div className="personal-info-component">
                  <img src="/envelopes.png" alt="email"></img>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded-md w-full mb-2"
                  />
                </div>
                <div className="personal-info-component">
                  <img src="/phone.png"></img>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border p-2 rounded-md w-full"
                  />
                </div>
              </div>
              <div
                className={`chat-response ${
                  showPersonalInfoChat ? `visible` : `hidden`
                }`}
              >
                {showPersonalInfoChat && (
                  <TypingEffect
                    text="You've asked about personal information. Please provide your name, phone number, or email if you'd like us to assist you with your account."
                    speed={240} // You can adjust the speed here
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              // onClick={() => {setShowDateChat((prev) => !prev); setShowTimeChat((prev) => !prev); setShowPersonalInfoChat((prev) => !prev)}}
              className="bg-[#698474] text-[#FCF8F3] px-4 py-2 rounded-md hover:bg-[#5a7163] transition-colors"
            >
              Complete Booking
            </button>
          </form>

          {/* Display booking responses */}
          {responses.map((res, idx) => (
            <p
              key={idx}
              className={`mt-2 text-sm ${
                res.isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {res.message}
            </p>
          ))}
          <div
            className={`chat-response ${
              showSeperateInfoChat ? `visible` : `hidden`
            }`}
          >
            {showSeperateInfoChat && (
              <TypingEffect
                text="It seems like your query doesn't relate to personal info, time, or dates. Please specify what you need help with, and I'll do my best to assist you."
                speed={240} // You can adjust the speed here
              />
            )}
          </div>
        </div>

        {/* Cards Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-[#FFD3B6] rounded-lg shadow-md overflow-hidden">
            <div className="bg-[#DCA47C] p-4 text-[#FCF8F3] font-bold">
              Ancient Artifacts
            </div>
            <div className="p-4">
              <p>Explore ancient artifacts from around the world.</p>
            </div>
          </div>
          <div className="bg-[#FFD3B6] rounded-lg shadow-md overflow-hidden">
            <div className="bg-[#DCA47C] p-4 text-[#FCF8F3] font-bold">
              Modern Art
            </div>
            <div className="p-4">
              <p>Dive into our collection of modern art pieces.</p>
            </div>
          </div>
          <div className="bg-[#FFD3B6] rounded-lg shadow-md overflow-hidden">
            <div className="bg-[#DCA47C] p-4 text-[#FCF8F3] font-bold">
              Historical Documents
            </div>
            <div className="p-4">
              <p>Discover historical documents and their significance.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#698474] text-[#FCF8F3] p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <p>&copy; 2024 City Museum. All rights reserved.</p>
          <div className="flex space-x-4">
            <Mail className="w-5 h-5" />
            <Phone className="w-5 h-5" />
            <MapPin className="w-5 h-5" />
            <Calendar className="w-5 h-5" />
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </footer>
      <div id="query-section">
        <h3 className="text-xl mb-4 text-blue-700">Have a question?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <input
            type="text"
            id="user-input"
            placeholder="Type your message..."
            className="flex-grow p-3 border rounded-full text-lg soft-shadow"
          ></input>
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg bouncy soft-shadow"
            onClick={handleClick}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
