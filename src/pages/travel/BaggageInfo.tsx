import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plane,
  ArrowRight,
  AlertCircle,
  Check,
  Plus,
  CreditCard,
  Banknote,
  CircleDollarSign,
  Info,
  ShoppingBag
} from 'lucide-react';

const BaggageInfo = () => {
  const [selectedCabin, setSelectedCabin] = useState('economy');

  // Baggage allowance data by cabin class
  const baggageAllowances = {
    economy: {
      cabinBaggage: {
        pieces: 1,
        weight: '7kg',
        dimensions: '55 x 40 x 20cm'
      },
      checkedBaggage: {
        standard: {
          pieces: 1,
          weight: '23kg',
          dimensions: '158cm (L+W+H)'
        },
        elite: {
          pieces: 2,
          weight: '23kg each',
          dimensions: '158cm (L+W+H)'
        }
      },
      specialItems: [
        'Musical instruments (may require their own seat)',
        'Sports equipment (special handling fees may apply)',
        'Medical equipment (free of charge with prior approval)',
        'Pet carriers (subject to airline policy)'
      ]
    },
    business: {
      cabinBaggage: {
        pieces: 2,
        weight: '7kg each',
        dimensions: '55 x 40 x 20cm'
      },
      checkedBaggage: {
        standard: {
          pieces: 2,
          weight: '32kg each',
          dimensions: '158cm (L+W+H)'
        },
        elite: {
          pieces: 3,
          weight: '32kg each',
          dimensions: '158cm (L+W+H)'
        }
      },
      specialItems: [
        'Musical instruments (may require their own seat)',
        'Sports equipment (special handling fees may apply)',
        'Medical equipment (free of charge with prior approval)',
        'Pet carriers (subject to airline policy)',
        'Complimentary golf bag transport'
      ]
    },
    first: {
      cabinBaggage: {
        pieces: 2,
        weight: '7kg each',
        dimensions: '55 x 40 x 20cm'
      },
      checkedBaggage: {
        standard: {
          pieces: 3,
          weight: '32kg each',
          dimensions: '158cm (L+W+H)'
        },
        elite: {
          pieces: 3,
          weight: '32kg each',
          dimensions: '158cm (L+W+H)'
        }
      },
      specialItems: [
        'Musical instruments (may require their own seat)',
        'Sports equipment (free of charge)',
        'Medical equipment (free of charge)',
        'Pet carriers (subject to airline policy)',
        'Complimentary golf bag transport',
        'Premium luggage handling'
      ]
    }
  };

  // Extra baggage rates by route
  const extraBaggageRates = [
    {
      route: 'Within Europe',
      prices: [
        { weight: 'Extra 23kg bag', price: '€60' },
        { weight: 'Overweight (23-32kg)', price: '€60' },
        { weight: 'Oversize (>158cm)', price: '€60' }
      ]
    },
    {
      route: 'Europe - North America',
      prices: [
        { weight: 'Extra 23kg bag', price: '€100' },
        { weight: 'Overweight (23-32kg)', price: '€100' },
        { weight: 'Oversize (>158cm)', price: '€100' }
      ]
    },
    {
      route: 'Europe - Asia',
      prices: [
        { weight: 'Extra 23kg bag', price: '€120' },
        { weight: 'Overweight (23-32kg)', price: '€120' },
        { weight: 'Oversize (>158cm)', price: '€120' }
      ]
    },
    {
      route: 'Europe - Middle East',
      prices: [
        { weight: 'Extra 23kg bag', price: '€80' },
        { weight: 'Overweight (23-32kg)', price: '€80' },
        { weight: 'Oversize (>158cm)', price: '€80' }
      ]
    }
  ];

  // Prohibited items list
  const prohibitedItems = [
    {
      category: 'Dangerous Goods',
      items: [
        'Explosives and fireworks',
        'Flammable liquids and solids',
        'Toxic or infectious substances',
        'Corrosives such as acids',
        'Radioactive materials',
        'Oxidizers and organic peroxides',
        'Magnetized materials'
      ]
    },
    {
      category: 'Weapons',
      items: [
        'Firearms of all types',
        'Ammunition',
        'Stun guns or shocking devices',
        'Knives with blades longer than 6cm',
        'Martial arts equipment',
        'Toy or replica weapons'
      ]
    },
    {
      category: 'Other Prohibited Items',
      items: [
        'Illegal narcotics',
        'Certain lithium batteries',
        'Animals not approved for air travel',
        'Perishable items without proper packaging',
        'Counterfeit goods'
      ]
    }
  ];

  // Restricted items (allowed with limitations)
  const restrictedItems = [
    {
      category: 'Liquids in Carry-on',
      description: 'Containers must be 100ml or less and fit in a transparent, resealable plastic bag of 1 liter capacity.'
    },
    {
      category: 'Electronic Devices',
      description: 'Devices with lithium batteries must be carried in cabin baggage. Spare batteries are not allowed in checked baggage.'
    },
    {
      category: 'Medical Equipment',
      description: 'Notify airline in advance. Documentation may be required for certain medications and equipment.'
    },
    {
      category: 'Baby Food and Milk',
      description: 'Reasonable amounts allowed in carry-on when traveling with an infant or young child.'
    },
    {
      category: 'Sports Equipment',
      description: 'Most items allowed as checked baggage with special handling fees. Some restrictions apply.'
    }
  ];

  return (
    <PageLayout
      title="Baggage Information"
      subtitle="Everything you need to know about baggage allowances, fees, and restrictions"
      backgroundImage="https://images.unsplash.com/photo-1590064661010-d542a9f45927?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Cabin Class Selector */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Baggage Allowance</h2>
          <p className="text-gray-600 mb-6">
            Your baggage allowance depends on your cabin class, loyalty tier, and route. 
            Select your cabin class below to see your standard allowance.
          </p>
          
          <Tabs value={selectedCabin} onValueChange={setSelectedCabin} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="economy">Economy Class</TabsTrigger>
              <TabsTrigger value="business">Business Class</TabsTrigger>
              <TabsTrigger value="first">First Class</TabsTrigger>
            </TabsList>
            
            <TabsContent value="economy" className="mt-0">
              <BaggageAllowanceContent data={baggageAllowances.economy} cabinType="Economy Class" />
            </TabsContent>
            
            <TabsContent value="business" className="mt-0">
              <BaggageAllowanceContent data={baggageAllowances.business} cabinType="Business Class" />
            </TabsContent>
            
            <TabsContent value="first" className="mt-0">
              <BaggageAllowanceContent data={baggageAllowances.first} cabinType="First Class" />
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* Extra Baggage Fees */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Extra Baggage Fees</h2>
          <p className="text-gray-600 mb-6">
            If you need to bring more baggage than your standard allowance, you can purchase extra baggage. 
            Booking in advance online is cheaper than paying at the airport.
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  {['Extra 23kg bag', 'Overweight (23-32kg)', 'Oversize (>158cm)'].map((header, index) => (
                    <th key={index} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {extraBaggageRates.map((route, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {route.route}
                    </td>
                    {route.prices.map((price, priceIndex) => (
                      <td key={priceIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {price.price}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <CreditCard className="h-4 w-4 text-purple-600" />
              <span>Save 20% by pre-booking online</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Banknote className="h-4 w-4 text-purple-600" />
              <span>Pay in your preferred currency</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Plus className="h-4 w-4 text-purple-600" />
              <span>Loyalty members receive additional allowance</span>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center">
            <Button variant="qatar" className="px-8">
              Purchase Extra Baggage
            </Button>
          </div>
        </motion.div>
        
        {/* Prohibited and Restricted Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Prohibited Items */}
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Prohibited Items</h2>
                <p className="text-gray-600">
                  These items are not allowed on board our aircraft under any circumstances.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              {prohibitedItems.map((category, index) => (
                <div key={index}>
                  <h3 className="font-semibold mb-3">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-gray-700">
                        <div className="bg-red-50 p-1 rounded-full mt-0.5 shrink-0">
                          <AlertCircle className="h-3 w-3 text-red-600" />
                        </div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Restricted Items */}
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-amber-100 p-2 rounded-full">
                <Info className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Restricted Items</h2>
                <p className="text-gray-600">
                  These items are allowed with certain limitations or require special handling.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              {restrictedItems.map((item, index) => (
                <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold mb-2">{item.category}</h3>
                  <p className="text-sm text-gray-700">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-amber-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800">Important Notice</h4>
                  <p className="text-sm text-amber-700">
                    Different countries may have additional restrictions. Always check the customs regulations 
                    of your destination country before traveling.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Baggage Tips */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold mb-6">Baggage Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Packing Smart',
                tips: [
                  'Roll clothes instead of folding to save space',
                  'Use packing cubes to organize your items',
                  'Place heavy items at the bottom of the bag',
                  'Pack liquids in sealed plastic bags',
                  'Leave space for souvenirs'
                ]
              },
              {
                title: 'Protecting Your Luggage',
                tips: [
                  'Use luggage tags with contact information',
                  'Choose distinctive luggage for easy identification',
                  'Consider a TSA-approved lock',
                  'Take a photo of your luggage before check-in',
                  'Pack valuables in your carry-on'
                ]
              },
              {
                title: 'Check-in Process',
                tips: [
                  'Arrive at least 3 hours before international flights',
                  'Have your ID and ticket ready',
                  'Remove old baggage tags',
                  'Weigh your luggage at home before departure',
                  'Keep your baggage receipt safe'
                ]
              }
            ].map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-gray-700">
                      <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* FAQ and Support */}
        <motion.div 
          className="bg-purple-600 rounded-xl p-6 text-white shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-semibold mb-2">Need More Help?</h2>
              <p className="text-purple-100">
                Contact our baggage specialists for any questions about your specific needs.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                Contact Baggage Service
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                View FAQ
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

// Component for displaying baggage allowance content
const BaggageAllowanceContent = ({ data, cabinType }: { data: any, cabinType: string }) => {
   // Component for displaying checked baggage allowance
  const CheckedBaggageCard = ({ allowance, title }: { allowance: any, title: string }) => (
    <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow">
      <h4 className="font-semibold mb-3">{title}</h4>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-purple-600" />
          <div>
            <div className="text-sm text-gray-500">Pieces</div>
            <div className="font-medium">{allowance.pieces} {allowance.pieces === 1 ? 'bag' : 'bags'}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CircleDollarSign className="h-5 w-5 text-purple-600" />
          <div>
            <div className="text-sm text-gray-500">Weight Limit</div>
            <div className="font-medium">{allowance.weight}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Plane className="h-5 w-5 text-purple-600" />
          <div>
            <div className="text-sm text-gray-500">Size Limit</div>
            <div className="font-medium">{allowance.dimensions}</div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Cabin Baggage */}
        <div className="bg-white rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-full">
              <Plane className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold">Cabin Baggage</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Pieces</div>
                <div className="font-medium">{data.cabinBaggage.pieces} {data.cabinBaggage.pieces === 1 ? 'bag' : 'bags'}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CircleDollarSign className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Weight Limit</div>
                <div className="font-medium">{data.cabinBaggage.weight}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-500">Size Limit</div>
                <div className="font-medium">{data.cabinBaggage.dimensions}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Standard Checked Baggage */}
        <CheckedBaggageCard allowance={data.checkedBaggage.standard} title="Standard Checked Baggage" />
        
        {/* Elite/Loyalty Checked Baggage */}
        <CheckedBaggageCard allowance={data.checkedBaggage.elite} title="Elite Member Baggage" />
      </div>
      
      <div className="bg-gray-50 rounded-lg p-5 mb-6">
        <h3 className="font-semibold mb-3">Special Items Allowance</h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
          {data.specialItems.map((item: string, index: number) => (
            <li key={index} className="flex items-start gap-2 text-gray-700">
              <ArrowRight className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg flex items-start gap-3">
        <Info className="h-5 w-5 text-purple-600 mt-0.5" />
        <div>
          <h4 className="font-semibold text-purple-800 mb-1">Note for {cabinType} Passengers</h4>
          <p className="text-sm text-purple-700">
            Baggage allowances may vary by route and ticket type. Elite members of our loyalty program 
            receive additional baggage benefits. Check your ticket or booking confirmation for your specific allowance.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BaggageInfo;
