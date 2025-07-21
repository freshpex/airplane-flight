import React from 'react';
import { Combobox } from '@headlessui/react';
import { Plane, MapPin, X, Check } from 'lucide-react';
import { cn } from '../../lib/utils';
import type { AirportLocation } from '../../utils/amadeus';

interface AirportSearchInputProps {
  label: string;
  placeholder: string;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  results: AirportLocation[];
  isLoading: boolean;
  selectedAirport: AirportLocation | null;
  setSelectedAirport: React.Dispatch<React.SetStateAction<AirportLocation | null>>;
  icon?: 'plane' | 'mappin';
}

// Helper function to format airport display
export const formatAirportDisplay = (airport: AirportLocation | null) => {
  if (!airport) return '';
  const cityName = airport.address?.cityName || airport.detailedName.split('/')[0];
  return `${airport.subType === 'AIRPORT' ? cityName : airport.name} (${airport.iataCode})`;
};

const AirportSearchInput = ({
  label,
  placeholder,
  query,
  setQuery,
  results,
  isLoading,
  selectedAirport,
  setSelectedAirport,
  icon = 'plane'
}: AirportSearchInputProps) => {
  const Icon = icon === 'plane' ? Plane : MapPin;
  
  // Check if we're using mock data
  const isUsingMockData = results.length > 0 && 
    results[0].id === "JFK" && 
    results[0].name === "John F. Kennedy International Airport";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Combobox value={selectedAirport} onChange={setSelectedAirport}>
          <div className="relative w-full">
            <Combobox.Input
              className={cn(
                "w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none",
                selectedAirport ? "text-base" : "text-gray-500"
              )}
              displayValue={(airport: AirportLocation | null) => 
                formatAirportDisplay(airport)
              }
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
            />
            {selectedAirport && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedAirport(null);
                  setQuery('');
                }}
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
            {query.length >= 2 && (
              <Combobox.Options
                className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base overflow-auto max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                {isLoading ? (
                  <div className="py-2 px-4 text-gray-500">Loading...</div>
                ) : results.length === 0 ? (
                  <div className="py-2 px-4 text-gray-500">No airports found</div>
                ) : (
                  <>
                    {isUsingMockData && (
                      <div className="py-2 px-4 text-amber-600 bg-amber-50 text-xs">
                        Using offline airport data due to API limits. Try again later.
                      </div>
                    )}
                    {results.map((airport) => (
                      <Combobox.Option
                        key={airport.id}
                        value={airport}
                        className={({ active }) =>
                          `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                            active ? 'text-white bg-purple-600' : 'text-gray-900'
                          }`
                        }
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {airport.subType === 'AIRPORT' 
                                  ? (airport.address?.cityName || airport.detailedName.split('/')[0]) 
                                  : airport.name} ({airport.iataCode})
                              </span>
                              <span className="text-sm text-gray-500">
                                {airport.subType === 'AIRPORT' ? airport.name : 'City'}
                              </span>
                            </div>
                            {selected && (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-purple-600'
                                }`}
                              >
                                <Check className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))}
                  </>
                )}
              </Combobox.Options>
            )}
          </div>
        </Combobox>
      </div>
    </div>
  );
};

export default AirportSearchInput;
