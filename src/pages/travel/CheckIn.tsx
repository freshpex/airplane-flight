import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Ticket,
  User,
  Calendar,
  Search,
  Check,
  ArrowRight,
  AlertCircle,
  Clock,
  Printer,
  Smartphone,
  QrCode,
  CalendarRange,
} from "lucide-react";

const CheckIn = () => {
  const [lastName, setLastName] = useState("");
  const [reference, setReference] = useState("");
  const [checkInStatus, setCheckInStatus] = useState<
    "not-started" | "in-progress" | "completed" | "error"
  >("not-started");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [flightDetails, setFlightDetails] = useState<any | null>(null);

  // Mock flight data for check-in
  const mockFlight = {
    bookingReference: "XYZ123",
    passengers: [
      {
        id: 1,
        name: "John Smith",
        type: "Adult",
        seat: "12A",
        checkedIn: false,
        passportNumber: "",
        nationality: "",
        dateOfBirth: "",
      },
      {
        id: 2,
        name: "Jane Smith",
        type: "Adult",
        seat: "12B",
        checkedIn: false,
        passportNumber: "",
        nationality: "",
        dateOfBirth: "",
      },
    ],
    flight: {
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
      boardingTime: "09:50",
      gateClosesTime: "10:10",
      status: "On Schedule",
    },
  };

  const handleCheckInSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Simulate API call with timeout
    setTimeout(() => {
      // Simple mock validation
      if (
        reference.toUpperCase() === mockFlight.bookingReference &&
        lastName.toLowerCase() ===
          mockFlight.passengers[0].name.split(" ")[1].toLowerCase()
      ) {
        setFlightDetails(mockFlight);
        setCheckInStatus("in-progress");
        setStep(2);
      } else {
        setError(
          "No booking found with the provided reference and last name, or online check-in is not available for this flight.",
        );
        setCheckInStatus("error");
      }
      setLoading(false);
    }, 1500);
  };

  const handlePassengerDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const updatedFlightDetails = { ...flightDetails };
      updatedFlightDetails.passengers = updatedFlightDetails.passengers.map(
        (p: any) => ({
          ...p,
          checkedIn: true,
        }),
      );

      setFlightDetails(updatedFlightDetails);
      setStep(3);
      setCheckInStatus("completed");
      setLoading(false);
    }, 2000);
  };

  // Component for displaying the checkin steps indicator
  const CheckInSteps = () => (
    <div className="flex items-center justify-between max-w-lg mx-auto mb-8">
      {["Search", "Passenger Details", "Boarding Pass"].map(
        (stepName, index) => {
          const stepNumber = index + 1;
          const isActive = step === stepNumber;
          const isPast = step > stepNumber;
          return (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <div
                  className={`h-0.5 w-full ${isPast ? "bg-purple-600" : "bg-gray-300"}`}
                ></div>
              )}
              <div
                className={`relative flex items-center justify-center rounded-full h-8 w-8 
              ${
                isActive
                  ? "bg-purple-600 text-white"
                  : isPast
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-600"
              }`}
              >
                {isPast ? <Check className="h-4 w-4" /> : stepNumber}
                <span
                  className={`absolute -bottom-6 whitespace-nowrap text-xs 
                ${isActive ? "text-purple-600 font-medium" : "text-gray-500"}`}
                >
                  {stepName}
                </span>
              </div>
              {index < 2 && (
                <div
                  className={`h-0.5 w-full ${isPast ? "bg-purple-600" : "bg-gray-300"}`}
                ></div>
              )}
            </div>
          );
        },
      )}
    </div>
  );

  return (
    <PageLayout
      title="Online Check-In"
      subtitle="Check in for your flight and get your boarding pass"
      backgroundImage="https://images.unsplash.com/photo-1570710891163-6d3b5c47248b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Check-in Steps */}
          {checkInStatus !== "not-started" && <CheckInSteps />}

          {/* Step 1: Search for booking */}
          {step === 1 && (
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Find Your Booking</h2>

              <form onSubmit={handleCheckInSearch}>
                <div className="space-y-4">
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

                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="qatar"
                    className="w-full"
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
                        Check In
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {error && (
                <div className="mt-6 bg-red-50 p-4 rounded-lg flex items-start gap-3">
                  <AlertCircle className="text-red-600 h-5 w-5 mt-0.5" />
                  <div>
                    <h4 className="text-red-800 font-semibold">
                      Check-in Failed
                    </h4>
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                </div>
              )}

              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-3">
                  Check-In Information
                </h3>
                <ul className="space-y-2">
                  {[
                    "Online check-in opens 48 hours before departure and closes 90 minutes before departure",
                    "You will need your passport or ID card to check in",
                    "You can select your seats and print your boarding pass",
                    "If you have checked baggage, drop it at the bag drop counter at the airport",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-700"
                    >
                      <div className="bg-purple-50 p-1 rounded-full mt-0.5">
                        <ArrowRight className="h-3 w-3 text-purple-600" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* Step 2: Passenger Details */}
          {step === 2 && flightDetails && (
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Passenger Details</h2>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {flightDetails.flight.from.city} (
                      {flightDetails.flight.from.code}) to{" "}
                      {flightDetails.flight.to.city} (
                      {flightDetails.flight.to.code})
                    </h3>
                    <div className="text-gray-600 flex flex-wrap gap-x-6 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />{" "}
                        {flightDetails.flight.departureDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />{" "}
                        {flightDetails.flight.departureTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Ticket className="h-4 w-4" />{" "}
                        {flightDetails.flight.flightNumber}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                      {flightDetails.flight.status}
                    </span>
                  </div>
                </div>
              </div>

              <form onSubmit={handlePassengerDetailsSubmit}>
                {flightDetails.passengers.map(
                  (passenger: any, index: number) => (
                    <div
                      key={index}
                      className="mb-6 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
                    >
                      <h3 className="text-lg font-semibold mb-4">
                        Passenger {index + 1}: {passenger.name}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor={`passport-${index}`}>
                            Passport Number
                          </Label>
                          <Input
                            id={`passport-${index}`}
                            placeholder="Enter passport number"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor={`nationality-${index}`}>
                            Nationality
                          </Label>
                          <Input
                            id={`nationality-${index}`}
                            placeholder="Enter nationality"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`dob-${index}`}>Date of Birth</Label>
                          <Input id={`dob-${index}`} type="date" required />
                        </div>
                        <div>
                          <Label htmlFor={`seat-${index}`}>
                            Seat Assignment
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id={`seat-${index}`}
                              value={passenger.seat}
                              readOnly
                              className="bg-gray-50"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="border-purple-600 text-purple-600"
                            >
                              Change
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ),
                )}

                <div className="mt-6">
                  <Button
                    type="submit"
                    variant="qatar"
                    className="w-full sm:w-auto"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="mr-2">Processing</span>
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
                      "Complete Check-In"
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3: Boarding Pass */}
          {step === 3 && flightDetails && (
            <motion.div
              className="bg-white rounded-xl p-6 shadow-lg mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-6">
                <div className="inline-block bg-green-100 p-3 rounded-full mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold">Check-In Complete!</h2>
                <p className="text-gray-600 mt-2">
                  You have successfully checked in for your flight. Your
                  boarding pass is ready.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex flex-wrap justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {flightDetails.flight.from.city} (
                      {flightDetails.flight.from.code}) to{" "}
                      {flightDetails.flight.to.city} (
                      {flightDetails.flight.to.code})
                    </h3>
                    <div className="text-gray-600 flex flex-wrap gap-x-6 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />{" "}
                        {flightDetails.flight.departureDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />{" "}
                        {flightDetails.flight.departureTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Ticket className="h-4 w-4" />{" "}
                        {flightDetails.flight.flightNumber}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Boarding Passes */}
              <div className="space-y-6 mb-8">
                {flightDetails.passengers.map(
                  (passenger: any, index: number) => (
                    <motion.div
                      key={index}
                      className="border border-purple-200 rounded-xl overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.2 }}
                    >
                      <div className="bg-purple-600 text-white p-4">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{passenger.name}</h3>
                          <span className="bg-white text-purple-600 px-2 py-1 rounded text-sm font-medium">
                            {passenger.seat}
                          </span>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-gray-500">Flight</div>
                            <div className="font-semibold">
                              {flightDetails.flight.flightNumber}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">Date</div>
                            <div className="font-semibold">
                              {flightDetails.flight.departureDate}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-gray-500">From</div>
                            <div className="font-semibold">
                              {flightDetails.flight.from.city} (
                              {flightDetails.flight.from.code})
                            </div>
                            <div className="text-sm">
                              {flightDetails.flight.from.terminal}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">To</div>
                            <div className="font-semibold">
                              {flightDetails.flight.to.city} (
                              {flightDetails.flight.to.code})
                            </div>
                            <div className="text-sm">
                              {flightDetails.flight.to.terminal}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-gray-500">
                              Departure
                            </div>
                            <div className="font-semibold">
                              {flightDetails.flight.departureTime}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              Boarding
                            </div>
                            <div className="font-semibold">
                              {flightDetails.flight.boardingTime}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">
                              Gate Closes
                            </div>
                            <div className="font-semibold">
                              {flightDetails.flight.gateClosesTime}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center my-4">
                          <div className="bg-gray-100 p-4 rounded-lg">
                            <QrCode className="h-24 w-24 text-gray-800" />
                          </div>
                        </div>

                        <div className="text-sm text-gray-500 text-center">
                          Booking Reference:{" "}
                          <span className="font-semibold">
                            {flightDetails.bookingReference}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="outline"
                  className="border-purple-600 text-purple-600 flex items-center gap-2"
                >
                  <Printer className="h-4 w-4" /> Print Boarding Pass
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-600 text-purple-600 flex items-center gap-2"
                >
                  <Smartphone className="h-4 w-4" /> Send to Mobile
                </Button>
                <Button
                  variant="outline"
                  className="border-purple-600 text-purple-600 flex items-center gap-2"
                >
                  <CalendarRange className="h-4 w-4" /> Add to Calendar
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Additional Information */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Check-In Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-purple-50 p-2 rounded-full mt-1">
                  <Clock className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Check-In Timing</h4>
                  <p className="text-gray-600 text-sm">
                    Online check-in opens 48 hours before departure and closes
                    90 minutes before departure. At the airport, check-in
                    counters close 60 minutes before departure for international
                    flights.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-50 p-2 rounded-full mt-1">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Travel Documents</h4>
                  <p className="text-gray-600 text-sm">
                    For international travel, ensure you have a valid passport
                    with at least 6 months validity. Check visa requirements for
                    your destination before travel.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Baggage Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-purple-50 p-2 rounded-full mt-1">
                  <Ticket className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Checked Baggage</h4>
                  <p className="text-gray-600 text-sm">
                    Economy passengers are allowed 23kg checked baggage.
                    Business and First Class passengers are allowed 32kg checked
                    baggage. Maximum dimensions per bag: 158cm (length + width +
                    height).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-50 p-2 rounded-full mt-1">
                  <Ticket className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Cabin Baggage</h4>
                  <p className="text-gray-600 text-sm">
                    Economy passengers are allowed one piece up to 7kg. Business
                    and First Class passengers are allowed two pieces up to 7kg
                    each. Maximum dimensions: 55 x 40 x 20cm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default CheckIn;
