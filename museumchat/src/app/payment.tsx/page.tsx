"use client"
import React, { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import styles from "./payment.module.css"

const MuseumTicketPayment: React.FC = () => {
  const [upiReference, setUpiReference] = useState("")
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const link = "upi://pay?pa=parmarsanaya22@okaxis&am=1500&tn=museum_ticket"
    const upi = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      link
    )}`
    const img = document.querySelector(".get_qr") as HTMLImageElement
    if (img) img.src = upi
  }, [])

  const handleUpiReferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUpiReference(value)
    setIsValid(/^\d{12}$/.test(value))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-2xl w-full bg-white p-8 overflow-y-auto border-t-8 border-blue-500">
        <h1 className="text-2xl font-bold mb-4">Payment for Museum Ticket</h1>

        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            Scan the QR Code with any UPI App and pay the amount.
          </p>
          <div className="flex flex-col items-center">
            <img
              src=""
              alt="QR CODE"
              className="get_qr h-52 w-52 border border-gray-300 bg-gray-100 mb-4"
            />
            <button className={styles.payButton}>
              <a
                href="upi://pay?pa=parmarsanaya22@okaxis&am=1500&tn=museum_ticket"
                className={styles.clickHereToPay}
              >
                Click here to Pay
              </a>
            </button>
            <img
              src="https://st1.techlusive.in/wp-content/uploads/2023/03/UPI-apps.jpg"
              className="w-full max-w-sm"
              alt="UPI Apps"
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="upiReference" className="block mb-2">
            Enter 12-digit UPI Reference ID**
          </label>
          <input
            type="text"
            id="upiReference"
            className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
            placeholder="Enter UPI Reference ID"
            maxLength={12}
            value={upiReference}
            onChange={handleUpiReferenceChange}
            required
          />
          {!isValid && upiReference && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              Please enter a valid 12-digit UPI Reference ID.
            </p>
          )}
        </div>

        <button
          className={`w-full h-12 text-white font-medium ${
            isValid
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          } transition-colors duration-300`}
          disabled={!isValid}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default MuseumTicketPayment
