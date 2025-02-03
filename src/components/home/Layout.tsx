import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  LogIn,
  Plus,
  Menu,
  X,
  LogOut,
  User,
  Search,
  MapPin,
  Home,
  PlusCircle,
  Activity,
  Settings,
  Sliders,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { toast } from "sonner";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const showBackButton = location.pathname !== "/";
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState("");
  const isHomePage = location.pathname === "/home";
  const [filters, setFilters] = useState({
    sharing: [],
    preferredFor: "",
    footType: "",
    amenities: [],
    priceRange: [5000, 25000],
    rating: [0, 5],
    category: "",
  });
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const isAuthPage = ["/login", "/register", "/forgot-password"].includes(
    location.pathname
  );
  const hideSearchBar = ["/login", "/register", "/forgot-password"].includes(
    location.pathname
  );

  const { user, isAuthenticated, logout } = useAuthStore();

  const CITIES = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Pune",
  ];
  const AREAS = {
    Mumbai: ["Andheri", "Bandra", "Colaba", "Juhu", "Powai"],
    Delhi: ["Connaught Place", "Dwarka", "Hauz Khas", "Rohini", "Saket"],
    Bangalore: [
      "Koramangala",
      "Indiranagar",
      "HSR Layout",
      "Whitefield",
      "JP Nagar",
    ],
    Hyderabad: [
      "Banjara Hills",
      "Jubilee Hills",
      "Gachibowli",
      "Hitech City",
      "Madhapur",
    ],
    Chennai: ["T Nagar", "Anna Nagar", "Adyar", "Velachery", "Mylapore"],
    Pune: ["Koregaon Park", "Viman Nagar", "Kothrud", "Hinjewadi", "Baner"],
  };

  const [selectedCity, setSelectedCity] = useState("");
  // const [selectedArea, setSelectedArea] = useState('');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  // const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);

  const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const onSubmit = async (data: LoginFormData) => {
      try {
        await login(data);
        toast.success("Successfully logged in");
        navigate("/home");
      } catch (err) {
        toast.error("Login failed. Please try again.");
      }
    };
  };

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out", { duration: 2000 });
    navigate("/");
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() && !locationQuery.trim()) return;

    navigate({
      pathname: "/search",
      search: `?q=${encodeURIComponent(
        searchQuery
      )}&location=${encodeURIComponent(locationQuery)}`,
    });
    setIsSearchOpen(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Update search query with filters
    navigate({
      pathname: "/search",
      search: `?q=${encodeURIComponent(
        searchQuery
      )}&location=${encodeURIComponent(locationQuery)}&${new URLSearchParams(
        newFilters
      ).toString()}`,
    });
  };

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    // setSelectedArea('');
    setIsCityDropdownOpen(false);
  };

  // const handleAreaSelect = (area: string) => {
  //   setSelectedArea(area);
  //   setIsAreaDropdownOpen(false);
  // };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b-2 sticky top-0 h-16 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <nav className="relative">
            <div className="flex items-center justify-between gap-4">
              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2.5 group shrink-0 py-1"
              >
                <div className="bg-white shadow-md rounded-xl p-1.5 group-hover:shadow-lg transition-shadow duration-200">
                  <Building2 className="h-6 w-6 sm:h-7 sm:w-7 text-indigo-600 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                  PG Hunt
                </h1>
              </Link>

              {/* Desktop Search Bar - Hidden on Mobile */}

              {isAuthenticated && isHomePage && !isAuthPage && !hideSearchBar && (
                <div className="hidden md:flex flex-1 max-w-2xl mx-4">
                  <div className="relative w-full">
                    <div className="flex gap-2">
                      {/* Nearby Location */}
                      <div className="relative">
                        <button className="flex items-center gap-1 px-4 py-2 rounded-full border-2 bg-white hover:bg-gray-100 hover:text-indigo-500">
                          <MapPin className="w-4 h-4" />
                          <span className="text-md">Nearby</span>
                        </button>
                      </div>

                      {/* Left Side */}
                      <div className="flex-1 mb-1 max-w-60">
                        <div className="relative">
                          <input
                            type="text"
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            onClick={() =>
                              setIsCityDropdownOpen(!isCityDropdownOpen)
                            }
                            placeholder="Select City..."
                            className="w-full px-4 py-2 pr-10 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                            readOnly
                          />
                          <button
                            onClick={() =>
                              setIsCityDropdownOpen(!isCityDropdownOpen)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            {isCityDropdownOpen ? (
                              <ChevronUp className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            )}
                          </button>

                          {/* City Dropdown */}
                          {isCityDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                              {CITIES.map((city) => (
                                <button
                                  key={city}
                                  onClick={() => {
                                    setSelectedCity(city);
                                    setIsCityDropdownOpen(false);
                                  }}
                                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 ${
                                    selectedCity === city
                                      ? "text-indigo-600 bg-indigo-50"
                                      : ""
                                  }`}
                                >
                                  {city}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="flex-1 mb-1">
                        <div className="relative">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Select Area..."
                            className="w-full px-4 py-2 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            autoFocus
                          />
                          <Search className="absolute right-3 top-1/2 border- transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Desktop Navigation Items */}
              {!isAuthPage && (
                <div className="hidden lg:flex items-center gap-4">
                  {/* Show "List Your PG" only when authenticated */}
                  {isAuthenticated && (
                    <Link
                      to="/list-your-pg"
                      className="btn-primary flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      List Your PG
                    </Link>
                  )}

                  {isAuthenticated ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <User className="w-5 h-5 text-indigo-600" />
                        </div>
                        <span className="font-medium">{user?.name}</span>
                      </button>

                      {isProfileOpen && (
                        <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg py-1 border border-gray-100 animate-fade-in">
                          <button
                            // onClick={}
                            className="w-full px-4 py-2 text-left text-indigo-400 hover:text-indigo-400 flex items-center gap-2"
                          >
                            <User className="w-4 h-4" />
                            Profile
                          </button>
                          <button>
                            <Link
                              to="/listings"
                              className="w-full px-4 py-2 text-left text-indigo-400 hover:text-indigo-600 flex items-center gap-2"
                            >
                              <Home className="w-4 h-4" />
                              Listings
                            </Link>
                          </button>

                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-left text-indigo-400 hover:text-red-400 flex items-center gap-2"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign out
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="btn-secondary flex items-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </Link>
                  )}
                </div>
              )}

              {/* Mobile Menu Button - Only visible on mobile */}
              <div className="lg:hidden">
                <div className="p-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  {isAuthenticated ? (
                    <>
                      <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center gap-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                      >
                        {!isMenuOpen ? (
                          <X className="w-6 h-6" />
                        ) : (
                          <Menu className="w-6 h-6" />
                        )}
                      </button>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        className="flex items-center gap-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LogIn className="w-4 h-4" />
                        Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {!isAuthPage && (
              <div
                className={`lg:hidden fixed inset-x-0 top-[64px] h-[calc(100vh-64px)] bg-white z-50 transform transition-all duration-300 ease-in-out origin-top-right ${
                  isMenuOpen ? "translate-x-full" : "-translate-x-0"
                }`}
              >
                <div className="h-full overflow-y-auto px-4 py-6">
                  <div className="p-3">
                    {isAuthenticated ? (
                      <>
                        <div className="px-3 py-2 mb-4 border-b">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <User className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                              <p className="font-medium">{user?.name}</p>
                              <p className="text-sm text-gray-500">
                                {user?.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Link
                            to="/profile"
                            className="w-full btn-secondary flex items-center justify-center gap-2 py-2.5"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <User className="w-4 h-4" />
                            Profile
                          </Link>

                          <Link
                            to="/list-your-pg"
                            className="w-full btn-secondary flex items-center justify-center gap-2 py-2.5"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <Home className="w-4 h-4" />
                            Listings
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="w-full btn-secondary flex items-center justify-center gap-2 py-2.5"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign out
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
