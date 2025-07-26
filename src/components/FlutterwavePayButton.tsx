import { useState } from "react";
import { useFlutterwave } from "flutterwave-react-v3";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface FlutterwavePayButtonProps {
  amount: number;
  currency?: string;
  customerName: string;
  customerEmail: string;
  phoneNumber?: string;
  reference: string;
  description: string;
  className?: string;
  onSuccess?: (response: any) => void;
  onClose?: () => void;
}

export function FlutterwavePayButton({
  amount,
  currency = "USD",
  customerName,
  customerEmail,
  phoneNumber,
  reference,
  description,
  className,
  onSuccess,
  onClose,
}: FlutterwavePayButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const config = {
    public_key: (import.meta.env as any).VITE_FLUTTERWAVE_PUBLIC_KEY,
    tx_ref: reference,
    amount: amount,
    currency: currency,
    payment_options: "card,banktransfer",
    customer: {
      email: customerEmail,
      phone_number: phoneNumber || "",
      name: customerName,
    },
    customizations: {
      title: "Skyways",
      description: description,
      logo: "/vite.svg",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    setIsProcessing(true);

    handleFlutterPayment({
      callback: (response) => {
        setIsProcessing(false);
        if (response.status === "successful") {
          toast.success("Payment successful!", {
            description: `Your payment of ${currency} ${amount} was successful`,
          });

          if (onSuccess) {
            onSuccess(response);
          } else {
            navigate("/booking-confirmation", {
              state: {
                transactionId: response.transaction_id,
                reference: reference,
              },
            });
          }
        } else {
          toast.error("Payment failed", {
            description: "There was an issue processing your payment",
          });
        }
      },
      onClose: () => {
        setIsProcessing(false);
        toast.info("Payment canceled", {
          description: "You closed the payment page",
        });
        if (onClose) {
          onClose();
        }
      },
    });
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isProcessing}
      className={className}
    >
      {isProcessing ? "Processing..." : "Pay with Flutterwave"}
    </Button>
  );
}

export default FlutterwavePayButton;
