import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Shield, 
  Globe, 
  Calendar,
  Users,
  ArrowRight, 
  Check,
  Heart,
  Briefcase,
  Umbrella,
  AlertCircle
} from 'lucide-react';

// Insurance plan data
const insurancePlans = [
  {
    id: 1,
    name: 'Essential',
    price: '€30',
    description: 'Basic coverage for shorter trips with essential medical and cancellation protection.',
    coverage: {
      medical: '€50,000',
      cancellation: '€2,000',
      baggage: '€500',
      delay: '€200'
    },
    features: [
      'Emergency medical coverage',
      'Trip cancellation & interruption',
      'Baggage protection',
      '24/7 emergency assistance'
    ]
  },
  {
    id: 2,
    name: 'Premium',
    price: '€50',
    highlighted: true,
    description: 'Comprehensive coverage with higher limits for worry-free travel worldwide.',
    coverage: {
      medical: '€200,000',
      cancellation: '€5,000',
      baggage: '€1,500',
      delay: '€500'
    },
    features: [
      'Higher emergency medical coverage',
      'Enhanced trip cancellation & interruption',
      'Baggage & personal effects',
      'Trip delay & missed connection',
      'Travel accident coverage',
      '24/7 premium assistance'
    ]
  },
  {
    id: 3,
    name: 'Elite',
    price: '€75',
    description: 'Maximum protection with the highest coverage limits and exclusive benefits.',
    coverage: {
      medical: '€500,000',
      cancellation: '€10,000',
      baggage: '€3,000',
      delay: '€1,000'
    },
    features: [
      'Highest emergency medical coverage',
      'Maximum trip cancellation & interruption',
      'Premium baggage protection',
      'Extended trip delay coverage',
      'Adventure activities coverage',
      'Rental car damage protection',
      'Pre-existing condition coverage',
      '24/7 concierge service'
    ]
  }
];

