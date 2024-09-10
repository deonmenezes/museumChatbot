'use client'
import React, { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

const Navigator = () => {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-[#698474] p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-[#FCF8F3] text-3xl font-bold">Museumaire</h1>
        <div className="hidden md:flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li>
              <Link href="/payment.tsx" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact.tsx" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/chatbot" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
                Chatbot
              </Link>
            </li>
          </ul>
          <div className="relative">
            <button
              onClick={toggleSearch}
              className="bg-green-600 text-white p-2 rounded-full hover:bg-green-800"
            >
              <Search size={24} />
            </button>
            {isSearchExpanded && (
              <div className="absolute right-0 top-full mt-2 flex">
                <input
                  type="text"
                  placeholder="Search for museums.."
                  className="border border-green-600 rounded-l px-4 py-2 focus:outline-none focus:border-green-800 w-64"
                />
                <button className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-800">
                  Search
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-[#FCF8F3] hover:text-[#FFD3B6]"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link href="/payment.tsx" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/contact.tsx" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/chatbot" className="text-[#FCF8F3] hover:text-[#FFD3B6]">
                Chatbot
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Search for museums.."
                className="border border-green-600 rounded-l px-4 py-2 focus:outline-none focus:border-green-800 w-full"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-800">
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigator;