import React, { useState, useEffect } from "react";
import { Search, Bell, User, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { searchDocuments } from "../api/services";
import { Sun, Moon } from "lucide-react";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  //dark mode

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchDocuments(query);
        setResults(data); // store results
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, 500); // wait 500ms after typing

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  const handlebellclick = () => {
    setIsUserDropdownOpen(false);
    navigate("/notifications");
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsUserDropdownOpen(false);
  };

  const handlesettingsclick = () => {
    setIsUserDropdownOpen(false);
    navigate("/profile-settings");
  };

  const handlepreferencesclick = () => {
    setIsUserDropdownOpen(false);
    navigate("/preferences");
  };

  return (
    <>
      <header
        className={`
          fixed top-4 left-3/5 -translate-x-1/2
          w-[calc(100%-2rem)] lg:w-[calc(100%-20rem)]
          bg-gray/90 backdrop-blur-xl
          px-4 py-3 sm:px-6 sm:py-4
          bg-white/30
        
          rounded-2xl  
          z-40 flex justify-between items-center
          transition-all duration-300
        `}
      >
        {/* Left side - Sidebar toggle + Search */}
        <div className="flex items-center gap-3">
          {/* Sidebar toggle (mobile) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X size={20} className="text-gray-700" />
            ) : (
              <Menu size={20} className="text-gray-700" />
            )}
          </button>

          {/* Search */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-48 sm:w-64 lg:w-80 xl:w-96 px-3 py-1.5 pl-9 
                text-sm sm:text-base border border-gray-200 
                rounded-lg focus:outline-none focus:ring-2 
                focus:ring-black-50 transition-all"
            />
            <Search className="w-4 h-4 sm:w-5 sm:h-5 absolute left-3 text-gray-400" />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          {/* Notifications */}
          <button
            onClick={handlebellclick}
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-700 dark:text-gray-200" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <Sun size={20} className="text-yellow-400" />
            ) : (
              <Moon size={20} className="text-gray-700 dark:text-gray-200" />
            )}
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-1 sm:gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="User menu"
            >
              <User size={20} className="text-gray-700" />
              <span className="hidden lg:block text-sm font-medium text-gray-700">
                {user?.name || "Guest"}
              </span>
              <ChevronDown size={14} className="text-gray-500" />
            </button>

            <AnimatePresence>
              {isUserDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-medium text-gray-800">
                      {user?.name || "Guest"}
                    </p>
                    <p className="text-sm text-gray-500">
                      {user?.email || "guest@example.com"}
                    </p>
                  </div>

                  {/* Language Switch */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Language
                    </p>
                    <div className="flex bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => handleLanguageChange("en")}
                        className={`flex-1 px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                          language === "en"
                            ? "bg-white text-green-600 shadow"
                            : "text-gray-600"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => handleLanguageChange("ml")}
                        className={`flex-1 px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                          language === "ml"
                            ? "bg-white text-green-600 shadow"
                            : "text-gray-600"
                        }`}
                      >
                        മലയാളം
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handlesettingsclick}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {t.profileSettings}
                  </button>
                  <button
                    onClick={handlepreferencesclick}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {t.preferences}
                  </button>
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      {t.signOut}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* 🔎 Results Dropdown under search box */}
      {query && (
        <div className="absolute left-16 mt-16 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {loading ? (
            <p className="p-3 text-gray-500 text-sm">Searching...</p>
          ) : results.length > 0 ? (
            <ul>
              {results.map((doc) => (
                <li
                  key={doc.id}
                  className="p-3 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/documents/${doc.id}`)}
                >
                  {doc.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-3 text-gray-500 text-sm">No results found</p>
          )}
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isUserDropdownOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsUserDropdownOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
