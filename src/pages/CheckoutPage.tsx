import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useToast } from "../components/ui/use-toast";

// Import components
import BookingSummary from "@/components/checkout/BookingSummary";
import ContactInformation from "@/components/checkout/ContactInformation";
import PassengerInformation from "@/components/checkout/PassengerInformation";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import BookingConfirmation from "@/components/checkout/BookingConfirmation";
import PaymentForm from "@/components/checkout/PaymentForm";

// Import types
import type {
  CheckoutState,
  ContactInfo,
  Passenger,
  PaymentDetails,
  BookingSummaryItem,
} from "@/types/checkout";
import type { FlightOption, Hotel, CarRental, Activity } from "@/types/flight";

// Utils for generating unique IDs
const generateBookingReference = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Extract selected items from location state
  const {
    selectedFlight,
    selectedHotel,
    selectedCar,
    selectedActivity,
    flightOptions,
    hotels,
    carRentals,
    activities,
  } = location.state || {};

  const flight = selectedFlight
    ? flightOptions.find((f: FlightOption) => f.id === selectedFlight)
    : null;
  const hotel = selectedHotel
    ? hotels.find((h: Hotel) => h.id === selectedHotel)
    : null;
  const car = selectedCar
    ? carRentals.find((c: CarRental) => c.id === selectedCar)
    : null;
  const activity = selectedActivity
    ? activities?.find((a: Activity) => a.id === selectedActivity)
    : null;

  // Calculate total price
  const flightPrice = flight?.price || 0;
  const hotelPrice = hotel ? hotel.price.amount * 3 : 0; // Assume 3 nights
  const carPrice = car ? car.price.amount * 3 : 0; // Assume 3 days
  const activityPrice = activity ? activity.price.amount : 0;

  const totalPrice = flightPrice + hotelPrice + carPrice + activityPrice;
  const taxRate = 0.1; // 10% tax rate
  const taxes = totalPrice * taxRate;
  const finalTotal = totalPrice + taxes;

  // Create booking summary items
  const createBookingSummaryItems = (): BookingSummaryItem[] => {
    const items: BookingSummaryItem[] = [];

    // Add flight item
    if (flight) {
      const departSegment = flight.segments[0];
      const returnSegment = flight.segments[flight.segments.length - 1];

      items.push({
        id: flight.id,
        type: "flight",
        title: `${departSegment.departureCity} to ${returnSegment.arrivalCity}`,
        description: `${departSegment.airline.name} • ${flight.cabinClass} • ${flight.stops} stop${flight.stops !== 1 ? "s" : ""}`,
        price: flight.price,
        quantity: 1,
        duration: flight.totalDuration,
        dates: {
          start: departSegment.departureDate,
          end: returnSegment.arrivalDate,
        },
      });
    }

    // Add hotel item
    if (hotel) {
      items.push({
        id: hotel.id,
        type: "hotel",
        title: hotel.name,
        description: `${hotel.location} • ${hotel.rating} Stars`,
        image: hotel.image,
        price: hotel.price.amount,
        quantity: 3, // 3 nights
        dates: {
          start: new Date().toISOString().split("T")[0],
          end: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        },
      });
    }

    // Add car rental item
    if (car) {
      items.push({
        id: car.id,
        type: "car",
        title: car.vehicle.name,
        description: `${car.company} • ${car.vehicle.type}`,
        image: car.vehicle.image,
        price: car.price.amount,
        quantity: 3, // 3 days
        dates: {
          start: new Date().toISOString().split("T")[0],
          end: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        },
      });
    }

    // Add activity item
    if (activity) {
      items.push({
        id: activity.id,
        type: "activity",
        title: activity.name,
        description: `${activity.location} • ${activity.duration}`,
        image: activity.image,
        price: activity.price.amount,
        quantity: 1,
        dates: {
          start: new Date().toISOString().split("T")[0],
        },
      });
    }

    return items;
  };

  // Initialize state
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    step: "contact",
    bookingDetails: {
      bookingReference: generateBookingReference(),
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
      },
      passengers: [
        {
          type: "adult",
          title: "Mr",
          firstName: "",
          lastName: "",
          dateOfBirth: "",
          nationality: "",
        },
      ],
      flightDetails: flight,
      hotelDetails: hotel,
      carRentalDetails: car,
      activityDetails: activity,
      bookingDate: new Date().toISOString(),
      totalAmount: finalTotal,
      currency: "USD",
    },
    loading: false,
  });

  const [summaryItems] = useState<BookingSummaryItem[]>(
    createBookingSummaryItems(),
  );

  // Validate if there are items to checkout
  useEffect(() => {
    if (!flight && !location.state?.fromBookingSummary) {
      toast({
        title: "No items selected",
        description:
          "Please select at least a flight before proceeding to checkout.",
        variant: "destructive",
      });
      navigate("/search-results");
    }
  }, [flight, navigate, toast, location.state]);

  // Handle contact information submission
  const handleContactInfoSubmit = (contactInfo: ContactInfo) => {
    setCheckoutState((prev) => ({
      ...prev,
      step: "passengers",
      bookingDetails: {
        ...prev.bookingDetails,
        contactInfo,
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
  const goToPreviousStep = () => {
    setCheckoutState((prev) => ({
      ...prev,
      step:
        prev.step === "passengers"
          ? "contact"
          : prev.step === "payment"
            ? "passengers"
            : prev.step,
    }));
  };

  // Render step indicator
  const renderStepIndicator = () => {
    const steps = [
      { key: "contact", label: "Contact" },
      { key: "passengers", label: "Passengers" },
      { key: "payment", label: "Payment" },
      { key: "confirmation", label: "Confirmation" },
    ];

    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  checkoutState.step === step.key
                    ? "bg-purple-600 text-white"
                    : checkoutState.step === "confirmation" ||
                        index <
                          steps.findIndex((s) => s.key === checkoutState.step)
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {checkoutState.step === "confirmation" ||
                index < steps.findIndex((s) => s.key === checkoutState.step) ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  index + 1
                )}
              </div>
              <div className="text-xs mt-2">{step.label}</div>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`w-16 h-1 mx-1 ${
                  index + 1 <
                    steps.findIndex((s) => s.key === checkoutState.step) ||
                  checkoutState.step === "confirmation"
                    ? "bg-green-500"
                    : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Render current step content
  const renderStepContent = () => {
    switch (checkoutState.step) {
      case "contact":
        return (
          <ContactInformation
            initialValues={checkoutState.bookingDetails.contactInfo}
            onSubmit={handleContactInfoSubmit}
          />
        );
      case "passengers":
        return (
          <PassengerInformation
            passengers={checkoutState.bookingDetails.passengers}
            onUpdate={(updatedPassengers: Passenger[]) => {
              setCheckoutState((prev) => ({
                ...prev,
                bookingDetails: {
                  ...prev.bookingDetails,
                  passengers: updatedPassengers,
                },
              }));
            }}
            onSubmit={() => {
              setCheckoutState((prev) => ({
                ...prev,
                step: "payment",
              }));
            }}
          />
        );
      case "payment":
        return (
          <div>
            <PaymentMethods
              amount={finalTotal}
              currency={checkoutState.bookingDetails.currency}
              bookingReference={checkoutState.bookingDetails.bookingReference}
              customerInfo={checkoutState.bookingDetails.contactInfo}
              onSubmit={handlePaymentSubmit}
              onBack={goToPreviousStep}
            />
            <div className="mt-6">
              <PaymentForm
                amount={finalTotal}
                currency={checkoutState.bookingDetails.currency}
                bookingReference={checkoutState.bookingDetails.bookingReference}
                customerInfo={checkoutState.bookingDetails.contactInfo}
                onSubmit={handlePaymentSubmit}
              />
            </div>
          </div>
        );
      case "confirmation":
        return (
          <BookingConfirmation
            bookingItems={summaryItems}
            contactInfo={checkoutState.bookingDetails.contactInfo}
            passengers={checkoutState.bookingDetails.passengers}
            bookingReference={checkoutState.bookingDetails.bookingReference}
            transactionId={checkoutState.paymentDetails?.transactionId || ""}
            paymentStatus={checkoutState.paymentDetails?.status || "pending"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <h1 className="text-2xl font-bold">Complete Your Booking</h1>
            <p className="text-purple-100">
              {checkoutState.step === "confirmation"
                ? "Your booking has been confirmed!"
                : "Just a few more steps to confirm your booking"}
            </p>
          </div>

          <div className="p-6">
            {renderStepIndicator()}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">{renderStepContent()}</div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                  <h3 className="text-lg font-bold mb-4">Booking Summary</h3>
                  <BookingSummary
                    items={summaryItems}
                    subtotal={totalPrice}
                    taxes={taxes}
                    total={finalTotal}
                    currency="USD"
                  />

                  {checkoutState.step !== "confirmation" && (
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Note:</strong> Your booking will be confirmed
                        immediately after successful payment.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CheckoutPage;
