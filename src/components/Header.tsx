import React, { useState, useEffect } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 64; // Height of the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Volunteers", href: "#volunteers" },
    { name: "Achievements", href: "#achievements" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-900 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1
                className={`text-xl font-bold ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                ISTE Club
              </h1>
              <p
                className={`text-xs ${
                  isScrolled ? "text-gray-600" : "text-gray-200"
                }`}
              >
                Technical Excellence
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isScrolled
                      ? "text-gray-700 hover:text-blue-900 hover:bg-blue-50"
                      : "text-white hover:text-orange-300 hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            <Link
              to="/login"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isScrolled
                  ? "text-gray-700 hover:text-blue-900 hover:bg-blue-50"
                  : "text-white hover:text-orange-300 hover:bg-white/10"
              }`}
            >
              Login
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md ${
                isScrolled ? "text-gray-600" : "text-white"
              }`}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="absolute top-full left-0 right-0 px-4 pt-2 pb-3 space-y-1 bg-white shadow-lg border-t border-gray-200">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50 transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              <Link
                to="/login"
                className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50 transition-colors duration-200"
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
