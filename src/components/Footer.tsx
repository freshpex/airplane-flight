import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight
} from 'lucide-react';
import Logo from '@/assets/logo';

const Footer = () => {
  const footerSections = [
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about-us' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Investor Relations', href: '/investor-relations' },
        { label: 'Sustainability', href: '/sustainability' },
      ]
    },
    {
      title: 'Travel',
      links: [
        { label: 'Flight Status', href: '/travel/flight-status' },
        { label: 'Manage Booking', href: '/travel/manage-booking' },
        { label: 'Check-in', href: '/travel/check-in' },
        { label: 'Baggage Info', href: '/travel/baggage-info' },
        { label: 'Travel Requirements', href: '/travel/travel-requirements' },
      ]
    },
    {
      title: 'Experience',
      links: [
        { label: 'Destinations', href: '/flight-search' },
        { label: 'SkyWings Hotels', href: '/hotels' },
        { label: 'Car Rental', href: '/car-rentals' },
        { label: 'Travel Insurance', href: '/travel-insurance' },
        { label: 'Business Travel', href: '/experience/business-travel' },
        { label: 'Loyalty Program', href: '/experience/loyalty-program' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help-center' },
        { label: 'Contact Us', href: '/contact-us' },
        { label: 'Feedback', href: '/feedback' },
        { label: 'Special Assistance', href: '/special-assistance' },
        { label: 'Lost & Found', href: '/lost-and-found' },
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      subtitle: '24/7 Customer Support'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@skywings.com',
      subtitle: 'We reply within 24 hours'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Aviation Blvd, Sky City',
      subtitle: 'Main Headquarters'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Stay Updated with{' '}
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Special Offers
              </span>
            </h3>
            <p className="text-gray-400 mb-8 text-lg">
              Subscribe to our newsletter and be the first to know about exclusive deals, new destinations, and travel tips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:border-purple-500"
              />
              <Button variant="qatar" className="group">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <motion.div
                  key={contact.title}
                  className="text-center md:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <div className="bg-purple-600 p-3 rounded-lg mr-4">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{contact.title}</h4>
                      <p className="text-gray-400 text-sm">{contact.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-white font-medium">{contact.details}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
             <Logo />
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Experience world-class service and luxury travel with SkyWings. 
              We connect you to over 160 destinations worldwide with unmatched comfort and reliability.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="bg-gray-800 p-2 rounded-lg hover:bg-purple-600 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: sectionIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 SkyWings Airlines. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="/cookies-policy" className="text-gray-400 hover:text-white transition-colors">
                Cookies Policy
              </a>
              <a href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
