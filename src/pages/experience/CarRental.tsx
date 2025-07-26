import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Calendar,
  MapPin,
  Car,
  ArrowRight,
  Users,
  Shield,
  Clock,
  CheckCircle,
  Fuel,
} from "lucide-react";

// Define interface for Car type
interface CarType {
  id: number;
  name: string;
  image: string;
  pricePerDay: string;
  seats: number;
  luggage: string;
  transmission: string;
  sample: string;
  features: string[];
}

// Car rental data that would normally come from an API
const carTypes = [
  {
    id: 1,
    name: "Economy",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    pricePerDay: "€25",
    seats: 4,
    luggage: "2 Small Bags",
    transmission: "Manual",
    sample: "Toyota Yaris or similar",
    features: ["Air Conditioning", "Bluetooth", "Cruise Control"],
  },
  {
    id: 2,
    name: "Compact",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    pricePerDay: "€35",
    seats: 5,
    luggage: "2 Large Bags",
    transmission: "Automatic",
    sample: "Volkswagen Golf or similar",
    features: ["Air Conditioning", "Bluetooth", "Cruise Control", "USB Port"],
  },
  {
    id: 3,
    name: "SUV",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    pricePerDay: "€55",
    seats: 5,
    luggage: "3 Large Bags",
    transmission: "Automatic",
    sample: "Toyota RAV4 or similar",
    features: [
      "Air Conditioning",
      "Bluetooth",
      "GPS Navigation",
      "Backup Camera",
    ],
  },
  {
    id: 4,
    name: "Premium",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    pricePerDay: "€75",
    seats: 5,
    luggage: "3 Large Bags",
    transmission: "Automatic",
    sample: "BMW 3 Series or similar",
    features: [
      "Leather Seats",
      "GPS Navigation",
      "Premium Sound System",
      "Panoramic Roof",
    ],
  },
  {
    id: 5,
    name: "Luxury",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1425&q=80",
    pricePerDay: "€120",
    seats: 5,
    luggage: "3 Large Bags",
    transmission: "Automatic",
    sample: "Mercedes-Benz E-Class or similar",
    features: [
      "Premium Leather Seats",
      "Advanced Safety Features",
      "Premium Sound System",
      "Concierge Service",
    ],
  },
  {
    id: 6,
    name: "Van/Minivan",
    image:
      "https://images.unsplash.com/photo-1558383817-8ea77131155b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    pricePerDay: "€65",
    seats: 7,
    luggage: "4 Large Bags",
    transmission: "Automatic",
    sample: "Chrysler Pacifica or similar",
    features: [
      "7+ Seats",
      "Spacious Interior",
      "USB Charging Ports",
      "Sliding Doors",
    ],
  },
];

// Popular locations data
const popularLocations = [
  { name: "Paris Charles de Gaulle Airport", code: "CDG" },
  { name: "New York JFK Airport", code: "JFK" },
  { name: "London Heathrow Airport", code: "LHR" },
  { name: "Dubai International Airport", code: "DXB" },
  { name: "Tokyo Haneda Airport", code: "HND" },
  { name: "Singapore Changi Airport", code: "SIN" },
];

