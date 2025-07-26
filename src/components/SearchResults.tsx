import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { toast } from "sonner";

// Import our components
import FilterPanel from "./search-results/FilterPanel";
import MobileFilterPanel from "./search-results/MobileFilterPanel";
import TabLayout from "./search-results/TabLayout";
import BookingBar from "./search-results/BookingBar";

// Import our types
import type { FlightOption, Hotel, CarRental, Activity } from "@/types/flight";

// All types are imported from types/flight.ts
import type { Airline, FlightSegment } from "../types/flight";
import { getRandomImageByCategory } from "@/utils/UnsplashService";

// Sample logo URLs for airlines
const airlineLogos: Record<string, string> = {
  QR: "https://1000logos.net/wp-content/uploads/2019/12/0021_Qatar-Airways-Logo.jpg",
  EK: "https://1000logos.net/wp-content/uploads/2019/12/Emirates-Logowww-140x88.jpg",
  AA: "https://1000logos.net/wp-content/uploads/2016/10/American-Airlines-logo.jpg",
  BA: "https://1000logos.net/wp-content/uploads/2016/10/British-Airways-Logo-tumb.png",
  LH: "https://1000logos.net/wp-content/uploads/2017/03/Lufthansa-Logo-tumb-140x88.png",
  DL: "https://1000logos.net/wp-content/uploads/2017/09/Delta-Air-Lines-logo-tumb-140x88.jpg",
};

