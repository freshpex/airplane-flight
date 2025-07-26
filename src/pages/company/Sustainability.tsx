import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Leaf, Recycle, Wind, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const initiativeData = [
  {
    title: "Carbon Reduction",
    icon: <Leaf className="h-6 w-6" />,
    target: "30% by 2030",
    current: "12% achieved",
    color: "bg-green-100 text-green-800",
    progress: 40,
  },
  {
    title: "Waste Management",
    icon: <Recycle className="h-6 w-6" />,
    target: "Zero landfill waste by 2028",
    current: "65% recycling rate",
    color: "bg-blue-100 text-blue-800",
    progress: 65,
  },
  {
    title: "Sustainable Fuel",
    icon: <Wind className="h-6 w-6" />,
    target: "25% SAF blend by 2035",
    current: "8% implementation",
    color: "bg-purple-100 text-purple-800",
    progress: 32,
  },
  {
    title: "Water Conservation",
    icon: <BarChart className="h-6 w-6" />,
    target: "50% reduction by 2030",
    current: "22% reduced since 2020",
    color: "bg-indigo-100 text-indigo-800",
    progress: 44,
  },
];

const Sustainability = () => {
  return (
    <PageLayout
      title="Sustainability"
      subtitle="Our commitment to a greener future for aviation"
    >
      <div className="max-w-5xl">
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="bg-green-50 border border-green-100 rounded-xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Our Environmental Commitment
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              At SkyWays, we recognize the impact aviation has on the
              environment and are committed to leading the industry towards a
              more sustainable future. We've developed a comprehensive
              sustainability strategy with clear targets and initiatives to
              reduce our carbon footprint, minimize waste, conserve resources,
              and engage with communities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our goal is to achieve net-zero carbon emissions by 2050, with
              significant milestones along the way. This commitment extends
              beyond environmental concerns to encompass social responsibility
              and governance practices that ensure the long-term sustainability
              of our business.
            </p>
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Key Initiatives & Progress
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {initiativeData.map((initiative, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div className={`${initiative.color} p-3 rounded-lg mr-4`}>
                    {initiative.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {initiative.title}
                  </h3>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 font-medium">
                      Target: {initiative.target}
                    </span>
                    <span className="text-gray-700">{initiative.current}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-800 h-2 rounded-full"
                      style={{ width: `${initiative.progress}%` }}
                    ></div>
                  </div>
                </div>

                <Button
                  variant="link"
                  className="text-purple-800 p-0 font-medium"
                >
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Fleet Modernization
          </h2>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Modern Aircraft"
                  className="w-full h-full object-cover object-center"
                  style={{ minHeight: "300px" }}
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Next-Generation Aircraft
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Our fleet modernization program focuses on acquiring the most
                  fuel-efficient aircraft available, reducing both emissions and
                  noise pollution. Our newer aircraft consume up to 25% less
                  fuel and produce significantly lower emissions compared to the
                  previous generation.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Leaf className="h-3.5 w-3.5 text-green-800" />
                    </div>
                    <span className="text-gray-700">
                      25-30% reduced fuel consumption
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Leaf className="h-3.5 w-3.5 text-green-800" />
                    </div>
                    <span className="text-gray-700">
                      50% reduced noise footprint
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Leaf className="h-3.5 w-3.5 text-green-800" />
                    </div>
                    <span className="text-gray-700">
                      Extended range with lower emissions
                    </span>
                  </li>
                </ul>
                <Button variant="qatar">View Our Fleet</Button>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Sustainability Reports & Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Annual Sustainability Report
              </h3>
              <p className="text-gray-700 mb-4">
                Our comprehensive review of environmental initiatives, targets,
                and progress.
              </p>
              <Button
                variant="outline"
                className="w-full border-purple-800 text-purple-800 hover:bg-purple-50"
              >
                Download Report
              </Button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Carbon Calculator
              </h3>
              <p className="text-gray-700 mb-4">
                Calculate and offset the carbon footprint of your flights with
                SkyWays.
              </p>
              <Button
                variant="outline"
                className="w-full border-purple-800 text-purple-800 hover:bg-purple-50"
              >
                Calculate Now
              </Button>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">
                Community Programs
              </h3>
              <p className="text-gray-700 mb-4">
                Learn about our environmental initiatives in communities around
                the world.
              </p>
              <Button
                variant="outline"
                className="w-full border-purple-800 text-purple-800 hover:bg-purple-50"
              >
                Explore Programs
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  );
};

export default Sustainability;
