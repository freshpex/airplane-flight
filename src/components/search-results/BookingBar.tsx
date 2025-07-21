import { Button } from '@/components/ui/button';
import type { FlightOption, Hotel, CarRental } from '@/types/flight';

interface BookingBarProps {
  selectedFlight: string | null;
  selectedHotel: string | null;
  selectedCar: string | null;
  flightOptions: FlightOption[];
  hotels: Hotel[];
  carRentals: CarRental[];
  onBookNow: () => void;
}

const BookingBar = ({
  selectedFlight,
  selectedHotel,
  selectedCar,
  flightOptions,
  hotels,
  carRentals,
  onBookNow
}: BookingBarProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-wrap gap-4">
          {selectedFlight && (
            <div className="mr-4">
              <p className="font-semibold">Flight selected:</p>
              <p className="text-sm text-gray-600">
                {flightOptions.find(f => f.id === selectedFlight)?.segments[0].airline.name} • 
                ${flightOptions.find(f => f.id === selectedFlight)?.price}
              </p>
            </div>
          )}
          {selectedHotel && (
            <div className="mr-4">
              <p className="font-semibold">Hotel selected:</p>
              <p className="text-sm text-gray-600">
                {hotels.find(h => h.id === selectedHotel)?.name} • 
                ${hotels.find(h => h.id === selectedHotel)?.price.amount}/night
              </p>
            </div>
          )}
          {selectedCar && (
            <div>
              <p className="font-semibold">Car selected:</p>
              <p className="text-sm text-gray-600">
                {carRentals.find(c => c.id === selectedCar)?.vehicle.name} • 
                ${carRentals.find(c => c.id === selectedCar)?.price.amount}/day
              </p>
            </div>
          )}
        </div>
        <Button 
          size="lg" 
          disabled={!selectedFlight}
          onClick={onBookNow}
          className="min-w-[150px]"
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default BookingBar;
