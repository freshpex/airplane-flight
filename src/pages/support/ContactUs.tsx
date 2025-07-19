import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare, Phone, ArrowRight, HelpCircle } from 'lucide-react';

const ContactUs = () => {
  return (
    <PageLayout 
      title="Contact Us" 
      subtitle="Get in touch with our team for support and inquiries"
    >
      <div className="max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Contact Cards Section */}
          <div className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-purple-100 p-3 inline-block rounded-lg mb-4">
                <Phone className="h-6 w-6 text-purple-800" />
              </div>
              <h3 className="text-lg font-bold mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Our customer service team is available 24/7 to assist you.
              </p>
              <p className="font-semibold">Reservations & General Inquiries</p>
              <p className="mb-2">+1 (555) 123-4567</p>
              <p className="font-semibold">Premium Member Support</p>
              <p>+1 (555) 987-6543</p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-purple-100 p-3 inline-block rounded-lg mb-4">
                <MessageSquare className="h-6 w-6 text-purple-800" />
              </div>
              <h3 className="text-lg font-bold mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">
                Send us an email and we'll respond within 24 hours.
              </p>
              <p className="font-semibold">Customer Support</p>
              <p className="mb-2">support@skywings.com</p>
              <p className="font-semibold">Corporate Inquiries</p>
              <p>corporate@skywings.com</p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="bg-purple-100 p-3 inline-block rounded-lg mb-4">
                <HelpCircle className="h-6 w-6 text-purple-800" />
              </div>
              <h3 className="text-lg font-bold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">
                Chat with our support team for immediate assistance.
              </p>
              <Button variant="qatar" className="w-full group">
                Start Chat <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Contact Form Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                  <select 
                    id="subject" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="">Select a subject</option>
                    <option value="booking">Flight Booking Inquiry</option>
                    <option value="change">Change or Cancel Reservation</option>
                    <option value="baggage">Baggage Inquiry</option>
                    <option value="loyalty">Loyalty Program</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
                
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="mt-1 h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the processing of my personal data in accordance with the <a href="#" className="text-purple-800 hover:underline">Privacy Policy</a>
                  </label>
                </div>
                
                <Button variant="qatar" className="w-full group py-6 text-base">
                  Submit Message <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
          
          {/* Location and FAQs Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Office Locations</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Headquarters</p>
                  <p className="text-gray-600">123 Skyway Avenue</p>
                  <p className="text-gray-600">New York, NY 10001</p>
                  <p className="text-gray-600">United States</p>
                </div>
                <div>
                  <p className="font-semibold">European Office</p>
                  <p className="text-gray-600">45 Cloud Street</p>
                  <p className="text-gray-600">London, EC2A 4NE</p>
                  <p className="text-gray-600">United Kingdom</p>
                </div>
                <div>
                  <p className="font-semibold">Asia Pacific Office</p>
                  <p className="text-gray-600">78 Sky Tower Road</p>
                  <p className="text-gray-600">Singapore, 018956</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Frequently Asked Questions</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-purple-800 hover:underline block">How do I change my flight?</a>
                </li>
                <li>
                  <a href="#" className="text-purple-800 hover:underline block">What is the baggage allowance?</a>
                </li>
                <li>
                  <a href="#" className="text-purple-800 hover:underline block">Can I select my seat in advance?</a>
                </li>
                <li>
                  <a href="#" className="text-purple-800 hover:underline block">How do I join the loyalty program?</a>
                </li>
                <li>
                  <a href="#" className="text-purple-800 hover:underline block">What are the check-in procedures?</a>
                </li>
              </ul>
              <div className="mt-4">
                <a href="#" className="inline-flex items-center text-purple-800 font-medium hover:underline">
                  View all FAQs <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Business and Media Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 bg-gray-50 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Business and Media Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Corporate Partnerships</h3>
              <p className="text-gray-600 mb-1">partnerships@skywings.com</p>
              <p className="text-gray-600">+1 (555) 234-5678</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Media Relations</h3>
              <p className="text-gray-600 mb-1">press@skywings.com</p>
              <p className="text-gray-600">+1 (555) 345-6789</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Investor Relations</h3>
              <p className="text-gray-600 mb-1">investors@skywings.com</p>
              <p className="text-gray-600">+1 (555) 456-7890</p>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default ContactUs;
