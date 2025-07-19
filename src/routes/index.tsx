import { createBrowserRouter, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";

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
