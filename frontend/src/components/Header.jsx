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
w-full max-w-6xl mx-auto
bg-white/20 backdrop-blur-3xl
px-5 py-3 sm:px-7 sm:py-4
rounded-4xl shadow-sm  border-white/80 dark:border-gray-700/40
z-40 flex justify-between items-center
transition-all duration-300
`}
      >
        {/* Left side - Sidebar toggle + Search */}
        <div className="flex items-center gap-4">
          {/* Sidebar toggle (mobile) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/40 dark:bg-gray-700/40 
                 hover:bg-white/60 dark:hover:bg-gray-600/50 
                 transition-all shadow-sm"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <X size={20} className="text-gray-800 dark:text-gray-200" />
            ) : (
              <Menu size={20} className="text-gray-800 dark:text-gray-200" />
            )}
          </button>

          {/* Search */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-52 sm:w-64 lg:w-80 xl:w-96 px-4 py-2 pl-10 
          text-sm sm:text-base 
          rounded-2xl border border-white/50 
          bg-white/50 
          backdrop-blur-md 
          placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-400/40 
          transition-all shadow-sm"
            />
            <Search className="w-5 h-5 absolute left-3 text-gray-500 dark:text-gray-400" />
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <button
            onClick={handlebellclick}
            className="relative p-2 rounded-xl bg-white/50
                 hover:bg-white/80
                 transition-all shadow-sm"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-gray-500" />
            <span
              className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 
                      text-white text-xs font-bold rounded-full flex 
                      items-center justify-center shadow-sm"
            >
              3
            </span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-white/50
                 hover:bg-white/80 
                 transition-all shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <Sun size={20} className="text-black/60" />
            ) : (
              <Moon size={20} className="text-black/60" />
            )}
          </button>

          {/* User Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl 
                   bg-white/50 
                   hover:bg-white/80 
                   transition-all shadow-sm"
              aria-label="User menu"
            >
              <User size={20} className="text-gray-700 " />
              <span className="hidden lg:block text-sm font-medium text-gray-700 ">
                {user?.name || "Guest"}
              </span>
              <ChevronDown size={14} className="text-gray-700 " />
            </button>

            <AnimatePresence>
              {isUserDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 w-56 sm:w-64
                            bg-white/50 backdrop-blur-2xl
                            rounded-4xl shadow-md border border-white/50
                            py-2 z-50"
                >
                  <div className="px-4 py-3 border-b border-gray-200/30">
                    <p className="font-medium text-gray-700">
                      {user?.name || "Guest"}
                    </p>
                    <p className="text-sm text-gray-600/80 ">
                      {user?.email || "guest@example.com"}
                    </p>
                  </div>

                  {/* Language Switch */}
                  <div className="px-4 py-3 border-b border-gray-200/30">
                    <p className="text-sm font-medium text-gray-600/80  mb-2">
                      Language
                    </p>
                    <div className="flex  rounded-lg p-1">
                      <button
                        onClick={() => handleLanguageChange("en")}
                        className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                          language === "en"
                            ? "bg-white text-black-600 shadow"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => handleLanguageChange("ml")}
                        className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                          language === "ml"
                            ? "bg-white text-black-600 shadow"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        മലയാളം
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={handlesettingsclick}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-black hover:bg-black/10 rounded-lg transition-colors"
                  >
                    {t.profileSettings}
                  </button>
                  <button
                    onClick={handlepreferencesclick}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:text-black hover:bg-black/10  rounded-lg transition-colors"
                  >
                    {t.preferences}
                  </button>
                  <div className="border-t border-gray-200/50 dark:border-gray-700/50 mt-1 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-500/20 rounded-lg transition-colors"
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
