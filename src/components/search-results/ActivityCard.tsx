import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Activity } from "@/types/flight";
import { Star, MapPin, Clock, Check, Users, Info } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ActivityCardProps {
  activity: Activity;
  selectedActivity: string | null;
  setSelectedActivity: (id: string) => void;
}

const ActivityCard = ({
  activity,
  selectedActivity,
  setSelectedActivity,
}: ActivityCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isSelected = selectedActivity === activity.id;

  const handleSelect = () => {
    setSelectedActivity(activity.id);
  };

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ${isSelected ? "ring-2 ring-purple-500" : ""}`}
    >
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Image section */}
          <div className="h-48 md:h-full relative overflow-hidden">
            <img
              src={activity.image}
              alt={activity.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 rounded-md text-xs font-medium">
              {activity.duration}
            </div>
          </div>

          {/* Content section */}
          <div className="col-span-2 p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{activity.name}</h3>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <MapPin size={14} className="mr-1" />
                  {activity.location}
                  <Clock size={14} className="ml-3 mr-1" />
                  {activity.duration}
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">
                      {activity.rating.toFixed(1)}
                    </span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">
                    {activity.reviews} reviews
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold">
                  ${activity.price.amount}
                </p>
                <p className="text-xs text-gray-500">per person</p>
              </div>
            </div>

            <div
              className={`mt-3 ${isExpanded ? "block" : "line-clamp-2"} text-sm text-gray-600`}
            >
              {activity.description}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-blue-600 hover:text-blue-800 mt-1"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>

            <div className="mt-4 flex flex-wrap gap-2">
              {activity.categories.map((category) => (
                <span
                  key={category}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800"
                >
                  {category}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center">
                <Users size={16} className="mr-1 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {activity.groupSize?.min}-
                  {activity.groupSize?.max || "unlimited"} people
                </span>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="ml-2 text-gray-400 hover:text-gray-600">
                      <Info size={16} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <h4 className="font-medium mb-2">What's included:</h4>
                    <ul className="space-y-1">
                      {activity.includes.map((item) => (
                        <li key={item} className="flex items-start">
                          <Check
                            size={16}
                            className="mr-1 text-green-500 shrink-0 mt-0.5"
                          />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>

              <Button
                onClick={handleSelect}
                variant={isSelected ? "default" : "outline"}
                className={
                  isSelected ? "bg-purple-600 hover:bg-purple-700" : ""
                }
              >
                {isSelected ? "Selected" : "Select"}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
