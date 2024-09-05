// components/MuseumCard.tsx
import React from 'react';

type MuseumProps = {
  name: string;
  address: string;
  state: string;
  yearOfEstablishment: string;
  theme: string;
  overview: string;
  ownership: string;
  website: string;
  socialMedia: string;
  contact: string;
  admission: string;
  timings: string;
  facilities: string;
};

const MuseumCard: React.FC<MuseumProps> = ({
  name,
  address,
  state,
  yearOfEstablishment,
  theme,
  overview,
  ownership,
  website,
  socialMedia,
  contact,
  admission,
  timings,
  facilities,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto my-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-600 mb-1">
        <strong>Address:</strong> {address}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>State/UT:</strong> {state}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Established:</strong> {yearOfEstablishment}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Theme:</strong> {theme}
      </p>
      <p className="text-gray-600 mb-3">
        <strong>Overview:</strong> {overview.substring(0, 200)}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Ownership:</strong> {ownership}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Contact:</strong> {contact}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Admission:</strong> {admission}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Timings:</strong> {timings}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Facilities:</strong> {facilities}
      </p>
      <p className="text-blue-600 mt-2">
        <strong>Website:</strong> {website || 'Not Available'}
      </p>
      <p className="text-blue-600 mt-2">
        <strong>Social Media:</strong> {socialMedia || 'Not Available'}
      </p>
    </div>
  );
};

export default MuseumCard;
