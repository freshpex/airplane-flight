import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Headphones, ArrowRight } from 'lucide-react';

const Accessibility = () => {
  return (
    <PageLayout 
      title="Accessibility" 
      subtitle="Our commitment to making travel accessible for everyone"
    >
      <div className="max-w-4xl">
        <motion.div
          className="space-y-8 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="mb-4">
              At SkyWays Airlines, we believe that air travel should be accessible to everyone. We are committed to providing 
              an inclusive and supportive travel experience for all our passengers, including those with disabilities or 
              mobility challenges.
            </p>
            <p>
              We continuously work to improve our services, facilities, and website to ensure they are accessible and 
              meet the diverse needs of our passengers. This accessibility statement outlines our approach and the 
              resources available to help you plan and enjoy your journey with us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Website Accessibility</h2>
            <p className="mb-4">
              We strive to ensure that our website follows the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. 
              Our website is designed to be:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Perceivable - Information and user interface components must be presentable to users in ways they can perceive</li>
              <li>Operable - User interface components and navigation must be operable</li>
              <li>Understandable - Information and the operation of the user interface must be understandable</li>
              <li>Robust - Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies</li>
            </ul>
            <p className="mb-4">
              Some of the specific features we've implemented include:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Keyboard navigation for all interactive elements</li>
              <li>Alt text for images</li>
              <li>Proper heading structure for screen readers</li>
              <li>Sufficient color contrast for text visibility</li>
              <li>Resizable text without loss of functionality</li>
              <li>Accessible forms with clear labels and error messages</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Accessible Travel Services</h2>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Before Your Flight</h3>
            <p className="mb-4">
              We recommend contacting our Special Assistance team at least 48 hours before your flight to arrange any necessary 
              support services. Our team can help with:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Wheelchair assistance at the airport</li>
              <li>Boarding and deplaning assistance</li>
              <li>Accessible seating arrangements</li>
              <li>Accommodation for service animals</li>
              <li>Special meal requirements</li>
              <li>Medical equipment handling</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">At the Airport</h3>
            <p className="mb-4">
              We work closely with airports to ensure accessibility throughout your journey:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Designated check-in counters for passengers requiring special assistance</li>
              <li>Priority boarding for passengers with disabilities</li>
              <li>Accessible routes through security and immigration</li>
              <li>Assistance in navigating the terminal</li>
              <li>Accessible restrooms and facilities</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">On Board</h3>
            <p className="mb-4">
              Our aircraft are equipped with features to enhance accessibility:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Accessible lavatories on most wide-body aircraft</li>
              <li>Movable armrests on aisle seats</li>
              <li>On-board wheelchairs</li>
              <li>Trained cabin crew to assist with various needs</li>
              <li>Accessible in-flight entertainment with closed captions and audio descriptions on select content</li>
            </ul>

            <div className="bg-purple-50 border border-purple-100 rounded-xl p-6 my-8">
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <Headphones className="h-6 w-6 text-purple-800" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Our Special Assistance Team</h3>
                  <p className="mb-4">
                    Our dedicated team is available to help with any questions or arrangements for your journey.
                  </p>
                  <p className="font-medium">special.assistance@skyWays.com</p>
                  <p className="mb-4">+1 (555) 234-5678</p>
                  <Button variant="qatar" className="group">
                    Request Assistance
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Accessibility Policies</h2>
            <p className="mb-4">
              Our accessibility policies are developed in accordance with:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>International Air Transport Association (IATA) standards</li>
              <li>Air Carrier Access Act (ACAA) requirements</li>
              <li>European Union Regulation (EC) No 1107/2006 concerning the rights of disabled persons and persons with reduced mobility when traveling by air</li>
              <li>Various national regulations in countries we serve</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Continuous Improvement</h2>
            <p className="mb-4">
              We are committed to continually improving our accessibility features and services. We regularly:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Conduct accessibility audits of our digital platforms</li>
              <li>Train our staff on disability awareness and assistance procedures</li>
              <li>Collect feedback from passengers with disabilities</li>
              <li>Work with disability advocacy organizations to identify areas for improvement</li>
              <li>Implement new technologies and solutions to enhance accessibility</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Feedback and Support</h2>
            <p className="mb-4">
              We value your feedback on our accessibility features and services. If you encounter any barriers or have 
              suggestions for improvement, please contact us using the information below:
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">Accessibility Feedback</p>
              <p>Email: accessibility@skyWays.com</p>
              <p>Phone: +1 (555) 987-6543</p>
              <p>Online: <a href="#" className="text-purple-800 hover:underline">Submit Feedback Form</a></p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500">
              Last Updated: July 1, 2025
            </p>
          </section>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Accessibility;
