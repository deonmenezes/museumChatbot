import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">City Museum</h1>
        <ul className="flex space-x-6">
          <li><a href="#" className="hover:text-blue-200">Home</a></li>
          <li><a href="#" className="hover:text-blue-200">Exhibitions</a></li>
          <li><a href="#" className="hover:text-blue-200">Book Tickets</a></li>
          <li><a href="#" className="hover:text-blue-200">FAQs</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