const CarRentalPage = () => {
  const [searchParams, setSearchParams] = useState({
    pickupLocation: "",
    pickupDate: "",
    pickupTime: "10:00",
    returnDate: "",
    returnTime: "10:00",
  });

  const [showAllCarTypes, setShowAllCarTypes] = useState(false);
  const displayedCarTypes = showAllCarTypes ? carTypes : carTypes.slice(0, 3);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, this would make an API call with the search parameters
    alert("Searching for cars with the specified criteria");
  };

  return (
    <PageLayout
      title="Car Rental"
      subtitle="Find the perfect vehicle for your journey"
    >
      <div className="max-w-7xl mx-auto">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Pick-up location"
                    name="pickupLocation"
                    value={searchParams.pickupLocation}
                    onChange={handleInputChange}
                    className="pl-10 py-6"
                    list="locations"
                  />
                  <datalist id="locations">
                    {popularLocations.map((location) => (
                      <option key={location.code} value={location.name} />
                    ))}
                  </datalist>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="date"
                      placeholder="Pick-up date"
                      name="pickupDate"
                      value={searchParams.pickupDate}
                      onChange={handleInputChange}
                      className="pl-10 py-6"
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="pickupTime"
                      value={searchParams.pickupTime}
                      onChange={handleInputChange}
                      className="w-full h-12 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    >
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
                        const formattedHour = hour.toString().padStart(2, "0");
                        return (
                          <option
                            key={hour}
                            value={`${formattedHour}:00`}
                          >{`${formattedHour}:00`}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Return location (same as pick-up)"
                    disabled
                    className="pl-10 py-6 bg-gray-50"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-purple-600"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Different return
                      </span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      type="date"
                      placeholder="Return date"
                      name="returnDate"
                      value={searchParams.returnDate}
                      onChange={handleInputChange}
                      className="pl-10 py-6"
                    />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="returnTime"
                      value={searchParams.returnTime}
                      onChange={handleInputChange}
                      className="w-full h-12 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    >
                      {Array.from({ length: 24 }, (_, i) => i).map((hour) => {
                        const formattedHour = hour.toString().padStart(2, "0");
                        return (
                          <option
                            key={hour}
                            value={`${formattedHour}:00`}
                          >{`${formattedHour}:00`}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button type="submit" variant="qatar" className="py-6 px-10">
                  <Search className="mr-2 h-4 w-4" /> Search Cars
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Popular Car Types */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Browse Car Types</h2>
            <Button
              variant="outline"
              className="border-purple-800 text-purple-800 hover:bg-purple-50"
              onClick={() => setShowAllCarTypes(!showAllCarTypes)}
            >
              {showAllCarTypes ? "Show Less" : "View All"}
            </Button>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {displayedCarTypes.map((car) => (
              <CarTypeCard key={car.id} car={car} />
            ))}
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          className="mb-16 bg-white p-8 rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            Why Rent with SkyWays
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: CheckCircle,
                title: "No Hidden Fees",
                description:
                  "Transparent pricing with all taxes and essential fees included",
              },
              {
                icon: Shield,
                title: "Full Insurance",
                description:
                  "Comprehensive coverage options to protect you during your rental",
              },
              {
                icon: Clock,
                title: "Free Cancellation",
                description:
                  "Cancel up to 48 hours before pick-up with no penalty",
              },
              {
                icon: ArrowRight,
                title: "Earn Miles",
                description:
                  "Collect SkyWays miles on every rental to redeem for future travel",
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  className="text-center p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 rounded-full mb-4">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Promotional Banner */}
        <motion.div
          className="mb-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 flex flex-col justify-center text-white">
              <h2 className="text-2xl font-bold mb-4">
                Premium Vehicle Selection
              </h2>
              <p className="mb-6">
                Enjoy exclusive rates on luxury and premium vehicles when you
                book with your SkyWays membership. Experience the thrill of
                driving top-tier models from prestigious brands.
              </p>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 self-start"
              >
                Explore Premium Fleet
              </Button>
            </div>
            <div className="bg-gray-200 h-64 md:h-auto">
              <img
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Luxury Car"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Popular Rental Locations */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8">Popular Rental Locations</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularLocations.map((location, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold mb-1">{location.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Car className="mr-1 h-4 w-4" />
                      <span>All car types available</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold bg-gray-100 px-2 py-1 rounded">
                    {location.code}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    24/7 pick-up available
                  </span>
                  <Button
                    variant="link"
                    className="text-purple-600 p-0 hover:text-purple-800 hover:no-underline"
                  >
                    View Deals
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          className="mb-16 bg-white p-8 rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            How Car Rental Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Search & Select",
                description:
                  "Enter your pick-up location and dates, then browse available vehicles and choose the one that fits your needs.",
              },
              {
                step: 2,
                title: "Book & Confirm",
                description:
                  "Complete your booking online in minutes. Receive instant confirmation with all rental details by email.",
              },
              {
                step: 3,
                title: "Pick Up & Go",
                description:
                  "Show your confirmation, driving license, and payment card at the rental desk. Then hit the road and enjoy your journey!",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-purple-800">
                    {item.step}
                  </span>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-6 left-12 w-full h-0.5 bg-purple-100"></div>
                )}
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mb-16 bg-gray-50 p-8 rounded-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What do I need to rent a car?",
                answer:
                  "To rent a car, you typically need a valid driver`s license, a credit card in the main driver`s name, and a passport or ID. Age requirements vary by location and car category, but drivers typically need to be at least 21 years old.",
              },
              {
                question: "Is insurance included in the rental price?",
                answer:
                  "Basic insurance is typically included in our quoted prices. However, we offer additional coverage options for greater peace of mind. The specific coverage details are clearly displayed during the booking process.",
              },
              {
                question: "Can I add additional drivers to my rental?",
                answer:
                  "Yes, you can add additional drivers to your rental. Each additional driver needs to meet the same requirements as the main driver and must be present at pick-up with their valid driver`s license.",
              },
              {
                question: "What is the fuel policy?",
                answer:
                  'Our standard fuel policy is "Full to Full." This means you`ll receive the car with a full tank and are expected to return it with a full tank. If the car is returned with less fuel, a refueling fee plus the cost of the missing fuel will apply.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="qatar" className="group">
              View All FAQs{" "}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-4">
            Ready to Book Your Perfect Ride?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Find the ideal vehicle for your journey with our extensive selection
            and unbeatable rates. Book now and enjoy a seamless rental
            experience.
          </p>
          <Button variant="qatar" className="py-6 px-10 group">
            Find Your Car{" "}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
};

const CarTypeCard = ({ car }: { car: CarType }) => {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -10 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
          From {car.pricePerDay}/day
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">{car.name}</h3>
            <p className="text-sm text-gray-500">{car.sample}</p>
          </div>
          <div className="flex items-center text-sm bg-purple-50 px-2 py-1 rounded text-purple-700">
            <Users className="h-3.5 w-3.5 mr-1" /> {car.seats} seats
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center">
            <Fuel className="h-3.5 w-3.5 mr-1 text-gray-500" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center">
            <Car className="h-3.5 w-3.5 mr-1 text-gray-500" />
            <span>{car.luggage}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {car.features.slice(0, 3).map((feature: string, index: number) => (
            <div key={index} className="flex items-center text-sm">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
              <span className="text-gray-600">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="link"
            className="text-purple-600 p-0 hover:text-purple-800 hover:no-underline"
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-purple-600 text-purple-600 hover:bg-purple-50"
          >
            Select
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CarRentalPage;