// Generate mock flight data based on search parameters
const generateFlightOptions = (
  from: string,
  to: string,
  date: string,
  _passengers: number,
): FlightOption[] => {
  const airlines: Airline[] = [
    { code: "QR", name: "Qatar Airways", logo: airlineLogos.QR },
    { code: "EK", name: "Emirates", logo: airlineLogos.EK },
    { code: "AA", name: "American Airlines", logo: airlineLogos.AA },
    { code: "BA", name: "British Airways", logo: airlineLogos.BA },
    { code: "LH", name: "Lufthansa", logo: airlineLogos.LH },
    { code: "DL", name: "Delta Air Lines", logo: airlineLogos.DL },
  ];

  const cabinClasses = ["Economy", "Economy Plus", "Business", "First"];
  const features = [
    "In-flight Entertainment",
    "Power Outlets",
    "Wi-Fi",
    "Extra Legroom",
    "Premium Meals",
    "Lounge Access",
    "Priority Boarding",
    "Flat-bed Seats",
  ];

  // Generate 15 random flight options
  return Array.from({ length: 15 }, (_, i) => {
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const stops = Math.floor(Math.random() * 3); // 0, 1, or 2 stops
    const fareType = cabinClasses[
      Math.floor(Math.random() * cabinClasses.length)
    ] as "Economy" | "Economy Plus" | "Business" | "First";

    // Generate random time for departure (morning to evening)
    const depHour = Math.floor(Math.random() * 12) + 7; // 7 AM to 7 PM
    const depMinute = Math.floor(Math.random() * 60);
    const depTime = `${depHour.toString().padStart(2, "0")}:${depMinute.toString().padStart(2, "0")}`;

    // Calculate arrival time based on duration
    const durationHours = 2 + Math.floor(Math.random() * 10); // 2 to 12 hours
    const durationMinutes = Math.floor(Math.random() * 60);
    const totalMinutes =
      depHour * 60 + depMinute + durationHours * 60 + durationMinutes;
    const arrHour = Math.floor(totalMinutes / 60) % 24;
    const arrMinute = totalMinutes % 60;
    const arrTime = `${arrHour.toString().padStart(2, "0")}:${arrMinute.toString().padStart(2, "0")}`;

    // Select random features based on cabin class
    const numFeatures =
      fareType === "Economy" ? 2 : fareType === "Economy Plus" ? 4 : 6;
    const selectedFeatures = [...features]
      .sort(() => 0.5 - Math.random())
      .slice(0, numFeatures);

    // Calculate price based on cabin class and stops
    let basePrice = 250;
    if (fareType === "Economy Plus") basePrice = 450;
    if (fareType === "Business") basePrice = 1200;
    if (fareType === "First") basePrice = 3500;

    // Direct flights are more expensive
    if (stops === 0) basePrice *= 1.2;

    // Add some randomness to price
    const price = Math.round(basePrice * (0.9 + Math.random() * 0.4));

    // Generate segments based on stops
    const segments: FlightSegment[] = [];
    segments.push({
      departureAirport: from,
      departureCity: from.split("(")[0].trim(),
      departureTime: depTime,
      departureDate: date,
      arrivalAirport:
        stops === 0
          ? to
          : `${["DXB", "JFK", "LHR", "CDG", "IST"][Math.floor(Math.random() * 5)]}`,
      arrivalCity:
        stops === 0
          ? to.split("(")[0].trim()
          : ["Dubai", "New York", "London", "Paris", "Istanbul"][
              Math.floor(Math.random() * 5)
            ],
      arrivalTime:
        stops === 0
          ? arrTime
          : `${(depHour + 2) % 24}:${depMinute.toString().padStart(2, "0")}`,
      arrivalDate: date,
      flightNumber: `${airline.code}${100 + Math.floor(Math.random() * 900)}`,
      duration:
        stops === 0
          ? `${durationHours}h ${durationMinutes}m`
          : `${2 + Math.floor(Math.random() * 3)}h ${Math.floor(Math.random() * 60)}m`,
      aircraft: [
        "Boeing 777-300ER",
        "Airbus A350-1000",
        "Boeing 787-9",
        "Airbus A380-800",
      ][Math.floor(Math.random() * 4)],
      airline,
    });

    if (stops > 0) {
      // Add layover segments
      for (let j = 0; j < stops; j++) {
        const layoverHour = (depHour + 3 + j * 3) % 24;
        const prevArrival = segments[segments.length - 1].arrivalAirport;
        const prevArrivalCity = segments[segments.length - 1].arrivalCity;

        const nextDestination =
          j === stops - 1
            ? to
            : `${["SIN", "DOH", "AUH", "FRA", "AMS"][Math.floor(Math.random() * 5)]}`;
        const nextDestinationCity =
          j === stops - 1
            ? to.split("(")[0].trim()
            : ["Singapore", "Doha", "Abu Dhabi", "Frankfurt", "Amsterdam"][
                Math.floor(Math.random() * 5)
              ];

        segments.push({
          departureAirport: prevArrival,
          departureCity: prevArrivalCity,
          departureTime: `${layoverHour.toString().padStart(2, "0")}:${Math.floor(
            Math.random() * 60,
          )
            .toString()
            .padStart(2, "0")}`,
          departureDate: date,
          arrivalAirport: nextDestination,
          arrivalCity: nextDestinationCity,
          arrivalTime:
            j === stops - 1
              ? arrTime
              : `${(layoverHour + 2) % 24}:${Math.floor(Math.random() * 60)
                  .toString()
                  .padStart(2, "0")}`,
          arrivalDate: date,
          flightNumber: `${airline.code}${100 + Math.floor(Math.random() * 900)}`,
          duration: `${2 + Math.floor(Math.random() * 3)}h ${Math.floor(Math.random() * 60)}m`,
          aircraft: [
            "Boeing 777-300ER",
            "Airbus A350-1000",
            "Boeing 787-9",
            "Airbus A380-800",
          ][Math.floor(Math.random() * 4)],
          airline,
        });
      }
    }

    return {
      id: `flight-${i}`,
      price,
      currency: "USD",
      segments,
      totalDuration: `${durationHours}h ${durationMinutes}m`,
      duration: `${durationHours}h ${durationMinutes}m`, // Add duration for FlightOption type
      stops,
      cabinClass: fareType,
      seatsAvailable: Math.floor(Math.random() * 20) + 1,
      fareType,
      refundable: Math.random() > 0.5,
      baggageAllowance: {
        carryOn: fareType === "Economy" ? "7kg" : "10kg",
        checked:
          fareType === "Economy"
            ? "23kg"
            : fareType === "Economy Plus"
              ? "30kg"
              : "40kg",
      },
      features: selectedFeatures,
      co2Emission: `${Math.floor(Math.random() * 1000) + 500}kg`,
      onTimePerformance: Math.floor(Math.random() * 30) + 70, // 70% to 100%
    };
  });
};

