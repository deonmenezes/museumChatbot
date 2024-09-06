import { FocusCards } from "@/app/components/ui/focus-cards";
import { InfiniteMovingCards } from "@/app/components/ui/moving-cards";
import Image from 'next/image';
import Museums from "../components/museums.tsx";

const MuseumExplore = () => {
  return (
    <>
      <div id="controls-carousel" className="relative w-full" data-carousel="static">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {[1, 2, 3, 4, 5].map((index) => (
            <div
              key={index}
              className={`duration-700 ease-in-out transform transition-opacity ${index === 2 ? 'opacity-100' : 'opacity-0'}`}
              data-carousel-item={index === 2 ? 'active' : undefined}
            >
              <Image
                src="/banner.webp" // Use WebP format if available
                alt={`Banner ${index}`}
                layout="fill"
                objectFit="cover"
                quality={100}
                priority={index === 2}
                className="rounded-lg shadow-md"
              />


            </div>
          ))}
        </div>

        <button
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
        </button>
      </div>

      <section className="py-16 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-semibold text-green-600 mb-8 animate-fadeInUp">Museums by Categories</h3>

          <FocusCards
            cards={[
              { title: "Forest Adventure", src: "/banner.jpeg" },
              { title: "Valley of Life", src: "/banner.jpeg" },
              { title: " Behta Hi Jayega", src: "/banner.jpeg" },
            ]}
          />

          <h3 className="text-4xl font-semibold text-green-600 mt-16 mb-8 p-12 animate-fadeInUp">Popular Museums</h3>

          <FocusCards
            cards={[
              { title: "Forest Adventure", src: "/banner.jpeg" },
              { title: "Valley of Life", src: "/banner.jpeg" },
              { title: " Behta Hi Jayega", src: "/banner.jpeg" },
            ]}
          />
        </div>
      </section>  

      
    </>
  );
};

export default MuseumExplore;
