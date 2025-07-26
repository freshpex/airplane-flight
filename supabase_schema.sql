-- members table
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  country TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment attempts table
CREATE TABLE payment_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_reference TEXT NOT NULL,
  customer_id TEXT,
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status TEXT NOT NULL, -- 'initiated', 'pending', 'completed', 'failed', 'cancelled'
  payment_method TEXT NOT NULL, -- 'flutterwave', 'card', 'bank_transfer', etc.
  transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  transaction_id TEXT NOT NULL UNIQUE,
  booking_reference TEXT NOT NULL,
  customer_id TEXT,
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL, -- 'completed', 'refunded', 'partially_refunded'
  payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB -- Store any additional payment metadata
);

-- Bookings table
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_reference TEXT NOT NULL UNIQUE,
  members_id UUID REFERENCES members(id),
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'cancelled'
  total_amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  booking_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  booking_items JSONB NOT NULL, -- Array of booking items (flights, hotels, cars, activities)
  passenger_details JSONB NOT NULL, -- Array of passenger details
  payment_id UUID REFERENCES payments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Receipts table
CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  receipt_number TEXT NOT NULL UNIQUE,
  booking_id UUID REFERENCES bookings(id),
  payment_id UUID REFERENCES payments(id),
  issue_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  subtotal NUMERIC NOT NULL,
  taxes NUMERIC NOT NULL,
  total_amount NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  receipt_items JSONB NOT NULL, -- Detailed breakdown of charges
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX bookings_reference_idx ON bookings(booking_reference);
CREATE INDEX payments_transaction_id_idx ON payments(transaction_id);
CREATE INDEX receipts_receipt_number_idx ON receipts(receipt_number);
CREATE INDEX payment_attempts_booking_ref_idx ON payment_attempts(booking_reference);
CREATE INDEX payment_attempts_transaction_id_idx ON payment_attempts(transaction_id);
