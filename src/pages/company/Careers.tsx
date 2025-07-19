import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const jobOpenings = [
  {
    title: "Senior Flight Attendant",
    department: "Cabin Crew",
    location: "Dubai, UAE",
    type: "Full-time",
  },
  {
    title: "Aircraft Maintenance Technician",
    department: "Engineering",
    location: "London, UK",
    type: "Full-time",
  },
  {
    title: "Digital Marketing Specialist",
    department: "Marketing",
    location: "New York, USA",
    type: "Full-time",
  },
  {
    title: "Revenue Management Analyst",
    department: "Commercial",
    location: "Doha, Qatar",
    type: "Full-time",
  },
  {
    title: "IT Systems Administrator",
    department: "Information Technology",
    location: "Singapore",
    type: "Full-time",
  },
];

const Careers = () => {
  return (
    <PageLayout 
      title="Careers at SkyWings" 
      subtitle="Join our team and help shape the future of air travel"
    >
      <div className="max-w-5xl">
        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Why Work With Us</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            At SkyWings, we believe our employees are our greatest asset. We're committed to creating an 
            environment where talented individuals can thrive, develop their skills, and build rewarding careers. 
            Working with us means being part of a diverse global team that's passionate about connecting people 
            and delivering exceptional experiences.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            We offer competitive compensation packages, comprehensive benefits, travel privileges, and numerous 
            opportunities for personal and professional growth. Our collaborative culture encourages innovation, 
            creativity, and excellence in everything we do.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-purple-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2 text-purple-800">Global Opportunities</h3>
              <p className="text-gray-700">
                Work in diverse locations across our global network and gain international experience.
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2 text-indigo-800">Career Development</h3>
              <p className="text-gray-700">
                Access training programs, mentorship, and clear paths for advancement.
              </p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2 text-blue-800">Travel Benefits</h3>
              <p className="text-gray-700">
                Enjoy exclusive travel privileges for you and your eligible family members.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Current Openings</h2>
          
          <div className="overflow-hidden rounded-xl border border-gray-200">
            {jobOpenings.map((job, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-200"
              >
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600">{job.department} • {job.location} • {job.type}</p>
                </div>
                <Button variant="qatar" className="group md:self-end">
                  Apply Now 
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Our Hiring Process</h2>
          <ol className="space-y-4 mb-6">
            <li className="flex items-start">
              <div className="bg-purple-100 text-purple-800 font-bold h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</div>
              <div>
                <h3 className="font-semibold text-gray-900">Application Review</h3>
                <p className="text-gray-700">Our recruitment team carefully reviews all applications to identify candidates who match our requirements.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-purple-100 text-purple-800 font-bold h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</div>
              <div>
                <h3 className="font-semibold text-gray-900">Initial Assessment</h3>
                <p className="text-gray-700">Qualified candidates are invited to complete role-specific assessments or interviews.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-purple-100 text-purple-800 font-bold h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</div>
              <div>
                <h3 className="font-semibold text-gray-900">In-depth Interviews</h3>
                <p className="text-gray-700">Successful candidates proceed to panel interviews with hiring managers and team members.</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-purple-100 text-purple-800 font-bold h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0">4</div>
              <div>
                <h3 className="font-semibold text-gray-900">Final Selection & Offer</h3>
                <p className="text-gray-700">Selected candidates receive job offers with detailed information about compensation and benefits.</p>
              </div>
            </li>
          </ol>
          
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-8">
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Don't see a suitable role?</h3>
            <p className="text-gray-700 mb-4">
              We're always looking for talented individuals to join our team. Submit your resume for future opportunities.
            </p>
            <Button variant="qatar">
              Join our Talent Network
            </Button>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  );
};

export default Careers;
