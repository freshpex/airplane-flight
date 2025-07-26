import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FilterPanelMobileProps {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  selectedStops: number[];
  setSelectedStops: (stops: number[]) => void;
  selectedAirlines: string[];
  setSelectedAirlines: (airlines: string[]) => void;
  selectedTimeRange: [number, number];
  setSelectedTimeRange: (range: [number, number]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  availableAirlines: string[];
  flightOptions: any[];
  maxPrice: number;
}

const MobileFilterPanel = ({
  priceRange,
  setPriceRange,
  selectedStops,
  setSelectedStops,
  selectedAirlines,
  setSelectedAirlines,
  selectedTimeRange,
  setSelectedTimeRange,
  sortBy,
  setSortBy,
  availableAirlines,
  flightOptions,
  maxPrice,
}: FilterPanelMobileProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to format time display
  const formatTimeDisplay = (hour: number) => {
    if (hour === 0) return "12 AM";
    if (hour === 12) return "12 PM";
    return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden w-full mb-4">
          Filter Results
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[350px] p-0 overflow-auto"
      >
        <SheetHeader className="p-4 border-b sticky top-0 bg-white z-10">
          <SheetTitle className="flex items-center justify-between">
            <span>Filters</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="p-4 space-y-6">
          {/* Price range */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-3 text-gray-700">
              Price Range
            </h3>
            <div className="px-2">
              <Slider
                defaultValue={[0, maxPrice]}
                max={maxPrice}
                step={50}
                value={priceRange}
                onValueChange={(values) =>
                  setPriceRange(values as [number, number])
                }
                className="mb-4"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  ${priceRange[0]}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  ${priceRange[1]}
                </span>
              </div>
            </div>
          </div>

          {/* Stops */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-3 text-gray-700">Stops</h3>
            <div className="space-y-2">
              {[0, 1, 2].map((stops) => (
                <div key={stops} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`stops-mobile-${stops}`}
                    className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 cursor-pointer"
                    checked={selectedStops.includes(stops)}
                    onChange={() => {
                      if (selectedStops.includes(stops)) {
                        setSelectedStops(
                          selectedStops.filter((s) => s !== stops),
                        );
                      } else {
                        setSelectedStops([...selectedStops, stops]);
                      }
                    }}
                  />
                  <label
                    htmlFor={`stops-mobile-${stops}`}
                    className="ml-2 text-gray-700 cursor-pointer"
                  >
                    {stops === 0
                      ? "Direct"
                      : stops === 1
                        ? "1 Stop"
                        : `${stops} Stops`}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Airlines */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-3 text-gray-700">
              Airlines
            </h3>
            <div className="space-y-2">
              {availableAirlines.map((airline) => {
                const airlineInfo = flightOptions.find(
                  (f) => f.segments[0].airline.code === airline,
                )?.segments[0].airline;
                return (
                  <div key={airline} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`airline-mobile-${airline}`}
                      className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 cursor-pointer"
                      checked={selectedAirlines.includes(airline)}
                      onChange={() => {
                        if (selectedAirlines.includes(airline)) {
                          setSelectedAirlines(
                            selectedAirlines.filter((a) => a !== airline),
                          );
                        } else {
                          setSelectedAirlines([...selectedAirlines, airline]);
                        }
                      }}
                    />
                    <label
                      htmlFor={`airline-mobile-${airline}`}
                      className="ml-2 text-gray-700 flex items-center gap-2 cursor-pointer"
                    >
                      <span>{airlineInfo?.name}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Departure time */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-3 text-gray-700">
              Departure Time
            </h3>
            <div className="px-2">
              <Slider
                defaultValue={[0, 24]}
                min={0}
                max={24}
                step={1}
                value={selectedTimeRange}
                onValueChange={(values) =>
                  setSelectedTimeRange(values as [number, number])
                }
                className="mb-4"
              />
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                  {formatTimeDisplay(selectedTimeRange[0])}
                </span>
                <span className="text-sm font-medium text-gray-600">
                  {formatTimeDisplay(selectedTimeRange[1])}
                </span>
              </div>
            </div>
          </div>

          {/* Sort by */}
          <div className="mb-6">
            <h3 className="text-md font-semibold mb-3 text-gray-700">
              Sort By
            </h3>
            <select
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price">Price (Lowest first)</option>
              <option value="duration">Duration (Shortest first)</option>
              <option value="departure">Departure (Earliest first)</option>
              <option value="arrival">Arrival (Earliest first)</option>
              <option value="rating">Rating (Highest first)</option>
            </select>
          </div>

          <div className="pt-4 border-t">
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full"
              variant="qatar"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilterPanel;
