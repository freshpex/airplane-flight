import { z } from 'zod';

// Define common validation schemas that can be used across the application

// Email validation
export const emailSchema = z
  .string()
  .email('Please enter a valid email address');

// Password validation (minimum 8 characters, at least one uppercase, one lowercase, one number)
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

// Names validation (letters, spaces, hyphens, apostrophes)
export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must not exceed 50 characters')
  .regex(/^[a-zA-Z\s\-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

// Phone number validation (international format)
export const phoneSchema = z
  .string()
  .regex(/^\+?[0-9\s\-()]{7,20}$/, 'Please enter a valid phone number');

// Date validation schema (YYYY-MM-DD format)
export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .refine((date: string) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, 'Please enter a valid date');

// Flight search schema
export const flightSearchSchema = z.object({
  from: z.string().min(3, 'Origin is required'),
  to: z.string().min(3, 'Destination is required'),
  departDate: dateSchema,
  returnDate: dateSchema.optional(),
  passengers: z.number().min(1, 'At least 1 passenger is required').max(9, 'Maximum 9 passengers allowed'),
  cabinClass: z.enum(['ECONOMY', 'PREMIUM_ECONOMY', 'BUSINESS', 'FIRST']),
});

// Hotel search schema
export const hotelSearchSchema = z.object({
  destination: z.string().min(2, 'Destination is required'),
  checkInDate: dateSchema,
  checkOutDate: dateSchema,
  rooms: z.number().min(1, 'At least 1 room is required').max(9, 'Maximum 9 rooms allowed'),
  adults: z.number().min(1, 'At least 1 adult is required'),
  children: z.number().min(0, 'Number of children cannot be negative'),
});

// Car rental search schema
export const carRentalSearchSchema = z.object({
  pickupLocation: z.string().min(2, 'Pickup location is required'),
  dropoffLocation: z.string().min(2, 'Dropoff location is required'),
  pickupDate: dateSchema,
  dropoffDate: dateSchema,
  driverAge: z.number().min(18, 'Driver must be at least 18 years old'),
});

// Login form schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

// Registration form schema
export const registrationSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  phone: phoneSchema.optional(),
  agreeTerms: z.literal(true).refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
}).refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

// Passenger information schema
export const passengerSchema = z.object({
  type: z.enum(['ADULT', 'CHILD', 'INFANT']),
  title: z.enum(['MR', 'MRS', 'MS', 'DR']),
  firstName: nameSchema,
  lastName: nameSchema,
  dateOfBirth: dateSchema.optional(),
  nationality: z.string().optional(),
  passportNumber: z.string().optional(),
  passportExpiry: dateSchema.optional(),
});

// Payment information schema
export const paymentSchema = z.object({
  cardholderName: nameSchema,
  cardNumber: z.string().regex(/^\d{16}$/, 'Please enter a valid 16-digit card number'),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please use MM/YY format'),
  cvv: z.string().regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
  billingAddress: z.object({
    line1: z.string().min(1, 'Address line 1 is required'),
    line2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().optional(),
    postalCode: z.string().min(1, 'Postal code is required'),
    country: z.string().min(1, 'Country is required'),
  }),
});
