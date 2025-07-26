import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Globe, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { name: "Book", href: "#", hasSubmenu: true },
  { name: "Manage", href: "#", hasSubmenu: true },
  { name: "Experience", href: "#", hasSubmenu: true },
  { name: "Privilege Club", href: "#", hasSubmenu: false },
  { name: "Help", href: "#", hasSubmenu: false },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm py-2"
          : "bg-transparent py-4",
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-qatar-burgundy">
                Skyways<span className="text-qatar-gold">Airways</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-6">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className="inline-flex items-center px-1 py-2 text-sm font-medium text-neutral-800 hover:text-qatar-burgundy transition-colors"
                >
                  {item.name}
                  {item.hasSubmenu && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>
                {item.hasSubmenu && (
                  <div className="absolute z-10 left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="py-1">
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        Option 1
                      </Link>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        Option 2
                      </Link>
                      <Link
                        to="#"
                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        Option 3
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
              <Globe size={20} />
            </button>
            <Button variant="gold" size="sm">
              Login
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-qatar-burgundy text-qatar-burgundy hover:bg-qatar-burgundy/10"
            >
              Join Now
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-qatar-burgundy hover:text-qatar-burgundy/80 hover:bg-neutral-100 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-screen" : "max-h-0",
        )}
      >
        <div className="px-4 pt-2 pb-4 bg-white/95 backdrop-blur-sm border-t border-neutral-200">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <div key={item.name}>
                <Link
                  to={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-neutral-800 hover:bg-neutral-100 hover:text-qatar-burgundy flex justify-between items-center"
                >
                  {item.name}
                  {item.hasSubmenu && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-col space-y-2">
            <Button variant="gold">Login</Button>
            <Button
              variant="outline"
              className="border-qatar-burgundy text-qatar-burgundy"
            >
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
