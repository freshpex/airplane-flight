/**
 * Supabase service for storing user data, payments, and bookings
 */
import { createClient } from "@supabase/supabase-js";
import type {
  PaymentDetails,
  BookingDetails,
  ContactInfo,
} from "@/types/checkout";

export type BookingRecord = {
  id?: string;
  booking_reference: string;
  user_id?: string;
  booking_details: BookingDetails;
  payment_details?: PaymentDetails;
  status: "draft" | "pending" | "confirmed" | "cancelled";
  created_at?: string;
  updated_at?: string;
};

export type PaymentRecord = {
  id?: string;
  transaction_id: string;
  booking_reference: string;
  user_id?: string;
  amount: number;
  currency: string;
  payment_method: string;
  payment_status: string;
  payment_date: string;
  card_details?: object;
  created_at?: string;
  updated_at?: string;
  metadata?: object;
};

export type UserRecord = {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  country?: string;
  created_at?: string;
  updated_at?: string;
};

class SupabaseService {
  private supabase;

  constructor() {
    // Initialize Supabase client
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
    const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  /**
   * Get or create a user record based on email
   */
  async getOrCreateUser(contactInfo: ContactInfo): Promise<UserRecord | null> {
    try {
      // Check if user already exists
      const { data: existingUser, error: fetchError } = await this.supabase
        .from("members")
        .select("*")
        .eq("email", contactInfo.email)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error fetching user:", fetchError);
        return null;
      }

      // Return existing user if found
      if (existingUser) {
        return existingUser as UserRecord;
      }

      // Create new user if not found
      const { data: newUser, error: createError } = await this.supabase
        .from("members")
        .insert({
          email: contactInfo.email,
          first_name: contactInfo.firstName,
          last_name: contactInfo.lastName,
          phone: contactInfo.phone,
          country: contactInfo.country,
        })
        .select()
        .single();

      if (createError) {
        console.error("Error creating user:", createError);
        return null;
      }

      return newUser as UserRecord;
    } catch (error) {
      console.error("Error in getOrCreateUser:", error);
      return null;
    }
  }

  /**
   * Create a booking record
   */
  async createBooking(
    bookingDetails: BookingDetails,
    userId?: string,
  ): Promise<BookingRecord | null> {
    try {
      const { data, error } = await this.supabase
        .from("bookings")
        .insert({
          booking_reference: bookingDetails.bookingReference,
          user_id: userId,
          booking_details: bookingDetails,
          status: "draft",
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating booking:", error);
        return null;
      }

      return data as BookingRecord;
    } catch (error) {
      console.error("Error in createBooking:", error);
      return null;
    }
  }

  /**
   * Update a booking record
   */
  async updateBooking(
    bookingReference: string,
    updates: Partial<BookingRecord>,
  ): Promise<BookingRecord | null> {
    try {
      const { data, error } = await this.supabase
        .from("bookings")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("booking_reference", bookingReference)
        .select()
        .single();

      if (error) {
        console.error("Error updating booking:", error);
        return null;
      }

      return data as BookingRecord;
    } catch (error) {
      console.error("Error in updateBooking:", error);
      return null;
    }
  }

  /**
   * Get a booking by reference
   */
  async getBooking(bookingReference: string): Promise<BookingRecord | null> {
    try {
      const { data, error } = await this.supabase
        .from("bookings")
        .select("*")
        .eq("booking_reference", bookingReference)
        .single();

      if (error) {
        console.error("Error fetching booking:", error);
        return null;
      }

      return data as BookingRecord;
    } catch (error) {
      console.error("Error in getBooking:", error);
      return null;
    }
  }

  /**
   * Record a payment transaction
   */
  async recordPayment(
    paymentDetails: PaymentDetails,
    bookingReference: string,
    userId?: string,
  ): Promise<PaymentRecord | null> {
    try {
      const { data, error } = await this.supabase
        .from("payments")
        .insert({
          transaction_id: paymentDetails.transactionId,
          booking_reference: bookingReference,
          user_id: userId,
          amount: paymentDetails.amount,
          currency: paymentDetails.currency,
          payment_method: paymentDetails.paymentMethod,
          payment_status: paymentDetails.status,
          payment_date: paymentDetails.paymentDate || new Date().toISOString(),
          card_details: paymentDetails.cardDetails,
        })
        .select()
        .single();

      if (error) {
        console.error("Error recording payment:", error);
        return null;
      }

      // Update the booking status if payment was successful
      if (
        paymentDetails.status === "success" ||
        paymentDetails.status === "completed"
      ) {
        await this.updateBooking(bookingReference, {
          status: "confirmed",
          payment_details: paymentDetails,
        });
      }

      return data as PaymentRecord;
    } catch (error) {
      console.error("Error in recordPayment:", error);
      return null;
    }
  }

  /**
   * Get user bookings
   */
  async getUserBookings(userId: string): Promise<BookingRecord[]> {
    try {
      const { data, error } = await this.supabase
        .from("bookings")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching user bookings:", error);
        return [];
      }

      return data as BookingRecord[];
    } catch (error) {
      console.error("Error in getUserBookings:", error);
      return [];
    }
  }

  /**
   * Get user payments
   */
  async getUserPayments(userId: string): Promise<PaymentRecord[]> {
    try {
      const { data, error } = await this.supabase
        .from("payments")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching user payments:", error);
        return [];
      }

      return data as PaymentRecord[];
    } catch (error) {
      console.error("Error in getUserPayments:", error);
      return [];
    }
  }
}

export const supabaseService = new SupabaseService();
export default supabaseService;
