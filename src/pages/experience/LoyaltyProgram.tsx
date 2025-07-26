import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Award,
  Star,
  Plane,
  Hotel,
  CreditCard,
  Gift,
  User,
  Calculator,
  Globe,
  ShoppingCart,
  Check,
  CircleAlert,
} from "lucide-react";

const LoyaltyProgram = () => {
  return (
    <PageLayout
      title="SkyWays Elite Rewards"
      subtitle="Experience exclusive privileges and benefits with our loyalty program"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-3 p-8 lg:p-12 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="mb-4 flex items-center">
                    <Award className="h-8 w-8 mr-3 text-yellow-300" />
                    <h2 className="text-3xl md:text-4xl font-bold">
                      SkyWays Elite Rewards
                    </h2>
                  </div>
                  <p className="text-lg mb-8 text-white/85">
                    Join our award-winning loyalty program and unlock a world of
                    premium benefits, exclusive offers, and extraordinary
                    experiences.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-8">
                    {[
                      "Earn miles on flights & partners",
                      "Redeem for flights & upgrades",
                      "Access to exclusive lounges",
                      "Priority check-in & boarding",
                      "Extra baggage allowance",
                      "Exclusive member promotions",
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-5 w-5 mr-2 text-yellow-300" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="secondary"
                      className="group bg-white text-purple-800 hover:bg-gray-100"
                    >
                      Join Now{" "}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-transparent border-white text-white hover:bg-white/10"
                    >
                      Already a Member? Sign In
                    </Button>
                  </div>
                </motion.div>
              </div>
              <div className="hidden lg:block lg:col-span-2 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Business class experience"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Earning and redeeming rewards is simple with SkyWays Elite. Just
              follow these steps to maximize your benefits and enjoy premium
              travel experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                icon: User,
                title: "Join the Program",
                description:
                  "Sign up for free and receive your membership number instantly.",
              },
              {
                icon: Plane,
                title: "Earn Miles",
                description:
                  "Fly with SkyWays or spend with our partners to accumulate miles.",
              },
              {
                icon: Award,
                title: "Reach Elite Status",
                description:
                  "Progress through membership tiers to unlock premium benefits.",
              },
              {
                icon: Gift,
                title: "Enjoy Rewards",
                description:
                  "Redeem miles for flights, upgrades, hotels, and exclusive experiences.",
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm text-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-gray-300" />
                    </div>
                  )}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Membership Tiers */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Elite Membership Tiers
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              As you fly more with SkyWays, you'll progress through our
              membership tiers, each offering increasingly valuable benefits and
              exclusive privileges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                name: "Blue",
                qualification: "Enrollment",
                color: "bg-blue-500",
                benefits: [
                  "Earn miles on flights",
                  "Online account management",
                  "Exclusive member promotions",
                  "Digital membership card",
                ],
              },
              {
                name: "Silver",
                qualification: "15,000 miles or 20 flights",
                color: "bg-gray-400",
                benefits: [
                  "All Blue benefits",
                  "+25% bonus miles",
                  "Priority check-in",
                  "Extra baggage allowance",
                ],
              },
              {
                name: "Gold",
                qualification: "35,000 miles or 50 flights",
                color: "bg-yellow-500",
                benefits: [
                  "All Silver benefits",
                  "+50% bonus miles",
                  "Lounge access",
                  "Priority boarding",
                  "Guaranteed seat availability",
                ],
              },
              {
                name: "Platinum",
                qualification: "75,000 miles or 90 flights",
                color: "bg-gradient-to-r from-purple-600 to-indigo-700",
                benefits: [
                  "All Gold benefits",
                  "+100% bonus miles",
                  "Global lounge access",
                  "Fast track security",
                  "Complimentary upgrades",
                  "Personal concierge service",
                ],
              },
            ].map((tier, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`h-2 ${tier.color}`}></div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    <div className="flex">
                      {Array.from({ length: index + 1 }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 text-yellow-500 fill-yellow-500"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">
                    Qualification: {tier.qualification}
                  </p>

                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    Key Benefits:
                  </h4>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 text-center">
                  <Button
                    variant="ghost"
                    className="text-purple-700 hover:text-purple-800 hover:bg-gray-100"
                  >
                    View Full Benefits
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ways to Earn & Redeem */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="earn" className="w-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ways to Earn & Redeem
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto mb-6">
                There are many ways to earn and use your SkyWays Elite miles.
                Choose what works best for you.
              </p>
              <TabsList className="bg-gray-100 p-1">
                <TabsTrigger value="earn" className="py-2 px-6">
                  Earn Miles
                </TabsTrigger>
                <TabsTrigger value="redeem" className="py-2 px-6">
                  Redeem Miles
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="earn" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Plane,
                    title: "Flights",
                    description:
                      "Earn miles on every SkyWays flight and with our alliance partner airlines.",
                    items: [
                      "Based on fare and distance",
                      "Bonus miles for premium cabins",
                      "Tier bonus for elite members",
                      "Special promotions for extra miles",
                    ],
                  },
                  {
                    icon: CreditCard,
                    title: "Co-branded Credit Cards",
                    description:
                      "Earn miles on everyday purchases with our banking partners' credit cards.",
                    items: [
                      "Miles for every dollar spent",
                      "Welcome bonuses up to 30,000 miles",
                      "Bonus categories for travel & dining",
                      "Annual loyalty bonuses",
                    ],
                  },
                  {
                    icon: Hotel,
                    title: "Hotel Stays",
                    description:
                      "Earn miles when staying at our partner hotels worldwide.",
                    items: [
                      "500-2,000 miles per stay",
                      "Additional points at luxury partners",
                      "Bonus miles for hotel packages",
                      "Special rates for Elite members",
                    ],
                  },
                  {
                    icon: ShoppingCart,
                    title: "Shopping",
                    description:
                      "Shop online through our portal and earn miles on your purchases.",
                    items: [
                      "100+ retail partners",
                      "Up to 10 miles per dollar spent",
                      "Seasonal shopping bonuses",
                      "Exclusive member-only deals",
                    ],
                  },
                  {
                    icon: Car,
                    title: "Car Rentals",
                    description:
                      "Earn miles with every car rental from our partner agencies.",
                    items: [
                      "Up to 1,000 miles per rental",
                      "Bonus for premium vehicles",
                      "Special elite member offers",
                      "Free upgrades with points",
                    ],
                  },
                  {
                    icon: Gift,
                    title: "Promotions",
                    description:
                      "Take advantage of special offers and promotions for bonus miles.",
                    items: [
                      "Seasonal mile multipliers",
                      "Partner promotions",
                      "Transfer bonuses",
                      "Anniversary bonuses",
                    ],
                  },
                ].map((method, index) => {
                  const Icon = method.icon || Award;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-100 p-2 rounded-lg mr-4">
                          <Icon className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold">
                          {method.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {method.description}
                      </p>
                      <ul className="space-y-2">
                        {method.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="redeem" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Plane,
                    title: "Award Flights",
                    description:
                      "Use your miles to book flights on SkyWays and partner airlines.",
                    items: [
                      "One-way from 8,000 miles",
                      "Round-trip from 15,000 miles",
                      "Premium cabins available",
                      "No blackout dates on SkyWays",
                    ],
                  },
                  {
                    icon: ArrowUpCircle,
                    title: "Upgrades",
                    description:
                      "Use your miles to upgrade to premium cabins for a superior experience.",
                    items: [
                      "From Economy to Business",
                      "From Business to First",
                      "Waitlist priority for elite members",
                      "Last-minute upgrade opportunities",
                    ],
                  },
                  {
                    icon: Hotel,
                    title: "Hotel Stays",
                    description:
                      "Redeem miles for stays at partner hotels and resorts worldwide.",
                    items: [
                      "From 10,000 miles per night",
                      "Luxury properties available",
                      "Room upgrades with miles",
                      "Hotel + flight packages",
                    ],
                  },
                  {
                    icon: Car,
                    title: "Car Rentals",
                    description:
                      "Use your miles to rent vehicles from economy to luxury.",
                    items: [
                      "From 8,000 miles per day",
                      "Premium vehicles available",
                      "Includes insurance coverage",
                      "Worldwide availability",
                    ],
                  },
                  {
                    icon: ShoppingBag,
                    title: "Merchandise",
                    description:
                      "Redeem miles for electronics, fashion items, and more in our online store.",
                    items: [
                      "Electronics from 15,000 miles",
                      "Travel accessories",
                      "Luxury brand products",
                      "Exclusive member merchandise",
                    ],
                  },
                  {
                    icon: TicketIcon,
                    title: "Experiences",
                    description:
                      "Use your miles for exclusive events, concerts, and special experiences.",
                    items: [
                      "Sporting events",
                      "Concert tickets",
                      "Culinary experiences",
                      "VIP airport services",
                    ],
                  },
                ].map((method, index) => {
                  const Icon = method.icon || Gift;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center mb-4">
                        <div className="bg-purple-100 p-2 rounded-lg mr-4">
                          <Icon className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold">
                          {method.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {method.description}
                      </p>
                      <ul className="space-y-2">
                        {method.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-sm text-gray-600"
                          >
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2 mt-1.5"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Mile Calculator */}
        <motion.div
          className="mb-16 bg-gray-50 p-8 rounded-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-4">
                <Calculator className="h-6 w-6 mr-3 text-purple-600" />
                <h2 className="text-2xl font-bold">Miles Calculator</h2>
              </div>
              <p className="text-gray-600 mb-6">
                See how many miles you can earn on your next flight or how many
                miles you'll need for your dream destination. Our calculator
                helps you plan your rewards strategy.
              </p>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From
                    </label>
                    <Input placeholder="Departure City" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To
                    </label>
                    <Input placeholder="Destination City" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cabin Class
                    </label>
                    <select className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none">
                      <option>Economy</option>
                      <option>Premium Economy</option>
                      <option>Business</option>
                      <option>First</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fare Type
                    </label>
                    <select className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none">
                      <option>Flexible</option>
                      <option>Standard</option>
                      <option>Saver</option>
                      <option>Special Offer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Membership Tier
                    </label>
                    <select className="w-full h-10 px-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none">
                      <option>Blue</option>
                      <option>Silver</option>
                      <option>Gold</option>
                      <option>Platinum</option>
                    </select>
                  </div>
                  <Button variant="qatar" className="w-full mt-2">
                    Calculate Miles
                  </Button>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 mr-3 text-purple-600" />
                <h2 className="text-2xl font-bold">
                  Popular Award Destinations
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                Discover how far your miles can take you with these popular
                redemption options. All mileage amounts shown are for round-trip
                economy class tickets.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    from: "New York",
                    to: "London",
                    miles: "60,000",
                    imgUrl:
                      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                  },
                  {
                    from: "Chicago",
                    to: "Tokyo",
                    miles: "80,000",
                    imgUrl:
                      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                  },
                  {
                    from: "Los Angeles",
                    to: "Sydney",
                    miles: "100,000",
                    imgUrl:
                      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                  },
                  {
                    from: "Miami",
                    to: "Paris",
                    miles: "70,000",
                    imgUrl:
                      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                  },
                ].map((destination, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow-sm relative group"
                  >
                    <div className="h-32 overflow-hidden">
                      <img
                        src={destination.imgUrl}
                        alt={destination.to}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">
                          {destination.from} → {destination.to}
                        </span>
                        <span className="text-purple-600 font-semibold">
                          {destination.miles}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          Round-trip Economy
                        </span>
                        <span className="text-xs text-gray-500">miles</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  View All Destinations
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partner Airlines */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Partner Airlines
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Earn and redeem miles with our global network of airline partners,
              expanding your travel possibilities worldwide.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center h-20 bg-gray-50 rounded-lg"
                >
                  <div className="text-gray-400 text-center">
                    <p>Airline Logo</p>
                    <p className="text-xs">(Placeholder)</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                View All Partners
              </Button>
            </div>
          </div>
        </motion.div>

        {/* App Promotion */}
        <motion.div
          className="mb-16 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 lg:p-12 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Download the SkyWays Mobile App
              </h2>
              <p className="mb-6">
                Manage your Elite rewards, track your miles, and access your
                digital membership card anytime, anywhere with our mobile app.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "View and manage your miles",
                  "Digital membership card",
                  "Book flights with miles",
                  "Real-time flight alerts",
                  "Exclusive app-only offers",
                  "Offline access to boarding passes",
                ].map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-300" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="secondary"
                  className="bg-white text-purple-700 hover:bg-gray-100"
                >
                  Download for iOS
                </Button>
                <Button
                  variant="secondary"
                  className="bg-white text-purple-700 hover:bg-gray-100"
                >
                  Download for Android
                </Button>
              </div>
            </div>
            <div className="hidden lg:block relative p-12">
              <div className="bg-white/10 backdrop-blur-sm w-full h-full rounded-xl overflow-hidden shadow-lg flex items-center justify-center">
                <div className="text-white text-center">
                  <p>App Screenshot</p>
                  <p className="text-sm opacity-70">(Placeholder image)</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Have questions about our loyalty program? Find answers to commonly
              asked questions below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How do I join SkyWays Elite Rewards?",
                answer:
                  "Joining is free and easy. You can sign up online through our website, through the mobile app, or at any SkyWays check-in counter. You'll receive your membership number instantly and can start earning miles right away.",
              },
              {
                question: "When do my miles expire?",
                answer:
                  "For Blue members, miles expire after 24 months of inactivity. For Silver members and above, miles never expire as long as you maintain your elite status. Any qualifying activity (earning or redeeming miles) resets the expiration clock.",
              },
              {
                question: "Can I transfer miles to another member?",
                answer:
                  "Yes, you can transfer miles to other SkyWays Elite members. There is a small fee of $10 plus 1¢ per mile transferred. Gold and Platinum members receive one free transfer per year up to 50,000 miles.",
              },
              {
                question: "How do I reach elite status?",
                answer:
                  "Elite status is based on either the number of miles earned or segments flown within a calendar year. You need 15,000 miles or 20 segments for Silver, 35,000 miles or 50 segments for Gold, and 75,000 miles or 90 segments for Platinum.",
              },
              {
                question: "Can family members share benefits?",
                answer:
                  "Yes, through our Family Program, you can pool miles with up to 8 family members. Elite members can also nominate one family member annually to receive select elite benefits like priority check-in and extra baggage allowance.",
              },
              {
                question:
                  "What happens to my miles when I book an award flight and then cancel?",
                answer:
                  "If you cancel an award flight, the miles will be returned to your account. Cancellations made at least 72 hours before departure have no fee. Later cancellations incur a fee of $50 or 5,000 miles. Elite Gold and Platinum members have reduced or waived fees.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold mb-2 flex items-center">
                  <CircleAlert className="h-5 w-5 text-purple-600 mr-2" />
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="border-purple-800 text-purple-800 hover:bg-purple-50"
            >
              View All FAQs
            </Button>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-xl overflow-hidden shadow-lg text-white p-8 text-center">
            <Award className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to start earning rewards?
            </h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join SkyWays Elite Rewards today and start your journey towards
              premium travel experiences, exclusive benefits, and extraordinary
              destinations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                variant="secondary"
                className="group bg-white text-purple-800 hover:bg-gray-100"
              >
                Join Now{" "}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                Learn More About Benefits
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

const Car = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.2-.9-1.9-1L9 6.3c-.7-.1-1.5 0-2.2.3L3 9.1c-.5.3-.8.8-.8 1.4v4c0 .8.7 1.5 1.5 1.5H6" />
      <circle cx="9" cy="17" r="2" />
      <path d="M9 15v-4" />
      <circle cx="15" cy="17" r="2" />
    </svg>
  );
};

const ArrowUpCircle = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m16 12-4-4-4 4" />
      <path d="M12 16V8" />
    </svg>
  );
};

const ShoppingBag = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
};

const TicketIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <path d="M13 5v2" />
      <path d="M13 17v2" />
      <path d="M13 11v2" />
    </svg>
  );
};

export default LoyaltyProgram;
