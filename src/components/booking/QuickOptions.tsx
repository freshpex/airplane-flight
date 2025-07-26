import React from "react";
import { motion } from "framer-motion";

interface QuickOptionsProps {
  showHotelSection: boolean;
  setShowHotelSection: React.Dispatch<React.SetStateAction<boolean>>;
  showCarRentalSection: boolean;
  setShowCarRentalSection: React.Dispatch<React.SetStateAction<boolean>>;
  showActivitiesSection: boolean;
  setShowActivitiesSection: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuickOptions = ({
  showHotelSection,
  setShowHotelSection,
  showCarRentalSection,
  setShowCarRentalSection,
  showActivitiesSection,
  setShowActivitiesSection,
}: QuickOptionsProps) => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="flex flex-wrap gap-4 text-sm">
        {/* Add hotels */}
        <div className="relative">
          <motion.button
            className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.preventDefault();
              // Toggle hotel section
              setShowHotelSection(!showHotelSection);
              // Hide other sections if they're open
              if (!showHotelSection) {
                setShowCarRentalSection(false);
                setShowActivitiesSection(false);
              }
            }}
          >
            {showHotelSection ? "- Remove hotels" : "+ Add hotels"}
          </motion.button>
        </div>

        {/* Add car rental */}
        <div className="relative">
          <motion.button
            className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.preventDefault();
              // Toggle car rental section
              setShowCarRentalSection(!showCarRentalSection);
              // Hide other sections if they're open
              if (!showCarRentalSection) {
                setShowHotelSection(false);
                setShowActivitiesSection(false);
              }
            }}
          >
            {showCarRentalSection ? "- Remove car rental" : "+ Add car rental"}
          </motion.button>
        </div>

        {/* Add activities */}
        <div className="relative">
          <motion.button
            className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
            whileHover={{ scale: 1.05 }}
            onClick={(e) => {
              e.preventDefault();
              // Toggle activities section
              setShowActivitiesSection(!showActivitiesSection);
              // Hide other sections if they're open
              if (!showActivitiesSection) {
                setShowHotelSection(false);
                setShowCarRentalSection(false);
              }
            }}
          >
            {showActivitiesSection ? "- Remove activities" : "+ Add activities"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default QuickOptions;
