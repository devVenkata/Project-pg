import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import {  Home, PlusCircle, Activity, Settings, Sliders, ChevronUp, ChevronDown, X, Search, MapPin, } from 'lucide-react';
// import SearchFilters from './SearchFilters';

export default function MobileView() {
    // const navigate = useNavigate();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    // const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    // const [searchQuery, setSearchQuery] = useState('');
    // const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    // const [locationQuery, setLocationQuery] = useState('');
    // const [filters, setFilters] = useState({
    // sharing: [],
    // preferredFor: "",
    // footType: "",
    // amenities: [],
    // priceRange: [5000, 25000],
    // rating: [0, 5],
    // category: "",
    // });


    // const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Pune'];
    // const AREAS = {
    //     Mumbai: ['Andheri', 'Bandra', 'Colaba', 'Juhu', 'Powai'],
    //     Delhi: ['Connaught Place', 'Dwarka', 'Hauz Khas', 'Rohini', 'Saket'],
    //     Bangalore: ['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield', 'JP Nagar'],
    //     Hyderabad: ['Banjara Hills', 'Jubilee Hills', 'Gachibowli', 'Hitech City', 'Madhapur'],
    //     Chennai: ['T Nagar', 'Anna Nagar', 'Adyar', 'Velachery', 'Mylapore'],
    //     Pune: ['Koregaon Park', 'Viman Nagar', 'Kothrud', 'Hinjewadi', 'Baner'],
    // };

    // const [selectedCity, setSelectedCity] = useState('');
    // // const [selectedArea, setSelectedArea] = useState('');
    // const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
    // // const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);

    // const handleFilterChange = (newFilters) => {
    //     setFilters(newFilters);
    //     // Update search query with filters
    //     navigate({
    //     pathname: '/search',
    //     search: `?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(locationQuery)}&${new URLSearchParams(newFilters).toString()}`
    //     });
    // };

    // const handleSearch = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (!searchQuery.trim() && !locationQuery.trim()) return;

    //     navigate({
    //     pathname: '/search',
    //     search: `?q=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(locationQuery)}`
    //     });
    //     setIsSearchOpen(false);
    // };

    // const toggleFilters = () => {
    //     setIsFiltersVisible(!isFiltersVisible);
    // };

    // const handleCitySelect = (city: string) => {
    //     setSelectedCity(city);
    //     // setSelectedArea('');
    //     setIsCityDropdownOpen(false);
    // };

    // const handleAreaSelect = (area: string) => {
    //   setSelectedArea(area);
    //   setIsAreaDropdownOpen(false);
    // };


  return (
    <div>
        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
            <div className="flex justify-around items-center h-16">
            <Link to="/" className="flex flex-col items-center p-2">
                <Home className="w-6 h-6 text-indigo-600" />
                <span className="text-xs">Home</span>
            </Link>
            
            <button 
                onClick={() => setIsSearchOpen(true)} 
                className="flex flex-col items-center p-2"
            >
                <Search className="w-6 h-6 text-indigo-600" />
                <span className="text-xs">Search</span>
            </button>
            
            <Link
                to="/list-your-pg"
                // onClick={() => setIsMenuOpen(false)}
                className="flex flex-col items-center"
            >
                <PlusCircle size={24} strokeWidth={1.5} className="text-indigo-600" />
                <span className="text-xs mt-1">Add PG</span>
            </Link>
            <Link to="/activity" className="flex flex-col items-center">
                <Activity size={24} strokeWidth={1.5} className="text-indigo-600" />
                <span className="text-xs mt-1">Activity</span>
            </Link>
            <Link to="/settings" className="flex flex-col items-center">
                <Settings size={24} strokeWidth={1.5} className="text-indigo-600" />
                <span className="text-xs mt-1">Settings</span>
            </Link>
            </div>
        </nav>

        {/* Mobile Search View */}
        {isSearchOpen && (
            <div className="fixed inset-0 bg-white z-50 md:hidden">
            <div className="flex flex-col h-full">
                {/* Search Header */}
                <div className="border-b">
                <div className="p-2">
                    <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">Search PGs</h2>
                    <button 
                        onClick={() => setIsSearchOpen(false)}
                        aria-label="Close search"
                    >
                        <X className="w-6 h-6" />
                    </button>
                    </div>

                    <div className="flex items-center border-t gap-2 p-3">
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-indigo-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-md">Nearby</span>
                    </button>

                    {/* <button 
                        onClick={toggleFilters}
                        className={`absolute flex right-4 items-center gap-1 px-3 py-1.5 rounded-full ${
                        isFiltersVisible ? 'bg-indigo-100 text-red-600' : 'bg-gray-100'
                        }`}
                    >
                        {isFiltersVisible ? (
                            <>
                            <X className="w-4 h-4" />
                            <span className="text-md">Close</span>
                            </>
                        ) : (
                            <>
                            <Sliders className="w-4 h-4 text-indigo-600" />
                            <span className="text-md text-indigo-600">Filters</span>
                            </>
                        )}
                    </button> */}

                    </div>

                    {/* Search bar */}
                    <div className="flex gap-2">

                    {/* Left Side */}
                    <div className="flex-1 mb-1 max-w-60">
                        <div className="relative">
                        <input
                            type="text"
                            // value={selectedCity}
                            // onChange={(e) => setSelectedCity(e.target.value)}
                            // onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                            placeholder="Select City..."
                            className="w-full px-4 py-2 pr-10 rounded-full border focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            readOnly
                        />
                        {/* <button 
                            onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                            {isCityDropdownOpen ? (
                            <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                        </button> */}

                        {/* City Dropdown */}
                        {/* {isCityDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                            {CITIES.map((city) => (
                                <button
                                key={city}
                                onClick={() => {
                                    setSelectedCity(city);
                                    setIsCityDropdownOpen(false);
                                }}
                                className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                                    selectedCity === city ? 'text-indigo-600 bg-indigo-50' : ''
                                }`}
                                >
                                {city}
                                </button>
                            ))}
                            </div>
                        )} */}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex-1 mb-1">
                        <div className="relative">
                        <input
                        type="text"
                        // value={searchQuery}
                        // onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Select Area..."
                        className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        autoFocus
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                {/* Filters Panel */}
                {/* <div className={`fixed top-[160px] w-full rounded-lg transition-all duration-300 ${
                isFiltersVisible ? 'h-[70vh] opacity-100' : 'h-0 opacity-0'
                } overflow-hidden`}>
                <SearchFilters
                    onFilterChange={handleFilterChange}
                    onClose={toggleFilters}
                    isMobile={true}
                />
                </div> */}

                {/* Search Results */}
                {/* <div className={`flex-1 overflow-y-auto p-4 ${
                isFiltersVisible ? 'hidden' : 'block'
                }`}> */}
                    {/* <span className="flex items-center">HI</span> */}
                {/* Search results content */}
                {/* </div> */}
            </div>
            </div>
            )}
    </div>
  );
}