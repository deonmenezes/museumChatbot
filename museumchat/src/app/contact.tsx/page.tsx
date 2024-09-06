import React from 'react';
import Image from 'next/image';

const ContactPage: React.FC = () => {
  return (
    <div className="font-sans">
      <div className="bg-green-500 text-white text-center py-12 md:py-16 lg:py-20">
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold m-0 h-20">Contact Us</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-around items-center p-5">
        <ContactCard
          imageSrc="/pic1.jpg"
          title="K.J. Somaiya College of Engineering"
          phone="(123) 456-7890"
          linkedin="https://www.linkedin.com/school/kj-somaiya-college-of-engineering-vidyavihar/mycompany/"
          instagram="https://www.instagram.com/kjsomaiyacollegeofengineering/"
        />
        <ContactCard
          imageSrc="/pic2.jpg"
          title="Somaiya Vidyavihar University"
          phone="(987) 654-3210"
          linkedin="https://www.linkedin.com/school/somaiya-vidyavihar-university/"
          instagram="https://www.instagram.com/somaiyavidyaviharuniversity/"
        />
      </div>
    </div>
  );
};

interface ContactCardProps {
  imageSrc: string;
  title: string;
  phone: string;
  linkedin: string;
  instagram: string;
}

const ContactCard: React.FC<ContactCardProps> = ({ imageSrc, title, phone, linkedin, instagram }) => {
  return (
    <div className="text-center mb-8 md:mb-0">
      <div className="w-44 h-36 md:w-96 md:h-80 mx-auto mb-5 overflow-hidden">
        <Image src={imageSrc} alt={title} width={450} height={400} className="object-cover w-full h-full" />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="mb-1">Phone: {phone}</p>
        <p className="mb-1">
          LinkedIn: <a href={linkedin} className="text-green-500 hover:underline">linkedin.com/{title.split(' ')[0]}</a>
        </p>
        <p>
          Instagram: <a href={instagram} className="text-green-500 hover:underline">instagram.com/{title.split(' ')[0]}</a>
        </p>
      </div>
    </div>
  );
};

export default ContactPage;