import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Logo from "@/assets/logo";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { label: "Book", href: "#book" },
    { label: "Manage", href: "#manage" },
    { label: "Experience", href: "#experience" },
    { label: "Destinations", href: "#destinations" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo
              startStopColor={isScrolled ? "#42A5F5" : "#ffffff94"}
              endStopColor={isScrolled ? "#1E3A8A" : "#FFFFFF"}
              textFill={isScrolled ? "#1E3A8A" : "#FFFFFF"}
              planeColor={isScrolled ? "#FFFFFF" : "#075985"}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 hover:text-purple-600",
                  isScrolled ? "text-gray-700" : "text-white",
                )}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "hidden sm:flex items-center space-x-2 transition-colors duration-300",
                isScrolled
                  ? "text-gray-700 hover:text-purple-600"
                  : "text-white hover:text-purple-200",
              )}
            >
              <Globe className="h-4 w-4" />
              <span>EN</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "hidden sm:flex items-center space-x-2 transition-colors duration-300",
                isScrolled
                  ? "text-gray-700 hover:text-purple-600"
                  : "text-white hover:text-purple-200",
              )}
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "lg:hidden transition-colors duration-300",
                isScrolled ? "text-gray-700" : "text-white",
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-white/95 backdrop-blur-md rounded-lg mt-2"
        >
          <div className="p-4 space-y-3">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-gray-700 text-sm font-medium hover:text-purple-600 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <hr className="border-gray-200" />
            <div className="flex flex-col space-y-2">
              <Button variant="ghost" size="sm" className="justify-start">
                <Globe className="h-4 w-4 mr-2" />
                Language
              </Button>
              <Button variant="ghost" size="sm" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
