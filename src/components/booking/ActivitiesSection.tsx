import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Input } from "../ui/input";

interface ActivitiesSectionProps {
  activityDate: string;
  setActivityDate: React.Dispatch<React.SetStateAction<string>>;
  activityType: string;
  setActivityType: React.Dispatch<React.SetStateAction<string>>;
  activityParticipants: number;
  setActivityParticipants: React.Dispatch<React.SetStateAction<number>>;
}

const ActivitiesSection = ({
  activityDate,
  setActivityDate,
  activityType,
  setActivityType,
  activityParticipants,
  setActivityParticipants,
}: ActivitiesSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6 pt-6 border-t border-gray-200"
    >
      <h3 className="text-lg font-semibold mb-4">Activities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="date"
              className="pl-10 h-12 text-base"
              value={activityDate}
              onChange={(e) => setActivityDate(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Type
          </label>
          <div className="relative">
            <select
              className="w-full h-12 pl-4 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)}
            >
              <option value="any">Any Activity</option>
              <option value="tour">City Tours</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="foodie">Food & Drink</option>
              <option value="nature">Nature</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Participants
          </label>
          <div className="relative">
            <select
              className="w-full h-12 pl-4 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              value={activityParticipants}
              onChange={(e) =>
                setActivityParticipants(parseInt(e.target.value))
              }
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} Person{num !== 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivitiesSection;
