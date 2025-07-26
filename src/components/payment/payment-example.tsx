import { useCallback } from "react";
import { FlutterwaveButton } from "@/components/payment/flutterwave-button";
import { PaymentForm } from "@/components/payment/payment-form";
import { toast } from "sonner";

interface PaymentSuccessResponse {
  status: string;
  tx_ref: string;
  transaction_id: string;
  amount: number;
  currency: string;
  customer: {
    email: string;
    name: string;
    phonenumber: string;
  };
  [key: string]: any; // for other properties
}

const FLUTTERWAVE_PUBLIC_KEY =
  import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || "FLUTTERWAVE_PUBLIC_KEY";

export function PaymentExample() {
  const handlePaymentSuccess = useCallback(
    (response: PaymentSuccessResponse) => {
      toast.success(
        `Payment complete! Transaction ID: ${response.transaction_id}`,
      );
      console.log("Payment successful:", response);

      // Here you can add API calls to your backend to verify and record the payment
      // Example: updateBookingPaymentStatus(response.tx_ref, response.transaction_id);
    },
    [],
  );

  const handlePaymentClose = useCallback(() => {
    toast.info("Payment modal closed");
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <div>
        <h2 className="text-2xl font-bold mb-4">Quick Payment Button</h2>
        <p className="mb-4 text-gray-600">
          Use the FlutterwaveButton component for simple, pre-configured
          payments
        </p>

        <div className="p-6 border rounded-lg bg-gray-50">
          <FlutterwaveButton
            publicKey={FLUTTERWAVE_PUBLIC_KEY}
            txRef={`emma-${Date.now()}`}
            amount={5000}
            currency="NGN"
            customerEmail="customer@example.com"
            customerPhone="08012345678"
            customerName="John Doe"
            customizationsTitle="Emma Airplane Economy Ticket"
            customizationsDescription="Payment for your economy class flight ticket"
            text="Pay ₦5,000"
            onSuccess={handlePaymentSuccess}
            onClose={handlePaymentClose}
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Complete Payment Form</h2>
        <p className="mb-4 text-gray-600">
          Use the PaymentForm component for a complete payment experience with
          form validation
        </p>

        <PaymentForm
          publicKey={FLUTTERWAVE_PUBLIC_KEY}
          defaultAmount={5000}
          defaultCurrency="NGN"
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentClose={handlePaymentClose}
          title="Book Your Flight"
          description="Complete your payment to confirm your flight booking"
        />
      </div>
    </div>
  );
}
