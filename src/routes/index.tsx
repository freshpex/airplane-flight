import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import FlightSearch from "@/pages/FlightSearch";
import SearchResults from "@/components/SearchResults";

// Experience pages
import BusinessTravel from "@/pages/experience/BusinessTravel";
import LoyaltyProgram from "@/pages/experience/LoyaltyProgram";
import Activities from "@/pages/experience/Activities";
import Hotels from "@/pages/experience/Hotels";
import CarRentalPage from "@/pages/experience/CarRental";
import TravelInsurancePage from "@/pages/experience/TravelInsurance";
import DestinationsPage from "@/pages/experience/Destinations";

// Travel pages
import FlightStatus from "@/pages/travel/FlightStatus";
import ManageBooking from "@/pages/travel/ManageBooking";
import CheckIn from "@/pages/travel/CheckIn";
import BaggageInfo from "@/pages/travel/BaggageInfo";
import TravelRequirements from "@/pages/travel/TravelRequirements";

// Destination pages
import LondonDestination from "@/pages/destinations/London";

// Company pages
import AboutUs from '@/pages/company/AboutUs';
import Careers from '@/pages/company/Careers';
import Press from '@/pages/company/Press';
import InvestorRelations from '@/pages/company/InvestorRelations';
import Sustainability from '@/pages/company/Sustainability';

// Legal pages
import PrivacyPolicy from '@/pages/legal/PrivacyPolicy';
import TermsOfService from '@/pages/legal/TermsOfService';
import CookiesPolicy from '@/pages/legal/CookiesPolicy';
import Accessibility from '@/pages/legal/Accessibility';

// Support pages
import ContactUs from '@/pages/support/ContactUs';
import Feedback from '@/pages/support/Feedback';
import HelpCenter from '@/pages/support/HelpCenter';
import SpecialAssistance from '@/pages/support/SpecialAssistance';
import LostAndFound from '@/pages/support/LostAndFound';

export const router = createBrowserRouter([
  // Landing page
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    path: "/flight-search",
    element: <DestinationsPage />,
  },
  {
    path: "/search-results",
    element: <SearchResults />,
  },

  // Experience pages
  {
    path: "/experience/business-travel",
    element: <BusinessTravel />,
  },
  {
    path: "/experience/loyalty-program",
    element: <LoyaltyProgram />,
  },
  {
    path: "/experience/activities",
    element: <Activities />,
  },
  {
    path: "/hotels",
    element: <Hotels />,
  },
  {
    path: "/car-rentals",
    element: <CarRentalPage />,
  },
  {
    path: "/travel-insurance",
    element: <TravelInsurancePage />,
  },

  // Travel pages
  {
    path: "/travel/flight-status",
    element: <FlightStatus />,
  },
  {
    path: "/travel/manage-booking",
    element: <ManageBooking />,
  },
  {
    path: "/travel/check-in",
    element: <CheckIn />,
  },
  {
    path: "/travel/baggage-info",
    element: <BaggageInfo />,
  },
  {
    path: "/travel/travel-requirements",
    element: <TravelRequirements />,
  },
  
  // Destination pages
  {
    path: "/destinations/london",
    element: <LondonDestination />,
  },
  {
    path: "/flight-search-destinations",
    element: <FlightSearch />,
  },
  
  // Company pages
  {
    path: "/about-us",
    element: <AboutUs />,
  },
  {
    path: "/careers",
    element: <Careers />,
  },
  {
    path: "/press",
    element: <Press />,
  },
  {
    path: "/investor-relations",
    element: <InvestorRelations />,
  },
  {
    path: "/sustainability",
    element: <Sustainability />,
  },
  
  // Legal pages
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
  {
    path: "/cookies-policy",
    element: <CookiesPolicy />,
  },
  {
    path: "/accessibility",
    element: <Accessibility />,
  },
  
  // Support pages
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  },
  {
    path: "/help-center",
    element: <HelpCenter />,
  },
  {
    path: "/special-assistance",
    element: <SpecialAssistance />,
  },
  {
    path: "/lost-and-found",
    element: <LostAndFound />,
  },
  
  // Catch all other routes and redirect to home
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
