import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plane, 
  Calendar, 
  Users, 
  ArrowRight, 
  MapPin,
  ArrowUpDown,
  X,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Combobox } from '@headlessui/react';
import amadeusService from '../services/amadeus';
import { useClickOutside } from '../hooks/useClickOutside';  // Define types
interface AirportLocation {
  id: string;
  iataCode: string;
  name: string;
  detailedName: string;
  subType: 'AIRPORT' | 'CITY';
  address?: {
    cityName: string;
    cityCode?: string;
    countryName: string;
    countryCode: string;
  };
  type: string;
}

// Helper function to format airport display
const formatAirportDisplay = (airport: AirportLocation | null): string => {
  if (!airport) return '';
  
  const cityName = airport.address?.cityName || airport.detailedName.split('/')[0];
  return `${airport.subType === 'AIRPORT' ? cityName : airport.name} (${airport.iataCode})`;
}

const BookingForm = () => {
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway' | 'multicity'>('roundtrip');
  
  // Date selection state
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  
  // Cabin class selection
  const [cabinClass, setCabinClass] = useState('Economy');
  
  // Airport search state
  const [departureQuery, setDepartureQuery] = useState('');
  const [departureResults, setDepartureResults] = useState<AirportLocation[]>([]);
  console.log("Departure results:", departureResults);
  const [selectedDeparture, setSelectedDeparture] = useState<AirportLocation | null>(null);
  
  const [arrivalQuery, setArrivalQuery] = useState('');
  const [arrivalResults, setArrivalResults] = useState<AirportLocation[]>([]);
  const [selectedArrival, setSelectedArrival] = useState<AirportLocation | null>(null);
  
  // Loading states
  const [isDepartureLoading, setIsDepartureLoading] = useState(false);
  const [isArrivalLoading, setIsArrivalLoading] = useState(false);
  
  // Passengers state
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  
  // Passenger dropdown state
  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);
  const passengerDropdownRef = useRef<HTMLDivElement>(null);
  
  // Add-on sections visibility
  const [showHotelSection, setShowHotelSection] = useState(false);
  const [showCarRentalSection, setShowCarRentalSection] = useState(false);
  const [showActivitiesSection, setShowActivitiesSection] = useState(false);
  
  // Hotel state
  const [hotelCheckIn, setHotelCheckIn] = useState('');
  const [hotelCheckOut, setHotelCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [hotelRating, setHotelRating] = useState(0);
  
  // Car rental state
  const [carPickupDate, setCarPickupDate] = useState('');
  const [carDropoffDate, setCarDropoffDate] = useState('');
  const [carType, setCarType] = useState('any');
  const [driverAge, setDriverAge] = useState(25);
  
  // Activities state
  const [activityDate, setActivityDate] = useState('');
  const [activityType, setActivityType] = useState('any');
  const [activityParticipants, setActivityParticipants] = useState(2);
  
  // Search state
  const [isSearching, setIsSearching] = useState(false);
  
  // Import useNavigate hook from React Router
  const navigate = useNavigate();

  // Handle search functionality
  const handleSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!selectedDeparture || !selectedArrival) {
      return;
    }
    
    setIsSearching(true);
    
    // Prepare search parameters
    const searchParams = {
      from: formatAirportDisplay(selectedDeparture),
      to: formatAirportDisplay(selectedArrival),
      departDate: departureDate,
      returnDate: returnDate,
      passengers: {
        adults: passengers.adults,
        children: passengers.children,
        infants: passengers.infants
      },
      cabinClass: cabinClass,
      tripType: tripType,
      includeHotels: showHotelSection,
      includeCarRentals: showCarRentalSection,
      includeActivities: showActivitiesSection,
      // Additional details
      hotel: showHotelSection ? {
        checkIn: hotelCheckIn,
        checkOut: hotelCheckOut,
        rooms,
        rating: hotelRating
      } : null,
      car: showCarRentalSection ? {
        pickupDate: carPickupDate,
        dropoffDate: carDropoffDate,
        type: carType,
        driverAge
      } : null,
      activities: showActivitiesSection ? {
        date: activityDate,
        type: activityType,
        participants: activityParticipants
      } : null
    };
    
    console.log('Search parameters:', searchParams);
    
    // Simulate a small delay for better user experience
    setTimeout(() => {
      setIsSearching(false);
      // Navigate to search results with search parameters
      navigate('/search-results', { state: searchParams });
    }, 1000);
  };
  
  // Close passenger dropdown when clicking outside
  useClickOutside(passengerDropdownRef, () => {
    setIsPassengerDropdownOpen(false);
  });

  // Search for departure airports
  const searchDepartureAirports = useCallback(async (query: string) => {
    if (query.length < 2) return;
    setIsDepartureLoading(true);
    try {
      const results = await amadeusService.searchAirports(query);
      setDepartureResults(results);
    } catch (error) {
      console.error('Error searching departure airports:', error);
    } finally {
      setIsDepartureLoading(false);
    }
  }, []);

  // Search for arrival airports
  const searchArrivalAirports = useCallback(async (query: string) => {
    if (query.length < 2) return;
    setIsArrivalLoading(true);
    try {
      const results = await amadeusService.searchAirports(query);
      setArrivalResults(results);
    } catch (error) {
      console.error('Error searching arrival airports:', error);
    } finally {
      setIsArrivalLoading(false);
    }
  }, []);

  // Debounce search for departure airports
  useEffect(() => {
    const handler = setTimeout(() => {
      if (departureQuery.length >= 2) {
        searchDepartureAirports(departureQuery);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [departureQuery, searchDepartureAirports]);

  // Debounce search for arrival airports
  useEffect(() => {
    const handler = setTimeout(() => {
      if (arrivalQuery.length >= 2) {
        searchArrivalAirports(arrivalQuery);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [arrivalQuery, searchArrivalAirports]);

  // Helper to get total passenger count
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  // Helper to format passenger display
  const formatPassengerCount = () => {
    return `${totalPassengers} Passenger${totalPassengers !== 1 ? 's' : ''}`;
  };

  const tripTypes = [
    { id: 'roundtrip', label: 'Round Trip', icon: ArrowUpDown },
    { id: 'oneway', label: 'One Way', icon: ArrowRight },
    { id: 'multicity', label: 'Multi City', icon: MapPin },
  ];

  return (
    <section className="relative -mt-32 z-30 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0">
            <CardContent className="p-6 lg:p-8">
              {/* Trip Type Selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tripTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <motion.button
                      key={type.id}
                      onClick={() => setTripType(type.id as any)}
                      className={cn(
                        'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                        tripType === type.id
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{type.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Booking Form */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                {/* From */}
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Combobox value={selectedDeparture} onChange={setSelectedDeparture}>
                      <div className="relative w-full">
                        <Combobox.Input
                          className={cn(
                            "w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none",
                            selectedDeparture ? "text-base" : "text-gray-500"
                          )}
                          displayValue={(airport: AirportLocation | null) => 
                            formatAirportDisplay(airport)
                          }
                          onChange={(e) => setDepartureQuery(e.target.value)}
                          placeholder="Departure city or airport"
                        />
                        {selectedDeparture && (
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedDeparture(null);
                              setDepartureQuery('');
                            }}
                          >
                            <X className="h-4 w-4 text-gray-400" />
                          </button>
                        )}
                        {departureQuery.length >= 2 && (
                          <Combobox.Options
                            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base overflow-auto max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            {isDepartureLoading ? (
                              <div className="py-2 px-4 text-gray-500">Loading...</div>
                            ) : departureResults.length === 0 ? (
                              <div className="py-2 px-4 text-gray-500">No airports found</div>
                            ) : (
                              departureResults.map((airport) => (
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
                              ))
                            )}
                          </Combobox.Options>
                        )}
                      </div>
                    </Combobox>
                  </div>
                </div>

                {/* To */}
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Combobox value={selectedArrival} onChange={setSelectedArrival}>
                      <div className="relative w-full">
                        <Combobox.Input
                          className={cn(
                            "w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none",
                            selectedArrival ? "text-base" : "text-gray-500"
                          )}
                          displayValue={(airport: AirportLocation | null) => 
                            formatAirportDisplay(airport)
                          }
                          onChange={(e) => setArrivalQuery(e.target.value)}
                          placeholder="Destination city or airport"
                        />
                        {selectedArrival && (
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedArrival(null);
                              setArrivalQuery('');
                            }}
                          >
                            <X className="h-4 w-4 text-gray-400" />
                          </button>
                        )}
                        {arrivalQuery.length >= 2 && (
                          <Combobox.Options
                            className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base overflow-auto max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                          >
                            {isArrivalLoading ? (
                              <div className="py-2 px-4 text-gray-500">Loading...</div>
                            ) : arrivalResults.length === 0 ? (
                              <div className="py-2 px-4 text-gray-500">No airports found</div>
                            ) : (
                              arrivalResults.map((airport) => (
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
                              ))
                            )}
                          </Combobox.Options>
                        )}
                      </div>
                    </Combobox>
                  </div>
                </div>

                {/* Departure Date */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="date"
                      className="pl-10 h-12 text-base"
                      defaultValue="2025-08-15"
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Return Date */}
                {tripType === 'roundtrip' && (
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="date"
                        className="pl-10 h-12 text-base"
                        defaultValue="2025-08-25"
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {/* Passengers */}
                <div className={cn(
                  tripType === 'roundtrip' ? 'lg:col-span-2' : 'lg:col-span-4'
                )}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passengers
                  </label>
                  <div className="relative" ref={passengerDropdownRef}>
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      readOnly
                      className="pl-10 h-12 text-base cursor-pointer"
                      value={formatPassengerCount()}
                      onClick={() => setIsPassengerDropdownOpen(!isPassengerDropdownOpen)}
                    />
                    
                    {/* Passenger dropdown */}
                    {isPassengerDropdownOpen && (
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

                {/* Cabin Class */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cabin Class
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-12 pl-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      value={cabinClass}
                      onChange={(e) => setCabinClass(e.target.value)}
                    >
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Premium Economy</option>
                      <option value="Business">Business</option>
                      <option value="First">First</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="lg:col-span-12 lg:col-start-1 mt-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="qatar"
                      size="xl"
                      className="w-full lg:w-auto lg:px-12 group relative overflow-hidden"
                      onClick={handleSearch}
                      disabled={!selectedDeparture || !selectedArrival}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSearching ? 'Searching...' : 'Search Flights'}
                        {!isSearching && <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Quick Options */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm">
                  {/* Add hotels */}
                  <div className="relative">
                    <motion.button
                      className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        e.preventDefault();
                        // Toggle hotel section
                        setShowHotelSection(!showHotelSection);
                        // Hide other sections if they're open
                        if (!showHotelSection) {
                          setShowCarRentalSection(false);
                          setShowActivitiesSection(false);
                        }
                      }}
                    >
                      {showHotelSection ? '- Remove hotels' : '+ Add hotels'}
                    </motion.button>
                  </div>
                  
                  {/* Add car rental */}
                  <div className="relative">
                    <motion.button
                      className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        e.preventDefault();
                        // Toggle car rental section
                        setShowCarRentalSection(!showCarRentalSection);
                        // Hide other sections if they're open
                        if (!showCarRentalSection) {
                          setShowHotelSection(false);
                          setShowActivitiesSection(false);
                        }
                      }}
                    >
                      {showCarRentalSection ? '- Remove car rental' : '+ Add car rental'}
                    </motion.button>
                  </div>
                  
                  {/* Add activities */}
                  <div className="relative">
                    <motion.button
                      className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        e.preventDefault();
                        // Toggle activities section
                        setShowActivitiesSection(!showActivitiesSection);
                        // Hide other sections if they're open
                        if (!showActivitiesSection) {
                          setShowHotelSection(false);
                          setShowCarRentalSection(false);
                        }
                      }}
                    >
                      {showActivitiesSection ? '- Remove activities' : '+ Add activities'}
                    </motion.button>
                  </div>
                </div>

                {/* Hotel Section */}
                {showHotelSection && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
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
                            {[1, 2, 3, 4, 5].map(num => (
                              <option key={num} value={num}>{num} Room{num !== 1 ? 's' : ''}</option>
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
                )}

                {/* Car Rental Section */}
                {showCarRentalSection && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-gray-200"
                  >
                    <h3 className="text-lg font-semibold mb-4">Car Rental Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pick-up Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="date"
                            className="pl-10 h-12 text-base"
                            value={carPickupDate}
                            onChange={(e) => setCarPickupDate(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Drop-off Date
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input
                            type="date"
                            className="pl-10 h-12 text-base"
                            value={carDropoffDate}
                            onChange={(e) => setCarDropoffDate(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Car Type
                        </label>
                        <div className="relative">
                          <select
                            className="w-full h-12 pl-4 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            value={carType}
                            onChange={(e) => setCarType(e.target.value)}
                          >
                            <option value="any">Any Type</option>
                            <option value="economy">Economy</option>
                            <option value="compact">Compact</option>
                            <option value="midsize">Midsize</option>
                            <option value="suv">SUV</option>
                            <option value="luxury">Luxury</option>
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Driver Age
                        </label>
                        <div className="relative">
                          <select
                            className="w-full h-12 pl-4 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            value={driverAge}
                            onChange={(e) => setDriverAge(parseInt(e.target.value))}
                          >
                            {Array.from({ length: 60 }, (_, i) => i + 21).map(age => (
                              <option key={age} value={age}>{age} years</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Activities Section */}
                {showActivitiesSection && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
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
                            <option value="sightseeing">Sightseeing</option>
                            <option value="tours">Guided Tours</option>
                            <option value="adventure">Adventure</option>
                            <option value="cultural">Cultural</option>
                            <option value="foodWine">Food & Wine</option>
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
                            onChange={(e) => setActivityParticipants(parseInt(e.target.value))}
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
