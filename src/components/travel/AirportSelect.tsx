import React from "react";
import { Combobox } from "@headlessui/react";
import { MapPin, Check, X, Plane } from "lucide-react";
import { useAirportSearch } from "../../hooks/useAirportSearch";
import type { Airport } from "../../data/airports";
import { cn } from "../../lib/utils";

interface AirportSelectProps {
  label: string;
  placeholder: string;
  icon?: "plane" | "mappin";
  onSelect: (airport: Airport | null) => void;
}

const AirportSelect: React.FC<AirportSelectProps> = ({
  label,
  placeholder,
  icon = "plane",
  onSelect,
}) => {
  const { results, isLoading, setQuery, selectedAirport, setSelectedAirport } =
    useAirportSearch();

  const Icon = icon === "plane" ? Plane : MapPin;

  const handleSelection = (airport: Airport | null) => {
    setSelectedAirport(airport);
    onSelect(airport);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <Combobox value={selectedAirport} onChange={handleSelection}>
          <div className="relative w-full">
            <Combobox.Input
              className={cn(
                "w-full h-10 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none",
                selectedAirport ? "text-base" : "text-gray-500",
              )}
              displayValue={(airport: Airport | null) =>
                airport ? `${airport.city} (${airport.iataCode})` : ""
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
                  handleSelection(null);
                  setQuery("");
                }}
              >
                <X className="h-4 w-4 text-gray-400" />
              </button>
            )}
            <Combobox.Options className="absolute z-50 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base overflow-auto max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {isLoading ? (
                <div className="py-2 px-4 text-gray-500">Loading...</div>
              ) : results.length === 0 ? (
                <div className="py-2 px-4 text-gray-500">No airports found</div>
              ) : (
                results.map((airport) => (
                  <Combobox.Option
                    key={airport.iataCode}
                    value={airport}
                    className={({ active }) =>
                      `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                        active ? "text-white bg-purple-600" : "text-gray-900"
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {airport.city} ({airport.iataCode})
                          </span>
                          <span className="text-sm text-gray-500">
                            {airport.name}
                          </span>
                        </div>
                        {selected && (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-purple-600"
                            }`}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
    </div>
  );
};

export default AirportSelect;
