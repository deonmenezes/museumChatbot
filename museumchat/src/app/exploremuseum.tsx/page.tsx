import { FocusCards } from "@/app/components/ui/focus-cards";
import { InfiniteMovingCards } from "@/app/components/ui/moving-cards";
import Image from 'next/image';


const MuseumExplore = () => {
    return ( 
        <>
        <header className="bg-white shadow">
        <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-6">
          <div className="text-green-600 text-2xl font-bold">
            <h1>Museum Chatbot</h1>
          </div>
          <nav className="w-full lg:w-auto mt-4 lg:mt-0">
            <ul className="flex flex-wrap justify-center lg:justify-end space-x-6">
              <li><a href="/chatbot" className="text-green-600 hover:text-green-800">Home</a></li>
              <li><a href="/" className="text-green-600 hover:text-green-800">Chatbot</a></li>
              <li><a href="/chatbot" className="text-green-600 hover:text-green-800">About Us</a></li>
              <li><a href="#" className="text-green-600 hover:text-green-800">Contact Us</a></li>
            </ul>
          </nav>
          <div className="flex flex-wrap justify-end space-x-4 mt-4 lg:mt-0">
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="border border-green-600 rounded px-4 py-2 focus:outline-none focus:border-green-800 w-full lg:w-auto"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 w-full lg:w-auto">Search</button>
          </div>
          <div className="flex space-x-4 mt-4 lg:mt-0">
            <a href="#" className="text-green-600 hover:text-green-800">Login</a>
          </div>
        </div>
      </header>

      <div id="controls-carousel" className="relative w-full" data-carousel="static">
        <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className={`duration-700 ease-in-out ${index === 2 ? '' : 'hidden'}`} data-carousel-item={index === 2 ? 'active' : undefined}>
              <Image
                src="/banner.jpeg"
                alt={`Banner ${index}`}
                layout="fill"
                objectFit="cover"
                priority={index === 2}
              />
            </div>
          ))}
    </div>
    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
</div>

      <section className="py-16 bg-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-green-600 mb-8">Museums by Categories</h3>

          

          <FocusCards cards={[
       {
        title: "Forest Adventure",
        src: "/banner.jpeg",
      },
      {
        title: "Valley of life",
        src: "/banner.jpeg",
      },
      {
        title: "Sala behta hi jayega",
        src: "/banner.jpeg",
      },
     
      
    ]}></FocusCards>
    <h3 className="text-3xl font-bold text-green-600 mb-8 p-12">Popular Museums</h3>
    <FocusCards cards={[
       {
        title: "Forest Adventure",
        src: "/banner.jpeg",
      },
      {
        title: "Valley of life",
        src: "/banner.jpeg",
      },
      {
        title: "Sala behta hi jayega",
        src: "/banner.jpeg",
      },
     
      
    ]}></FocusCards>
    
        </div>
      </section>

      <section className="py-16 bg-green-50">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold text-green-600 mb-8">Featured Museums</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <Image src="/nexium-2.jpg" alt="Product Image" width={400} height={200} className="rounded-lg" />
              <h4 className="mt-4 text-green-600 font-semibold">Premium Medicine</h4>
              <p className="mt-2 text-gray-600">$19.99</p>
              <a href="#" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800">Add to Cart</a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <Image src="/download (1).jpeg" alt="Product Image" width={300} height={100} className="rounded-lg" />
              <h4 className="mt-4 text-green-600 font-semibold"> Ayurvedic Herbal Medicine</h4>
              <p className="mt-2 text-gray-600">$29.99</p>
              <a href="#" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800">Add to Cart</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-green-600 text-white py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold">About Medisins</h4>
            <p className="mt-4">Medisins is your trusted online pharmacy offering a wide range of medicines and healthcare products.</p>
          </div>
          <div>
            <h4 className="text-xl font-bold">Customer Service</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
              <li><a href="#" className="hover:underline">Shipping & Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold">Legal</h4>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    
        </>
     );
}
 
export default MuseumExplore;