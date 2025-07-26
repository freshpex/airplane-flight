import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FlutterwaveButton } from "./flutterwave-button";
import { generateUniqueId } from "@/utils/id-generator";

const paymentFormSchema = z.object({
  amount: z.string().min(1, { message: "Amount is required" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  fullName: z.string().min(3, { message: "Full name is required" }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  publicKey: string;
  defaultAmount?: number;
  defaultCurrency?: string;
  onPaymentSuccess?: (response: any) => void;
  onPaymentClose?: () => void;
  title?: string;
  description?: string;
  logoUrl?: string;
}

export function PaymentForm({
  publicKey,
  defaultAmount = 0,
  defaultCurrency = "NGN",
  onPaymentSuccess,
  onPaymentClose,
  title = "Emma Airplane Payment",
  description = "Complete your booking payment",
  logoUrl,
}: PaymentFormProps) {
  const [txRef] = useState(() => generateUniqueId());

  const defaultValues: Partial<PaymentFormValues> = {
    amount: defaultAmount.toString(),
    currency: defaultCurrency,
    email: "",
    phoneNumber: "",
    fullName: "",
  };

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues,
  });

  const currencies = [
    { value: "NGN", label: "Nigerian Naira" },
    { value: "USD", label: "US Dollar" },
    { value: "GHS", label: "Ghana Cedis" },
    { value: "KES", label: "Kenyan Shilling" },
    { value: "ZAR", label: "South African Rand" },
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter amount"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </CardContent>
      <CardFooter>
        <FlutterwaveButton
          publicKey={publicKey}
          txRef={txRef}
          amount={parseFloat(form.watch("amount") || "0")}
          currency={form.watch("currency")}
          customerEmail={form.watch("email")}
          customerPhone={form.watch("phoneNumber")}
          customerName={form.watch("fullName")}
          customizationsTitle={title}
          customizationsDescription={description}
          customizationsLogo={logoUrl}
          onSuccess={onPaymentSuccess}
          onClose={onPaymentClose}
          className="w-full"
          disabled={!form.formState.isValid}
        />
      </CardFooter>
    </Card>
  );
}
