import { motion } from "framer-motion";
import { Luggage, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { FlightOption } from "@/types/flight";

interface FlightCardProps {
  flight: FlightOption;
  selectedFlight: string | null;
  setSelectedFlight: (id: string) => void;
}

const FlightCard = ({
  flight,
  selectedFlight,
  setSelectedFlight,
}: FlightCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-lg shadow-lg overflow-hidden",
        selectedFlight === flight.id && "ring-2 ring-purple-500",
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
              {flight.segments.map((s) => s.flightNumber).join(" · ")}
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
                <span className="bg-white px-2 text-xs font-medium text-gray-500">
                  {flight.duration}
                </span>
              </div>
            </div>
            <div className="text-xs text-gray-500 text-center mt-1">
              {flight.stops === 0
                ? "Direct"
                : `${flight.stops} stop${flight.stops !== 1 ? "s" : ""}`}
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
                <span className="mr-3">{flight.baggageAllowance.checked}</span>
                <Wifi className="h-4 w-4 mx-1" />
                <span>
                  {flight.features.includes("Wi-Fi")
                    ? "Wi-Fi Available"
                    : "No Wi-Fi"}
                </span>
              </div>
              <div className="text-sm text-purple-600 font-medium group-open:rotate-180 transition-transform">
                ▼
              </div>
            </summary>

            <div className="mt-4 pt-4 border-t border-gray-200">
              {flight.segments.map((segment, index) => (
                <div key={index} className="mb-4">
                  {index > 0 && (
                    <div className="my-3 px-3 py-2 bg-gray-50 text-xs text-gray-600 rounded">
                      Layover: {segment.layover} in {segment.departureAirport}
                    </div>
                  )}

                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold">
                        {segment.departureTime} - {segment.arrivalTime}
                      </div>
                      <div className="text-sm text-gray-600">
                        {segment.departureAirport} - {segment.arrivalAirport}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{segment.duration}</div>
                      <div className="text-sm text-gray-600">
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
                        <span className="inline-block h-1.5 w-1.5 bg-purple-500 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Baggage Allowance</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <span className="inline-block h-1.5 w-1.5 bg-purple-500 rounded-full mr-2"></span>
                      Carry-on: {flight.baggageAllowance.carryOn}
                    </li>
                    <li className="flex items-center">
                      <span className="inline-block h-1.5 w-1.5 bg-purple-500 rounded-full mr-2"></span>
                      Checked: {flight.baggageAllowance.checked}
                    </li>
                    <li className="flex items-center">
                      <span className="inline-block h-1.5 w-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {flight.refundable ? "Refundable" : "Non-refundable"} fare
                    </li>
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
                    {flight.seatsAvailable}{" "}
                    {flight.seatsAvailable === 1 ? "seat" : "seats"} left
                  </span>
                </div>
              </div>
            </div>
          </details>
        </div>

        {/* Flight selection */}
        <div className="flex justify-between items-center pt-3 border-t">
          <div>
            <Badge
              variant={
                flight.fareType === "Economy"
                  ? "outline"
                  : flight.fareType === "Economy Plus"
                    ? "secondary"
                    : "default"
              }
            >
              {flight.fareType}
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={selectedFlight === flight.id ? "default" : "outline"}
              onClick={() => setSelectedFlight(flight.id)}
              className="min-w-[100px]"
            >
              {selectedFlight === flight.id ? "Selected" : "Select"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FlightCard;
