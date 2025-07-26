import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";

const TermsOfService = () => {
  return (
    <PageLayout
      title="Terms of Service"
      subtitle="Legal terms governing the use of our services"
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
              1. Introduction
            </h2>
            <p className="mb-4">
              Welcome to SkyWays Airlines. These Terms of Service ("Terms")
              govern your use of our website, mobile application, and related
              services (collectively, the "Services"). By accessing or using our
              Services, you agree to be bound by these Terms and our Privacy
              Policy.
            </p>
            <p>
              If you do not agree to these Terms, please do not use our
              Services. We reserve the right to modify these Terms at any time.
              Your continued use of our Services following any changes
              constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              2. Definitions
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>"SkyWays,"</strong> "we," "our," or "us" refers to
                SkyWays Airlines, its subsidiaries, affiliates, and authorized
                agents.
              </li>
              <li>
                <strong>"You"</strong> or "your" refers to the individual or
                entity accessing or using our Services.
              </li>
              <li>
                <strong>"Services"</strong> refers to our website, mobile
                application, online booking platform, and any other related
                services offered by SkyWays.
              </li>
              <li>
                <strong>"Conditions of Carriage"</strong> refers to the separate
                document that governs the terms and conditions of air
                transportation provided by SkyWays.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              3. Account Registration and Security
            </h2>
            <p className="mb-4">
              To use certain features of our Services, you may need to create an
              account. You are responsible for:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                Providing accurate and complete information during the
                registration process
              </li>
              <li>
                Maintaining the confidentiality of your account credentials
              </li>
              <li>All activities that occur under your account</li>
              <li>
                Notifying us immediately of any unauthorized use of your account
              </li>
            </ul>
            <p>
              We reserve the right to suspend or terminate your account if we
              suspect any unauthorized or fraudulent activity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              4. Booking and Reservations
            </h2>
            <p className="mb-4">When making a booking through our Services:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                You must provide accurate and complete passenger information.
              </li>
              <li>
                All bookings are subject to availability and confirmation.
              </li>
              <li>
                You must comply with all applicable travel requirements,
                including visa and passport regulations.
              </li>
              <li>
                Additional terms may apply as specified in our Conditions of
                Carriage.
              </li>
            </ul>
            <p>
              Payment for bookings is processed securely, and we may use
              third-party payment processors. By providing payment information,
              you represent that you are authorized to use the payment method.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              5. Cancellation and Refund Policy
            </h2>
            <p className="mb-4">
              Cancellation and refund policies vary based on the fare type and
              other factors. Please refer to the specific conditions attached to
              your booking at the time of purchase. In general:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Non-refundable tickets cannot be refunded if cancelled.</li>
              <li>Refundable tickets may be subject to cancellation fees.</li>
              <li>Changes to bookings may incur additional charges.</li>
              <li>
                Refunds are processed according to the original payment method
                used for the booking.
              </li>
              <li>
                Special rules may apply during disruptions, as outlined in our
                Conditions of Carriage.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              6. Intellectual Property Rights
            </h2>
            <p className="mb-4">
              All content on our Services, including but not limited to text,
              graphics, logos, images, audio clips, digital downloads, and
              software, is the property of SkyWays or its content suppliers and
              is protected by international copyright, trademark, and other
              intellectual property laws.
            </p>
            <p>
              You may not reproduce, modify, distribute, display, perform, or
              create derivative works from any content without our express
              written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              7. User Conduct
            </h2>
            <p className="mb-4">When using our Services, you agree not to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Impersonate any person or entity</li>
              <li>Use our Services for fraudulent purposes</li>
              <li>
                Interfere with or disrupt the functionality of our Services
              </li>
              <li>
                Attempt to gain unauthorized access to any part of our Services
              </li>
              <li>
                Use automated means to access or collect data from our Services
              </li>
              <li>
                Upload or transmit viruses, malware, or other malicious code
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="mb-4">
              To the maximum extent permitted by applicable law, SkyWays and its
              affiliates, officers, directors, employees, and agents shall not
              be liable for any indirect, incidental, special, consequential, or
              punitive damages arising from or related to your use of our
              Services.
            </p>
            <p>
              Our total liability for any claims arising from or related to
              these Terms or your use of our Services shall not exceed the
              amount you paid to us for the specific service giving rise to the
              claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              9. Indemnification
            </h2>
            <p>
              You agree to indemnify, defend, and hold harmless SkyWays and its
              affiliates, officers, directors, employees, and agents from and
              against any claims, liabilities, damages, losses, costs, expenses,
              or fees (including reasonable attorneys' fees) arising from your
              violation of these Terms, your use of our Services, or your
              violation of any rights of another person or entity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              10. Governing Law and Dispute Resolution
            </h2>
            <p className="mb-4">
              These Terms shall be governed by and construed in accordance with
              the laws of [Jurisdiction], without regard to its conflict of law
              principles.
            </p>
            <p className="mb-4">
              Any dispute arising from or related to these Terms or our Services
              shall first be attempted to be resolved through good-faith
              negotiations. If the dispute cannot be resolved through
              negotiations, it shall be submitted to binding arbitration in
              accordance with the rules of [Arbitration Association].
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              11. Severability
            </h2>
            <p>
              If any provision of these Terms is found to be invalid, illegal,
              or unenforceable, the remaining provisions shall continue in full
              force and effect. The invalid or unenforceable provision shall be
              replaced by a valid and enforceable provision that comes closest
              to the intention underlying the invalid provision.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              12. Contact Information
            </h2>
            <p>
              If you have any questions or concerns about these Terms, please
              contact our Customer Service department:
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">SkyWays Customer Service</p>
              <p>Email: legal@skyWays.com</p>
              <p>Address: SkyWays Airlines, 123 Aviation Blvd, Sky City</p>
              <p>Phone: +1 (555) 987-6543</p>
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

export default TermsOfService;
