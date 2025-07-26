import { useState } from "react";
import { useFlutterwave } from "flutterwave-react-v3";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FlutterwaveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  publicKey: string;
  txRef: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerPhone: string;
  customerName: string;
  paymentOptions?: string;
  customizationsTitle?: string;
  customizationsDescription?: string;
  customizationsLogo?: string;
  redirectUrl?: string;
  text?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  onSuccess?: (response: any) => void;
  onClose?: () => void;
}

export function FlutterwaveButton({
  publicKey,
  txRef,
  amount,
  currency,
  customerEmail,
  customerPhone,
  customerName,
  paymentOptions,
  customizationsTitle = "Emma Airplane Payment",
  customizationsDescription = "Make payment for your booking",
  customizationsLogo = "",
  redirectUrl,
  text = "Pay Now",
  className,
  variant = "default",
  onSuccess,
  onClose,
  ...props
}: FlutterwaveButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const config = {
    public_key: publicKey,
    tx_ref: txRef,
    amount: amount,
    currency: currency,
    payment_options: paymentOptions || "card,mobilemoney,ussd",
    customer: {
      email: customerEmail,
      phone_number: customerPhone,
      name: customerName,
    },
    customizations: {
      title: customizationsTitle,
      description: customizationsDescription,
      logo: customizationsLogo,
    },
    redirect_url: redirectUrl,
  };

  const handleFlutterPayment = useFlutterwave(config);

  const handlePayment = () => {
    setIsLoading(true);

    try {
      handleFlutterPayment({
        callback: (response) => {
          if (response.status === "successful") {
            toast.success("Payment successful!");
            if (onSuccess) onSuccess(response);
          } else {
            toast.error("Payment was not successful");
          }
          setIsLoading(false);
        },
        onClose: () => {
          toast.info("Payment cancelled");
          if (onClose) onClose();
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Flutterwave payment error:", error);
      toast.error("Failed to initiate payment");
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      variant={variant}
      className={cn("min-w-[120px]", className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        text
      )}
    </Button>
  );
}
