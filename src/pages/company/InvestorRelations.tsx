import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart, Users, Globe } from 'lucide-react';

const InvestorRelations = () => {
  return (
    <PageLayout 
      title="Investor Relations" 
      subtitle="Financial information and resources for shareholders and investors"
    >
      <div className="max-w-5xl">
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Financial Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-500 font-medium">Annual Revenue</h3>
                <TrendingUp className="text-green-500 h-5 w-5" />
              </div>
              <p className="text-3xl font-bold text-gray-900">$12.8B</p>
              <p className="text-green-500 text-sm font-medium">+8.2% YoY</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-500 font-medium">Operating Margin</h3>
                <BarChart className="text-blue-500 h-5 w-5" />
              </div>
              <p className="text-3xl font-bold text-gray-900">18.5%</p>
              <p className="text-green-500 text-sm font-medium">+2.3% YoY</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-500 font-medium">Passengers</h3>
                <Users className="text-purple-500 h-5 w-5" />
              </div>
              <p className="text-3xl font-bold text-gray-900">42.3M</p>
              <p className="text-green-500 text-sm font-medium">+11.7% YoY</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-500 font-medium">Destinations</h3>
                <Globe className="text-indigo-500 h-5 w-5" />
              </div>
              <p className="text-3xl font-bold text-gray-900">160+</p>
              <p className="text-green-500 text-sm font-medium">+12 New</p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Financial Reports</h2>
          
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Report Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Period</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Release Date</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Annual Report</td>
                  <td className="px-6 py-4 text-sm text-gray-700">FY 2024</td>
                  <td className="px-6 py-4 text-sm text-gray-700">March 15, 2025</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="text-purple-800 hover:text-purple-600 font-medium text-sm">Download PDF</a>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Q1 Earnings Report</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Q1 2025</td>
                  <td className="px-6 py-4 text-sm text-gray-700">April 28, 2025</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="text-purple-800 hover:text-purple-600 font-medium text-sm">Download PDF</a>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Annual Report</td>
                  <td className="px-6 py-4 text-sm text-gray-700">FY 2023</td>
                  <td className="px-6 py-4 text-sm text-gray-700">March 18, 2024</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="text-purple-800 hover:text-purple-600 font-medium text-sm">Download PDF</a>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Q4 Earnings Report</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Q4 2024</td>
                  <td className="px-6 py-4 text-sm text-gray-700">January 25, 2025</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="text-purple-800 hover:text-purple-600 font-medium text-sm">Download PDF</a>
                  </td>
                </tr>
                <tr className="bg-white">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">Q3 Earnings Report</td>
                  <td className="px-6 py-4 text-sm text-gray-700">Q3 2024</td>
                  <td className="px-6 py-4 text-sm text-gray-700">October 22, 2024</td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="text-purple-800 hover:text-purple-600 font-medium text-sm">Download PDF</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Upcoming Events</h2>
          
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Q2 2025 Earnings Call</h3>
                  <p className="text-gray-700">July 25, 2025 • 10:00 AM EST</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <a href="#" className="text-purple-800 font-medium hover:text-purple-600">Add to Calendar</a>
                  <span className="text-gray-300 mx-2">|</span>
                  <a href="#" className="text-purple-800 font-medium hover:text-purple-600">Webcast</a>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Annual Shareholder Meeting</h3>
                  <p className="text-gray-700">August 12, 2025 • 09:00 AM EST</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <a href="#" className="text-purple-800 font-medium hover:text-purple-600">Add to Calendar</a>
                  <span className="text-gray-300 mx-2">|</span>
                  <a href="#" className="text-purple-800 font-medium hover:text-purple-600">Registration</a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Investor Relations</h2>
          
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <p className="text-gray-700 mb-4">
              For investor inquiries or questions related to SkyWays' financial performance, please contact our Investor Relations team:
            </p>
            <div className="space-y-2">
              <p className="font-semibold">Investor Relations Department</p>
              <p>Email: investors@skyWays.com</p>
              <p>Phone: +1 (555) 789-0123</p>
            </div>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  );
};

export default InvestorRelations;
