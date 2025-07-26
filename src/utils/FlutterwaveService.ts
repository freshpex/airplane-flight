/**
 * FlutterwaveService.ts
 * Service to handle payment processing via Flutterwave API
 * Integrates with Supabase for storing payment information
 */
import supabase from "./SupabaseClient";

interface FlutterwaveConfig {
  publicKey: string;
  secretKey: string;
  encryptionKey: string;
  baseUrl: string;
  isLive: boolean;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  paymentDescription: string;
  redirectUrl?: string;
  bookingReference: string;
  phoneNumber?: string;
  country?: string;
}

export interface PaymentResponse {
  transactionId: string;
  paymentUrl: string;
  status: "pending" | "success" | "failed";
  message: string;
}

export interface TransactionStatus {
  status: "pending" | "success" | "failed" | "cancelled";
  transactionId: string;
  amount: number;
  currency: string;
  paymentDate?: string;
  paymentMethod?: string;
  cardDetails?: {
    last4: string;
    brand: string;
  };
  reference?: string;
  customerDetails?: {
    name: string;
    email: string;
    phoneNumber?: string;
    country?: string;
  };
  meta?: Record<string, any>;
}

class FlutterwaveService {
  private config: FlutterwaveConfig;

  constructor() {
    this.config = {
      publicKey: (import.meta.env as any).VITE_FLUTTERWAVE_PUBLIC_KEY || "",
      secretKey: (import.meta.env as any).VITE_FLUTTERWAVE_SECRET_KEY || "",
      encryptionKey:
        (import.meta.env as any).VITE_FLUTTERWAVE_ENCRYPTION_KEY || "",
      baseUrl: "https://api.flutterwave.com/v3",
      isLive: (import.meta.env as any).VITE_FLUTTERWAVE_MODE === "live",
    };
  }

