"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"

interface SlideProps {
  image: string
  caption: string
}

const Slideshow: React.FC<{ slides: SlideProps[] }> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)

    return () => clearTimeout(timer)
  }, [currentSlide, slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    )
  }

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
  }

  return (
    <div className="relative w-full">
      <div className="relative h-[400px] md:h-[600px]">
        {" "}
        {/* Adjust height as needed */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.caption}
              fill
              style={{ objectFit: "cover" }}
              sizes="100vw"
              priority={index === currentSlide}
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white text-lg bg-black bg-opacity-50 py-2">
              {slide.caption}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={goToPrevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
      >
        &#10094;
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-colors"
      >
        &#10095;
      </button>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default Slideshow
