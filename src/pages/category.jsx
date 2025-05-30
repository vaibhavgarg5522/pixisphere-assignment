import { useEffect, useState } from "react";
import axios from "axios";

import PhotographerCard from "@/components/PhotographerCard";
import FilterSidebar from "@/components/FilterSidebar";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";

export default function CategoryListingPage() {
  // State to store all photographers from API
  const [allPhotographers, setAllPhotographers] = useState([]);

  // State to store photographers after filter/search/sort
  const [displayedPhotographers, setDisplayedPhotographers] = useState([]);

  // Filters selected by user
  const [filters, setFilters] = useState({
    maxPrice: 20000,
    minRating: 0,
    styles: [],
    city: "",
  });

  // Search bar input
  const [searchText, setSearchText] = useState("");

  // Sorting option selected
  const [sortBy, setSortBy] = useState("");

  // 1️⃣ Fetch photographers from API on first load
  useEffect(() => {
    axios.get("http://localhost:3001/photographers")
      .then((response) => {
        setAllPhotographers(response.data);
      })
      .catch((error) => {
        console.error("Failed to fetch data", error);
      });
  }, []);

  // 2️⃣ Apply filter, search, and sort when any related state changes
  useEffect(() => {
    let filtered = [...allPhotographers];

    // Filter logic
    filtered = filtered.filter((p) => {
      const isWithinPrice = p.price <= filters.maxPrice;
      const isAboveRating = p.rating >= filters.minRating;
      const isMatchingCity = !filters.city || p.location === filters.city;
      const isMatchingStyles =
        filters.styles.length === 0 ||
        filters.styles.every((style) => p.styles.includes(style));

      return isWithinPrice && isAboveRating && isMatchingCity && isMatchingStyles;
    });

    // Search logic
    if (searchText.trim() !== "") {
      const query = searchText.toLowerCase();
      filtered = filtered.filter((p) => {
        return (
          p.name.toLowerCase().includes(query) ||
          p.location.toLowerCase().includes(query) ||
          p.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      });
    }

    // Sort logic
    if (sortBy === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "ratingHighToLow") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "recent") {
      filtered.sort((a, b) => b.id - a.id); // Assuming recent = higher id
    }

    setDisplayedPhotographers(filtered);
  }, [allPhotographers, filters, searchText, sortBy]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* 🔍 Search and Sort controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar searchTerm={searchText} setSearchTerm={setSearchText} />
        <SortDropdown sortOption={sortBy} setSortOption={setSortBy} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 🧰 Filters sidebar */}
        <div className="w-full lg:w-1/4">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* 📸 Photographers list */}
        <div className="w-full lg:w-3/4">
          {displayedPhotographers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {displayedPhotographers.map((p) => (
                <PhotographerCard key={p.id} photographer={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 text-lg">
              No photographers found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
