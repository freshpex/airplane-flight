import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, Phone, MessageSquare, Video, ChevronRight } from 'lucide-react';

const HelpCenter = () => {
  return (
    <PageLayout 
      title="Help Center" 
      subtitle="Find answers to your questions and get the support you need"
    >
      <div className="max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {/* Search section */}
          <section className="bg-gradient-to-br from-purple-800 to-purple-900 rounded-2xl p-8 lg:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">How can we help you?</h2>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search for answers..." 
                  className="w-full bg-white text-gray-800 px-5 py-4 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" 
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Button variant="qatar" className="absolute right-2 top-1/2 transform -translate-y-1/2 group">
                  Search <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </section>

          {/* Popular topics */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Booking & Reservations",
                  topics: [
                    "How to book a flight",
                    "Changing or cancelling a reservation",
                    "Managing group bookings",
                    "Understanding fare types",
                    "Using flight credits"
                  ]
                },
                {
                  title: "Check-in & Baggage",
                  topics: [
                    "Online check-in process",
                    "Baggage allowance and fees",
                    "Excess and special baggage",
                    "Lost or delayed baggage",
                    "Airport check-in times"
                  ]
                },
                {
                  title: "Travel Information",
                  topics: [
                    "Visa and passport requirements",
                    "Travel insurance options",
                    "COVID-19 travel updates",
                    "Unaccompanied minors policy",
                    "Special assistance services"
                  ]
                }
              ].map((category, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{category.title}</h3>
                    <ul className="space-y-3">
                      {category.topics.map((topic, idx) => (
                        <li key={idx}>
                          <a href="#" className="flex items-center text-gray-700 hover:text-purple-800 group">
                            <ChevronRight className="h-4 w-4 mr-2 text-purple-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                            {topic}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <a href="#" className="text-purple-800 font-medium hover:underline flex items-center">
                        View all topics <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact options */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Our Support Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6 text-purple-800" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">
                  Speak directly with our customer service team available 24/7.
                </p>
                <p className="font-medium text-gray-900 mb-1">General Inquiries</p>
                <p className="text-gray-700 mb-3">+1 (555) 123-4567</p>
                <p className="font-medium text-gray-900 mb-1">Premium Members</p>
                <p className="text-gray-700">+1 (555) 987-6543</p>
              </motion.div>

              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-purple-800" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">
                  Chat with our representatives for immediate assistance.
                </p>
                <p className="text-gray-700 mb-6">
                  Available daily from 6:00 AM to 12:00 AM (GMT).
                </p>
                <Button variant="qatar" className="w-full group">
                  Start Chat <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>

              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-purple-800" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Video Support</h3>
                <p className="text-gray-600 mb-4">
                  Schedule a video call with our support specialists.
                </p>
                <p className="text-gray-700 mb-6">
                  Available for premium members and complex inquiries.
                </p>
                <Button variant="outline" className="w-full border-purple-800 text-purple-800 hover:bg-purple-50">
                  Schedule Call
                </Button>
              </motion.div>
            </div>
          </section>

          {/* FAQs section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
              <a href="#" className="text-purple-800 font-medium hover:underline hidden md:flex items-center">
                View all FAQs <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  question: "How can I change or cancel my flight reservation?",
                  answer: "You can change or cancel your flight through our website by logging into your account and navigating to 'My Bookings.' Select the booking you wish to modify and follow the prompts for changes or cancellation. Please note that fare conditions, including any change or cancellation fees, apply based on your ticket type."
                },
                {
                  question: "What is the baggage allowance for my flight?",
                  answer: "Baggage allowance varies based on your travel class, destination, and loyalty status. Economy class typically allows 30kg (66lbs) for checked baggage, Business class 40kg (88lbs), and First class 50kg (110lbs). Cabin baggage is limited to 7kg (15lbs) per passenger. For specific details, please check your booking confirmation or visit our baggage policy page."
                },
                {
                  question: "How early should I arrive at the airport before my flight?",
                  answer: "We recommend arriving at the airport 3 hours before international flights and 2 hours before domestic flights. This allows sufficient time for check-in, security screening, and boarding procedures. During peak travel seasons, additional time may be required."
                },
                {
                  question: "Can I select my seat in advance?",
                  answer: "Yes, you can select your preferred seat when booking your flight or later through the 'Manage Booking' section on our website or mobile app. Some seat selections may incur additional fees depending on your fare type and loyalty program status."
                },
                {
                  question: "What special assistance services do you offer for passengers with disabilities?",
                  answer: "We offer a range of special assistance services for passengers with disabilities or reduced mobility, including wheelchair assistance, assistance with boarding and deplaning, accessible seating, and accommodations for service animals. Please contact our Special Assistance team at least 48 hours before your flight to arrange these services."
                }
              ].map((faq, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-lg shadow-sm border border-gray-100 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6 md:hidden">
              <a href="#" className="text-purple-800 font-medium hover:underline flex items-center">
                View all FAQs <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </section>

          {/* Self-service tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Self-Service Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Check Flight Status",
                  description: "Get real-time updates on arrivals and departures"
                },
                {
                  title: "Manage Booking",
                  description: "Change or cancel your reservation online"
                },
                {
                  title: "Online Check-in",
                  description: "Check in for your flight from 24h before departure"
                },
                {
                  title: "Baggage Tracker",
                  description: "Track the status of your checked baggage"
                }
              ].map((tool, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 p-6 rounded-xl text-center"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{tool.title}</h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <Button variant="outline" className="w-full border-purple-800 text-purple-800 hover:bg-purple-50">
                    Go to Tool
                  </Button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="bg-gray-50 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              If you couldn't find the answer to your question, our customer support team is available 24/7 to assist you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="qatar" className="group">
                Contact Us <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-50">
                Submit Feedback
              </Button>
            </div>
          </section>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default HelpCenter;
