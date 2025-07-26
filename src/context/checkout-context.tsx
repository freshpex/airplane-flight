import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// Types for checkout context
export interface CheckoutItem {
  id: string;
  type: "flight" | "hotel" | "car" | "activity";
  name: string;
  description?: string;
  price: number;
  image?: string;
}

interface PassengerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
}

interface PaymentInfo {
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
  method: "card" | "bank" | "ussd" | "transfer";
}

export interface CheckoutState {
  items: CheckoutItem[];
  subtotal: number;
  tax: number;
  total: number;
  passengers: PassengerInfo[];
  contactInfo: ContactInfo | null;
  paymentInfo: PaymentInfo | null;
  transactionId: string | null;
  paymentStatus: "pending" | "processing" | "completed" | "failed" | null;
}

interface CheckoutContextType {
  state: CheckoutState;
  addItem: (item: CheckoutItem) => void;
  removeItem: (itemId: string) => void;
  updateItems: (items: CheckoutItem[]) => void;
  setPassengers: (passengers: PassengerInfo[]) => void;
  setContactInfo: (info: ContactInfo) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  setTransactionId: (id: string) => void;
  setPaymentStatus: (
    status: "pending" | "processing" | "completed" | "failed" | null,
  ) => void;
  resetCheckout: () => void;
}

// Initial state
const initialState: CheckoutState = {
  items: [],
  subtotal: 0,
  tax: 0,
  total: 0,
  passengers: [],
  contactInfo: null,
  paymentInfo: null,
  transactionId: null,
  paymentStatus: null,
};

// Create context
const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined,
);

// Provider component
export const CheckoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<CheckoutState>(initialState);

  // Calculate totals based on items
  const calculateTotals = (items: CheckoutItem[]) => {
    const subtotal = items.reduce((sum, item) => sum + item.price, 0);
    const tax = subtotal * 0.075; // 7.5% VAT
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  // Add an item to the checkout
  const addItem = (item: CheckoutItem) => {
    const newItems = [...state.items, item];
    const { subtotal, tax, total } = calculateTotals(newItems);
    setState((prev) => ({ ...prev, items: newItems, subtotal, tax, total }));
  };

  // Remove an item from the checkout
  const removeItem = (itemId: string) => {
    const newItems = state.items.filter((item) => item.id !== itemId);
    const { subtotal, tax, total } = calculateTotals(newItems);
    setState((prev) => ({ ...prev, items: newItems, subtotal, tax, total }));
  };

  // Update all items at once
  const updateItems = (items: CheckoutItem[]) => {
    const { subtotal, tax, total } = calculateTotals(items);
    setState((prev) => ({ ...prev, items, subtotal, tax, total }));
  };

  // Set passenger information
  const setPassengers = (passengers: PassengerInfo[]) => {
    setState((prev) => ({ ...prev, passengers }));
  };

  // Set contact information
  const setContactInfo = (info: ContactInfo) => {
    setState((prev) => ({ ...prev, contactInfo: info }));
  };

  // Set payment information
  const setPaymentInfo = (info: PaymentInfo) => {
    setState((prev) => ({ ...prev, paymentInfo: info }));
  };

  // Set transaction ID after payment initiation
  const setTransactionId = (id: string) => {
    setState((prev) => ({ ...prev, transactionId: id }));
  };

  // Set payment status
  const setPaymentStatus = (
    status: "pending" | "processing" | "completed" | "failed" | null,
  ) => {
    setState((prev) => ({ ...prev, paymentStatus: status }));
  };

  // Reset checkout to initial state
  const resetCheckout = () => {
    setState(initialState);
  };

  const value = {
    state,
    addItem,
    removeItem,
    updateItems,
    setPassengers,
    setContactInfo,
    setPaymentInfo,
    setTransactionId,
    setPaymentStatus,
    resetCheckout,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

// Custom hook to use the checkout context
export const useCheckout = (): CheckoutContextType => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
};
