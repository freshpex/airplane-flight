import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/date-formatter";

interface FlightInfo {
  flightNumber: string;
  airline: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
    terminal?: string;
    gate?: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
    terminal?: string;
    gate?: string;
  };
  status:
    | "SCHEDULED"
    | "ON_TIME"
    | "DELAYED"
    | "BOARDING"
    | "DEPARTED"
    | "IN_AIR"
    | "LANDED"
    | "ARRIVED"
    | "CANCELLED"
    | "DIVERTED";
  aircraft?: string;
  duration?: string;
}

interface FlightStatusProps {
  initialFlights?: FlightInfo[];
}

export function FlightStatus({ initialFlights = [] }: FlightStatusProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [flights, setFlights] = useState<FlightInfo[]>(initialFlights);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);

    try {
      // Simulate API call - in a real app, this would call an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data for demonstration
      const mockFlight: FlightInfo = {
        flightNumber: searchTerm.toUpperCase(),
        airline: "Qatar Airways",
        departure: {
          airport: "DOH",
          city: "Doha",
          time: "10:30",
          date: new Date().toISOString(),
          terminal: "2",
          gate: "B12",
        },
        arrival: {
          airport: "LHR",
          city: "London",
          time: "15:45",
          date: new Date().toISOString(),
          terminal: "5",
          gate: "C22",
        },
        status: "ON_TIME",
        aircraft: "Boeing 787-9",
        duration: "6h 15m",
      };

      setFlights([mockFlight, ...flights]);
    } catch (error) {
      console.error("Error searching for flight:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Using the external getStatusBadge function defined below

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">Flight Status</h2>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search Flight</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter flight number (e.g., QR001)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading || !searchTerm.trim()}
              className="w-full sm:w-auto"
            >
              {isLoading ? "Searching..." : "Search"}
              {!isLoading && <Search className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Flights</TabsTrigger>
          <TabsTrigger value="departures">Departures</TabsTrigger>
          <TabsTrigger value="arrivals">Arrivals</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {flights.length > 0 ? (
            <div className="space-y-4">
              {flights.map((flight, index) => (
                <FlightCard
                  key={`${flight.flightNumber}-${index}`}
                  flight={flight}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No flights found. Search for a flight to see its status.
            </div>
          )}
        </TabsContent>

        <TabsContent value="departures">
          {flights.length > 0 ? (
            <div className="space-y-4">
              {flights.map((flight, index) => (
                <FlightCard
                  key={`${flight.flightNumber}-${index}-dep`}
                  flight={flight}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No departures found. Search for a flight to see its status.
            </div>
          )}
        </TabsContent>

        <TabsContent value="arrivals">
          {flights.length > 0 ? (
            <div className="space-y-4">
              {flights.map((flight, index) => (
                <FlightCard
                  key={`${flight.flightNumber}-${index}-arr`}
                  flight={flight}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No arrivals found. Search for a flight to see its status.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function FlightCard({ flight }: { flight: FlightInfo }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-lg">{flight.airline}</h3>
                <p className="text-sm text-gray-500">
                  Flight {flight.flightNumber}
                </p>
              </div>
              {getStatusBadge(flight.status)}
            </div>
            {flight.aircraft && (
              <p className="text-sm text-gray-500 mt-2">{flight.aircraft}</p>
            )}
            {flight.duration && (
              <p className="text-sm font-medium mt-2">
                Duration: {flight.duration}
              </p>
            )}
          </div>

          <div>
            <h4 className="font-semibold">Departure</h4>
            <div className="mt-2">
              <p className="text-lg font-bold">{flight.departure.time}</p>
              <p>{formatDate(flight.departure.date, "EEE, MMM d")}</p>
              <p className="mt-1">
                {flight.departure.city} ({flight.departure.airport})
              </p>
              {(flight.departure.terminal || flight.departure.gate) && (
                <p className="text-sm text-gray-600 mt-1">
                  {flight.departure.terminal &&
                    `Terminal ${flight.departure.terminal}`}
                  {flight.departure.terminal && flight.departure.gate && " • "}
                  {flight.departure.gate && `Gate ${flight.departure.gate}`}
                </p>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Arrival</h4>
            <div className="mt-2">
              <p className="text-lg font-bold">{flight.arrival.time}</p>
              <p>{formatDate(flight.arrival.date, "EEE, MMM d")}</p>
              <p className="mt-1">
                {flight.arrival.city} ({flight.arrival.airport})
              </p>
              {(flight.arrival.terminal || flight.arrival.gate) && (
                <p className="text-sm text-gray-600 mt-1">
                  {flight.arrival.terminal &&
                    `Terminal ${flight.arrival.terminal}`}
                  {flight.arrival.terminal && flight.arrival.gate && " • "}
                  {flight.arrival.gate && `Gate ${flight.arrival.gate}`}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getStatusBadge(status: FlightInfo["status"]) {
  const statusMap: Record<
    FlightInfo["status"],
    {
      label: string;
      variant: "default" | "secondary" | "destructive" | "outline";
    }
  > = {
    SCHEDULED: { label: "Scheduled", variant: "outline" },
    ON_TIME: { label: "On Time", variant: "default" },
    DELAYED: { label: "Delayed", variant: "destructive" },
    BOARDING: { label: "Boarding", variant: "secondary" },
    DEPARTED: { label: "Departed", variant: "secondary" },
    IN_AIR: { label: "In Air", variant: "secondary" },
    LANDED: { label: "Landed", variant: "secondary" },
    ARRIVED: { label: "Arrived", variant: "default" },
    CANCELLED: { label: "Cancelled", variant: "destructive" },
    DIVERTED: { label: "Diverted", variant: "destructive" },
  };

  const { label, variant } = statusMap[status];

  return <Badge variant={variant}>{label}</Badge>;
}
