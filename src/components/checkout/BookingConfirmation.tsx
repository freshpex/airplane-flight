import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Plane,
  Hotel,
  Car,
  MapPin,
  Check,
  Download,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

import { Modal } from "../ui/modal";
import EReceipt from "./EReceipt";
import { PDFService } from "../../services/PDFService";
import { formatDate } from "../../utils/format";
import type {
  BookingSummaryItem,
  ContactInfo,
  Passenger,
  TransactionStatus,
  ReceiptDetails,
} from "@/types/checkout";

interface BookingConfirmationProps {
  bookingItems: BookingSummaryItem[];
  contactInfo: ContactInfo;
  passengers: Passenger[];
  bookingReference: string;
  transactionId: string;
  paymentStatus: TransactionStatus;
}

const BookingConfirmation = ({
  bookingItems,
  contactInfo,
  passengers,
  bookingReference,
  transactionId,
  paymentStatus,
}: BookingConfirmationProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [showReceipt, setShowReceipt] = useState(false);

  // Calculate total
  const subtotal = bookingItems.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.075; // 7.5% VAT
  const totalAmount = subtotal + tax;

  // Receipt details
  const receiptDetails: ReceiptDetails = {
    receiptNumber: `R${Date.now().toString().slice(-8)}`,
    bookingReference,
    issueDate: new Date().toISOString(),
    paymentDetails: {
      paymentMethod: "credit_card",
      transactionId,
      status: paymentStatus || "success",
      amount: totalAmount,
      currency: "USD",
      cardDetails: {
        last4: "4242",
        brand: "Visa",
      },
    },
    bookingDetails: {
      bookingReference,
      contactInfo,
      passengers,
      bookingDate: new Date().toISOString(),
      totalAmount,
      currency: "USD",
    },
    contactInfo,
    items: bookingItems.map((item) => ({
      ...item,
    })),
    subtotal,
    taxes: tax,
    total: totalAmount,
    currency: "USD",
  };

  useEffect(() => {
    // Auto-countdown for demo purposes
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleDownloadReceipt = () => {
    setIsDownloading(true);

    try {
      // Generate PDF receipt
      PDFService.generateReceipt({
        transactionId,
        date: formatDate(new Date().toISOString()),
        customerName: `${contactInfo.firstName} ${contactInfo.lastName}`,
        customerEmail: contactInfo.email,
        items: bookingItems.map((item) => ({
          name: item.title,
          description: item.description,
          price: item.price,
        })),
        subtotal,
        tax,
        total: totalAmount,
      });

      toast.success("Receipt downloaded successfully");
    } catch (error) {
      toast.error("Failed to download receipt");
      console.error("Receipt download error:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleViewReceipt = () => {
    setShowReceipt(true);
  };

  const handleShareBooking = () => {
    // In a real app, this would open a share dialog or copy a link
    navigator.clipboard
      .writeText(
        `Check out my booking with Skyways Airline! Reference: ${bookingReference}`,
      )
      .then(() => {
        toast.success("Booking reference copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy booking reference");
      });
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="h-5 w-5" />;
      case "hotel":
        return <Hotel className="h-5 w-5" />;
      case "car":
        return <Car className="h-5 w-5" />;
      case "activity":
        return <MapPin className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  // Item animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto py-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center mb-8" variants={itemVariants}>
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Booking Confirmed!</h1>
        <p className="text-gray-500 mt-2">
          Thank you for booking with Skyways Airline. Your booking has been
          confirmed.
        </p>
      </motion.div>

      <motion.div
        className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm"
        variants={itemVariants}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Booking Details</h2>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              paymentStatus === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {paymentStatus === "completed"
              ? "Payment Completed"
              : "Payment Pending"}
          </span>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Booking Reference:</span>
            <span className="font-medium">{bookingReference}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-medium">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Booking Date:</span>
            <span className="font-medium">
              {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm"
        variants={itemVariants}
      >
        <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>

        <div className="space-y-4">
          {bookingItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between pb-3 border-b border-gray-100"
            >
              <div className="flex items-start">
                <div className="p-2 bg-purple-100 rounded-md mr-3">
                  {getItemIcon(item.type)}
                </div>
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₦{item.price.toLocaleString()}</p>
                {item.originalPrice && item.originalPrice > item.price && (
                  <p className="text-sm text-gray-500 line-through">
                    ₦{item.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-between pt-3 font-bold">
            <span>Total</span>
            <span>₦{totalAmount.toLocaleString()}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm"
        variants={itemVariants}
      >
        <h2 className="text-lg font-semibold mb-4">Passenger Information</h2>

        <div className="space-y-4">
          <div>
            <h3 className="text-gray-600 text-sm mb-1">Lead Contact</h3>
            <p className="font-medium">
              {contactInfo.firstName} {contactInfo.lastName}
            </p>
            <p className="text-sm">{contactInfo.email}</p>
            <p className="text-sm">{contactInfo.phone}</p>
          </div>

          <div>
            <h3 className="text-gray-600 text-sm mb-1">Passengers</h3>
            <ul className="space-y-2">
              {passengers.map((passenger, index) => (
                <li key={index} className="text-sm">
                  <span className="font-medium">
                    {passenger.firstName} {passenger.lastName}
                  </span>
                  <span className="text-gray-600 ml-2">({passenger.type})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {countdown > 0 ? (
        <motion.div
          className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-6"
          variants={itemVariants}
        >
          <div className="flex items-center">
            <div className="mr-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                {countdown}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-blue-800">
                Generating your e-tickets...
              </h3>
              <p className="text-sm text-blue-600">
                Please wait while we prepare your e-tickets and itinerary.
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="bg-green-50 rounded-lg border border-green-200 p-6 mb-6"
          variants={itemVariants}
        >
          <div className="flex items-center">
            <div className="mr-4">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Check className="h-5 w-5" />
              </div>
            </div>
            <div>
              <h3 className="font-medium text-green-800">
                Your e-tickets are ready!
              </h3>
              <p className="text-sm text-green-600">
                You can download your e-tickets and itinerary below. We've also
                sent them to your email.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        className="flex flex-col sm:flex-row gap-4 mt-8"
        variants={itemVariants}
      >
        <button
          onClick={handleViewReceipt}
          disabled={countdown > 0}
          className={`flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
            countdown > 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          <Check className="h-5 w-5" />
          View Receipt
        </button>

        <button
          onClick={handleDownloadReceipt}
          disabled={isDownloading || countdown > 0}
          className={`flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
            countdown > 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700 text-white"
          }`}
        >
          <Download className="h-5 w-5" />
          {isDownloading ? "Downloading..." : "Download E-Ticket & Receipt"}
        </button>

        <button
          onClick={handleShareBooking}
          className="flex-1 py-3 px-4 bg-white border border-purple-600 text-purple-600 hover:bg-purple-50 rounded-lg font-medium flex items-center justify-center gap-2"
        >
          <Share2 className="h-5 w-5" />
          Share Booking
        </button>
      </motion.div>

      <motion.p
        className="text-center text-sm text-gray-500 mt-8"
        variants={itemVariants}
      >
        Need assistance? Contact our support team at support@Skyways.com or call
        +1 123 456 7890
      </motion.p>

      {/* Receipt Modal */}
      <Modal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        className="max-w-2xl"
      >
        <EReceipt
          receiptDetails={receiptDetails}
          onDownload={handleDownloadReceipt}
        />
      </Modal>
    </motion.div>
  );
};

export default BookingConfirmation;