// Generate mock hotel data
const generateHotelOptions = (city: string): Hotel[] => {
  const hotelNames = [
    "Grand Luxury Hotel",
    "Imperial Palace",
    "The Royal Suites",
    "Ocean View Resort",
    "Mountain Retreat",
    "City Center Hotel",
    "Skyline Towers",
    "Sunrise Bay Resort",
    "Golden Palms Hotel",
    "The Metropolitan",
    "Park View Inn",
    "Seaside Resort",
  ];

  const features = [
    "Free Wi-Fi",
    "Swimming Pool",
    "Fitness Center",
    "Restaurant",
    "Bar",
    "Spa",
    "Business Center",
    "Concierge",
    "24-hour Front Desk",
    "Room Service",
    "Airport Shuttle",
    "Parking",
  ];

  return Array.from({ length: 8 }, (_, i) => {
    const name = hotelNames[Math.floor(Math.random() * hotelNames.length)];
    const rating = (Math.floor(Math.random() * 15) + 30) / 10; // 3.0 to 4.5
    const priceAmount = Math.floor(Math.random() * 300) + 100; // $100 to $400

    return {
      id: `hotel-${i}`,
      name,
      location: `${city}, Downtown Area`,
      price: {
        amount: priceAmount,
        currency: "USD",
        period: "night",
      },
      rating,
      image: "",
      features: [...features]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5 + Math.floor(Math.random() * 5)),
      distance: {
        value: Math.floor(Math.random() * 15) + 1,
        unit: "km",
        landmark: "city center",
      },
      reviews: Math.floor(Math.random() * 1000) + 100,
      availability: {
        checkIn: "14:00",
        checkOut: "12:00",
      },
      rooms: [
        {
          type: "Standard",
          amenities: ["TV", "Air Conditioning", "Safe"],
          capacity: 2,
          pricePerNight: priceAmount,
        },
        {
          type: "Deluxe",
          amenities: ["TV", "Air Conditioning", "Safe", "Mini Bar", "Sea View"],
          capacity: 2,
          pricePerNight: priceAmount * 1.5,
        },
      ],
    };
  });
};

