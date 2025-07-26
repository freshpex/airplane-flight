import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

interface SearchButtonProps {
  onClick: (e: React.MouseEvent) => void;
  disabled: boolean;
  isSearching: boolean;
}

const SearchButton = ({
  onClick,
  disabled,
  isSearching,
}: SearchButtonProps) => {
  return (
    <div className="lg:col-span-12 lg:col-start-1 mt-4">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          variant="qatar"
          size="xl"
          className="w-full lg:w-auto lg:px-12 group relative overflow-hidden"
          onClick={onClick}
          disabled={disabled}
        >
          <span className="relative z-10 flex items-center justify-center">
            {isSearching ? "Searching..." : "Search Flights"}
            {!isSearching && (
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </Button>
      </motion.div>
    </div>
  );
};

export default SearchButton;
