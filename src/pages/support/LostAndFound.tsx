import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Search, Phone, FileText, ArrowRight, Map, Luggage, Clock } from 'lucide-react';

const LostAndFound = () => {
  return (
    <PageLayout 
      title="Lost & Found" 
      subtitle="Recover your lost items with our dedicated service"
    >
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          {/* Introduction */}
          <section className="text-gray-700">
            <p className="mb-4">
              We understand that losing an item during your journey can be stressful. Our Lost and Found service 
              is designed to help reunite you with your belongings as quickly and efficiently as possible.
            </p>
            <p>
              Whether you've left something on one of our aircraft, in an airport lounge, or at any point during 
              your journey with us, our dedicated team is here to help.
            </p>
          </section>
          
          {/* Item Search */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Search for a Lost Item</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="itemReference" className="text-sm font-medium text-gray-700">Lost Item Reference Number</label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="itemReference" 
                    placeholder="Enter your reference number" 
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500">If you've already reported an item, enter the reference number provided.</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="qatar" className="group">
                  Search Status <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-50">
                  Report a New Item
                </Button>
              </div>
            </div>
          </section>
          
          {/* Report Lost Item Process */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">How to Report a Lost Item</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FileText className="h-6 w-6 text-purple-800" />,
                  title: "Step 1: Submit a Report",
                  description: "Complete our online form with detailed information about your lost item including description, date, and flight details."
                },
                {
                  icon: <Clock className="h-6 w-6 text-purple-800" />,
                  title: "Step 2: Wait for Confirmation",
                  description: "You'll receive a reference number and confirmation email once your report is processed, usually within 24 hours."
                },
                {
                  icon: <Luggage className="h-6 w-6 text-purple-800" />,
                  title: "Step 3: Item Recovery",
                  description: "If your item is found, we'll contact you to arrange return delivery. You can also check status with your reference number."
                }
              ].map((step, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
          
          {/* Report Form */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Lost Item Report Form</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name*</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name*</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address*</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                    placeholder="Enter your email address"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number*</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="bookingRef" className="text-sm font-medium text-gray-700">Booking Reference</label>
                <input 
                  type="text" 
                  id="bookingRef" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                  placeholder="Enter your booking reference"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="flightNumber" className="text-sm font-medium text-gray-700">Flight Number*</label>
                  <input 
                    type="text" 
                    id="flightNumber" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                    placeholder="e.g., QR123"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="flightDate" className="text-sm font-medium text-gray-700">Flight Date*</label>
                  <input 
                    type="date" 
                    id="flightDate" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="origin" className="text-sm font-medium text-gray-700">Origin*</label>
                  <input 
                    type="text" 
                    id="origin" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                    placeholder="Departure airport"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="destination" className="text-sm font-medium text-gray-700">Destination*</label>
                  <input 
                    type="text" 
                    id="destination" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                    placeholder="Arrival airport"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="itemLocation" className="text-sm font-medium text-gray-700">Where Item Was Lost*</label>
                <select 
                  id="itemLocation" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select a location</option>
                  <option value="aircraft">On Aircraft</option>
                  <option value="lounge">Airport Lounge</option>
                  <option value="terminal">Terminal Building</option>
                  <option value="transfer">During Transfer</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="itemCategory" className="text-sm font-medium text-gray-700">Item Category*</label>
                <select 
                  id="itemCategory" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics (Phone, Laptop, etc.)</option>
                  <option value="documents">Documents (Passport, ID, etc.)</option>
                  <option value="accessories">Accessories (Jewelry, Watch, etc.)</option>
                  <option value="clothing">Clothing</option>
                  <option value="luggage">Luggage</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="itemDescription" className="text-sm font-medium text-gray-700">Item Description*</label>
                <textarea 
                  id="itemDescription" 
                  rows={4} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                  placeholder="Please provide a detailed description of your lost item (brand, color, size, distinctive features, etc.)"
                  required
                ></textarea>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="attachPhoto" className="text-sm font-medium text-gray-700">Attach Photo (optional)</label>
                <input 
                  type="file" 
                  id="attachPhoto" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                />
                <p className="text-xs text-gray-500">Maximum file size: 5MB. Supported formats: JPG, PNG</p>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="additionalInfo" className="text-sm font-medium text-gray-700">Additional Information</label>
                <textarea 
                  id="additionalInfo" 
                  rows={2} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none" 
                  placeholder="Any other details that might help us locate your item"
                ></textarea>
              </div>
              
              <div className="flex items-start space-x-3">
                <input 
                  type="checkbox" 
                  id="privacyPolicy" 
                  className="mt-1 h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
                  required 
                />
                <label htmlFor="privacyPolicy" className="text-sm text-gray-600">
                  I agree to the processing of my personal data in accordance with the <a href="#" className="text-purple-800 hover:underline">Privacy Policy</a>
                </label>
              </div>
              
              <Button variant="qatar" className="w-full group py-6 text-base">
                Submit Report <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </section>
          
          {/* Contact Information */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-md mr-3">
                  <Phone className="h-5 w-5 text-purple-800" />
                </div>
                <h3 className="font-semibold text-gray-900">Contact Lost & Found</h3>
              </div>
              <p className="mb-3 text-gray-600">
                If you need immediate assistance or have questions about the lost item reporting process:
              </p>
              <p className="font-medium">lost.found@skywings.com</p>
              <p className="mb-3">+1 (555) 456-7890</p>
              <p className="text-sm text-gray-500">
                Available 24/7. Please have your booking details ready when you call.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 p-2 rounded-md mr-3">
                  <Map className="h-5 w-5 text-purple-800" />
                </div>
                <h3 className="font-semibold text-gray-900">Airport Lost & Found Offices</h3>
              </div>
              <p className="mb-3 text-gray-600">
                We maintain Lost & Found offices at major airports:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>New York (JFK) - Terminal 4, Ground Floor</li>
                <li>London (LHR) - Terminal 5, Arrivals Level</li>
                <li>Dubai (DXB) - Terminal 3, Concourse B</li>
                <li>Singapore (SIN) - Terminal 1, Level 2</li>
              </ul>
            </div>
          </section>
          
          {/* FAQ */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                {
                  question: "How long do you keep lost items?",
                  answer: "We keep most lost items for 30 days from the date they are found. High-value items may be kept for up to 90 days. After this period, unclaimed items may be donated to charity or disposed of according to local regulations."
                },
                {
                  question: "How will my item be returned to me?",
                  answer: "If your item is found, we'll contact you to discuss return options. For local returns, you can collect the item from our airport office. For international returns, we can arrange courier delivery at your expense, or you can nominate someone to collect it on your behalf."
                },
                {
                  question: "Are there any fees for the Lost & Found service?",
                  answer: "Filing a lost item report is free. However, if your item is found and needs to be shipped to you, shipping and handling fees will apply based on the item's size, weight, and destination."
                },
                {
                  question: "What should I do if I lost an item at the airport but not on the aircraft?",
                  answer: "Each airport has its own Lost & Found department. While we can assist with items lost on our aircraft or in our lounges, for items lost elsewhere in the airport, you should also contact the airport's Lost & Found office directly."
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
          </section>
          
          {/* Tips Section */}
          <section className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Tips to Prevent Lost Items</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li className="text-gray-700">
                Always check your seat area, seat pocket, and overhead compartment before leaving the aircraft
              </li>
              <li className="text-gray-700">
                Keep valuable items (passports, electronics, wallets) in your personal item rather than in seat pockets
              </li>
              <li className="text-gray-700">
                Add contact information to your belongings when possible (luggage tags, business cards in laptop cases)
              </li>
              <li className="text-gray-700">
                Use digital tracking devices for valuable items
              </li>
              <li className="text-gray-700">
                Take photos of your valuable items before travel for identification purposes
              </li>
            </ul>
          </section>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default LostAndFound;
