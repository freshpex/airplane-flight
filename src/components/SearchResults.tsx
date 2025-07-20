import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Compass, Luggage, Plane, Star, Shield, Wifi } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Mock data interfaces
interface Airline {
  code: string;
  name: string;
  logo: string;
}

interface FlightSegment {
  departureAirport: string;
  departureCity: string;
  departureTime: string;
  departureDate: string;
  arrivalAirport: string;
  arrivalCity: string;
  arrivalTime: string;
  arrivalDate: string;
  flightNumber: string;
  duration: string;
  aircraft: string;
  airline: Airline;
}

interface FlightOption {
  id: string;
  price: number;
  currency: string;
  segments: FlightSegment[];
  totalDuration: string;
  stops: number;
  cabinClass: string;
  seatsAvailable: number;
  fareType: 'Economy' | 'Economy Plus' | 'Business' | 'First';
  refundable: boolean;
  baggageAllowance: {
    carryOn: string;
    checked: string;
  };
  features: string[];
  co2Emission: string;
  onTimePerformance: number;
}

interface Hotel {
  id: string;
  name: string;
  address: string;
  price: number;
  currency: string;
  rating: number;
  image: string;
  amenities: string[];
  description: string;
  distanceFromAirport: string;
}

interface CarRental {
  id: string;
  company: string;
  model: string;
  category: string;
  image: string;
  price: number;
  currency: string;
  features: string[];
  passengerCapacity: number;
  location: string;
  availableAt: string;
}

// Sample logo URLs for airlines
const airlineLogos: Record<string, string> = {
  QR: 'https://1000logos.net/wp-content/uploads/2019/12/0021_Qatar-Airways-Logo.jpg',
  EK: 'https://1000logos.net/wp-content/uploads/2019/12/Emirates-Logowww-140x88.jpg',
  AA: 'https://1000logos.net/wp-content/uploads/2016/10/American-Airlines-logo.jpg',
  BA: 'https://1000logos.net/wp-content/uploads/2016/10/British-Airways-Logo-tumb.png',
  LH: 'https://1000logos.net/wp-content/uploads/2017/03/Lufthansa-Logo-tumb-140x88.png',
  DL: 'https://1000logos.net/wp-content/uploads/2017/09/Delta-Air-Lines-logo-tumb-140x88.jpg',
};

