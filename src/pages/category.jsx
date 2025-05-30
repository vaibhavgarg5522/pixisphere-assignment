import { useEffect, useState } from "react";
import axios from "axios";

import PhotographerCard from "@/components/PhotographerCard";
import FilterSidebar from "@/components/FilterSidebar";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";

export default function CategoryListingPage() {
  const [allPhotographers, setAllPhotographers] = useState([]);
  const [displayedPhotographers, setDisplayedPhotographers] = useState([]);

  const [filters, setFilters] = useState({
    maxPrice: 20000,
    minRating: 0,
    styles: [],
    city: "",
  });

  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("");

  // Load data from static file instead of JSON Server
  useEffect(() => {
    axios.get("/data.json")
      .then((res) => {
        setAllPhotographers(res.data.photographers); // ← make sure your data.json has a photographers array
      })
      .catch((error) => {
        console.error("Failed to load data.json", error);
      });
  }, []);

  useEffect(() => {
    let filtered = [...allPhotographers];

    filtered = filtered.filter((p) => {
      const isWithinPrice = p.price <= filters.maxPrice;
      const isAboveRating = p.rating >= filters.minRating;
      const isMatchingCity = !filters.city || p.location === filters.city;
      const isMatchingStyles =
        filters.styles.length === 0 ||
        filters.styles.every((style) => p.styles.includes(style));
      return isWithinPrice && isAboveRating && isMatchingCity && isMatchingStyles;
    });

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

    if (sortBy === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "ratingHighToLow") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "recent") {
      filtered.sort((a, b) => b.id - a.id);
    }

    setDisplayedPhotographers(filtered);
  }, [allPhotographers, filters, searchText, sortBy]);

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchBar searchTerm={searchText} setSearchTerm={setSearchText} />
        <SortDropdown sortOption={sortBy} setSortOption={setSortBy} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>

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
