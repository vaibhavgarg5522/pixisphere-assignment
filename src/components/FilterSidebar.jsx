import { useEffect, useState } from "react";

const styleOptions = ["Traditional", "Candid", "Studio", "Outdoor"];
const cityOptions = ["Bengaluru", "Delhi", "Mumbai", "Hyderabad"];

export default function FilterSidebar({ filters, setFilters }) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setFilters(localFilters);
    }, 300);

    return () => clearTimeout(debounce);
  }, [localFilters]);

  const handleStyleChange = (style) => {
    setLocalFilters((prev) => ({
      ...prev,
      styles: prev.styles.includes(style)
        ? prev.styles.filter((s) => s !== style)
        : [...prev.styles, style],
    }));
  };

  return (
    <aside className="w-full md:w-64 p-4 border rounded-xl shadow bg-white">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Max Price (₹):</label>
        <input
          type="range"
          min="5000"
          max="20000"
          step="500"
          value={localFilters.maxPrice}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, maxPrice: Number(e.target.value) })
          }
          className="w-full mt-2"
        />
        <div className="text-sm text-gray-600 mt-1">Up to ₹{localFilters.maxPrice}</div>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Minimum Rating:</label>
        <select
          value={localFilters.minRating}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, minRating: Number(e.target.value) })
          }
          className="mt-2 w-full p-2 border rounded"
        >
          {[0, 3, 4, 4.5].map((r) => (
            <option key={r} value={r}>
              {r}+
            </option>
          ))}
        </select>
      </div>

      {/* Styles */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Styles:</label>
        {styleOptions.map((style) => (
          <label key={style} className="flex items-center text-sm mb-1">
            <input
              type="checkbox"
              checked={localFilters.styles.includes(style)}
              onChange={() => handleStyleChange(style)}
              className="mr-2"
            />
            {style}
          </label>
        ))}
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">City:</label>
        <select
          value={localFilters.city}
          onChange={(e) =>
            setLocalFilters({ ...localFilters, city: e.target.value })
          }
          className="w-full p-2 border rounded"
        >
          <option value="">All Cities</option>
          {cityOptions.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}