// Generate mock flight data based on search parameters
const generateFlightOptions = (from: string, to: string, date: string, _passengers: number): FlightOption[] => {
  const airlines: Airline[] = [
    { code: 'QR', name: 'Qatar Airways', logo: airlineLogos.QR },
    { code: 'EK', name: 'Emirates', logo: airlineLogos.EK },
    { code: 'AA', name: 'American Airlines', logo: airlineLogos.AA },
    { code: 'BA', name: 'British Airways', logo: airlineLogos.BA },
    { code: 'LH', name: 'Lufthansa', logo: airlineLogos.LH },
    { code: 'DL', name: 'Delta Air Lines', logo: airlineLogos.DL },
  ];

  const cabinClasses = ['Economy', 'Economy Plus', 'Business', 'First'];
  const features = [
    'In-flight Entertainment',
    'Power Outlets',
    'Wi-Fi',
    'Extra Legroom',
    'Premium Meals',
    'Lounge Access',
    'Priority Boarding',
    'Flat-bed Seats'
  ];

  // Generate 15 random flight options
  return Array.from({ length: 15 }, (_, i) => {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const stops = Math.floor(Math.random() * 3); // 0, 1, or 2 stops
    const fareType = cabinClasses[Math.floor(Math.random() * cabinClasses.length)] as 'Economy' | 'Economy Plus' | 'Business' | 'First';
    
    // Generate random time for departure (morning to evening)
    const depHour = Math.floor(Math.random() * 12) + 7; // 7 AM to 7 PM
    const depMinute = Math.floor(Math.random() * 60);
    const depTime = `${depHour.toString().padStart(2, '0')}:${depMinute.toString().padStart(2, '0')}`;
    
    // Calculate arrival time based on duration
    const durationHours = 2 + Math.floor(Math.random() * 10); // 2 to 12 hours
    const durationMinutes = Math.floor(Math.random() * 60);
    const totalMinutes = depHour * 60 + depMinute + durationHours * 60 + durationMinutes;
    const arrHour = Math.floor(totalMinutes / 60) % 24;
    const arrMinute = totalMinutes % 60;
    const arrTime = `${arrHour.toString().padStart(2, '0')}:${arrMinute.toString().padStart(2, '0')}`;
    
    // Select random features based on cabin class
    const numFeatures = fareType === 'Economy' ? 2 : fareType === 'Economy Plus' ? 4 : 6;
    const selectedFeatures = [...features]
      .sort(() => 0.5 - Math.random())
      .slice(0, numFeatures);
    
    // Calculate price based on cabin class and stops
    let basePrice = 250;
    if (fareType === 'Economy Plus') basePrice = 450;
    if (fareType === 'Business') basePrice = 1200;
    if (fareType === 'First') basePrice = 3500;
    
    // Direct flights are more expensive
    if (stops === 0) basePrice *= 1.2;
    
    // Add some randomness to price
    const price = Math.round(basePrice * (0.9 + Math.random() * 0.4));
    
    // Generate segments based on stops
    const segments: FlightSegment[] = [];
    segments.push({
      departureAirport: from,
      departureCity: from.split('(')[0].trim(),
      departureTime: depTime,
      departureDate: date,
      arrivalAirport: stops === 0 ? to : `${['DXB', 'JFK', 'LHR', 'CDG', 'IST'][Math.floor(Math.random() * 5)]}`,
      arrivalCity: stops === 0 ? to.split('(')[0].trim() : ['Dubai', 'New York', 'London', 'Paris', 'Istanbul'][Math.floor(Math.random() * 5)],
      arrivalTime: stops === 0 ? arrTime : `${(depHour + 2) % 24}:${depMinute.toString().padStart(2, '0')}`,
      arrivalDate: date,
      flightNumber: `${airline.code}${100 + Math.floor(Math.random() * 900)}`,
      duration: stops === 0 ? `${durationHours}h ${durationMinutes}m` : `${2 + Math.floor(Math.random() * 3)}h ${Math.floor(Math.random() * 60)}m`,
      aircraft: ['Boeing 777-300ER', 'Airbus A350-1000', 'Boeing 787-9', 'Airbus A380-800'][Math.floor(Math.random() * 4)],
      airline
    });
    
    if (stops > 0) {
      // Add layover segments
      for (let j = 0; j < stops; j++) {
        const layoverHour = (depHour + 3 + j * 3) % 24;
        const prevArrival = segments[segments.length - 1].arrivalAirport;
        const prevArrivalCity = segments[segments.length - 1].arrivalCity;
        
        const nextDestination = j === stops - 1 ? to : `${['SIN', 'DOH', 'AUH', 'FRA', 'AMS'][Math.floor(Math.random() * 5)]}`;
        const nextDestinationCity = j === stops - 1 ? to.split('(')[0].trim() : ['Singapore', 'Doha', 'Abu Dhabi', 'Frankfurt', 'Amsterdam'][Math.floor(Math.random() * 5)];
        
        segments.push({
          departureAirport: prevArrival,
          departureCity: prevArrivalCity,
          departureTime: `${layoverHour.toString().padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          departureDate: date,
          arrivalAirport: nextDestination,
          arrivalCity: nextDestinationCity,
          arrivalTime: j === stops - 1 ? arrTime : `${(layoverHour + 2) % 24}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          arrivalDate: date,
          flightNumber: `${airline.code}${100 + Math.floor(Math.random() * 900)}`,
          duration: `${2 + Math.floor(Math.random() * 3)}h ${Math.floor(Math.random() * 60)}m`,
          aircraft: ['Boeing 777-300ER', 'Airbus A350-1000', 'Boeing 787-9', 'Airbus A380-800'][Math.floor(Math.random() * 4)],
          airline
        });
      }
    }
    
    return {
      id: `flight-${i}`,
      price,
      currency: 'USD',
      segments,
      totalDuration: `${durationHours}h ${durationMinutes}m`,
      stops,
      cabinClass: fareType,
      seatsAvailable: Math.floor(Math.random() * 20) + 1,
      fareType,
      refundable: Math.random() > 0.5,
      baggageAllowance: {
        carryOn: fareType === 'Economy' ? '7kg' : '10kg',
        checked: fareType === 'Economy' ? '23kg' : fareType === 'Economy Plus' ? '30kg' : '40kg'
      },
      features: selectedFeatures,
      co2Emission: `${Math.floor(Math.random() * 1000) + 500}kg`,
      onTimePerformance: Math.floor(Math.random() * 30) + 70 // 70% to 100%
    };
  });
};

