import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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

const MuseumDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [museum, setMuseum] = useState<Museum | null>(null);

  useEffect(() => {
    if (id) {
      fetch('/api/museums')
        .then(response => response.json())
        .then(data => {
          const foundMuseum = data.find((m: Museum) => m.id === id);
          setMuseum(foundMuseum || null);
        });
    }
  }, [id]);

  if (!museum) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">{museum.Name}</h1>
      <p className="mb-2"><strong>Address:</strong> {museum.Address}</p>
      <p className="mb-2"><strong>State/UT:</strong> {museum["State/UT"]}</p>
      <p className="mb-2"><strong>Year of Establishment:</strong> {museum["Year of Establishment"]}</p>
      <p className="mb-2"><strong>Theme:</strong> {museum.Theme}</p>
      <p className="mb-2"><strong>Overview:</strong> {museum.Overview}</p>
      <p className="mb-2"><strong>Ownership:</strong> {museum.Ownership}</p>
      <p className="mb-2"><strong>Social Media:</strong> {museum["Social Media"]}</p>
      <p className="mb-2"><strong>Website:</strong> {museum.Website}</p>
      <p className="mb-2"><strong>Contact:</strong> {museum.Contact}</p>
      <p className="mb-2"><strong>Admission:</strong> {museum.Admission}</p>
      <p className="mb-2"><strong>Timings:</strong> {museum.Timings}</p>
      <p className="mb-2"><strong>Facilities:</strong> {museum.Facilities}</p>
    </div>
  );
};

export default MuseumDetails;