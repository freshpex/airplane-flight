import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Input } from "../ui/input";

interface HotelSectionProps {
  hotelCheckIn: string;
  setHotelCheckIn: React.Dispatch<React.SetStateAction<string>>;
  hotelCheckOut: string;
  setHotelCheckOut: React.Dispatch<React.SetStateAction<string>>;
  rooms: number;
  setRooms: React.Dispatch<React.SetStateAction<number>>;
  hotelRating: number;
  setHotelRating: React.Dispatch<React.SetStateAction<number>>;
}

const HotelSection = ({
  hotelCheckIn,
  setHotelCheckIn,
  hotelCheckOut,
  setHotelCheckOut,
  rooms,
  setRooms,
  hotelRating,
  setHotelRating,
}: HotelSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6 pt-6 border-t border-gray-200"
    >
      <h3 className="text-lg font-semibold mb-4">Hotel Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-in Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="date"
              className="pl-10 h-12 text-base"
              value={hotelCheckIn}
              onChange={(e) => setHotelCheckIn(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Check-out Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="date"
              className="pl-10 h-12 text-base"
              value={hotelCheckOut}
              onChange={(e) => setHotelCheckOut(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rooms
          </label>
          <div className="relative">
            <select
              className="w-full h-12 pl-4 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              value={rooms}
              onChange={(e) => setRooms(parseInt(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Room{num !== 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hotel Rating
          </label>
          <div className="relative">
            <select
              className="w-full h-12 pl-4 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              value={hotelRating}
              onChange={(e) => setHotelRating(parseInt(e.target.value))}
            >
              <option value={0}>Any Rating</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelSection;
