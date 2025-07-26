import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { flutterwaveService } from "@/utils/FlutterwaveService";
import FlutterwavePayButton from "./FlutterwavePayButton";
import { Button } from "@/components/ui/button";

import type { ContactInfo, PaymentDetails } from "@/types/checkout";

interface PaymentFormProps {
  amount: number;
  currency: string;
  bookingReference: string;
  customerInfo: ContactInfo;
  onSubmit: (paymentDetails: PaymentDetails) => void;
}

const PaymentForm = ({
  amount,
  currency,
  bookingReference,
  customerInfo,
  onSubmit,
}: PaymentFormProps) => {
  // Card form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState(
    `${customerInfo.firstName} ${customerInfo.lastName}`,
  );
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");
    // Format with spaces every 4 digits
    const formatted = cleaned.replace(/(\d{4})/g, "$1 ").trim();
    return formatted;
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length >= 3) {
      return `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    }

    return cleaned;
  };

  // Handle card form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real implementation, you'd validate and tokenize the card details
      // before sending them to your server

      // Process payment through Flutterwave
      const paymentResponse = await flutterwaveService.initiatePayment({
        amount,
        currency,
        customerId: `CUST${Date.now()}`,
        customerName:
          cardHolder || `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerEmail: customerInfo.email,
        paymentDescription: `Flight booking ${bookingReference}`,
        bookingReference,
        phoneNumber: customerInfo.phone,
        country: customerInfo.country,
      });

      // Get transaction status
      const transactionStatus = await flutterwaveService.checkTransactionStatus(
        paymentResponse.transactionId,
      );

      // Submit payment details
      onSubmit({
        transactionId: paymentResponse.transactionId,
        amount,
        currency,
        status: transactionStatus.status,
        paymentMethod: "credit_card",
        paymentDate: transactionStatus.paymentDate || new Date().toISOString(),
        cardDetails: {
          last4: cardNumber.replace(/\s/g, "").slice(-4),
          brand: detectCardType(cardNumber),
        },
      });
    } catch (error) {
      console.error("Payment processing error:", error);
      // Handle errors (in a real app, you'd show an error message)
    } finally {
      setIsLoading(false);
    }
  };

  // Detect card type based on card number
  const detectCardType = (cardNumber: string): string => {
    const cleanedNumber = cardNumber.replace(/\s/g, "");

    // Visa cards start with 4
    if (/^4/.test(cleanedNumber)) return "Visa";

    // Mastercard cards start with 51-55 or 2221-2720
    if (
      /^5[1-5]/.test(cleanedNumber) ||
      /^2[2-7][2-9][0-9]/.test(cleanedNumber)
    )
      return "Mastercard";

    // Amex cards start with 34 or 37
    if (/^3[47]/.test(cleanedNumber)) return "American Express";

    // Discover cards start with 6011, 622126-622925, 644-649, or 65
    if (
      /^6011/.test(cleanedNumber) ||
      /^65/.test(cleanedNumber) ||
      /^64[4-9]/.test(cleanedNumber)
    )
      return "Discover";

    // Verve cards typically start with 506
    if (/^506/.test(cleanedNumber)) return "Verve";

    // Default fallback
    return "Unknown";
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Enter Card Details</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Card Number
          </label>
          <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-1 focus-within:ring-purple-500 focus-within:border-purple-500">
            <input
              id="cardNumber"
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              className="flex-grow px-3 py-2 border-none focus:outline-none"
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
            />
            <span className="px-3 text-gray-400">
              {detectCardType(cardNumber) !== "Unknown"
                ? detectCardType(cardNumber)
                : "Card"}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="cardHolder"
            className="block text-sm font-medium text-gray-700"
          >
            Cardholder Name
          </label>
          <input
            id="cardHolder"
            type="text"
            value={cardHolder}
            onChange={(e) => setCardHolder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700"
            >
              Expiry Date
            </label>
            <input
              id="expiryDate"
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              placeholder="MM/YY"
              maxLength={5}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="cvc"
              className="block text-sm font-medium text-gray-700"
            >
              CVC
            </label>
            <input
              id="cvc"
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
              placeholder="123"
              maxLength={4}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <div className="relative border border-gray-300 rounded-md">
            <select
              id="country"
              defaultValue={customerInfo.country || "US"}
              className="appearance-none w-full px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 rounded-md"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="NG">London</option>
              <option value="GH">Ghana</option>
              <option value="ZA">South Africa</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        <div className="pt-4">
          <div className="mb-4">
            <Button
              type="submit"
              disabled={
                isLoading || !cardNumber || !cardHolder || !expiryDate || !cvc
              }
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `Pay with Card ${new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)}`
              )}
            </Button>
          </div>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <FlutterwavePayButton
            amount={amount}
            currency={currency}
            bookingReference={bookingReference}
            customerInfo={customerInfo}
            onSuccess={onSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
