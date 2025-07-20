import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';

const CookiesPolicy = () => {
  return (
    <PageLayout 
      title="Cookies Policy" 
      subtitle="How we use cookies and similar technologies on our website"
    >
      <div className="max-w-4xl">
        <motion.div
          className="space-y-8 text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. 
              They are widely used to make websites work more efficiently, provide a better user experience, and give website 
              owners information about how visitors use their site.
            </p>
            <p>
              Cookies allow a website to recognize your device and remember certain information about your visit, such as your 
              preferences and actions. They are not harmful and do not contain personal information like your email address or 
              payment details.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">How We Use Cookies</h2>
            <p className="mb-4">
              SkyWays Airlines uses cookies and similar technologies for various purposes, including:
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Essential Cookies</h3>
            <p className="mb-4">
              These cookies are necessary for the website to function properly. They enable core functionality such as security, 
              network management, and account access. You cannot disable these cookies through our system.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Performance and Analytics Cookies</h3>
            <p className="mb-4">
              These cookies help us understand how visitors interact with our website by collecting and reporting information 
              anonymously. They allow us to track metrics like the number of visitors, traffic sources, and which pages are most 
              popular. This helps us improve our website and your browsing experience.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Functional Cookies</h3>
            <p className="mb-4">
              These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers 
              whose services we have added to our pages. If you disable these cookies, some or all of these features may not work properly.
            </p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Targeting and Advertising Cookies</h3>
            <p>
              These cookies are used to deliver relevant advertisements based on your interests. They also help measure the effectiveness 
              of advertising campaigns. These cookies may be set through our site by our advertising partners and help build a profile 
              of your interests.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-4">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left border border-gray-300">Cookie Type</th>
                    <th className="px-4 py-2 text-left border border-gray-300">Purpose</th>
                    <th className="px-4 py-2 text-left border border-gray-300">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border border-gray-300">Session Cookies</td>
                    <td className="px-4 py-2 border border-gray-300">To recognize and maintain your session while browsing our website</td>
                    <td className="px-4 py-2 border border-gray-300">Temporary (deleted when browser is closed)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300">Persistent Cookies</td>
                    <td className="px-4 py-2 border border-gray-300">To remember your preferences and settings for future visits</td>
                    <td className="px-4 py-2 border border-gray-300">Varies (can be days, months, or years)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border border-gray-300">First-Party Cookies</td>
                    <td className="px-4 py-2 border border-gray-300">Set directly by SkyWays for essential website functionality</td>
                    <td className="px-4 py-2 border border-gray-300">Varies</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300">Third-Party Cookies</td>
                    <td className="px-4 py-2 border border-gray-300">Set by third parties for analytics, advertising, and social media integration</td>
                    <td className="px-4 py-2 border border-gray-300">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
            <p className="mb-4">
              You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your 
              user experience and parts of our website may no longer be fully accessible.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Browser Controls</h3>
            <p className="mb-4">
              Most web browsers allow you to manage cookies through their settings. You can:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>View cookies stored on your computer</li>
              <li>Allow, block, or delete cookies</li>
              <li>Set preferences for certain websites</li>
            </ul>
            <p className="mb-4">
              Please refer to your browser's help section for specific instructions on how to manage cookies. Common browsers include:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Safari</li>
              <li>Microsoft Edge</li>
              <li>Opera</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Cookie Manager</h3>
            <p>
              You can also manage your cookie preferences through our Cookie Manager, which appears as a banner when you first visit 
              our website. You can access this tool at any time by clicking the "Cookie Preferences" link in the footer of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
            <p className="mb-4">
              We use various third-party services on our website, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-4">
              <li>Google Analytics to analyze website usage</li>
              <li>Social media plugins that may set cookies for sharing features</li>
              <li>Advertising partners for displaying relevant ads</li>
              <li>Customer service chat applications</li>
            </ul>
            <p>
              These third parties may use cookies, web beacons, and similar technologies to collect information about your interactions 
              with our website. Please refer to their respective privacy policies for more information on how they use your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our business practices. 
              Any changes will be posted on this page, and if the changes are significant, we will provide a more prominent notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
            </p>
            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold">SkyWays Privacy Team</p>
              <p>Email: privacy@skyWays.com</p>
              <p>Phone: +1 (555) 123-4567</p>
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

export default CookiesPolicy;
