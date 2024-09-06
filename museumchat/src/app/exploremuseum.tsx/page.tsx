"use client"
import { FocusCards } from "@/app/components/ui/focus-cards"
import { InfiniteMovingCards } from "@/app/components/ui/moving-cards"
import Slideshow from "@/app/components/slideshow.tsx/index"
import Image from "next/image"
import Museums from "../components/museums.tsx"

const MuseumExplore = () => {
  const images = [
    "highres1.jpeg",
    "highres2.jpeg",
    "highres3.jpg",
    // "highres4.jpg",
    // "highres5.jpg",
  ]

  return (
    <>
      <div
        id="controls-carousel"
        className="relative w-full"
        data-carousel="static"
      >
        <Slideshow
          slides={images.map((image) => ({
            image: `/${image}`,
            caption: "Museum",
          }))}
        />

        {/* <button
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg
              className="w-4 h-4 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
            <svg
              className="w-4 h-4 text-white rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 9l4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button> */}
      </div>

      <section className="py-16 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-semibold text-green-600 mb-8 animate-fadeInUp">
            Museums by Categories
          </h3>

          <FocusCards
            cards={[
              { title: "Forest Adventure", src: "/images.jpg" },
              {
                title: "Valley of Life",
                src: "/Inside-Sarnath-Museum-Varanasi.jpg",
              },
              {
                title: "Sala Behta Hi Jayega",
                src: "/indian_museum_banner.jpg",
              },
            ]}
          />

          <h3 className="text-4xl font-semibold text-green-600 mt-16 mb-8 p-12 animate-fadeInUp">
            Popular Museums
          </h3>

          <FocusCards
            cards={[
              {
                title: "Forest Adventure",
                src: "/Courtyard-Indian-Museum-Kolkata-India.webp",
              },
              {
                title: "Valley of Life",
                src: "/famous-museums-in-india2.jpg",
              },
              {
                title: "Sala Behta Hi Jayega",
                src: "/Hawa-Mahal-Jaipur.jpg",
              },
            ]}
          />
        </div>
      </section>

      <footer className="bg-green-600 text-white py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold">About Medisins</h4>
            <p className="mt-4">
              Medisins is your trusted online pharmacy offering a wide range of
              medicines and healthcare products.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold">Customer Service</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:underline flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h4l1-5h9l1 5h4"
                    />
                  </svg>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shipping & Returns
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default MuseumExplore
