export interface Airline {
  code: string;
  name: string;
  logo: string;
}

export interface FlightSegment {
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
  layover?: string; // Duration of layover
}

export interface FlightOption {
  id: string;
  price: number;
  currency: string;
  segments: FlightSegment[];
  totalDuration: string;
  duration: string; // For compatibility with FlightCard
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

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: {
    amount: number;
    currency: string;
    period: string;
  };
  image: string;
  features: string[];
  distance?: {
    value: number;
    unit: string;
    landmark: string;
  };
  availability: {
    checkIn: string;
    checkOut: string;
  };
  rooms: {
    type: string;
    amenities: string[];
    capacity: number;
    pricePerNight: number;
  }[];
}

export interface CarRental {
  id: string;
  company: string;
  logo: string;
  vehicle: {
    name: string;
    type: string;
    image: string;
    features: string[];
    capacity: {
      passengers: number;
      bags: number;
    };
  };
  location: {
    pickup: string;
    dropoff?: string;
  };
  availability: {
    pickupDate: string;
    pickupTime: string;
    dropoffDate: string;
    dropoffTime: string;
  };
  price: {
    amount: number;
    currency: string;
    period: string;
  };
  mileage: {
    limit: string;
    costPerExtraMile?: number;
  };
  included: string[];
  policies: {
    cancellation: string;
    fuelPolicy: string;
  };
  rating?: number;
  reviews?: number;
}

export interface Activity {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: {
    amount: number;
    currency: string;
    period?: string;
  };
  duration: string;
  categories: string[];
  description: string;
  includes: string[];
  languages?: string[];
  availability: {
    dates: string[];
    timeslots: string[];
  };
  groupSize?: {
    min: number;
    max?: number;
  };
  ageRestrictions?: {
    minimum: number;
    maximum?: number;
  };
  accessibility?: string[];
}

export interface FilterOptions {
  airlines: string[];
  priceRange: [number, number];
  departureTime: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    night: boolean;
  };
  arrivalTime: {
    morning: boolean;
    afternoon: boolean;
    evening: boolean;
    night: boolean;
  };
  stops: number[];
  duration: number; // Maximum duration in minutes
  cabinClass: string[];
  features: string[];
  fareTypes: string[];
}

export interface SortOption {
  id: string;
  name: string;
}

export type BookingType = "flight" | "hotel" | "car" | "activity";