  /**
   * Initialize a payment transaction
   * @param paymentRequest Payment details
   * @returns Payment response with transaction ID and payment URL
   */
  async initiatePayment(
    paymentRequest: PaymentRequest,
  ): Promise<PaymentResponse> {
    try {
      const {
        amount,
        currency,
        customerId,
        customerName,
        customerEmail,
        paymentDescription,
        bookingReference,
      } = paymentRequest;

      // Log payment attempt to Supabase
      const { error: dbError } = await supabase
        .from("payment_attempts")
        .insert({
          booking_reference: bookingReference,
          customer_id: customerId,
          customer_name: customerName,
          customer_email: customerEmail,
          amount,
          currency,
          status: "initiated",
          payment_method: "flutterwave",
          created_at: new Date().toISOString(),
        });

      if (dbError) {
        console.error("Failed to log payment attempt:", dbError);
      }

      // In a real implementation, we would make an API call to Flutterwave
      // For now, we'll return a mocked response for development purposes
      if ((import.meta.env as any).DEV) {
        const transactionId = `FLW-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

        // Update payment attempt with transaction ID
        await supabase
          .from("payment_attempts")
          .update({
            transaction_id: transactionId,
            status: "pending",
          })
          .eq("booking_reference", bookingReference);

        return {
          transactionId: transactionId,
          paymentUrl: "https://flutterwave.com/pay/example",
          status: "pending",
          message: "Payment initiated successfully",
        };
      }

      // Real implementation would call Flutterwave API
      const response = await fetch(`${this.config.baseUrl}/payments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tx_ref: bookingReference,
          amount,
          currency,
          payment_options: "card,banktransfer,ussd",
          redirect_url:
            paymentRequest.redirectUrl ||
            window.location.origin + "/payment-callback",
          customer: {
            email: customerEmail,
            phonenumber: paymentRequest.phoneNumber,
            name: customerName,
          },
          customizations: {
            title: "Skyways Booking",
            description: paymentDescription,
            logo: "/vite.svg",
          },
          meta: {
            bookingReference,
            customerId,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to initiate payment");
      }

      return {
        transactionId: data.data.id,
        paymentUrl: data.data.link,
        status: "pending",
        message: data.message,
      };
    } catch (error) {
      console.error("Payment initiation error:", error);
      throw error;
    }
  }

  /**
   * Get the status of a payment transaction
   * @param transactionId Transaction ID to check
   * @returns Transaction status
   */
  async checkTransactionStatus(
    transactionId: string,
  ): Promise<TransactionStatus> {
    try {
      // In a real implementation, we would make an API call to Flutterwave
      // For now, we'll return a mocked response for development purposes
      if ((import.meta.env as any).DEV) {
        // Simulate 80% success rate
        const isSuccessful = Math.random() < 0.8;
        const status = isSuccessful ? "success" : "failed";
        const currentDate = new Date().toISOString();

        // Get payment attempt from database
        const { data: paymentAttempt } = await supabase
          .from("payment_attempts")
          .select("*")
          .eq("transaction_id", transactionId)
          .single();

        // Update payment status in database
        if (paymentAttempt) {
          await supabase
            .from("payment_attempts")
            .update({
              status: status,
              updated_at: currentDate,
            })
            .eq("transaction_id", transactionId);

          // If successful, create payment record
          if (isSuccessful) {
            await supabase.from("payments").insert({
              transaction_id: transactionId,
              booking_reference: paymentAttempt.booking_reference,
              customer_id: paymentAttempt.customer_id,
              customer_name: paymentAttempt.customer_name,
              customer_email: paymentAttempt.customer_email,
              amount: paymentAttempt.amount,
              currency: paymentAttempt.currency,
              payment_method: "card",
              status: "completed",
              payment_date: currentDate,
            });
          }
        }

        return {
          status: status,
          transactionId,
          amount: paymentAttempt?.amount || 1000,
          currency: paymentAttempt?.currency || "USD",
          paymentDate: currentDate,
          paymentMethod: "card",
          cardDetails: {
            last4: "4242",
            brand: "Visa",
          },
          reference: paymentAttempt?.booking_reference || `REF-${Date.now()}`,
        };
      }

      // Real implementation would call Flutterwave API
      const response = await fetch(
        `${this.config.baseUrl}/transactions/${transactionId}/verify`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.config.secretKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to check transaction status");
      }

      const transaction = data.data;

      return {
        status:
          transaction.status === "successful"
            ? "success"
            : transaction.status === "failed"
              ? "failed"
              : "pending",
        transactionId: transaction.id,
        amount: transaction.amount,
        currency: transaction.currency,
        paymentDate: transaction.created_at,
        paymentMethod: transaction.payment_type,
        cardDetails: transaction.card
          ? {
              last4: transaction.card.last_4digits,
              brand: transaction.card.type,
            }
          : undefined,
        reference: transaction.tx_ref,
        customerDetails: {
          name: transaction.customer.name,
          email: transaction.customer.email,
          phoneNumber: transaction.customer.phone_number,
          country: transaction.customer.country,
        },
        meta: transaction.meta,
      };
    } catch (error) {
      console.error("Transaction status check error:", error);
      throw error;
    }
  }

  /**
   * Verify a transaction using the reference
   * @param reference Transaction reference
   * @returns Transaction status
   */
  async verifyTransaction(reference: string): Promise<TransactionStatus> {
    try {
      // Real implementation would call Flutterwave API
      const response = await fetch(
        `${this.config.baseUrl}/transactions/verify_by_reference?tx_ref=${reference}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.config.secretKey}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to verify transaction");
      }

      const transaction = data.data;

      return {
        status:
          transaction.status === "successful"
            ? "success"
            : transaction.status === "failed"
              ? "failed"
              : "pending",
        transactionId: transaction.id,
        amount: transaction.amount,
        currency: transaction.currency,
        paymentDate: transaction.created_at,
        paymentMethod: transaction.payment_type,
        cardDetails: transaction.card
          ? {
              last4: transaction.card.last_4digits,
              brand: transaction.card.type,
            }
          : undefined,
        reference: transaction.tx_ref,
      };
    } catch (error) {
      console.error("Transaction verification error:", error);
      throw error;
    }
  }
}

export const flutterwaveService = new FlutterwaveService();
export default flutterwaveService;
