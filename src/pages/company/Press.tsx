import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { CalendarIcon, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pressReleases = [
  {
    id: 1,
    title: "SkyWings Announces New Routes to Southeast Asia",
    date: "July 10, 2025",
    excerpt: "SkyWings Airlines is expanding its network with new direct flights to Bangkok, Bali, and Ho Chi Minh City starting September 2025.",
  },
  {
    id: 2,
    title: "SkyWings Receives \"Best In-flight Entertainment\" Award",
    date: "June 22, 2025",
    excerpt: "SkyWings has been recognized for its innovative in-flight entertainment system at the annual Airline Excellence Awards.",
  },
  {
    id: 3,
    title: "SkyWings Signs Sustainable Fuel Agreement",
    date: "May 15, 2025",
    excerpt: "In a move toward carbon neutrality, SkyWings has signed an agreement with GreenFuel to use sustainable aviation fuel on 30% of flights by 2027.",
  },
  {
    id: 4,
    title: "SkyWings Unveils New Business Class Experience",
    date: "April 3, 2025",
    excerpt: "SkyWings introduces \"SkyLuxe,\" a completely redesigned business class experience featuring private suites and enhanced dining options.",
  },
  {
    id: 5,
    title: "SkyWings Celebrates 20 Years of Operation",
    date: "March 12, 2025",
    excerpt: "SkyWings marks two decades of connecting the world with special anniversary promotions and events throughout the year.",
  },
];

const Press = () => {
  return (
    <PageLayout 
      title="Press & Media" 
      subtitle="Latest news, press releases, and media resources"
    >
      <div className="max-w-5xl">
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Latest Press Releases</h2>
            <Button variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-50">
              Media Kit Download
            </Button>
          </div>

          <div className="space-y-6">
            {pressReleases.map((release) => (
              <motion.div 
                key={release.id}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-6">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    {release.date}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{release.title}</h3>
                  <p className="text-gray-700 mb-4">{release.excerpt}</p>
                  <Button variant="link" className="text-purple-800 p-0 font-medium flex items-center">
                    Read Full Release 
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Media Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Media Inquiries</h3>
              <p className="text-gray-700 mb-4">For press and media inquiries, please contact:</p>
              <p className="font-medium">media@skywings.com</p>
              <p>+1 (555) 234-5678</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Corporate Communications</h3>
              <p className="text-gray-700 mb-4">For corporate and investor relations:</p>
              <p className="font-medium">corporate@skywings.com</p>
              <p>+1 (555) 876-5432</p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Media Resources</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Brand Assets</h3>
              <p className="text-gray-700 mb-4">Access our logo, brand guidelines, and visual assets.</p>
              <Button variant="link" className="text-purple-800 p-0 flex items-center">
                Download Assets <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Image Library</h3>
              <p className="text-gray-700 mb-4">High-resolution images of our aircraft, cabins, and destinations.</p>
              <Button variant="link" className="text-purple-800 p-0 flex items-center">
                Browse Gallery <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Fact Sheets</h3>
              <p className="text-gray-700 mb-4">Key information about our fleet, routes, and company stats.</p>
              <Button variant="link" className="text-purple-800 p-0 flex items-center">
                View Fact Sheets <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  );
};

export default Press;
