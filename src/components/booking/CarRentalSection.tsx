import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Input } from "../ui/input";

interface CarRentalSectionProps {
  carPickupDate: string;
  setCarPickupDate: React.Dispatch<React.SetStateAction<string>>;
  carDropoffDate: string;
  setCarDropoffDate: React.Dispatch<React.SetStateAction<string>>;
  carType: string;
  setCarType: React.Dispatch<React.SetStateAction<string>>;
  driverAge: number;
  setDriverAge: React.Dispatch<React.SetStateAction<number>>;
}

const CarRentalSection = ({
  carPickupDate,
  setCarPickupDate,
  carDropoffDate,
  setCarDropoffDate,
  carType,
  setCarType,
  driverAge,
  setDriverAge,
}: CarRentalSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6 pt-6 border-t border-gray-200"
    >
      <h3 className="text-lg font-semibold mb-4">Car Rental Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pick-up Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="date"
              className="pl-10 h-12 text-base"
              value={carPickupDate}
              onChange={(e) => setCarPickupDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Drop-off Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="date"
              className="pl-10 h-12 text-base"
              value={carDropoffDate}
              onChange={(e) => setCarDropoffDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Car Type
          </label>
          <div className="relative">
            <select
              className="w-full h-12 pl-4 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              value={carType}
              onChange={(e) => setCarType(e.target.value)}
            >
              <option value="any">Any Type</option>
              <option value="economy">Economy</option>
              <option value="compact">Compact</option>
              <option value="midsize">Midsize</option>
              <option value="suv">SUV</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Driver Age
          </label>
          <div className="relative">
            <select
              className="w-full h-12 pl-4 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              value={driverAge}
              onChange={(e) => setDriverAge(parseInt(e.target.value))}
            >
              {Array.from({ length: 60 }, (_, i) => i + 21).map((age) => (
                <option key={age} value={age}>
                  {age} years
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CarRentalSection;
