import { useState, useEffect } from 'react';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  const [localQuery, setLocalQuery] = useState(searchTerm);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchTerm(localQuery);
    }, 300);

    return () => clearTimeout(debounce);
  }, [localQuery, setSearchTerm]);

  return (
    <input
      type="text"
      placeholder="Search by name, location, or tag..."
      className="w-full px-4 py-2 border rounded-md shadow-sm"
      value={localQuery}
      onChange={(e) => setLocalQuery(e.target.value)}
    />
  );
}
