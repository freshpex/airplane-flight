import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchSummary from "./SearchSummary";
import FlightCard from "./FlightCard";
import HotelCard from "./HotelCard";
import CarRentalCard from "./CarRentalCard";
import ActivityCard from "./ActivityCard";
import { Compass } from "lucide-react";
import type { FlightOption, Hotel, CarRental, Activity } from "@/types/flight";

interface TabLayoutProps {
  searchParams: {
    from: string;
    to: string;
    departDate: string;
    returnDate: string;
    passengers: {
      adults: number;
      children: number;
      infants: number;
    };
    cabinClass: string;
    tripType: string;
    includeHotels: boolean;
    includeCarRentals: boolean;
  };
  filteredFlights: FlightOption[];
  hotels: Hotel[];
  carRentals: CarRental[];
  activities: Activity[];
  selectedFlight: string | null;
  setSelectedFlight: (id: string) => void;
  selectedHotel: string | null;
  setSelectedHotel: (id: string) => void;
  selectedCar: string | null;
  setSelectedCar: (id: string) => void;
  selectedActivity: string | null;
  setSelectedActivity: (id: string) => void;
}

const TabLayout = ({
  searchParams,
  filteredFlights,
  hotels,
  carRentals,
  activities,
  selectedFlight,
  setSelectedFlight,
  selectedHotel,
  setSelectedHotel,
  selectedCar,
  setSelectedCar,
  selectedActivity,
  setSelectedActivity,
}: TabLayoutProps) => {
  return (
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
          <TabsTrigger value="activities" className="text-lg">
            Activities ({activities.length})
          </TabsTrigger>
        </TabsList>

        {/* Flights Tab */}
        <TabsContent value="flights">
          <SearchSummary
            from={searchParams.from}
            to={searchParams.to}
            departDate={searchParams.departDate}
            passengers={searchParams.passengers}
            cabinClass={searchParams.cabinClass}
          />

          {filteredFlights.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <Compass className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-xl font-semibold mb-2">No flights found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search criteria to see more
                results.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFlights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  selectedFlight={selectedFlight}
                  setSelectedFlight={setSelectedFlight}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* Hotels Tab */}
        {searchParams.includeHotels && (
          <TabsContent value="hotels">
            <div className="space-y-4">
              {hotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  selectedHotel={selectedHotel}
                  setSelectedHotel={setSelectedHotel}
                />
              ))}
            </div>
          </TabsContent>
        )}

        {/* Car Rentals Tab */}
        {searchParams.includeCarRentals && (
          <TabsContent value="cars">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {carRentals.map((car) => (
                <CarRentalCard
                  key={car.id}
                  car={car}
                  selectedCar={selectedCar}
                  setSelectedCar={setSelectedCar}
                />
              ))}
            </div>
          </TabsContent>
        )}

        {/* Activities Tab */}
        <TabsContent value="activities">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                selectedActivity={selectedActivity}
                setSelectedActivity={setSelectedActivity}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabLayout;
