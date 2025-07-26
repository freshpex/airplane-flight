import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Check,
  ArrowRight,
  HeartPulse,
  Map,
} from "lucide-react";
import { WheelchairIcon } from "@/assets/icon/wheelchair";

const SpecialAssistance = () => {
  return (
    <PageLayout
      title="Special Assistance"
      subtitle="Dedicated support for passengers requiring additional assistance"
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
              At SkyWays Airlines, we are committed to making air travel
              accessible and comfortable for all passengers, including those who
              require special assistance. Our dedicated team is here to ensure
              that your journey is as smooth and enjoyable as possible.
            </p>
            <p>
              Whether you have mobility limitations, medical conditions, or
              other special requirements, we offer a range of services to meet
              your needs. Please let us know your requirements at least 48 hours
              before your flight so we can make the necessary arrangements.
            </p>
          </section>

          {/* Services Overview */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Our Special Assistance Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <WheelchairIcon className="h-6 w-6 text-purple-800" />,
                  title: "Mobility Assistance",
                  description:
                    "Support for passengers with reduced mobility, including wheelchair services, boarding assistance, and help navigating the airport.",
                },
                {
                  icon: <HeartPulse className="h-6 w-6 text-purple-800" />,
                  title: "Medical Support",
                  description:
                    "Accommodations for passengers with medical conditions, including oxygen arrangements, special meal requirements, and medication storage.",
                },
                {
                  icon: <Map className="h-6 w-6 text-purple-800" />,
                  title: "Sensory & Cognitive Support",
                  description:
                    "Assistance for passengers with visual or hearing impairments, autism spectrum disorders, and other invisible disabilities.",
                },
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Request Assistance Form */}
          <section className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Request Special Assistance
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Phone Number*
                  </label>
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
                <label
                  htmlFor="bookingRef"
                  className="text-sm font-medium text-gray-700"
                >
                  Booking Reference*
                </label>
                <input
                  type="text"
                  id="bookingRef"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Enter your booking reference"
                  required
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Type of Assistance Required*
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="wheelchairAirport"
                      className="mt-1 h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label
                      htmlFor="wheelchairAirport"
                      className="text-sm text-gray-700"
                    >
                      Wheelchair assistance at the airport
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="wheelchairAircraft"
                      className="mt-1 h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label
                      htmlFor="wheelchairAircraft"
                      className="text-sm text-gray-700"
                    >
                      Wheelchair assistance to aircraft seat
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="oxygenSupply"
                      className="mt-1 h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label
                      htmlFor="oxygenSupply"
                      className="text-sm text-gray-700"
                    >
                      Medical oxygen supply
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="serviceAnimal"
                      className="mt-1 h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label
                      htmlFor="serviceAnimal"
                      className="text-sm text-gray-700"
                    >
                      Service animal accommodation
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="hearingAssistance"
                      className="mt-1 h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label
                      htmlFor="hearingAssistance"
                      className="text-sm text-gray-700"
                    >
                      Hearing impairment assistance
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="visualAssistance"
                      className="mt-1 h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label
                      htmlFor="visualAssistance"
                      className="text-sm text-gray-700"
                    >
                      Visual impairment assistance
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="specialMeals"
                      className="mt-1 h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label
                      htmlFor="specialMeals"
                      className="text-sm text-gray-700"
                    >
                      Special dietary requirements
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="other"
                      className="mt-1 h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="other" className="text-sm text-gray-700">
                      Other assistance
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="medicalEquipment"
                  className="text-sm font-medium text-gray-700"
                >
                  Medical Equipment Details (if applicable)
                </label>
                <textarea
                  id="medicalEquipment"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Please provide details of any medical equipment you need to bring onboard (type, dimensions, battery specifications if applicable)"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="additionalInfo"
                  className="text-sm font-medium text-gray-700"
                >
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  placeholder="Please provide any additional details about your assistance requirements that will help us better serve you"
                ></textarea>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="medicalFormConsent"
                  className="mt-1 h-4 w-4 text-purple-800 border-gray-300 rounded focus:ring-purple-500"
                />
                <label
                  htmlFor="medicalFormConsent"
                  className="text-sm text-gray-600"
                >
                  I understand that for certain medical conditions, a MEDIF
                  (Medical Information Form) may be required and will be sent to
                  me if necessary
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
                  I agree to the processing of my personal data, including
                  health information, in accordance with the{" "}
                  <a href="#" className="text-purple-800 hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              <Button variant="qatar" className="w-full group py-6 text-base">
                Submit Request{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </section>

          {/* Detailed Services Sections */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Special Assistance Services in Detail
            </h2>

            <div className="space-y-8">
              {/* Mobility Assistance */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <WheelchairIcon className="h-6 w-6 text-purple-800" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Mobility Assistance
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700">
                    We offer comprehensive mobility support throughout your
                    journey, from arrival at the airport to reaching your
                    destination.
                  </p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Our services include:
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>
                        Wheelchair assistance between check-in, gate, and
                        aircraft
                      </li>
                      <li>Assistance boarding and deplaning the aircraft</li>
                      <li>
                        Aisle wheelchairs available on all wide-body aircraft
                      </li>
                      <li>Accessible seating with movable armrests</li>
                      <li>Assistance with baggage handling</li>
                      <li>
                        Transportation between gates for connecting flights
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Types of wheelchair assistance:
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>
                        <span className="font-medium">WCHR</span> - For
                        passengers who need assistance navigating through the
                        terminal but can climb stairs and walk to their seat
                      </li>
                      <li>
                        <span className="font-medium">WCHS</span> - For
                        passengers who cannot climb stairs but can walk to their
                        seat
                      </li>
                      <li>
                        <span className="font-medium">WCHC</span> - For
                        passengers who are completely immobile and need
                        assistance to their seat
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Medical Support */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <HeartPulse className="h-6 w-6 text-purple-800" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Medical Support
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700">
                    We understand that passengers with medical conditions may
                    have specific requirements during air travel. Our team works
                    closely with medical professionals to ensure your comfort
                    and safety.
                  </p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Services available:
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>
                        Medical oxygen supply (requires advance notice and
                        documentation)
                      </li>
                      <li>Storage for medical devices in the cabin</li>
                      <li>
                        Special meal options for various dietary restrictions
                      </li>
                      <li>Accommodation for passengers with allergies</li>
                      <li>
                        Extra space for passengers with specific medical needs
                        (subject to availability)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-gray-700">
                      <span className="font-medium">Important note:</span> For
                      certain medical conditions, we may require a Medical
                      Information Form (MEDIF) completed by your physician to
                      ensure we can meet your needs and that you're fit to
                      travel. This includes:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 mt-2">
                      <li>Recent surgery (within 10 days of travel)</li>
                      <li>Unstable medical conditions</li>
                      <li>Need for medical oxygen during flight</li>
                      <li>Contagious diseases</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Support for Passengers with Invisible Disabilities */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Map className="h-6 w-6 text-purple-800" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Support for Sensory & Cognitive Needs
                  </h3>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700">
                    We are committed to making air travel accessible for
                    passengers with sensory and cognitive disabilities,
                    providing support that respects dignity and promotes
                    independence.
                  </p>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      For passengers with visual impairments:
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Assistance navigating through the airport</li>
                      <li>Priority boarding and deplaning</li>
                      <li>Safety briefings in appropriate formats</li>
                      <li>
                        Accommodation for guide dogs (subject to destination
                        country regulations)
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      For passengers with hearing impairments:
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Visual safety briefings</li>
                      <li>Written communication when needed</li>
                      <li>Priority boarding notification</li>
                      <li>
                        Special assistance with announcements during the journey
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      For passengers on the autism spectrum or with cognitive
                      disabilities:
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      <li>Quiet spaces in select airport lounges</li>
                      <li>
                        Pre-flight airport familiarization (at select locations)
                      </li>
                      <li>
                        Priority boarding and special seating arrangements when
                        possible
                      </li>
                      <li>Consistency in service delivery and communication</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-purple-50 p-6 rounded-xl border border-purple-100">
            <div className="flex items-center mb-6">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <MessageSquare className="h-6 w-6 text-purple-800" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                Contact Our Special Assistance Team
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700">
                Our dedicated Special Assistance team is available to answer
                your questions and help arrange the support services you need
                for your journey.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-700 mb-2">
                    special.assistance@skyWays.com
                  </p>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-700">
                    +1 (555) 234-5678 (24/7 service)
                  </p>
                </div>

                <div>
                  <p className="font-medium text-gray-900">Response Time</p>
                  <p className="text-gray-700 mb-2">
                    We aim to respond to all inquiries within 24 hours
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Please note:</span> Special
                    assistance should be requested at least 48 hours before your
                    flight to ensure proper arrangements
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips for Travelers */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Travel Tips for Passengers Requiring Special Assistance
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  tip: "Book assistance at least 48 hours in advance to ensure availability",
                  icon: <Check className="h-5 w-5 text-green-600" />,
                },
                {
                  tip: "Arrive at the airport at least 3 hours before international flights",
                  icon: <Check className="h-5 w-5 text-green-600" />,
                },
                {
                  tip: "Keep medications in your carry-on luggage, not checked baggage",
                  icon: <Check className="h-5 w-5 text-green-600" />,
                },
                {
                  tip: "Carry documentation for medical devices and medications",
                  icon: <Check className="h-5 w-5 text-green-600" />,
                },
                {
                  tip: "Consider selecting aisle seats for easier access during the flight",
                  icon: <Check className="h-5 w-5 text-green-600" />,
                },
                {
                  tip: "Inform staff of any changes to your assistance needs",
                  icon: <Check className="h-5 w-5 text-green-600" />,
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-green-100 p-1 rounded-md mr-3 mt-0.5">
                    {item.icon}
                  </div>
                  <p className="text-gray-700">{item.tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Ready to Travel with Confidence?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our Special Assistance team is ready to help make your journey
              comfortable and stress-free.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="qatar" className="group">
                Request Assistance{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="border-purple-800 text-purple-800 hover:bg-purple-50"
              >
                Contact Special Assistance Team
              </Button>
            </div>
          </section>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default SpecialAssistance;
