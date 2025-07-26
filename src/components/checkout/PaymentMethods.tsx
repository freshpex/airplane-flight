import { useState } from "react";
import { Check, Info } from "lucide-react";
import { flutterwaveService } from "@/utils/FlutterwaveService";
import { FlutterwavePayButton } from "@/components/FlutterwavePayButton";
import type {
  PaymentMethod,
  ContactInfo,
  PaymentDetails,
} from "@/types/checkout";

interface PaymentMethodsProps {
  amount: number;
  currency: string;
  bookingReference: string;
  customerInfo: ContactInfo;
  onSubmit: (paymentDetails: PaymentDetails) => void;
  onBack: () => void;
}

const PaymentMethods = ({
  amount,
  currency,
  bookingReference,
  customerInfo,
  onSubmit,
}: PaymentMethodsProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("flutterwave");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Available payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: "flutterwave",
      type: "flutterwave",
      name: "Flutterwave",
      description: "Fast and secure online payment",
      icon: "https://cdn.iconscout.com/icon/free/png-256/free-flutterwave-3521477-2944921.png",
      supportedCards: ["Visa", "Mastercard", "American Express", "Discover"],
    },
    {
      id: "credit_card",
      type: "credit_card",
      name: "Credit Card",
      description: "Pay securely with your credit card",
      icon: "https://i.imgur.com/9BT3Tyr.png",
      supportedCards: ["Visa", "Mastercard", "American Express"],
    },
    {
      id: "bank_transfer",
      type: "bank_transfer",
      name: "Bank Transfer",
      description: "Pay directly from your bank account",
      icon: "https://i.imgur.com/OYkyw5Y.png",
    },
  ];

  // Handle payment method selection
  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
  };

  // Handle payment processing
  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // Process payment through Flutterwave
      const paymentResponse = await flutterwaveService.initiatePayment({
        amount,
        currency,
        customerId: `CUST${Date.now()}`,
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerEmail: customerInfo.email,
        paymentDescription: `Flight booking ${bookingReference}`,
        bookingReference,
        phoneNumber: customerInfo.phone,
        country: customerInfo.country,
      });

      // Check transaction status
      const transactionStatus = await flutterwaveService.checkTransactionStatus(
        paymentResponse.transactionId,
      );

      // Use the transaction status for the payment details
      const paymentDetails = {
        transactionId: paymentResponse.transactionId,
        amount,
        currency,
        status: transactionStatus.status,
        paymentMethod: selectedMethod,
        paymentDate: transactionStatus.paymentDate || new Date().toISOString(),
        cardDetails: transactionStatus.cardDetails,
      };

      // Submit payment details
      onSubmit(paymentDetails);
    } catch (error) {
      console.error("Payment processing error:", error);
      // Handle payment failure (in a real app)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Payment Method</h2>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`relative border rounded-lg p-4 cursor-pointer transition-all ${
              selectedMethod === method.id
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-purple-300"
            }`}
            onClick={() => handleMethodSelect(method.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={method.icon}
                    alt={method.name}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://i.imgur.com/tfpWX9r.png";
                    }}
                  />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">{method.name}</h3>
                  <p className="text-sm text-gray-600">{method.description}</p>

                  {method.supportedCards && (
                    <div className="mt-1 flex space-x-2">
                      {method.supportedCards.map((card) => (
                        <span
                          key={card}
                          className="inline-block text-xs px-2 py-1 bg-gray-100 rounded text-gray-600"
                        >
                          {card}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  selectedMethod === method.id
                    ? "bg-purple-500 text-white"
                    : "border border-gray-300"
                }`}
              >
                {selectedMethod === method.id && <Check className="h-4 w-4" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment security note */}
      <div className="flex items-start p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
        <Info className="h-5 w-5 flex-shrink-0 mr-3 mt-0.5" />
        <div>
          <p>
            <strong>Secure Payment:</strong> Your payment information is
            encrypted and secure. We never store your full credit card details.
          </p>
        </div>
      </div>

      <div className="pt-4 mt-6 border-t border-gray-200">
        {selectedMethod === "flutterwave" ? (
          <FlutterwavePayButton
            amount={amount}
            currency={currency}
            customerName={`${customerInfo.firstName} ${customerInfo.lastName}`}
            customerEmail={customerInfo.email}
            phoneNumber={customerInfo.phone}
            reference={bookingReference}
            description={`Flight booking ${bookingReference}`}
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg"
            onSuccess={(response) => {
              // Process payment response
              onSubmit({
                transactionId: response.transaction_id || response.flw_ref,
                amount,
                currency,
                status: response.status === "successful" ? "success" : "failed",
                paymentMethod: selectedMethod,
                paymentDate: new Date().toISOString(),
                cardDetails: {
                  last4: response.card?.last_4digits || "****",
                  brand: response.card?.type || "Unknown",
                },
              });
            }}
          />
        ) : (
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
              `Pay ${new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)}`
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
