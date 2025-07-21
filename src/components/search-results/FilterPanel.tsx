import { Slider } from '@/components/ui/slider';

interface FilterPanelProps {
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

const FilterPanel = ({
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
  maxPrice
}: FilterPanelProps) => {
  // Helper to format time display
  const formatTimeDisplay = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
  };

  return (
    <div className="w-full md:w-64 lg:w-72 bg-white rounded-lg shadow-lg p-5 sticky top-24 h-fit">
      <h2 className="text-xl font-bold mb-5 text-gray-800">Filters</h2>
      
      {/* Price range */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-3 text-gray-700">Price Range</h3>
        <div className="px-2">
          <Slider 
            defaultValue={[0, maxPrice]}
            max={maxPrice}
            step={50}
            onValueChange={(values) => setPriceRange(values as [number, number])}
            className="mb-4"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">${priceRange[0]}</span>
            <span className="text-sm font-medium text-gray-600">${priceRange[1]}</span>
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
                id={`stops-${stops}`}
                className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 cursor-pointer"
                checked={selectedStops.includes(stops)}
                onChange={() => {
                  if (selectedStops.includes(stops)) {
                    setSelectedStops(selectedStops.filter(s => s !== stops));
                  } else {
                    setSelectedStops([...selectedStops, stops]);
                  }
                }}
              />
              <label htmlFor={`stops-${stops}`} className="ml-2 text-gray-700 cursor-pointer">
                {stops === 0 ? 'Direct' : stops === 1 ? '1 Stop' : `${stops} Stops`}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Airlines */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-3 text-gray-700">Airlines</h3>
        <div className="space-y-2">
          {availableAirlines.map((airline) => {
            const airlineInfo = flightOptions.find(f => f.segments[0].airline.code === airline)?.segments[0].airline;
            return (
              <div key={airline} className="flex items-center">
                <input
                  type="checkbox"
                  id={`airline-${airline}`}
                  className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4 cursor-pointer"
                  checked={selectedAirlines.includes(airline)}
                  onChange={() => {
                    if (selectedAirlines.includes(airline)) {
                      setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
                    } else {
                      setSelectedAirlines([...selectedAirlines, airline]);
                    }
                  }}
                />
                <label htmlFor={`airline-${airline}`} className="ml-2 text-gray-700 flex items-center gap-2 cursor-pointer">
                  <span>{airlineInfo?.name}</span>
                </label>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Departure time */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-3 text-gray-700">Departure Time</h3>
        <div className="px-2">
          <Slider 
            defaultValue={[0, 24]}
            min={0}
            max={24}
            step={1}
            onValueChange={(values) => setSelectedTimeRange(values as [number, number])}
            className="mb-4"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">{formatTimeDisplay(selectedTimeRange[0])}</span>
            <span className="text-sm font-medium text-gray-600">{formatTimeDisplay(selectedTimeRange[1])}</span>
          </div>
        </div>
      </div>
      
      {/* Sort by */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-3 text-gray-700">Sort By</h3>
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
    </div>
  );
};

export default FilterPanel;
