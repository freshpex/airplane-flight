import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingConfirmation from "@/components/checkout/BookingConfirmation";

const BookingConfirmationPage = () => {
  const location = useLocation();
  const { bookingData } = location.state || {};

  // If no data is passed, show a fallback UI
  if (!bookingData) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold text-center mb-6">
              Booking Information Not Found
            </h1>
            <p className="text-gray-600 text-center mb-6">
              We couldn't find your booking information. Please check your email
              for confirmation details or contact our support team.
            </p>
            <div className="flex justify-center">
              <a
                href="/"
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <BookingConfirmation
            bookingItems={bookingData.bookingItems}
            contactInfo={bookingData.contactInfo}
            passengers={bookingData.passengers}
            bookingReference={bookingData.bookingReference}
            transactionId={bookingData.transactionId}
            paymentStatus={bookingData.paymentStatus}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingConfirmationPage;
