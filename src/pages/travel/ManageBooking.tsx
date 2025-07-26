import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Ticket,
  User,
  Key,
  Calendar,
  Search,
  AlertCircle,
  Plane,
  MapPin,
  Users,
} from "lucide-react";

const ManageBooking = () => {
  const [searchType, setSearchType] = useState<
    "booking-reference" | "ticket-number"
  >("booking-reference");
  const [lastName, setLastName] = useState("");
  const [reference, setReference] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [bookingData, setBookingData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock booking data
  const mockBooking = {
    bookingReference: "XYZ1230",
    status: "Confirmed",
    passengers: [
      {
        name: "John Smith",
        type: "Adult",
      },
      {
        name: "Jane Smith",
        type: "Adult",
      },
    ],
    contactInfo: {
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
    },
    flights: [
      {
        flightNumber: "SW 1234",
        from: {
          code: "LHR",
          city: "London",
          terminal: "Terminal 5",
        },
        to: {
          code: "JFK",
          city: "New York",
          terminal: "Terminal 4",
        },
        departureDate: "2025-08-15",
        departureTime: "10:30",
        arrivalDate: "2025-08-15",
        arrivalTime: "13:45",
        aircraft: "Boeing 787-9",
        duration: "8h 15m",
        cabin: "Economy Classic",
        status: "Confirmed",
      },
      {
        flightNumber: "SW 5678",
        from: {
          code: "JFK",
          city: "New York",
          terminal: "Terminal 4",
        },
        to: {
          code: "LHR",
          city: "London",
          terminal: "Terminal 5",
        },
        departureDate: "2025-08-22",
        departureTime: "19:45",
        arrivalDate: "2025-08-23",
        arrivalTime: "07:50",
        aircraft: "Boeing 787-9",
        duration: "7h 05m",
        cabin: "Economy Classic",
        status: "Confirmed",
      },
    ],
    services: [
      {
        type: "Baggage",
        description: "2 x 23kg Checked Baggage per passenger",
        included: true,
      },
      {
        type: "Meal",
        description: "Standard meal service",
        included: true,
      },
      {
        type: "Seat Selection",
        description: "Standard seat selection",
        included: false,
      },
    ],
    payment: {
      totalPaid: "€1,245.60",
      currency: "EUR",
      method: "Visa ending in 4567",
      date: "2025-06-10",
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setBookingData(null);

    // Simulate API call with timeout
    setTimeout(() => {
      // Simple mock validation
      if (searchType === "booking-reference") {
        if (
          reference.toUpperCase() === mockBooking.bookingReference &&
          lastName.toLowerCase() ===
            mockBooking.passengers[0].name.split(" ")[1].toLowerCase()
        ) {
          setBookingData(mockBooking);
        } else {
          setError(
            "No booking found with the provided reference and last name.",
          );
        }
      } else {
        // For the demo, we'll just check if the ticket number has a specific format
        if (
          ticketNumber.match(/^\d{13}$/) &&
          lastName.toLowerCase() ===
            mockBooking.passengers[0].name.split(" ")[1].toLowerCase()
        ) {
          setBookingData(mockBooking);
        } else {
          setError(
            "No booking found with the provided ticket number and last name.",
          );
        }
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <PageLayout
      title="Manage Booking"
      subtitle="View and modify your flight bookings with ease"
      backgroundImage="https://images.unsplash.com/photo-1529074963764-98f45c47aa42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Search Form */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs
            value={searchType}
            onValueChange={(value) =>
              setSearchType(value as "booking-reference" | "ticket-number")
            }
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="booking-reference">
                Booking Reference
              </TabsTrigger>
              <TabsTrigger value="ticket-number">E-Ticket Number</TabsTrigger>
            </TabsList>

            <form onSubmit={handleSearch}>
              <TabsContent value="booking-reference" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="booking-reference">Booking Reference</Label>
                    <div className="relative mt-1.5">
                      <Ticket className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <Input
                        id="booking-reference"
                        className="pl-10"
                        placeholder="e.g. XYZ123"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Your booking reference is a 6-character code found in your
                      confirmation email.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="booking-lastname">Last Name</Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <Input
                        id="booking-lastname"
                        className="pl-10"
                        placeholder="e.g. Smith"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ticket-number" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ticket-number">E-Ticket Number</Label>
                    <div className="relative mt-1.5">
                      <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <Input
                        id="ticket-number"
                        className="pl-10"
                        placeholder="e.g. 1234567890"
                        value={ticketNumber}
                        onChange={(e) => setTicketNumber(e.target.value)}
                        required
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Your e-ticket number is a 13-digit number found on your
                      e-ticket.
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="ticket-lastname">Last Name</Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <Input
                        id="ticket-lastname"
                        className="pl-10"
                        placeholder="e.g. Smith"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <div className="mt-6">
                <Button
                  type="submit"
                  variant="qatar"
                  className="w-full sm:w-auto"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="mr-2">Searching</span>
                      <span className="animate-spin">
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Retrieve Booking
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Tabs>
        </motion.div>

        {/* Search Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {error && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6 flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="text-red-600 h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">
                  Booking Not Found
                </h3>
                <p className="text-gray-600">{error}</p>
                <p className="text-gray-600 mt-2">
                  Please check your information and try again, or contact our
                  customer service for assistance.
                </p>
              </div>
            </div>
          )}

          {bookingData && (
            <div className="space-y-6">
              {/* Booking Summary */}
              <motion.div
                className="bg-white rounded-xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-purple-600 p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Ticket className="h-6 w-6 text-white" />
                    <h3 className="text-xl font-bold text-white">
                      Booking {bookingData.bookingReference}
                    </h3>
                  </div>
                  <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
                    {bookingData.status}
                  </span>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">Passengers</h4>
                      <div className="space-y-2">
                        {bookingData.passengers.map(
                          (passenger: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <User className="h-4 w-4 text-purple-600" />
                              <span className="text-gray-800">
                                {passenger.name} ({passenger.type})
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm text-gray-500 mb-1">
                        Contact Information
                      </h4>
                      <div className="text-gray-800">
                        <div>{bookingData.contactInfo.email}</div>
                        <div>{bookingData.contactInfo.phone}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <h4 className="text-sm text-gray-500 mb-1">Payment</h4>
                      <div className="text-gray-800">
                        <div className="text-lg font-bold">
                          {bookingData.payment.totalPaid}
                        </div>
                        <div className="text-sm">
                          {bookingData.payment.method}
                        </div>
                        <div className="text-sm text-gray-500">
                          Paid on {bookingData.payment.date}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button variant="qatar" size="sm">
                      Check In
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-600 text-purple-600"
                    >
                      Change Flight
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-600 text-purple-600"
                    >
                      Add Services
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-600 text-purple-600"
                    >
                      Select Seats
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* Flight Details */}
              <h3 className="text-xl font-semibold mt-8 mb-4">
                Flight Details
              </h3>

              {bookingData.flights.map((flight: any, index: number) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-md mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                >
                  <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Plane className="h-5 w-5 text-purple-600" />
                      <div>
                        <span className="font-semibold">
                          {flight.flightNumber}
                        </span>
                        <span className="text-gray-500 ml-2">|</span>
                        <span className="ml-2 text-gray-700">
                          {flight.departureDate}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-green-600">
                      {flight.status}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {/* Departure */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="bg-blue-100 p-1 rounded-full">
                            <MapPin className="h-3 w-3 text-blue-600" />
                          </div>
                          <span className="text-sm text-gray-500">
                            Departure
                          </span>
                        </div>
                        <div className="ml-6">
                          <div className="text-lg font-bold mb-1">
                            {flight.from.city} ({flight.from.code})
                          </div>
                          <div className="text-gray-700">
                            {flight.departureTime}
                          </div>
                          <div className="text-sm text-gray-500">
                            {flight.from.terminal}
                          </div>
                        </div>
                      </div>

                      {/* Flight Info */}
                      <div className="flex flex-col justify-center items-center">
                        <div className="text-sm text-gray-500 mb-1">
                          {flight.duration}
                        </div>
                        <div className="relative w-full px-4">
                          <div className="h-0.5 bg-gray-300 absolute top-1/2 left-0 right-0"></div>
                          <div className="flex justify-between relative">
                            <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                            <div className="h-2 w-2 bg-purple-600 rounded-full"></div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-700 mt-2">
                          {flight.aircraft}
                        </div>
                        <div className="text-sm text-purple-600 font-medium">
                          {flight.cabin}
                        </div>
                      </div>

                      {/* Arrival */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="bg-purple-100 p-1 rounded-full">
                            <MapPin className="h-3 w-3 text-purple-600" />
                          </div>
                          <span className="text-sm text-gray-500">Arrival</span>
                        </div>
                        <div className="ml-6">
                          <div className="text-lg font-bold mb-1">
                            {flight.to.city} ({flight.to.code})
                          </div>
                          <div className="text-gray-700">
                            {flight.arrivalTime}
                          </div>
                          <div className="text-sm text-gray-500">
                            {flight.to.terminal}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between border-t border-gray-100 pt-4">
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600"
                        >
                          Flight Details
                        </Button>
                      </div>
                      <div>
                        {new Date(flight.departureDate) > new Date() ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-600 text-purple-600"
                          >
                            Change Flight
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-400 text-gray-400"
                            disabled
                          >
                            Completed
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Services */}
              <h3 className="text-xl font-semibold mt-8 mb-4">
                Included Services
              </h3>
              <motion.div
                className="bg-white rounded-xl p-6 shadow-md mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <div className="space-y-4">
                  {bookingData.services.map((service: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-b-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-full ${service.included ? "bg-green-100" : "bg-gray-100"}`}
                        >
                          {service.type === "Baggage" && (
                            <Plane
                              className={`h-5 w-5 ${service.included ? "text-green-600" : "text-gray-600"}`}
                            />
                          )}
                          {service.type === "Meal" && (
                            <Users
                              className={`h-5 w-5 ${service.included ? "text-green-600" : "text-gray-600"}`}
                            />
                          )}
                          {service.type === "Seat Selection" && (
                            <MapPin
                              className={`h-5 w-5 ${service.included ? "text-green-600" : "text-gray-600"}`}
                            />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold">{service.type}</div>
                          <div className="text-sm text-gray-600">
                            {service.description}
                          </div>
                        </div>
                      </div>
                      <div>
                        {service.included ? (
                          <span className="text-sm text-green-600 font-medium">
                            Included
                          </span>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-purple-600 text-purple-600"
                          >
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* No search yet state */}
          {!bookingData && !error && (
            <div className="bg-white rounded-xl p-8 shadow-lg mb-6 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Manage Your Booking
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Enter your booking details to view, modify, or manage your
                  reservation.
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4">What You Can Do</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                title: "Check In Online",
                description: "Available from 48 hours before departure",
                icon: Plane,
              },
              {
                title: "Change Flights",
                description: "Modify your itinerary",
                icon: Calendar,
              },
              {
                title: "Add Extra Services",
                description: "Baggage, meals, and more",
                icon: Users,
              },
              {
                title: "Select Seats",
                description: "Choose your preferred seating",
                icon: MapPin,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div className="bg-purple-50 p-3 rounded-full h-14 w-14 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default ManageBooking;
