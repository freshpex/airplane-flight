import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageSquare, Check, ArrowRight, ThumbsUp } from "lucide-react";

const Feedback = () => {
  return (
    <PageLayout
      title="Share Your Feedback"
      subtitle="We value your opinions to help us improve our services"
    >
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Introduction section */}
          <section className="text-gray-700">
            <p className="mb-4">
              At SkyWays Airlines, we are committed to providing exceptional
              service to all our passengers. Your feedback is invaluable in
              helping us understand what we're doing well and where we can
              improve.
            </p>
            <p>
              Whether you had an outstanding experience or encountered issues
              during your journey, we want to hear about it. Your insights drive
              our continuous improvement efforts.
            </p>
          </section>

          {/* Why Share Feedback section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Why Share Your Feedback?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Shape Our Services</h3>
                </div>
                <p className="text-gray-600">
                  Your input directly influences how we design and deliver our
                  services, helping us meet and exceed passenger expectations.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    Recognize Excellence
                  </h3>
                </div>
                <p className="text-gray-600">
                  Positive feedback allows us to recognize and reward staff
                  members who have provided exceptional service during your
                  journey.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">Address Concerns</h3>
                </div>
                <p className="text-gray-600">
                  By reporting issues or concerns, you help us identify areas
                  for improvement and take corrective actions promptly.
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-md mr-3">
                    <Check className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    Develop New Features
                  </h3>
                </div>
                <p className="text-gray-600">
                  Customer suggestions often lead to innovative features and
                  services that enhance the overall travel experience for all
                  passengers.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Feedback Form section */}
          <section className="bg-white p-8 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Feedback Form
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="text-sm font-medium text-gray-700"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="Enter your first name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="text-sm font-medium text-gray-700"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="bookingReference"
                  className="text-sm font-medium text-gray-700"
                >
                  Booking Reference (if applicable)
                </label>
                <input
                  type="text"
                  id="bookingReference"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Enter your booking reference"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="feedbackType"
                  className="text-sm font-medium text-gray-700"
                >
                  Feedback Type*
                </label>
                <select
                  id="feedbackType"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select feedback type</option>
                  <option value="compliment">Compliment</option>
                  <option value="suggestion">Suggestion</option>
                  <option value="complaint">Complaint</option>
                  <option value="question">Question</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="serviceArea"
                  className="text-sm font-medium text-gray-700"
                >
                  Service Area*
                </label>
                <select
                  id="serviceArea"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Select service area</option>
                  <option value="booking">Booking Experience</option>
                  <option value="checkin">Check-in & Boarding</option>
                  <option value="inflight">In-flight Service</option>
                  <option value="baggage">Baggage Handling</option>
                  <option value="lounge">Airport Lounge</option>
                  <option value="customer">Customer Support</option>
                  <option value="website">Website/Mobile App</option>
                  <option value="loyalty">Loyalty Program</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="feedback"
                  className="text-sm font-medium text-gray-700"
                >
                  Your Feedback*
                </label>
                <textarea
                  id="feedback"
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Please share your experience, suggestions, or concerns in detail..."
                  required
                ></textarea>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Overall Rating*
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <label key={rating} className="cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          className="sr-only"
                        />
                        <div className="h-8 w-8 flex items-center justify-center border border-gray-300 rounded hover:bg-purple-50">
                          {rating}
                        </div>
                      </label>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    1 = Poor, 5 = Excellent
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="attachFile"
                  className="text-sm font-medium text-gray-700"
                >
                  Attach File (optional)
                </label>
                <input
                  type="file"
                  id="attachFile"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
                <p className="text-xs text-gray-500">
                  Maximum file size: 5MB. Supported formats: JPG, PNG, PDF
                </p>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="contact"
                  className="mt-1 h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="contact" className="text-sm text-gray-600">
                  I would like to be contacted regarding my feedback
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  className="mt-1 h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
                  required
                />
                <label
                  htmlFor="privacyPolicy"
                  className="text-sm text-gray-600"
                >
                  I agree to the processing of my personal data in accordance
                  with the{" "}
                  <a href="#" className="text-purple-800 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button variant="qatar" className="w-full group py-6 text-base">
                Submit Feedback{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </section>

          {/* Alternative Feedback Channels section */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Alternative Feedback Channels
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-md mr-3">
                    <MessageSquare className="h-5 w-5 text-purple-800" />
                  </div>
                  <h3 className="font-semibold">Customer Support</h3>
                </div>
                <p className="mb-2 text-gray-600">
                  Contact our dedicated customer support team:
                </p>
                <p className="text-gray-800">feedback@skyWays.com</p>
                <p className="text-gray-800">+1 (555) 123-4567</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-md mr-3">
                    <ThumbsUp className="h-5 w-5 text-purple-800" />
                  </div>
                  <h3 className="font-semibold">Social Media</h3>
                </div>
                <p className="mb-2 text-gray-600">
                  Connect with us on social media:
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-purple-800 hover:underline">
                    Facebook
                  </a>
                  <a href="#" className="text-purple-800 hover:underline">
                    Twitter
                  </a>
                  <a href="#" className="text-purple-800 hover:underline">
                    Instagram
                  </a>
                  <a href="#" className="text-purple-800 hover:underline">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* What Happens Next section */}
          <section className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              What Happens Next?
            </h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li className="text-gray-700">
                <span className="font-medium">Confirmation</span> - You'll
                receive an acknowledgment email with a reference number.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Review</span> - Our customer
                experience team will carefully review your feedback.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Action</span> - For issues
                requiring resolution, we'll take appropriate actions and follow
                up with you if requested.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Implementation</span> - Valuable
                suggestions are evaluated for potential implementation to
                enhance our services.
              </li>
            </ol>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500">
              Thank you for taking the time to share your feedback with us. Your
              input helps us provide better service to all our passengers.
            </p>
          </section>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Feedback;
