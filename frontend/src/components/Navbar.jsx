import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = ({ user, setUser }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (!user) return;
    const delay = setTimeout(() => {
      navigate(search.trim() ? `/?search=${encodeURIComponent(search)}` : "/");
    }, 500);
    return () => clearTimeout(delay);
  }, [search, navigate, user]);

  useEffect(() => {
    setSearch("");
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="p-4 shadow-lg flex items-center justify-between">
      <Link to="/" className="font-bold text-xl">
        Notes App
      </Link>

      {user && (
        <div className="flex items-center space-x-4 w-full max-w-3xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="flex-grow"
          />

          {/* Theme toggle */}
          <button onClick={toggleTheme}>
            {theme === "dark" ? "🚀 Dark Mode" : "💡 Light Mode"}
          </button>

          <span className="font-medium">{user.username}</span>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
