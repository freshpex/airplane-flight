/**
 * Types for checkout, payment, and booking confirmation
 */

import type { FlightOption, Hotel, CarRental, Activity } from "./flight";

export interface BookingSummaryItem {
  id: string;
  type: "flight" | "hotel" | "car" | "activity";
  title: string;
  description: string;
  image?: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  duration?: string;
  dates?: {
    start: string;
    end?: string;
  };
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  countryCode?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface Passenger {
  type: "adult" | "child" | "infant";
  title?: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  nationality?: string;
  idType?: "passport" | "nationalId" | "drivingLicense";
  passportNumber?: string;
  passportExpiry?: string;
  nationalIdNumber?: string;
  drivingLicenseNumber?: string;
  specialRequests?: string | string[];
}

export interface BookingDetails {
  bookingReference: string;
  contactInfo: ContactInfo;
  passengers: Passenger[];
  flightDetails?: FlightOption;
  hotelDetails?: Hotel;
  carRentalDetails?: CarRental;
  activityDetails?: Activity;
  bookingDate: string;
  totalAmount: number;
  currency: string;
}

export interface PaymentMethod {
  id: string;
  type:
    | "credit_card"
    | "debit_card"
    | "bank_transfer"
    | "flutterwave"
    | "paypal"
    | "apple_pay"
    | "google_pay";
  name: string;
  description: string;
  icon: string;
  supportedCards?: string[];
}

export type TransactionStatus =
  | "pending"
  | "completed"
  | "failed"
  | "cancelled"
  | "success";

export interface PaymentDetails {
  transactionId: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  paymentMethod: string;
  paymentDate?: string;
  cardDetails?: {
    last4: string;
    brand: string;
  };
}

export interface CheckoutState {
  step: "contact" | "passengers" | "payment" | "confirmation";
  bookingDetails: BookingDetails;
  paymentDetails?: PaymentDetails;
  loading: boolean;
  error?: string;
}

export interface ReceiptDetails {
  receiptNumber: string;
  bookingReference: string;
  issueDate: string;
  paymentDetails: PaymentDetails;
  bookingDetails: BookingDetails;
  contactInfo: ContactInfo;
  items: BookingSummaryItem[];
  subtotal: number;
  taxes: number;
  total: number;
  currency: string;
}