// Generate mock hotel data
const generateHotels = (city: string): Hotel[] => {
  const hotelNames = [
    'Grand Luxury Hotel', 'Imperial Palace', 'The Royal Suites', 'Ocean View Resort',
    'Mountain Retreat', 'City Center Hotel', 'Skyline Towers', 'Sunrise Bay Resort',
    'Golden Palms Hotel', 'The Metropolitan', 'Park View Inn', 'Seaside Resort'
  ];

  const amenities = [
    'Free Wi-Fi', 'Swimming Pool', 'Fitness Center', 'Restaurant', 'Bar', 'Spa', 
    'Business Center', 'Concierge', '24-hour Front Desk', 'Room Service',
    'Airport Shuttle', 'Parking'
  ];

  return Array.from({ length: 8 }, (_, i) => {
    const name = hotelNames[Math.floor(Math.random() * hotelNames.length)];
    const rating = (Math.floor(Math.random() * 15) + 30) / 10; // 3.0 to 4.5
    const price = Math.floor(Math.random() * 300) + 100; // $100 to $400

    return {
      id: `hotel-${i}`,
      name,
      address: `${Math.floor(Math.random() * 200) + 1} Main Street, ${city}`,
      price,
      currency: 'USD',
      rating,
      image: `https://source.unsplash.com/random/300x200?hotel,${i}`,
      amenities: [...amenities].sort(() => 0.5 - Math.random()).slice(0, 5 + Math.floor(Math.random() * 5)),
      description: 'Experience luxury and comfort in the heart of the city. This hotel offers spacious rooms with stunning views, exceptional service, and convenient access to attractions.',
      distanceFromAirport: `${Math.floor(Math.random() * 15) + 1} km`
    };
  });
};

