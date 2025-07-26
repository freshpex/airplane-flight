import { useState } from "react";
import { Button } from "@/components/ui/button";
import { flutterwaveService } from "@/utils/FlutterwaveService";
import type { ContactInfo, PaymentDetails } from "@/types/checkout";

interface FlutterwavePayButtonProps {
  amount: number;
  currency: string;
  bookingReference: string;
  customerInfo: ContactInfo;
  onSuccess: (paymentDetails: PaymentDetails) => void;
  onClose?: () => void;
}

const FlutterwavePayButton = ({
  amount,
  currency,
  bookingReference,
  customerInfo,
  onSuccess,
  onClose,
}: FlutterwavePayButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // Initialize payment with Flutterwave
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

      // Simulate payment process
      // In a real application, this would open the Flutterwave checkout modal
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Check transaction status
      const transactionStatus = await flutterwaveService.checkTransactionStatus(
        paymentResponse.transactionId,
      );

      // Process payment response
      if (transactionStatus.status === "success") {
        onSuccess({
          transactionId: paymentResponse.transactionId,
          amount,
          currency,
          status: "completed",
          paymentMethod: "flutterwave",
          paymentDate:
            transactionStatus.paymentDate || new Date().toISOString(),
          cardDetails: transactionStatus.cardDetails,
        });
      } else {
        // Handle payment failure
        if (onClose) onClose();
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      if (onClose) onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full bg-blue-600 hover:bg-blue-700"
    >
      {isLoading ? "Processing..." : "Pay with Flutterwave"}
    </Button>
  );
};

export default FlutterwavePayButton;
