import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Steps, Step } from "@/components/ui/steps";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Import checkout components
import PaymentMethods from "./PaymentMethods";
import BookingSummary from "./BookingSummary";
import BookingConfirmation from "./BookingConfirmation";
import ContactForm from "./ContactForm";
import PassengerForm from "./PassengerForm";

// Import types
import type {
  BookingSummaryItem,
  ContactInfo,
  Passenger,
  PaymentDetails,
  CheckoutState,
} from "@/types/checkout";
import type { FlightOption, Hotel, CarRental, Activity } from "@/types/flight";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingData } = location.state || {};

  // If no booking data, redirect to home
  useEffect(() => {
    if (!bookingData) {
      toast.error("No booking data found");
      navigate("/");
    }
  }, [bookingData, navigate]);

  // Checkout state
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    step: "contact",
    bookingDetails: {
      bookingReference: `EM${Date.now().toString().slice(-8)}`,
      contactInfo: {} as ContactInfo,
      passengers: [],
      flightDetails: bookingData?.flight,
      hotelDetails: bookingData?.hotel,
      carRentalDetails: bookingData?.car,
      activityDetails: bookingData?.activity,
      bookingDate: new Date().toISOString(),
      totalAmount: bookingData?.totalAmount || 0,
      currency: bookingData?.currency || "USD",
    },
    loading: false,
  });

  // Process booking items from bookingData
  const [bookingItems, setBookingItems] = useState<BookingSummaryItem[]>([]);

  // Initialize booking items from bookingData
  useEffect(() => {
    if (bookingData) {
      const items: BookingSummaryItem[] = [];

      // Add flight if present
      if (bookingData.flight) {
        const flight = bookingData.flight as FlightOption;
        items.push({
          id: flight.id,
          type: "flight",
          title: `${flight.segments[0].departureCity} to ${flight.segments[flight.segments.length - 1].arrivalCity}`,
          description: `${flight.cabinClass} • ${flight.segments[0].airline.name}`,
          price: flight.price,
          quantity: 1,
          duration: flight.totalDuration,
          dates: {
            start: flight.segments[0].departureDate,
            end: flight.segments[flight.segments.length - 1].arrivalDate,
          },
        });
      }

      // Add hotel if present
      if (bookingData.hotel) {
        const hotel = bookingData.hotel as Hotel;
        items.push({
          id: hotel.id,
          type: "hotel",
          title: hotel.name,
          description: `${hotel.rating}-star hotel • ${hotel.location}`,
          image: hotel.image,
          price: hotel.price.amount,
          quantity: 3, // Default to 3 nights
          dates: {
            start:
              bookingData.checkInDate || new Date().toISOString().split("T")[0],
            end:
              bookingData.checkOutDate ||
              new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0],
          },
        });
      }

      // Add car rental if present
      if (bookingData.car) {
        const car = bookingData.car as CarRental;
        items.push({
          id: car.id,
          type: "car",
          title: car.vehicle.name,
          description: `${car.vehicle.type} • ${car.company}`,
          image: car.vehicle.image,
          price: car.price.amount,
          quantity: 3, // Default to 3 days
          dates: {
            start: car.availability.pickupDate,
            end: car.availability.dropoffDate,
          },
        });
      }

      // Add activity if present
      if (bookingData.activity) {
        const activity = bookingData.activity as Activity;
        items.push({
          id: activity.id,
          type: "activity",
          title: activity.name,
          description: activity.description.substring(0, 60) + "...",
          image: activity.image,
          price: activity.price.amount,
          quantity: 1,
          dates: {
            start: activity.availability.dates[0],
          },
        });
      }

      setBookingItems(items);
    }
  }, [bookingData]);

  // Calculate pricing
  const subtotal = bookingItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const taxes = Math.round(subtotal * 0.075 * 100) / 100; // 7.5% tax rate
  const total = subtotal + taxes;

  // Number of passengers
  const [numPassengers] = useState(bookingData?.passengers?.adults || 1);

  // Handle contact form submission
  const handleContactSubmit = (contactInfo: ContactInfo) => {
    setCheckoutState((prev) => ({
      ...prev,
      step: "passengers",
      bookingDetails: {
        ...prev.bookingDetails,
        contactInfo,
      },
    }));
  };

  // Handle passenger form submission
  const handlePassengerSubmit = (passengers: Passenger[]) => {
    setCheckoutState((prev) => ({
      ...prev,
      step: "payment",
      bookingDetails: {
        ...prev.bookingDetails,
        passengers,
      },
    }));
  };

  // Handle payment submission
  const handlePaymentSubmit = (paymentDetails: PaymentDetails) => {
    setCheckoutState((prev) => ({
      ...prev,
      step: "confirmation",
      paymentDetails,
    }));
  };

  // Handle navigation between steps
  const handleBack = () => {
    setCheckoutState((prev) => ({
      ...prev,
      step:
        prev.step === "payment"
          ? "passengers"
          : prev.step === "passengers"
            ? "contact"
            : "contact",
    }));
  };

  // Get step index for the progress indicator
  const getStepIndex = () => {
    switch (checkoutState.step) {
      case "contact":
        return 0;
      case "passengers":
        return 1;
      case "payment":
        return 2;
      case "confirmation":
        return 3;
      default:
        return 0;
    }
  };

  if (!bookingData) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>

          {checkoutState.step !== "confirmation" && (
            <div className="mt-6">
              <Steps activeStep={getStepIndex()} size="sm">
                <Step title="Contact" />
                <Step title="Passengers" />
                <Step title="Payment" />
                <Step title="Confirmation" />
              </Steps>
            </div>
          )}
        </div>

        {checkoutState.step !== "confirmation" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  {checkoutState.step === "contact" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <ContactForm
                        onSubmit={handleContactSubmit}
                        initialValues={checkoutState.bookingDetails.contactInfo}
                      />
                    </motion.div>
                  )}

                  {checkoutState.step === "passengers" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <PassengerForm
                        onSubmit={handlePassengerSubmit}
                        onBack={handleBack}
                        numPassengers={numPassengers}
                        initialValues={checkoutState.bookingDetails.passengers}
                      />
                    </motion.div>
                  )}

                  {checkoutState.step === "payment" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      <PaymentMethods
                        amount={total}
                        currency={bookingData.currency || "USD"}
                        bookingReference={
                          checkoutState.bookingDetails.bookingReference
                        }
                        customerInfo={checkoutState.bookingDetails.contactInfo}
                        onSubmit={handlePaymentSubmit}
                        onBack={handleBack}
                      />
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <BookingSummary
                    items={bookingItems}
                    subtotal={subtotal}
                    taxes={taxes}
                    total={total}
                    currency={bookingData.currency || "USD"}
                  />
                </CardContent>
              </Card>

              {checkoutState.step === "contact" && (
                <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                  <p className="font-medium text-blue-800">Secure Checkout</p>
                  <p className="mt-1">
                    Your information is protected using industry standard
                    encryption.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BookingConfirmation
              bookingItems={bookingItems}
              contactInfo={checkoutState.bookingDetails.contactInfo}
              passengers={checkoutState.bookingDetails.passengers}
              bookingReference={checkoutState.bookingDetails.bookingReference}
              transactionId={checkoutState.paymentDetails?.transactionId || ""}
              paymentStatus={checkoutState.paymentDetails?.status || "pending"}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
