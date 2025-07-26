import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Card, CardContent } from "./ui/card";
import { cn } from "../lib/utils";
import { amadeusService } from "../utils/amadeus";
import type { AirportLocation } from "../utils/amadeus";

// Import sub-components
import TripTypeSelector from "./booking/TripTypeSelector";
import AirportSearchInput, {
  formatAirportDisplay,
} from "./booking/AirportSearchInput";
import DateSelector from "./booking/DateSelector";
import PassengerSelector from "./booking/PassengerSelector";
import CabinClassSelector from "./booking/CabinClassSelector";
import HotelSection from "./booking/HotelSection";
import CarRentalSection from "./booking/CarRentalSection";
import ActivitiesSection from "./booking/ActivitiesSection";
import QuickOptions from "./booking/QuickOptions";
import SearchButton from "./booking/SearchButton";

const BookingForm = () => {
  const [tripType, setTripType] = useState<
    "roundtrip" | "oneway" | "multicity"
  >("roundtrip");

  // Date selection state
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  // Cabin class selection
  const [cabinClass, setCabinClass] = useState("Economy");

  // Airport search state
  const [departureQuery, setDepartureQuery] = useState("");
  const [departureResults, setDepartureResults] = useState<AirportLocation[]>(
    [],
  );
  const [selectedDeparture, setSelectedDeparture] =
    useState<AirportLocation | null>(null);

  const [arrivalQuery, setArrivalQuery] = useState("");
  const [arrivalResults, setArrivalResults] = useState<AirportLocation[]>([]);
  const [selectedArrival, setSelectedArrival] =
    useState<AirportLocation | null>(null);

  // Loading states
  const [isDepartureLoading, setIsDepartureLoading] = useState(false);
  const [isArrivalLoading, setIsArrivalLoading] = useState(false);

  // Passengers state
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  // Add-on sections visibility
  const [showHotelSection, setShowHotelSection] = useState(false);
  const [showCarRentalSection, setShowCarRentalSection] = useState(false);
  const [showActivitiesSection, setShowActivitiesSection] = useState(false);

  // Hotel state
  const [hotelCheckIn, setHotelCheckIn] = useState("");
  const [hotelCheckOut, setHotelCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [hotelRating, setHotelRating] = useState(0);

  // Car rental state
  const [carPickupDate, setCarPickupDate] = useState("");
  const [carDropoffDate, setCarDropoffDate] = useState("");
  const [carType, setCarType] = useState("any");
  const [driverAge, setDriverAge] = useState(25);

  // Activities state
  const [activityDate, setActivityDate] = useState("");
  const [activityType, setActivityType] = useState("any");
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
        infants: passengers.infants,
      },
      cabinClass: cabinClass,
      tripType: tripType,
      includeHotels: showHotelSection,
      includeCarRentals: showCarRentalSection,
      includeActivities: showActivitiesSection,
      // Additional details
      hotel: showHotelSection
        ? {
            checkIn: hotelCheckIn,
            checkOut: hotelCheckOut,
            rooms,
            rating: hotelRating,
          }
        : null,
      car: showCarRentalSection
        ? {
            pickupDate: carPickupDate,
            dropoffDate: carDropoffDate,
            type: carType,
            driverAge,
          }
        : null,
      activities: showActivitiesSection
        ? {
            date: activityDate,
            type: activityType,
            participants: activityParticipants,
          }
        : null,
    };

    console.log("Search parameters:", searchParams);

    // Simulate a small delay for better user experience
    setTimeout(() => {
      setIsSearching(false);
      // Navigate to search results with search parameters
      navigate("/search-results", { state: searchParams });
    }, 1000);
  };

  // Search for departure airports with error handling
  const searchDepartureAirports = useCallback(async (query: string) => {
    if (query.length < 2) return;
    setIsDepartureLoading(true);
    try {
      const results = await amadeusService.searchAirports(query);
      if (results.length === 0) {
        console.log("No departure airports found for query:", query);
      }
      setDepartureResults(results);
    } catch (error) {
      console.error("Error searching departure airports:", error);
      // The amadeusService now handles errors internally and returns mock data
    } finally {
      setIsDepartureLoading(false);
    }
  }, []);

  // Search for arrival airports with error handling
  const searchArrivalAirports = useCallback(async (query: string) => {
    if (query.length < 2) return;
    setIsArrivalLoading(true);
    try {
      const results = await amadeusService.searchAirports(query);
      if (results.length === 0) {
        console.log("No arrival airports found for query:", query);
      }
      setArrivalResults(results);
    } catch (error) {
      console.error("Error searching arrival airports:", error);
      // The amadeusService now handles errors internally and returns mock data
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
              <TripTypeSelector tripType={tripType} setTripType={setTripType} />

              {/* Booking Form */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                {/* From */}
                <div className="lg:col-span-3">
                  <AirportSearchInput
                    label="From"
                    placeholder="Departure city or airport"
                    query={departureQuery}
                    setQuery={setDepartureQuery}
                    results={departureResults}
                    isLoading={isDepartureLoading}
                    selectedAirport={selectedDeparture}
                    setSelectedAirport={setSelectedDeparture}
                    icon="plane"
                  />
                </div>

                {/* To */}
                <div className="lg:col-span-3">
                  <AirportSearchInput
                    label="To"
                    placeholder="Destination city or airport"
                    query={arrivalQuery}
                    setQuery={setArrivalQuery}
                    results={arrivalResults}
                    isLoading={isArrivalLoading}
                    selectedAirport={selectedArrival}
                    setSelectedAirport={setSelectedArrival}
                    icon="mappin"
                  />
                </div>

                {/* Departure Date */}
                <div className="lg:col-span-2">
                  <DateSelector
                    label="Departure"
                    defaultValue="2025-08-15"
                    onChange={setDepartureDate}
                  />
                </div>

                {/* Return Date - only show if roundtrip */}
                {tripType === "roundtrip" && (
                  <div className="lg:col-span-2">
                    <DateSelector
                      label="Return"
                      defaultValue="2025-08-25"
                      onChange={setReturnDate}
                    />
                  </div>
                )}

                {/* Passengers */}
                <div
                  className={cn(
                    tripType === "roundtrip"
                      ? "lg:col-span-2"
                      : "lg:col-span-4",
                  )}
                >
                  <PassengerSelector
                    passengers={passengers}
                    setPassengers={setPassengers}
                  />
                </div>

                {/* Cabin Class */}
                <div className="lg:col-span-2">
                  <CabinClassSelector
                    cabinClass={cabinClass}
                    setCabinClass={setCabinClass}
                  />
                </div>

                {/* Search Button */}
                <SearchButton
                  onClick={handleSearch}
                  disabled={!selectedDeparture || !selectedArrival}
                  isSearching={isSearching}
                />
              </div>

              {/* Quick Options */}
              <QuickOptions
                showHotelSection={showHotelSection}
                setShowHotelSection={setShowHotelSection}
                showCarRentalSection={showCarRentalSection}
                setShowCarRentalSection={setShowCarRentalSection}
                showActivitiesSection={showActivitiesSection}
                setShowActivitiesSection={setShowActivitiesSection}
              />

              {/* Hotel Section */}
              {showHotelSection && (
                <HotelSection
                  hotelCheckIn={hotelCheckIn}
                  setHotelCheckIn={setHotelCheckIn}
                  hotelCheckOut={hotelCheckOut}
                  setHotelCheckOut={setHotelCheckOut}
                  rooms={rooms}
                  setRooms={setRooms}
                  hotelRating={hotelRating}
                  setHotelRating={setHotelRating}
                />
              )}

              {/* Car Rental Section */}
              {showCarRentalSection && (
                <CarRentalSection
                  carPickupDate={carPickupDate}
                  setCarPickupDate={setCarPickupDate}
                  carDropoffDate={carDropoffDate}
                  setCarDropoffDate={setCarDropoffDate}
                  carType={carType}
                  setCarType={setCarType}
                  driverAge={driverAge}
                  setDriverAge={setDriverAge}
                />
              )}

              {/* Activities Section */}
              {showActivitiesSection && (
                <ActivitiesSection
                  activityDate={activityDate}
                  setActivityDate={setActivityDate}
                  activityType={activityType}
                  setActivityType={setActivityType}
                  activityParticipants={activityParticipants}
                  setActivityParticipants={setActivityParticipants}
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