// Generate mock car rental data
const generateCarRentals = (city: string): CarRental[] => {
  const carCompanies = [
    "Hertz",
    "Avis",
    "Enterprise",
    "Budget",
    "Sixt",
    "Alamo",
  ];
  const carModels = [
    "Toyota Camry",
    "Honda Accord",
    "BMW 3 Series",
    "Mercedes C-Class",
    "Ford Explorer",
    "Chevrolet Tahoe",
    "Audi Q5",
    "Volkswagen Passat",
  ];
  const categories = [
    "Economy",
    "Compact",
    "Midsize",
    "Luxury",
    "SUV",
    "Minivan",
  ];
  const features = [
    "Automatic Transmission",
    "Air Conditioning",
    "Bluetooth",
    "GPS Navigation",
    "Leather Seats",
    "Sunroof",
    "Backup Camera",
    "Cruise Control",
  ];

  return Array.from({ length: 6 }, (_, i) => {
    const company =
      carCompanies[Math.floor(Math.random() * carCompanies.length)];
    const model = carModels[Math.floor(Math.random() * carModels.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const priceAmount = Math.floor(Math.random() * 70) + 30; // $30 to $100 per day

    return {
      id: `car-${i}`,
      company,
      logo: `https://logo.clearbit.com/${company.toLowerCase().replace(" ", "")}.com`,
      vehicle: {
        name: model,
        type: category,
        image: "",
        features: [...features]
          .sort(() => 0.5 - Math.random())
          .slice(0, 4 + Math.floor(Math.random() * 3)),
        capacity: {
          passengers: 2 + Math.floor(Math.random() * 6),
          bags: 1 + Math.floor(Math.random() * 3),
        },
      },
      location: {
        pickup: `${city} Airport`,
      },
      availability: {
        pickupDate: new Date().toISOString().split("T")[0],
        pickupTime: "09:00",
        dropoffDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        dropoffTime: "09:00",
      },
      price: {
        amount: priceAmount,
        currency: "USD",
        period: "day",
      },
      mileage: {
        limit: "Unlimited",
      },
      included: ["Third Party Insurance", "Theft Protection"],
      policies: {
        cancellation: "Free cancellation up to 24 hours before pickup",
        fuelPolicy: "Full to Full",
      },
    };
  });
};

// Async wrapper to fetch images for hotels and cars
export const generateHotelOptionsWithImages = async (
  city: string,
): Promise<Hotel[]> => {
  const hotels = generateHotelOptions(city);
  for (const hotel of hotels) {
    // Use hotel name and city for specificity
    hotel.image = await getRandomImageByCategory(
      "hotel",
      `${hotel.name} hotel ${city}`,
    );
  }
  return hotels;
};

export const generateCarRentalsWithImages = async (
  city: string,
): Promise<CarRental[]> => {
  const cars = generateCarRentals(city);
  for (const car of cars) {
    // Use car model and category for specificity
    car.vehicle.image = await getRandomImageByCategory(
      "car",
      `${car.vehicle.name} ${car.vehicle.type}`,
    );
  }
  return cars;
};

// Generate mock activities data
const generateActivities = (city: string): Activity[] => {
  const activityTypes = [
    "Tour",
    "Adventure",
    "Cultural",
    "Food & Drink",
    "Nature",
    "Entertainment",
  ];

  return Array(6)
    .fill(0)
    .map((_, i) => ({
      id: `activity-${i}`,
      name: `${activityTypes[i]} Experience in ${city}`,
      description: `Explore the best ${activityTypes[i].toLowerCase()} experiences in ${city}`,
      location: "City Center",
      image: `https://source.unsplash.com/random/300x200/?${activityTypes[i].toLowerCase()},activity`,
      rating: 4.2 + (i % 3) * 0.3,
      reviews: 40 + i * 15,
      price: {
        amount: 45 + i * 25,
        currency: "USD",
      },
      duration: `${2 + i} hours`,
      categories: [activityTypes[i]],
      includes: [
        "Guide",
        "Transport",
        i > 2 ? "Meals" : "",
        i > 4 ? "Photos" : "",
      ].filter(Boolean),
      languages: ["English", "Spanish", i > 3 ? "French" : ""].filter(Boolean),
      availability: {
        dates: Array(10)
          .fill(0)
          .map((_, j) => {
            const date = new Date();
            date.setDate(date.getDate() + j);
            return date.toISOString().split("T")[0];
          }),
        timeslots: ["09:00", "13:00", "16:00"],
      },
      groupSize: {
        min: 2,
        max: 10 + i * 2,
      },
    }));
};

export const generateActivitiesWithImages = async (
  city: string,
): Promise<Activity[]> => {
  const activities = generateActivities(city);
  for (const activity of activities) {
    activity.image = await getRandomImageByCategory(
      "travel",
      `${activity.categories[0]} ${city}`,
    );
  }
  return activities;
};

const SearchResults = () => {
  const location = useLocation();
  const searchParams = location.state || {
    from: "New York (JFK)",
    to: "London (LHR)",
    departDate: "2025-07-25",
    returnDate: "2025-08-01",
    passengers: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    cabinClass: "Economy",
    tripType: "roundtrip",
    includeHotels: true,
    includeCarRentals: true,
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
  const [selectedTimeRange, setSelectedTimeRange] = useState<[number, number]>([
    0, 24,
  ]);
  const [sortBy, setSortBy] = useState<string>("price");
  const [filteredFlights, setFilteredFlights] = useState<FlightOption[]>([]);

  // Selected options
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    (async () => {
      // Simulate API delay
      await new Promise((res) => setTimeout(res, 1500));
      const flights = generateFlightOptions(
        searchParams.from,
        searchParams.to,
        searchParams.departDate,
        searchParams.passengers.adults + searchParams.passengers.children,
      );
      if (isMounted) {
        setFlightOptions(flights);
        setFilteredFlights(flights);
      }
      if (searchParams.includeHotels) {
        const destination = searchParams.to.split("(")[0].trim();
        const hotelsWithImages =
          await generateHotelOptionsWithImages(destination);
        if (isMounted) setHotels(hotelsWithImages);
      }
      if (searchParams.includeCarRentals) {
        const destination = searchParams.to.split("(")[0].trim();
        const carsWithImages = await generateCarRentalsWithImages(destination);
        if (isMounted) setCarRentals(carsWithImages);
      }

      // Generate activities for the destination
      const destination = searchParams.to.split("(")[0].trim();
      const activitiesWithImages =
        await generateActivitiesWithImages(destination);
      if (isMounted) setActivities(activitiesWithImages);

      if (isMounted) setIsLoading(false);
    })();
    return () => {
      isMounted = false;
    };
  }, [searchParams]);

  // Apply filters to flight options
  useEffect(() => {
    let filtered = [...flightOptions];

    // Filter by price
    filtered = filtered.filter(
      (flight) =>
        flight.price >= priceRange[0] && flight.price <= priceRange[1],
    );

    // Filter by number of stops
    if (selectedStops.length > 0) {
      filtered = filtered.filter((flight) =>
        selectedStops.includes(flight.stops),
      );
    }

    // Filter by airlines
    if (selectedAirlines.length > 0) {
      filtered = filtered.filter((flight) =>
        selectedAirlines.includes(flight.segments[0].airline.code),
      );
    }

    // Filter by departure time (first segment)
    filtered = filtered.filter((flight) => {
      const depHour = parseInt(flight.segments[0].departureTime.split(":")[0]);
      return depHour >= selectedTimeRange[0] && depHour <= selectedTimeRange[1];
    });

    // Sort results
    switch (sortBy) {
      case "price":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "duration":
        filtered.sort((a, b) => {
          const durationA = a.totalDuration.split("h")[0];
          const durationB = b.totalDuration.split("h")[0];
          return parseInt(durationA) - parseInt(durationB);
        });
        break;
      case "departure":
        filtered.sort((a, b) => {
          const timeA = a.segments[0].departureTime;
          const timeB = b.segments[0].departureTime;
          return timeA.localeCompare(timeB);
        });
        break;
      case "arrival":
        filtered.sort((a, b) => {
          const lastSegmentA = a.segments[a.segments.length - 1];
          const lastSegmentB = b.segments[b.segments.length - 1];
          return lastSegmentA.arrivalTime.localeCompare(
            lastSegmentB.arrivalTime,
          );
        });
        break;
      case "rating":
        filtered.sort((a, b) => b.onTimePerformance - a.onTimePerformance);
        break;
      default:
        break;
    }

    setFilteredFlights(filtered);
  }, [
    flightOptions,
    priceRange,
    selectedStops,
    selectedAirlines,
    selectedTimeRange,
    sortBy,
  ]);

  // Get all available airlines from flight options
  const availableAirlines = [
    ...new Set(flightOptions.map((flight) => flight.segments[0].airline.code)),
  ];

  // Import the useNavigate hook
  const navigate = useNavigate();

  // Handle booking selection
  const handleBookNow = () => {
    if (!selectedFlight) {
      toast.error("Please select a flight to continue");
      return;
    }

    // Prepare booking data for checkout
    const flight = selectedFlight
      ? flightOptions.find((f) => f.id === selectedFlight)
      : null;
    const hotel = selectedHotel
      ? hotels.find((h) => h.id === selectedHotel)
      : null;
    const car = selectedCar
      ? carRentals.find((c) => c.id === selectedCar)
      : null;
    const activity = selectedActivity
      ? activities.find((a) => a.id === selectedActivity)
      : null;

    // Calculate total amount
    const flightPrice = flight?.price || 0;
    const hotelPrice = hotel ? hotel.price.amount * 3 : 0; // Assume 3 nights
    const carPrice = car ? car.price.amount * 3 : 0; // Assume 3 days
    const activityPrice = activity ? activity.price.amount : 0;
    const totalAmount = flightPrice + hotelPrice + carPrice + activityPrice;

    // Create booking data object
    const bookingData = {
      flight,
      hotel,
      car,
      activity,
      totalAmount,
      currency: "USD",
      passengers: searchParams.passengers,
      departDate: searchParams.departDate,
      returnDate: searchParams.returnDate,
    };

    // Navigate to checkout with booking data
    toast.success(
      "Your booking has been added to cart! Proceeding to checkout.",
    );
    navigate("/checkout", { state: { bookingData } });
  };

  // Price range slider max value based on available flights
  const maxPrice = Math.max(...flightOptions.map((f) => f.price), 5000);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50">
        <div className="text-center">
          <div className="mb-4">
            <Plane className="h-12 w-12 text-purple-600 animate-pulse mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Searching for the best options
          </h2>
          <p className="text-gray-600">
            We're finding you the best flights, hotels and car rentals...
          </p>

          <div className="mt-8 w-64 mx-auto">
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-purple-600"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
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
        {/* Mobile Filter Panel */}
        <MobileFilterPanel
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          selectedStops={selectedStops}
          setSelectedStops={setSelectedStops}
          selectedAirlines={selectedAirlines}
          setSelectedAirlines={setSelectedAirlines}
          selectedTimeRange={selectedTimeRange}
          setSelectedTimeRange={setSelectedTimeRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          availableAirlines={availableAirlines}
          flightOptions={flightOptions}
          maxPrice={maxPrice}
        />

        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Desktop Search filters sidebar - hidden on mobile */}
          <div className="hidden md:block">
            <FilterPanel
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              selectedStops={selectedStops}
              setSelectedStops={setSelectedStops}
              selectedAirlines={selectedAirlines}
              setSelectedAirlines={setSelectedAirlines}
              selectedTimeRange={selectedTimeRange}
              setSelectedTimeRange={setSelectedTimeRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              availableAirlines={availableAirlines}
              flightOptions={flightOptions}
              maxPrice={maxPrice}
            />
          </div>

          {/* Main content with tabs */}
          <TabLayout
            searchParams={searchParams}
            filteredFlights={filteredFlights}
            hotels={hotels}
            carRentals={carRentals}
            activities={activities}
            selectedFlight={selectedFlight}
            setSelectedFlight={setSelectedFlight}
            selectedHotel={selectedHotel}
            setSelectedHotel={setSelectedHotel}
            selectedCar={selectedCar}
            setSelectedCar={setSelectedCar}
            selectedActivity={selectedActivity}
            setSelectedActivity={setSelectedActivity}
          />
        </div>
      </div>

      {/* Bottom booking bar */}
      <BookingBar
        selectedFlight={selectedFlight}
        selectedHotel={selectedHotel}
        selectedCar={selectedCar}
        selectedActivity={selectedActivity}
        flightOptions={flightOptions}
        hotels={hotels}
        carRentals={carRentals}
        activities={activities}
        onBookNow={handleBookNow}
      />
    </div>
  );
};

export default SearchResults;
