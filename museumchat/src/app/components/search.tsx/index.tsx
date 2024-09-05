import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Museum {
  id: string;
  Name: string;
  Address: string;
  "State/UT": string;
  "Year of Establishment": string;
  Theme: string;
  Overview: string;
  Ownership: string;
  "Social Media": string;
  Website: string;
  Contact: string;
  Admission: string;
  Timings: string;
  Facilities: string;
}

const MuseumSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Museum[]>([]);
  const [museums, setMuseums] = useState<Museum[]>([]);

  useEffect(() => {
    fetch('/api/museums')
      .then(response => response.json())
      .then(data => setMuseums(data));
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = museums.filter((museum: Museum) => {
        const combinedText = Object.values(museum).join(' ').toLowerCase();
        return combinedText.includes(searchTerm.toLowerCase());
      });
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, museums]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h2 className="text-2xl font-bold text-center mb-8">Where would you like to go?</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Find a museum..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {searchResults.length > 0 && (
        <ul className="bg-white border border-gray-300 rounded shadow-lg">
          {searchResults.map((museum) => (
            <li key={museum.id} className="p-2 hover:bg-gray-100">
              <Link href={`/museum/${museum.id}`}>
                <span className="block">
                  {museum.Name} | <span className="text-gray-600">{museum.Address}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MuseumSearch;