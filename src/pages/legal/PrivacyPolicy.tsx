import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <PageLayout
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information"
    >
      <div className="max-w-4xl">
        <motion.div
          className="space-y-8 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p className="mb-4">
              SkyWays Airlines ("we", "our", "us") is committed to protecting
              and respecting your privacy. This Privacy Policy explains how we
              collect, use, and safeguard your information when you visit our
              website, use our mobile application, or interact with any of our
              services.
            </p>
            <p>
              By using our services, you consent to the practices described in
              this Privacy Policy. We may update this policy periodically, and
              we encourage you to review it regularly for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Information We Collect
            </h2>
            <p className="mb-4">
              We may collect the following types of information:
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Personal Information
            </h3>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>
                Contact information (name, email address, phone number, postal
                address)
              </li>
              <li>
                Identification details (passport number, government-issued ID)
              </li>
              <li>
                Payment information (credit card details, billing information)
              </li>
              <li>Travel preferences and frequent flyer information</li>
              <li>
                Special service requests (dietary requirements, mobility
                assistance)
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Usage Information
            </h3>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>IP address and device information</li>
              <li>Browser type and settings</li>
              <li>Usage patterns and preferences</li>
              <li>Cookies and similar technologies</li>
              <li>Location information (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Processing and managing your bookings and reservations</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>Facilitating check-in and other travel procedures</li>
              <li>
                Personalizing your experience and providing tailored offers
              </li>
              <li>Sending important service-related notifications</li>
              <li>
                Marketing and promotional communications (with your consent)
              </li>
              <li>Improving our services and developing new features</li>
              <li>Ensuring security and preventing fraud</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Data Sharing and Disclosure
            </h2>
            <p className="mb-4">
              We may share your information with the following third parties:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Service providers and business partners who help us deliver our
                services
              </li>
              <li>
                Airlines, airports, and other travel-related entities necessary
                to fulfill your booking
              </li>
              <li>Payment processors and financial institutions</li>
              <li>
                Government agencies and regulatory authorities as required by
                law
              </li>
              <li>Legal advisors and professional consultants</li>
            </ul>
            <p className="mt-4">
              We implement appropriate safeguards when sharing your data and
              require third parties to respect the security of your information
              and treat it in accordance with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Data Security
            </h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Encryption of sensitive data</li>
              <li>Secure networks and firewalls</li>
              <li>Access controls and authentication procedures</li>
              <li>Regular security assessments and testing</li>
              <li>Staff training on data protection</li>
            </ul>
            <p className="mt-4">
              While we strive to protect your personal information, no method of
              transmission over the Internet or electronic storage is 100%
              secure. We cannot guarantee absolute security of your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Your Rights
            </h2>
            <p className="mb-4">
              Depending on your location, you may have the following rights
              regarding your personal information:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Right to access and receive a copy of your data</li>
              <li>Right to rectify inaccurate or incomplete information</li>
              <li>Right to erasure (the "right to be forgotten")</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent at any time</li>
              <li>Right to lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact our Privacy Officer using
              the contact information provided below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Cookies and Similar Technologies
            </h2>
            <p className="mb-4">
              We use cookies and similar technologies to enhance your experience
              on our website and app. These technologies help us understand how
              visitors use our services, remember your preferences, and provide
              personalized features.
            </p>
            <p className="mb-4">
              You can manage your cookie preferences through your browser
              settings. Please note that disabling certain cookies may affect
              the functionality of our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              International Data Transfers
            </h2>
            <p>
              As a global airline, we may transfer your personal information to
              countries outside your home country. We ensure that such transfers
              comply with applicable data protection laws and that appropriate
              safeguards are in place to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact our Privacy
              Officer at:
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">Privacy Officer</p>
              <p>Email: privacy@skyWays.com</p>
              <p>Address: SkyWays Airlines, 123 Aviation Blvd, Sky City</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500">Last Updated: July 1, 2025</p>
          </section>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default PrivacyPolicy;
