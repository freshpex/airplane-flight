/**
 * QuicktellerService.ts
 * Service to handle payment processing via Quickteller API
 */

interface QuicktellerConfig {
  merchantId: string;
  apiKey: string;
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
}

class QuicktellerService {
  private config: QuicktellerConfig;

  constructor() {
    this.config = {
      merchantId: (import.meta.env as any).VITE_QUICKTELLER_MERCHANT_ID || "",
      apiKey: (import.meta.env as any).VITE_QUICKTELLER_API_KEY || "",
      baseUrl:
        (import.meta.env as any).VITE_QUICKTELLER_BASE_URL ||
        "https://api.quickteller.com/v1",
      isLive: (import.meta.env as any).VITE_QUICKTELLER_MODE === "live",
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
      if (!this.config.merchantId || !this.config.apiKey) {
        throw new Error("Quickteller credentials not configured");
      }

      console.info("[QuicktellerService] Initiating payment transaction");

      // In a real implementation, we would make an API call to Quickteller here
      // For demo purposes, we'll simulate a successful API response

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Generate a unique transaction ID
      const transactionId = `TRX${Date.now()}${Math.floor(Math.random() * 1000)}`;

      // In a real implementation, we'd store this transaction in a database
      this.storeTransactionLocally(transactionId, {
        amount: paymentRequest.amount,
        currency: paymentRequest.currency,
        customerId: paymentRequest.customerId,
        customerEmail: paymentRequest.customerEmail,
        customerName: paymentRequest.customerName,
        bookingReference: paymentRequest.bookingReference,
        status: "pending",
        dateInitiated: new Date().toISOString(),
      });

      console.info(
        `[QuicktellerService] Payment transaction initiated: ${transactionId}`,
      );

      return {
        transactionId,
        paymentUrl: this.config.isLive
          ? `https://payment.quickteller.com/pay/${transactionId}`
          : `https://payment.quickteller.com/test/pay/${transactionId}`,
        status: "pending",
        message: "Payment transaction initiated successfully",
      };
    } catch (error) {
      console.error("[QuicktellerService] Error initiating payment:", error);
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
      console.info(
        `[QuicktellerService] Checking transaction status for: ${transactionId}`,
      );

      // In a real implementation, we would make an API call to Quickteller here
      // For demo purposes, we'll return data from local storage

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const transactionData =
        this.getTransactionFromLocalStorage(transactionId);

      if (!transactionData) {
        throw new Error("Transaction not found");
      }

      // For demo purposes, we'll simulate successful payment after a certain time
      // In a real application, the status would come from the Quickteller API
      const timeElapsed =
        Date.now() - new Date(transactionData.dateInitiated).getTime();
      const status = timeElapsed > 10000 ? "success" : "pending";

      if (status === "success" && transactionData.status === "pending") {
        // Update local storage with success status
        transactionData.status = "success";
        transactionData.paymentDate = new Date().toISOString();
        transactionData.paymentMethod = "Credit Card";
        transactionData.cardDetails = {
          last4: this.generateRandomLast4(),
          brand: this.getRandomCardBrand(),
        };
        this.storeTransactionLocally(transactionId, transactionData);
      }

      return {
        status: transactionData.status,
        transactionId,
        amount: transactionData.amount,
        currency: transactionData.currency,
        paymentDate: transactionData.paymentDate,
        paymentMethod: transactionData.paymentMethod,
        cardDetails: transactionData.cardDetails,
        reference: transactionData.bookingReference,
      };
    } catch (error) {
      console.error(
        `[QuicktellerService] Error checking transaction status for ${transactionId}:`,
        error,
      );
      throw error;
    }
  }

  /**
   * Verify a successful payment
   * @param transactionId Transaction ID to verify
   * @returns Boolean indicating if payment was successful
   */
  async verifyPayment(transactionId: string): Promise<boolean> {
    try {
      const status = await this.checkTransactionStatus(transactionId);
      return status.status === "success";
    } catch (error) {
      console.error(
        `[QuicktellerService] Error verifying payment for ${transactionId}:`,
        error,
      );
      return false;
    }
  }

  /**
   * Store transaction data locally for demo purposes
   * In a real implementation, this would be handled by a backend service
   */
  private storeTransactionLocally(transactionId: string, data: any): void {
    try {
      localStorage.setItem(
        `transaction_${transactionId}`,
        JSON.stringify(data),
      );
    } catch (error) {
      console.error(
        "[QuicktellerService] Error storing transaction data:",
        error,
      );
    }
  }

  /**
   * Retrieve transaction data from local storage
   */
  private getTransactionFromLocalStorage(transactionId: string): any {
    try {
      const data = localStorage.getItem(`transaction_${transactionId}`);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(
        "[QuicktellerService] Error retrieving transaction data:",
        error,
      );
      return null;
    }
  }

  /**
   * Generate a random last 4 digits for card
   */
  private generateRandomLast4(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  /**
   * Get a random card brand
   */
  private getRandomCardBrand(): string {
    const brands = ["Visa", "Mastercard", "Verve"];
    return brands[Math.floor(Math.random() * brands.length)];
  }
}

export const quicktellerService = new QuicktellerService();
export default quicktellerService;
