import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Building,
  ArrowRight, 
  Check,
  Shield,
  Calendar,
  Users,
  Globe,
  Star,
  BarChart4,
  Plane
} from 'lucide-react';

const BusinessTravelPage = () => {
  return (
    <PageLayout 
      title="Business Travel" 
      subtitle="Seamless corporate travel management for businesses of all sizes"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="bg-white p-0 rounded-xl overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Streamline Your Business Travel</h2>
                <p className="text-gray-600 mb-6">
                  SkyWings Business Travel offers end-to-end corporate travel management with 
                  customized solutions, dedicated support, and powerful expense tracking tools.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    'Dedicated Account Management',
                    'Customized Travel Policies',
                    'Expense Management',
                    'Priority Customer Service',
                    'Group Booking Solutions',
                    'Duty of Care & Risk Management'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="qatar" className="group">
                    Request a Consultation <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-50">
                    Download Brochure
                  </Button>
                </div>
              </div>
              <div className="hidden lg:block bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
                  alt="Business travelers in airport" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Business Solutions Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Business Travel Solutions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              From individual business trips to large corporate events, we provide tailored services to meet your company's needs,
              optimize costs, and enhance traveler experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Building,
                title: 'Corporate Travel Management',
                description: 'End-to-end travel management with customized booking tools, expense reporting, and consolidated billing.',
                features: [
                  'Centralized booking platform',
                  'Corporate rate access',
                  'Travel policy compliance',
                  'Expense reconciliation'
                ]
              },
              {
                icon: Users,
                title: 'Group & MICE Travel',
                description: 'Specialized services for meetings, incentives, conferences, and exhibitions with comprehensive logistics support.',
                features: [
                  'Venue sourcing',
                  'Group flight arrangements',
                  'Transportation coordination',
                  'On-site event support'
                ]
              },
              {
                icon: Star,
                title: 'Executive Travel Services',
                description: 'Premium travel arrangements for executives with personalized attention and VIP experiences worldwide.',
                features: [
                  'Priority boarding',
                  'Lounge access',
                  'Concierge services',
                  'Fast-track security'
                ]
              },
              {
                icon: Shield,
                title: 'Duty of Care Solutions',
                description: 'Keep your travelers safe with comprehensive risk management, tracking, and emergency support.',
                features: [
                  'Real-time traveler tracking',
                  'Risk assessment tools',
                  'Emergency evacuation',
                  'Incident reporting'
                ]
              },
              {
                icon: BarChart4,
                title: 'Travel Analytics & Reporting',
                description: 'Gain insights into travel spending patterns with customizable reports and spending analysis.',
                features: [
                  'Spending visualization',
                  'Savings opportunities',
                  'Policy compliance metrics',
                  'Sustainability reporting'
                ]
              },
              {
                icon: Globe,
                title: 'Global Support Network',
                description: 'Access to 24/7 assistance in multiple languages from our worldwide support team.',
                features: [
                  'Multilingual support',
                  'Local expertise',
                  'Round-the-clock service',
                  'Rapid response time'
                ]
              }
            ].map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Why Choose SkyWings Section */}
        <motion.div 
          className="mb-16 bg-gray-50 p-8 rounded-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-10 text-center">Why Companies Choose SkyWings Business Travel</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-6 border-b border-gray-100 pb-4">Cost Optimization</h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Corporate Rate Access',
                    description: 'Exclusive corporate rates with airlines, hotels, and car rental providers.'
                  },
                  {
                    title: 'Policy Compliance Tools',
                    description: 'Automatic enforcement of travel policies to reduce unnecessary spending.'
                  },
                  {
                    title: 'Consolidated Billing',
                    description: 'Simplified payment process with detailed monthly statements and invoices.'
                  },
                  {
                    title: 'Spend Analysis',
                    description: 'Identify cost-saving opportunities with advanced analytics and reporting.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex">
                    <Check className="h-5 w-5 mr-3 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-6 border-b border-gray-100 pb-4">Traveler Experience</h3>
              <div className="space-y-4">
                {[
                  {
                    title: 'Streamlined Booking Process',
                    description: 'Intuitive platform for easy flight, hotel, and transportation bookings.'
                  },
                  {
                    title: 'Mobile Support',
                    description: 'Comprehensive mobile app with itinerary management and alerts.'
                  },
                  {
                    title: 'Priority Services',
                    description: 'Expedited check-in, security, and boarding privileges where available.'
                  },
                  {
                    title: 'Personalized Experience',
                    description: 'Travel preferences saved and applied to all future bookings automatically.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex">
                    <Check className="h-5 w-5 mr-3 text-green-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* SkyWings Business Portal */}
        <motion.div 
          className="mb-16 bg-white rounded-xl overflow-hidden shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">SkyWings Business Portal</h2>
              <p className="text-gray-600 mb-6">
                Our comprehensive business travel platform puts you in control of your company's 
                travel program with powerful management tools and real-time reporting.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  {
                    title: 'Centralized Booking Management',
                    description: 'Manage all bookings in one place with approval workflows and policy controls.'
                  },
                  {
                    title: 'Expense Tracking & Reconciliation',
                    description: 'Automatic expense categorization and integration with popular accounting software.'
                  },
                  {
                    title: 'Traveler Safety Dashboard',
                    description: 'Real-time monitoring of traveler locations and risk assessment tools.'
                  },
                  {
                    title: 'Custom Reporting Suite',
                    description: 'Generate insightful reports with customizable parameters and visualization options.'
                  }
                ].map((feature, idx) => (
                  <div key={idx} className="flex">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 shrink-0">
                      <span className="font-semibold text-purple-700">{idx + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="qatar" className="group">
                Schedule a Demo <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="bg-gray-200 flex items-center justify-center p-8">
              <div className="bg-white w-full h-80 rounded-lg shadow-md flex items-center justify-center">
                <p className="text-gray-500 text-center px-4">
                  Business portal interface screenshot would appear here<br />
                  <span className="text-sm text-gray-400">(Mockup image placeholder)</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services for Different Business Sizes */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8">Solutions for Every Business Size</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Small Businesses',
                description: 'Cost-effective travel management solutions with no minimum spend requirements.',
                features: [
                  'Self-service booking tools',
                  'Basic reporting capabilities',
                  'Access to corporate rates',
                  'Standard support services'
                ]
              },
              {
                title: 'Mid-size Companies',
                description: 'Enhanced services with dedicated support and advanced management features.',
                features: [
                  'Hybrid booking options',
                  'Customized travel policies',
                  'Expense integration',
                  'Account management team'
                ]
              },
              {
                title: 'Enterprise Organizations',
                description: 'Comprehensive global solutions with maximum customization and premium support.',
                features: [
                  'Fully tailored program',
                  'Advanced analytics',
                  'Global service coverage',
                  'Executive travel desk'
                ]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-3">{plan.title}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <h4 className="font-medium text-sm text-gray-700 mb-3">Key Features:</h4>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button variant="outline" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                  Learn More
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          className="mb-16 bg-purple-50 p-8 rounded-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">What Our Business Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                quote: "SkyWings Business Travel has transformed our corporate travel program. The dedicated account team understands our needs and the platform has helped us reduce travel costs by 23% while improving traveler satisfaction.",
                author: "Sarah Johnson",
                role: "Travel Manager",
                company: "TechCorp Industries"
              },
              {
                quote: "The seamless integration with our expense management system and the quality of customer support have made SkyWings an invaluable partner for our growing business. Their service is truly exceptional.",
                author: "David Chen",
                role: "Chief Financial Officer",
                company: "GreenPath Solutions"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="mb-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Ready to Optimize Your Business Travel?</h2>
              <p className="mb-6 text-white/90">
                Our business travel specialists are ready to create a customized travel program
                for your company. Fill out the form, and we'll contact you to discuss your needs.
              </p>
              <div className="space-y-4 mb-6">
                {[
                  'No obligation consultation',
                  'Customized program proposal',
                  'Competitive rate analysis',
                  'Implementation roadmap'
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  <span>businesstravel@skywings.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>Schedule a Call</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <Input placeholder="Your company name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                    <Input placeholder="Your industry" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <Input placeholder="Full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                    <Input placeholder="Your position" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <Input placeholder="Your phone number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Annual Travel Budget (Estimated)</label>
                  <select className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none">
                    <option>Please select</option>
                    <option>Under $50,000</option>
                    <option>$50,000 - $250,000</option>
                    <option>$250,000 - $1 million</option>
                    <option>Over $1 million</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">How can we help you?</label>
                  <textarea 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    rows={4}
                    placeholder="Tell us about your business travel needs"
                  ></textarea>
                </div>
                <Button type="submit" variant="qatar" className="w-full">
                  Request Consultation
                </Button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* FAQs */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How do I set up a corporate account with SkyWings?",
                answer: "Setting up a corporate account is simple. Complete our business request form, and a dedicated account manager will contact you to discuss your needs, travel patterns, and requirements. We'll then create a customized program proposal for your review."
              },
              {
                question: "Can I set different travel policies for different departments?",
                answer: "Yes, our platform allows you to create multiple travel policy sets that can be assigned to different departments, projects, or traveler groups. Each policy can have unique approval workflows, spending limits, and booking restrictions."
              },
              {
                question: "How does the approval process work?",
                answer: "Our system offers flexible approval workflows that can be customized to match your organizational structure. Bookings can require approval based on cost thresholds, destinations, or traveler roles, with email notifications sent to designated approvers."
              },
              {
                question: "What kind of reporting is available?",
                answer: "SkyWings offers comprehensive reporting capabilities including spending by department, policy compliance, carbon emissions, traveler location, and savings opportunities. Reports can be customized, scheduled, and exported in various formats."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-50">
              View All FAQs
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default BusinessTravelPage;