const TravelInsurancePage = () => {
  const [formData, setFormData] = useState({
    destination: '',
    departureDate: '',
    returnDate: '',
    travelers: '1'
  });
  
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePlanSelect = (planId: number) => {
    setSelectedPlan(planId);
  };

  const handleGetQuote = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would calculate a quote based on the form data
    if (!selectedPlan) {
      alert('Please select an insurance plan');
    } else {
      const selectedPlanDetails = insurancePlans.find(plan => plan.id === selectedPlan);
      if (selectedPlanDetails) {
        alert(`Quote requested for ${selectedPlanDetails.name} plan`);
      }
    }
  };

  return (
    <PageLayout 
      title="Travel Insurance" 
      subtitle="Comprehensive protection for your journeys around the world"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="p-8 md:col-span-3 flex flex-col justify-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Travel with Confidence</h2>
                <p className="mb-6 text-white/90">
                  Protect your journey with SkyWays comprehensive travel insurance. Get coverage for medical emergencies, 
                  trip cancellations, lost baggage, and more. Peace of mind, wherever you go.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    '24/7 Emergency Assistance',
                    'COVID-19 Coverage',
                    'Worldwide Protection',
                    'Instant Digital Policy'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-300" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-purple-600 w-fit"
                >
                  Learn More About Coverage
                </Button>
              </div>
              <div className="md:col-span-2 bg-white">
                <div className="h-full p-6 flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Get Your Quote</h3>
                  <form onSubmit={handleGetQuote} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Destination</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input 
                          placeholder="Where are you traveling to?" 
                          name="destination"
                          value={formData.destination}
                          onChange={handleInputChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Departure Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            type="date" 
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Return Date</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <Input 
                            type="date" 
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleInputChange}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Number of Travelers</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                          name="travelers"
                          value={formData.travelers}
                          onChange={handleInputChange}
                          className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                          required
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <Button type="submit" variant="qatar" className="w-full">
                      Get Your Quote <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Insurance Plans */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Choose Your Protection Level</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Select the perfect coverage for your journey with our tailored insurance plans.
              From essential protection to elite coverage, we have options for every traveler.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {insurancePlans.map((plan) => (
              <motion.div
                key={plan.id}
                className={`bg-white rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  selectedPlan === plan.id 
                    ? 'border-purple-600 shadow-lg' 
                    : 'border-transparent shadow-sm hover:shadow-md'
                } ${plan.highlighted ? 'relative' : ''}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                onClick={() => handlePlanSelect(plan.id)}
                whileHover={{ y: -10 }}
              >
                {plan.highlighted && (
                  <div className="absolute top-4 right-4 bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                  <div className="flex items-end mb-4">
                    <span className="text-2xl font-bold text-purple-700">{plan.price}</span>
                    <span className="text-gray-500 ml-1">per person</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-6 border-b border-gray-100 pb-6">
                    {plan.description}
                  </p>
                  
                  <h4 className="font-semibold mb-3 text-gray-900">Coverage Highlights</h4>
                  <div className="grid grid-cols-2 gap-y-3 mb-6">
                    <div>
                      <div className="text-sm text-gray-500">Medical Expenses</div>
                      <div className="font-medium">{plan.coverage.medical}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Trip Cancellation</div>
                      <div className="font-medium">{plan.coverage.cancellation}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Baggage Loss</div>
                      <div className="font-medium">{plan.coverage.baggage}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Trip Delay</div>
                      <div className="font-medium">{plan.coverage.delay}</div>
                    </div>
                  </div>
                  
                  <h4 className="font-semibold mb-3 text-gray-900">Key Benefits</h4>
                  <ul className="mb-6 space-y-2">
                    {plan.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                    {plan.features.length > 4 && (
                      <li className="text-sm text-purple-700 font-medium">+ {plan.features.length - 4} more benefits</li>
                    )}
                  </ul>
                  
                  <Button 
                    variant={selectedPlan === plan.id ? "qatar" : "outline"} 
                    className={`w-full ${
                      selectedPlan !== plan.id ? "border-purple-600 text-purple-600" : ""
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Coverage Types */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8">What's Covered?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: 'Medical Coverage',
                description: 'Emergency medical expenses, hospital stays, and medical evacuation when needed.',
                details: [
                  'Emergency medical treatment',
                  'Hospital accommodation',
                  'Medical evacuation',
                  'Repatriation if necessary',
                  '24/7 doctor consultation'
                ]
              },
              {
                icon: Calendar,
                title: 'Trip Cancellation',
                description: 'Reimbursement for prepaid, non-refundable expenses if you need to cancel your trip.',
                details: [
                  'Illness or injury',
                  'Death of family member',
                  'Natural disasters',
                  'Travel provider bankruptcy',
                  'Employment termination'
                ]
              },
              {
                icon: Briefcase,
                title: 'Baggage Protection',
                description: 'Coverage for lost, stolen, or damaged baggage during your trip.',
                details: [
                  'Lost baggage reimbursement',
                  'Damaged belongings',
                  'Stolen personal items',
                  'Baggage delay expenses',
                  'Electronic device protection'
                ]
              },
              {
                icon: Umbrella,
                title: 'Travel Assistance',
                description: '24/7 global assistance services to help with emergencies and travel issues.',
                details: [
                  'Emergency assistance',
                  'Travel document replacement',
                  'Legal referrals',
                  'Translation services',
                  'Emergency cash transfer'
                ]
              }
            ].map((coverage, index) => {
              const Icon = coverage.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{coverage.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{coverage.description}</p>
                  <ul className="space-y-1">
                    {coverage.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Why Choose SkyWays Insurance */}
        <motion.div 
          className="mb-16 bg-white p-8 rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose SkyWays Travel Insurance</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Global Coverage Network',
                description: 'Access to a worldwide network of medical providers and assistance services in over 190 countries.'
              },
              {
                title: 'Easy Claims Process',
                description: 'Simple and quick online claims submission with fast processing times and direct reimbursement.'
              },
              {
                title: 'COVID-19 Protection',
                description: 'Coverage for COVID-19 related medical expenses and trip cancellations where applicable.'
              },
              {
                title: 'No Age Restrictions',
                description: 'Coverage available for travelers of all ages, with specialized plans for seniors.'
              },
              {
                title: 'Pre-existing Conditions',
                description: 'Options available for coverage of stable pre-existing medical conditions.'
              },
              {
                title: 'Multi-trip Annual Plans',
                description: 'Cost-effective annual coverage for frequent travelers taking multiple trips per year.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Shield className="h-5 w-5 mr-3 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How to Make a Claim */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8">How to Make a Claim</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: 'Report the Incident',
                description: 'Contact our 24/7 assistance team as soon as possible after the incident occurs.'
              },
              {
                step: 2,
                title: 'Gather Documentation',
                description: 'Collect all relevant documents such as medical reports, police reports, or receipts.'
              },
              {
                step: 3,
                title: 'Submit Your Claim',
                description: 'File your claim through our online portal or mobile app with all supporting documents.'
              },
              {
                step: 4,
                title: 'Receive Reimbursement',
                description: 'Once approved, receive your reimbursement via your preferred payment method.'
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-3 -left-3 bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
                  {step.step}
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-purple-200 -translate-x-4"></div>
                )}
                <div className="pt-4">
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-50">
              Learn More About Claims Process
            </Button>
          </div>
        </motion.div>

        {/* Important Information */}
        <motion.div 
          className="mb-16 bg-gray-50 p-6 rounded-xl border border-gray-200"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-amber-500 mr-3 mt-1" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Important Information</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  Travel insurance is subject to terms, conditions, and exclusions as outlined in the policy wording. 
                  Please read the policy documents carefully before purchasing.
                </p>
                <p>
                  Pre-existing medical conditions may not be covered unless declared and accepted by the insurer. 
                  Age restrictions and health requirements may apply to certain coverage options.
                </p>
                <p>
                  Coverage may vary based on your country of residence and destination. Certain high-risk activities 
                  may require additional coverage. Please review all policy details or speak with a representative for more information.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-center text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Travel with Peace of Mind?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Don't let unexpected events ruin your journey. Get comprehensive travel insurance coverage 
            that protects you and your trip investments from the moment you book until you return home.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600 group"
            >
              Compare Plans <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="qatar" 
              className="bg-white text-purple-700 hover:bg-gray-100"
            >
              Get Your Quote Now
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default TravelInsurancePage;
