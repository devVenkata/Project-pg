import { useState } from "react";
import {
  Sliders,
  MapPin,
  IndianRupee,
  Users,
  Wifi,
  Home,
  RotateCcw,
  Dice1,
  Star,
} from "lucide-react";

interface SearchFiltersProps {
  onFilterChange: (filters: any) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

interface FilterState {
  sharing: string[];
  preferredFor: string;
  footType: string;
  amenities: string[];
  priceRange: [number, number];
  rating: [number, number];
  category: string;
}

const amenitiesList = [
  "AC",
  "Gym",
  "TV",
  "Lift",
  "Fridge",
  "Parking",
  "Warden",
  "Security Guard",
  "Room Cleaning",
  "Power Backup",
];

export default function SearchFilters({
  onFilterChange,
  onClose,
  isMobile,
}: SearchFiltersProps) {
  const initialState: FilterState = {
    sharing: [],
    preferredFor: "",
    footType: "",
    amenities: [],
    priceRange: [5000, 25000],
    rating: [0, 5],
    category: "",
  };

  const [filters, setFilters] = useState<SearchFiltersProps>(initialState);

  const handleReset = () => {
    setFilters(initialState);
    onFilterChange(initialState);
  };

  const handleSharingChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      sharing: prev.sharing.includes(value)
        ? prev.sharing.filter((item) => item !== value)
        : [...prev.sharing, value],
    }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity],
    }));
  };
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-y-auto h-full scrollbar-thin 
      scrollbar-thumb-gray-300 scrollbar-track-transparent"
    >
      <div className="p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          </div>
          {isMobile && onClose && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-blue-600 hover:text-indigo-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="p-4 space-y-6">

        {/* Category */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Category</h3>
          <div className="flex gap-2">
            {["Co-live", "Student-live"].map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, category: cat }))
                }
                className={`px-4 py-2 rounded-full ${
                  filters.category === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
           {/* Conditional rendering for "Student-live" */}
            {filters.category === "Student-live" && (
              <div className="mt-4 flex gap-2">
                {["Gents", "Girls"].map((option) => (
                  <button
                    key={option}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, subCategory: option }))
                    }
                    className={`px-4 py-2 rounded-full ${
                      filters.subCategory === option
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
        </div>

        {/* Sharing Type */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Sharing Type</h3>
          <div className="grid grid-cols-5 gap-2">
            {[<Dice1 />].map((num) => (
              <button
                key={num}
                onClick={() => handleSharingChange(num.toString())}
                className={`p-2 text-center rounded ${
                  filters.sharing.includes(num.toString())
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Food Type */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Food Type</h3>
          <div className="flex flex-wrap gap-2">
            {["North Style", "South Style", "Both"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() =>
                    setFilters((prev) => ({ ...prev, footType: type }))
                  }
                  className={`px-4 py-2 rounded ${
                    filters.footType === type
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              )
            )}
          </div>
        </div>

        {/* Preferred For */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Preferred For</h3>
          <div className="flex flex-wrap gap-2">
            {["Students", "Professionals", "Anyone"].map((pref) => (
              <button
                key={pref}
                onClick={() =>
                  setFilters((prev) => ({ ...prev, preferredFor: pref }))
                }
                className={`px-4 py-2 rounded ${
                  filters.preferredFor === pref
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min="5000"
              max="25000"
              step="500"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  priceRange: [prev.priceRange[0], parseInt(e.target.value)],
                }))
              }
              className="w-full text-blue-500"
            />
            <div className="flex justify-between text-sm text-indigo-600">
              <span>₹5,000</span>
              <span>₹{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h3 className="font-medium mb-3">Amenities</h3>
          <div className="grid grid-cols-2 gap-2">
            {amenitiesList.map((amenity) => (
              <button
                key={amenity}
                onClick={() => handleAmenityChange(amenity)}
                className={`p-2 text-sm rounded flex items-center gap-2 ${
                  filters.amenities.includes(amenity)
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>

        {isMobile && (
          <button onClick={onClose} className="w-full btn-primary py-3 mt-4">
            Apply Filters
          </button>
        )}
      </div>
    </div>
  );
}
