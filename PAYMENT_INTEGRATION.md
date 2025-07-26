# Flutterwave Integration & Supabase Setup Guide

This guide explains how to set up the Flutterwave payment integration and Supabase database for the Skyways application.

## Environment Variables Setup

1. Create a `.env` file in the root of the project with the following variables:

```
# Flutterwave API Keys
VITE_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_public_key
VITE_FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret_key
VITE_FLUTTERWAVE_ENCRYPTION_KEY=your_flutterwave_encryption_key
VITE_FLUTTERWAVE_BASE_URL=https://api.flutterwave.com/v3
VITE_FLUTTERWAVE_IS_LIVE=false

# Supabase Credentials
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Flutterwave Account Setup

1. Sign up for a Flutterwave account at [https://flutterwave.com](https://flutterwave.com)
2. Create a new integration in your dashboard
3. Get your API keys (Public Key, Secret Key, Encryption Key)
4. Add your website URL to the allowed domains
5. Set up your payment methods and currencies

## Supabase Database Setup

1. Create a new project at [https://app.supabase.io](https://app.supabase.io)
2. Get your project URL and anon key from the API settings
3. Create the required tables using the SQL provided in `supabase_schema.sql`
4. Set up Row Level Security (RLS) policies as needed for your tables
5. Enable realtime functionality for tables if you want to use real-time updates

To create the tables, navigate to the SQL Editor in your Supabase dashboard and run the SQL commands from `supabase_schema.sql`.

## Testing the Integration

To test the payment integration:

1. Use Flutterwave's test cards:
   - Card Number: 5531 8866 5214 2950
   - Expiry Date: 09/32
   - CVV: 564
   - PIN: 3310
   - OTP: 12345

2. For international payments, use:
   - Card Number: 4242 4242 4242 4242
   - Expiry Date: Any future date
   - CVV: Any 3 digits

## Production Deployment

For production deployment:

1. Update the VITE_FLUTTERWAVE_IS_LIVE environment variable to true
2. Replace test API keys with production keys
3. Configure webhook endpoints for real-time payment notifications
4. Set up error monitoring and logging

## Important Security Notes

- Never expose your Flutterwave Secret Key on the client-side
- Always verify webhook signatures for payment confirmations
- Use HTTPS for all API calls
- Implement proper error handling and user notifications
- Store sensitive data only in secure environments

## Resources

- [Flutterwave API Documentation](https://developer.flutterwave.com/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Flutterwave React SDK](https://github.com/flutterwave/flutterwave-react-v3)
