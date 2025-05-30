import { useState } from "react";

export default function SortDropdown({ sortOption, setSortOption }) {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Price: Low to High", value: "priceLowToHigh" },
    { label: "Rating: High to Low", value: "ratingHighToLow" },
    { label: "Recently Added", value: "recentlyAdded" },
  ];

  const handleSelect = (value) => {
    setSortOption(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        {options.find((opt) => opt.value === sortOption)?.label || "Sort by"}
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
