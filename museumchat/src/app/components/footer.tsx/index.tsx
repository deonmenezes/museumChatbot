import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-12">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 City Museum. All rights reserved.</p>
        <ul className="flex justify-center space-x-6 mt-4">
          <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
          <li><a href="#" className="hover:text-gray-400">Terms of Service</a></li>
          <li><a href="#" className="hover:text-gray-400">Contact Us</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
