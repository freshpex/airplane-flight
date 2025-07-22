import React, { useRef, useState } from 'react';
import { Users } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';
import { useClickOutside } from '../../hooks/useClickOutside';

interface PassengerSelectorProps {
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  setPassengers: React.Dispatch<React.SetStateAction<{
    adults: number;
    children: number;
    infants: number;
  }>>;
}

const PassengerSelector = ({ passengers, setPassengers }: PassengerSelectorProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Total passenger count
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  // Format passenger display
  const formatPassengerCount = () => {
    return `${totalPassengers} Passenger${totalPassengers !== 1 ? 's' : ''}`;
  };

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false);
  });

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Passengers
      </label>
      <div className="relative" ref={dropdownRef}>
        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          readOnly
          className="pl-10 h-12 text-base cursor-pointer"
          value={formatPassengerCount()}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        
        {/* Passenger dropdown */}
        {isDropdownOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-2 px-4 text-base ring-1 ring-black ring-opacity-5">
            {/* Adults */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-900">Adults</h3>
                <p className="text-xs text-gray-500">Age 12+</p>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    passengers.adults > 1 
                      ? "bg-gray-200 text-gray-700" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                  onClick={() => {
                    if (passengers.adults > 1) {
                      setPassengers({
                        ...passengers,
                        adults: passengers.adults - 1
                      });
                    }
                  }}
                  disabled={passengers.adults <= 1}
                >
                  -
                </button>
                <span className="w-8 text-center">{passengers.adults}</span>
                <button
                  type="button"
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    passengers.adults < 9 
                      ? "bg-gray-200 text-gray-700" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                  onClick={() => {
                    if (passengers.adults < 9 && totalPassengers < 9) {
                      setPassengers({
                        ...passengers,
                        adults: passengers.adults + 1
                      });
                    }
                  }}
                  disabled={passengers.adults >= 9 || totalPassengers >= 9}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Children */}
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <h3 className="font-medium text-gray-900">Children</h3>
                <p className="text-xs text-gray-500">Age 2-11</p>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    passengers.children > 0 
                      ? "bg-gray-200 text-gray-700" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                  onClick={() => {
                    if (passengers.children > 0) {
                      setPassengers({
                        ...passengers,
                        children: passengers.children - 1
                      });
                    }
                  }}
                  disabled={passengers.children <= 0}
                >
                  -
                </button>
                <span className="w-8 text-center">{passengers.children}</span>
                <button
                  type="button"
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    totalPassengers < 9 
                      ? "bg-gray-200 text-gray-700" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                  onClick={() => {
                    if (totalPassengers < 9) {
                      setPassengers({
                        ...passengers,
                        children: passengers.children + 1
                      });
                    }
                  }}
                  disabled={totalPassengers >= 9}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Infants */}
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="font-medium text-gray-900">Infants</h3>
                <p className="text-xs text-gray-500">Under 2 years</p>
              </div>
              <div className="flex items-center">
                <button
                  type="button"
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    passengers.infants > 0 
                      ? "bg-gray-200 text-gray-700" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                  onClick={() => {
                    if (passengers.infants > 0) {
                      setPassengers({
                        ...passengers,
                        infants: passengers.infants - 1
                      });
                    }
                  }}
                  disabled={passengers.infants <= 0}
                >
                  -
                </button>
                <span className="w-8 text-center">{passengers.infants}</span>
                <button
                  type="button"
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    passengers.infants < passengers.adults && totalPassengers < 9
                      ? "bg-gray-200 text-gray-700" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  )}
                  onClick={() => {
                    if (passengers.infants < passengers.adults && totalPassengers < 9) {
                      setPassengers({
                        ...passengers,
                        infants: passengers.infants + 1
                      });
                    }
                  }}
                  disabled={passengers.infants >= passengers.adults || totalPassengers >= 9}
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="pt-3">
              <p className="text-xs text-gray-500 mb-2">
                * Maximum 9 passengers per booking
              </p>
              <p className="text-xs text-gray-500">
                * Each infant must be accompanied by an adult
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PassengerSelector;
