import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { CarRental } from "@/types/flight";

interface CarRentalCardProps {
  car: CarRental;
  selectedCar: string | null;
  setSelectedCar: (id: string) => void;
}

const CarRentalCard = ({
  car,
  selectedCar,
  setSelectedCar,
}: CarRentalCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-lg shadow-lg overflow-hidden",
        selectedCar === car.id && "ring-2 ring-purple-500",
      )}
    >
      <div className="h-40 relative">
        <img
          src={car.vehicle.image}
          alt={car.vehicle.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute top-3 left-3 bg-white bg-opacity-90 rounded-md px-2 py-1">
          <span className="font-bold">{car.company}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold mb-1">{car.vehicle.name}</h3>
        <p className="text-sm text-gray-600 mb-3">{car.vehicle.type}</p>

        <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
            <span>{car.vehicle.capacity.passengers} Passengers</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>{car.location.pickup}</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>Available at {car.availability.pickupTime}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {car.vehicle.features.slice(0, 3).map((feature, index) => (
            <span
              key={index}
              className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700"
            >
              {feature}
            </span>
          ))}
          {car.vehicle.features.length > 3 && (
            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700">
              +{car.vehicle.features.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <div className="text-lg font-bold text-purple-700">
            ${car.price.amount}{" "}
            <span className="text-sm font-normal text-gray-600">
              per {car.price.period}
            </span>
          </div>

          <Button
            variant={selectedCar === car.id ? "default" : "outline"}
            onClick={() => setSelectedCar(car.id)}
            size="sm"
          >
            {selectedCar === car.id ? "Selected" : "Select"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarRentalCard;