// Generate mock car rental data
const generateCarRentals = (city: string): CarRental[] => {
  const carCompanies = ['Hertz', 'Avis', 'Enterprise', 'Budget', 'Sixt', 'Alamo'];
  const carModels = [
    'Toyota Camry', 'Honda Accord', 'BMW 3 Series', 'Mercedes C-Class',
    'Ford Explorer', 'Chevrolet Tahoe', 'Audi Q5', 'Volkswagen Passat'
  ];
  const categories = ['Economy', 'Compact', 'Midsize', 'Luxury', 'SUV', 'Minivan'];
  const features = [
    'Automatic Transmission', 'Air Conditioning', 'Bluetooth', 'GPS Navigation',
    'Leather Seats', 'Sunroof', 'Backup Camera', 'Cruise Control'
  ];

  return Array.from({ length: 6 }, (_, i) => {
    const company = carCompanies[Math.floor(Math.random() * carCompanies.length)];
    const model = carModels[Math.floor(Math.random() * carModels.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 70) + 30; // $30 to $100 per day

    return {
      id: `car-${i}`,
      company,
      model,
      category,
      image: `https://source.unsplash.com/random/300x200?car,${model}`,
      price,
      currency: 'USD',
      features: [...features].sort(() => 0.5 - Math.random()).slice(0, 4 + Math.floor(Math.random() * 3)),
      passengerCapacity: 2 + Math.floor(Math.random() * 6), // 2 to 7 passengers
      location: `${city} Airport`,
      availableAt: '09:00 AM'
    };
  });
};

const SearchResults = () => {
  const location = useLocation();
  const searchParams = location.state || {
    from: 'New York (JFK)',
    to: 'London (LHR)',
    departDate: '2025-07-25',
    returnDate: '2025-08-01',
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    cabinClass: 'Economy',
    tripType: 'roundtrip',
    includeHotels: true,
    includeCarRentals: true
  };

  // State for search results
  const [flightOptions, setFlightOptions] = useState<FlightOption[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [carRentals, setCarRentals] = useState<CarRental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedStops, setSelectedStops] = useState<number[]>([0, 1, 2]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<[number, number]>([0, 24]);
  const [sortBy, setSortBy] = useState<string>('price');
  const [filteredFlights, setFilteredFlights] = useState<FlightOption[]>([]);
  
  // Selected options
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API calls to fetch results
    setIsLoading(true);
    
    setTimeout(() => {
      // Generate mock data based on search params
      const flights = generateFlightOptions(
        searchParams.from,
        searchParams.to,
        searchParams.departDate,
        searchParams.passengers.adults + searchParams.passengers.children
      );
      
      setFlightOptions(flights);
      setFilteredFlights(flights);
      
      // Only generate hotels and car rentals if requested
      if (searchParams.includeHotels) {
        const destination = searchParams.to.split('(')[0].trim();
        setHotels(generateHotels(destination));
      }
      
      if (searchParams.includeCarRentals) {
        const destination = searchParams.to.split('(')[0].trim();
        setCarRentals(generateCarRentals(destination));
      }
      
      setIsLoading(false);
    }, 1500); // Simulate loading delay
  }, [searchParams]);

  // Apply filters to flight options
  useEffect(() => {
    let filtered = [...flightOptions];
    
    // Filter by price
    filtered = filtered.filter(flight => 
      flight.price >= priceRange[0] && flight.price <= priceRange[1]
    );
    
    // Filter by number of stops
    if (selectedStops.length > 0) {
      filtered = filtered.filter(flight => selectedStops.includes(flight.stops));
    }
    
    // Filter by airlines
    if (selectedAirlines.length > 0) {
      filtered = filtered.filter(flight => 
        selectedAirlines.includes(flight.segments[0].airline.code)
      );
    }
    
    // Filter by departure time (first segment)
    filtered = filtered.filter(flight => {
      const depHour = parseInt(flight.segments[0].departureTime.split(':')[0]);
      return depHour >= selectedTimeRange[0] && depHour <= selectedTimeRange[1];
    });
    
    // Sort results
    switch (sortBy) {
      case 'price':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'duration':
        filtered.sort((a, b) => {
          const durationA = a.totalDuration.split('h')[0];
          const durationB = b.totalDuration.split('h')[0];
          return parseInt(durationA) - parseInt(durationB);
        });
        break;
      case 'departure':
        filtered.sort((a, b) => {
          const timeA = a.segments[0].departureTime;
          const timeB = b.segments[0].departureTime;
          return timeA.localeCompare(timeB);
        });
        break;
      case 'arrival':
        filtered.sort((a, b) => {
          const lastSegmentA = a.segments[a.segments.length - 1];
          const lastSegmentB = b.segments[b.segments.length - 1];
          return lastSegmentA.arrivalTime.localeCompare(lastSegmentB.arrivalTime);
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.onTimePerformance - a.onTimePerformance);
        break;
      default:
        break;
    }
    
    setFilteredFlights(filtered);
  }, [flightOptions, priceRange, selectedStops, selectedAirlines, selectedTimeRange, sortBy]);

  // Get all available airlines from flight options
  const availableAirlines = [...new Set(flightOptions.map(flight => flight.segments[0].airline.code))];

  // Handle booking selection
  const handleBookNow = () => {
    if (!selectedFlight) {
      toast.error("Please select a flight to continue");
      return;
    }
    
    // In a real app, this would navigate to checkout
    toast.success("Your booking has been added to cart! Proceed to checkout.");
  };
  
  // Helper to format time display
  const formatTimeDisplay = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
  };

  // Price range slider max value based on available flights
  const maxPrice = Math.max(...flightOptions.map(f => f.price), 5000);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="text-center">
          <div className="mb-4">
            <Plane className="h-12 w-12 text-purple-600 animate-pulse mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Searching for the best options</h2>
          <p className="text-gray-600">We're finding you the best flights, hotels and car rentals...</p>
          
          <div className="mt-8 w-64 mx-auto">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-purple-600"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Search filters sidebar */}
          <div className="w-full md:w-64 lg:w-72 bg-white rounded-lg shadow-lg p-5 sticky top-24">
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
          
          {/* Main content */}
          <div className="flex-1">
            <Tabs defaultValue="flights" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="flights" className="text-lg">
                  Flights ({filteredFlights.length})
                </TabsTrigger>
                {searchParams.includeHotels && (
                  <TabsTrigger value="hotels" className="text-lg">
                    Hotels ({hotels.length})
                  </TabsTrigger>
                )}
                {searchParams.includeCarRentals && (
                  <TabsTrigger value="cars" className="text-lg">
                    Car Rentals ({carRentals.length})
                  </TabsTrigger>
                )}
              </TabsList>
              
              {/* Flights Tab */}
              <TabsContent value="flights">
                <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
                  <h2 className="text-xl font-bold mb-2">
                    {searchParams.from} to {searchParams.to}
                  </h2>
                  <div className="text-gray-600">
                    {searchParams.departDate} • {searchParams.passengers.adults} Adult{searchParams.passengers.adults !== 1 ? 's' : ''}
                    {searchParams.passengers.children > 0 && `, ${searchParams.passengers.children} Child${searchParams.passengers.children !== 1 ? 'ren' : ''}`}
                    {searchParams.passengers.infants > 0 && `, ${searchParams.passengers.infants} Infant${searchParams.passengers.infants !== 1 ? 's' : ''}`}
                    • {searchParams.cabinClass}
                  </div>
                </div>
                
                {filteredFlights.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <Compass className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-xl font-semibold mb-2">No flights found</h3>
                    <p className="text-gray-600">
                      Try adjusting your filters or search criteria to see more results.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFlights.map((flight) => (
                      <motion.div
                        key={flight.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "bg-white rounded-lg shadow-lg overflow-hidden",
                          selectedFlight === flight.id && "ring-2 ring-purple-500"
                        )}
                      >
                        {/* Airline header */}
                        <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
                          <div className="flex items-center">
                            <div className="h-8 w-8 mr-3 relative">
                              <img 
                                src={flight.segments[0].airline.logo} 
                                alt={flight.segments[0].airline.name}
                                className="object-contain h-full w-full"
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold">{flight.segments[0].airline.name}</h3>
                              <p className="text-sm text-gray-600">
                                {flight.segments.map(s => s.flightNumber).join(' · ')}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-700">
                              ${flight.price}
                            </div>
                            <div className="text-sm text-gray-600">per person</div>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          {/* Flight route summary */}
                          <div className="flex items-center justify-between mb-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {flight.segments[0].departureTime}
                              </div>
                              <div className="text-sm text-gray-600">
                                {flight.segments[0].departureAirport}
                              </div>
                            </div>
                            
                            <div className="flex-grow mx-4">
                              <div className="relative flex items-center">
                                <div className="h-0.5 flex-grow bg-gray-300"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="bg-white px-2 text-sm text-gray-600 whitespace-nowrap">
                                    {flight.totalDuration}
                                    {flight.stops > 0 && (
                                      <span className="ml-2 text-orange-600">
                                        • {flight.stops} {flight.stops === 1 ? 'stop' : 'stops'}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-center">
                              <div className="text-2xl font-bold">
                                {flight.segments[flight.segments.length - 1].arrivalTime}
                              </div>
                              <div className="text-sm text-gray-600">
                                {flight.segments[flight.segments.length - 1].arrivalAirport}
                              </div>
                            </div>
                          </div>

                          {/* Flight details with accordion */}
                          <div className="mb-4">
                            <details className="group">
                              <summary className="flex items-center justify-between cursor-pointer list-none">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Luggage className="h-4 w-4 mr-1" />
                                  <span>{flight.cabinClass} • </span>
                                  <span className="ml-1">{flight.baggageAllowance.checked} checked</span>
                                  <Wifi className="h-4 w-4 mx-1" />
                                  <span>{flight.features.includes('Wi-Fi') ? 'Wi-Fi available' : 'No Wi-Fi'}</span>
                                </div>
                                <div className="text-sm text-purple-600 font-medium group-open:rotate-180 transition-transform">
                                  ▼
                                </div>
                              </summary>
                              
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                {/* Detailed flight segments */}
                                {flight.segments.map((segment, index) => (
                                  <div key={index} className="mb-4">
                                    {index > 0 && (
                                      <div className="flex items-center my-3 py-2 px-3 bg-amber-50 text-amber-800 rounded-md">
                                        <Clock className="h-4 w-4 mr-2" />
                                        <span className="text-sm">
                                          Layover in {segment.departureCity} • 
                                          {' '}
                                          {(() => {
                                            const prevArrTime = flight.segments[index - 1].arrivalTime;
                                            const depTime = segment.departureTime;
                                            const [prevHour, prevMin] = prevArrTime.split(':').map(Number);
                                            const [depHour, depMin] = depTime.split(':').map(Number);
                                            let hourDiff = depHour - prevHour;
                                            let minDiff = depMin - prevMin;
                                            
                                            if (minDiff < 0) {
                                              hourDiff--;
                                              minDiff += 60;
                                            }
                                            
                                            if (hourDiff < 0) hourDiff += 24;
                                            
                                            return `${hourDiff}h ${minDiff}m`;
                                          })()}
                                        </span>
                                      </div>
                                    )}
                                    
                                    <div className="flex justify-between">
                                      <div className="flex-1">
                                        <div className="flex items-center">
                                          <div className="w-16 text-right text-gray-900 font-medium">
                                            {segment.departureTime}
                                          </div>
                                          <div className="ml-4">
                                            <div className="font-medium">{segment.departureCity} ({segment.departureAirport})</div>
                                            <div className="text-sm text-gray-600">{segment.departureDate}</div>
                                          </div>
                                        </div>
                                        
                                        <div className="ml-16 my-1 border-l-2 border-gray-300 h-8 pl-4 text-xs text-gray-500">
                                          {segment.duration}
                                        </div>
                                        
                                        <div className="flex items-center">
                                          <div className="w-16 text-right text-gray-900 font-medium">
                                            {segment.arrivalTime}
                                          </div>
                                          <div className="ml-4">
                                            <div className="font-medium">{segment.arrivalCity} ({segment.arrivalAirport})</div>
                                            <div className="text-sm text-gray-600">{segment.arrivalDate}</div>
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="w-40 flex flex-col items-end">
                                        <div className="mb-1 text-sm">
                                          <span className="font-medium">{segment.airline.code} {segment.flightNumber}</span>
                                        </div>
                                        <div className="text-xs text-gray-600">
                                          {segment.aircraft}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                
                                {/* Features and baggage */}
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Features</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                      {flight.features.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                          <span className="text-green-600 mr-1">✓</span> {feature}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <h4 className="font-medium mb-2">Baggage Allowance</h4>
                                    <ul className="text-sm text-gray-600 space-y-1">
                                      <li>Carry-on: {flight.baggageAllowance.carryOn}</li>
                                      <li>Checked: {flight.baggageAllowance.checked}</li>
                                      {flight.refundable && (
                                        <li className="flex items-center text-green-600">
                                          <Shield className="h-3 w-3 mr-1" /> Refundable fare
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                </div>
                                
                                {/* Flight info footer */}
                                <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200 text-sm">
                                  <div className="flex items-center text-gray-600">
                                    <span className="mr-4">CO₂: {flight.co2Emission}</span>
                                    <span>On-time Performance: {flight.onTimePerformance}%</span>
                                  </div>
                                  <div className="text-sm">
                                    <span className="font-medium text-gray-800">
                                      {flight.seatsAvailable} seat{flight.seatsAvailable !== 1 ? 's' : ''} left
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </details>
                          </div>
                          
                          {/* Flight selection */}
                          <div className="flex justify-between items-center pt-3 border-t">
                            <div>
                              <Badge variant={flight.fareType === 'Economy' ? 'outline' : flight.fareType === 'Economy Plus' ? 'secondary' : 'default'}>
                                {flight.fareType}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button 
                                variant={selectedFlight === flight.id ? "default" : "outline"}
                                onClick={() => setSelectedFlight(flight.id)}
                                className="min-w-[100px]"
                              >
                                {selectedFlight === flight.id ? 'Selected' : 'Select'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              {/* Hotels Tab */}
              {searchParams.includeHotels && (
                <TabsContent value="hotels">
                  <div className="space-y-4">
                    {hotels.map((hotel) => (
                      <motion.div
                        key={hotel.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "bg-white rounded-lg shadow-lg overflow-hidden",
                          selectedHotel === hotel.id && "ring-2 ring-purple-500"
                        )}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-60 md:h-auto relative">
                            <img 
                              src={hotel.image} 
                              alt={hotel.name}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                                <span className="text-sm font-bold">{hotel.rating.toFixed(1)}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 md:p-6 flex-1 flex flex-col">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
                              <p className="text-gray-600 text-sm mb-3">{hotel.address}</p>
                              <p className="text-gray-700 mb-4">{hotel.description}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {hotel.amenities.map((amenity, i) => (
                                  <span key={i} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="text-sm text-gray-600">
                                <span className="flex items-center">
                                  <Plane className="h-3 w-3 mr-1" /> {hotel.distanceFromAirport} from airport
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center pt-4 border-t mt-4">
                              <div className="text-lg font-bold text-purple-700">
                                ${hotel.price} <span className="text-sm font-normal text-gray-600">per night</span>
                              </div>
                              
                              <Button 
                                variant={selectedHotel === hotel.id ? "default" : "outline"}
                                onClick={() => setSelectedHotel(hotel.id)}
                              >
                                {selectedHotel === hotel.id ? 'Selected' : 'Select'}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              )}
              
              {/* Car Rentals Tab */}
              {searchParams.includeCarRentals && (
                <TabsContent value="cars">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {carRentals.map((car) => (
                      <motion.div
                        key={car.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "bg-white rounded-lg shadow-lg overflow-hidden",
                          selectedCar === car.id && "ring-2 ring-purple-500"
                        )}
                      >
                        <div className="h-40 relative">
                          <img 
                            src={car.image} 
                            alt={car.model}
                            className="object-cover w-full h-full"
                          />
                          <div className="absolute top-3 left-3 bg-white bg-opacity-90 rounded-md px-2 py-1">
                            <span className="font-bold">{car.company}</span>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <h3 className="text-lg font-bold mb-1">{car.model}</h3>
                          <p className="text-sm text-gray-600 mb-3">{car.category}</p>
                          
                          <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                              </svg>
                              <span>{car.passengerCapacity} Passengers</span>
                            </div>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              </svg>
                              <span>{car.location}</span>
                            </div>
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                              </svg>
                              <span>Available at {car.availableAt}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {car.features.slice(0, 3).map((feature, i) => (
                              <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700">
                                {feature}
                              </span>
                            ))}
                            {car.features.length > 3 && (
                              <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-700">
                                +{car.features.length - 3} more
                              </span>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center pt-2 border-t">
                            <div className="text-lg font-bold text-purple-700">
                              ${car.price} <span className="text-sm font-normal text-gray-600">per day</span>
                            </div>
                            
                            <Button 
                              variant={selectedCar === car.id ? "default" : "outline"}
                              onClick={() => setSelectedCar(car.id)}
                              size="sm"
                            >
                              {selectedCar === car.id ? 'Selected' : 'Select'}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              )}
            </Tabs>
            
            {/* Bottom booking bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-10">
              <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div>
                  {selectedFlight && (
                    <div className="flex items-center">
                      <div className="mr-4">
                        <p className="font-semibold">Flight selected:</p>
                        <p className="text-sm text-gray-600">
                          {flightOptions.find(f => f.id === selectedFlight)?.segments[0].airline.name} • ${flightOptions.find(f => f.id === selectedFlight)?.price}
                        </p>
                      </div>
                      {selectedHotel && (
                        <div className="mr-4">
                          <p className="font-semibold">Hotel selected:</p>
                          <p className="text-sm text-gray-600">
                            {hotels.find(h => h.id === selectedHotel)?.name} • ${hotels.find(h => h.id === selectedHotel)?.price}/night
                          </p>
                        </div>
                      )}
                      {selectedCar && (
                        <div>
                          <p className="font-semibold">Car selected:</p>
                          <p className="text-sm text-gray-600">
                            {carRentals.find(c => c.id === selectedCar)?.model} • ${carRentals.find(c => c.id === selectedCar)?.price}/day
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Button 
                  size="lg" 
                  disabled={!selectedFlight}
                  onClick={handleBookNow}
                  className="min-w-[150px]"
                >
                  Book Now
                </Button>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
