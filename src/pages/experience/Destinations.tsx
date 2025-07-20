import { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin, ArrowRight, Globe } from 'lucide-react';

// Define types
interface Destination {
  id: number;
  name: string;
  country: string;
  image: string;
  description: string;
  price: string;
  flightTime: string;
}

// This would typically come from an API
const popularDestinations = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9357976b82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Experience the romance of the City of Light with its iconic landmarks and culinary delights.',
    price: '€349',
    flightTime: '2h 15m'
  },
  {
    id: 2,
    name: 'New York',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Visit the Big Apple for iconic skyscrapers, Broadway shows, and multicultural neighborhoods.',
    price: '$789',
    flightTime: '8h 30m'
  },
  {
    id: 3,
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    description: 'Marvel at futuristic architecture and luxury shopping in this desert metropolis.',
    price: '₹42,500',
    flightTime: '3h 40m'
  },
  {
    id: 4,
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    description: 'Discover a blend of ultramodern and traditional in Japan\'s bustling capital.',
    price: '¥96,000',
    flightTime: '11h 55m'
  },
  {
    id: 5,
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    description: 'Relax on this stunning volcanic island with white-washed buildings and blue-domed churches.',
    price: '€420',
    flightTime: '3h 45m'
  },
  {
    id: 6,
    name: 'Cape Town',
    country: 'South Africa',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    description: 'Enjoy breathtaking scenery, from Table Mountain to pristine beaches and vineyards.',
    price: 'R8,500',
    flightTime: '11h 20m'
  },
];

// This would typically come from an API
const regions = [
  { id: 'europe', name: 'Europe', destinationCount: 58 },
  { id: 'asia', name: 'Asia Pacific', destinationCount: 43 },
  { id: 'americas', name: 'Americas', destinationCount: 32 },
  { id: 'middle-east', name: 'Middle East', destinationCount: 21 },
  { id: 'africa', name: 'Africa', destinationCount: 19 },
];

const DestinationsPage = () => {
  const [activeTab, setActiveTab] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [destinations, setDestinations] = useState(popularDestinations);
  const [filteredDestinations, setFilteredDestinations] = useState(popularDestinations);
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, this would fetch from an API
  const fetchDestinations = (region: string) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (region === 'all') {
        setDestinations(popularDestinations);
      } else {
        // Filter destinations based on region (this is a mock)
        // In a real app, you'd make a proper API call with the region as a parameter
        setDestinations(popularDestinations.filter((_, i) => i % 2 === (region === 'europe' ? 0 : 1)));
      }
      setIsLoading(false);
    }, 800);
  };

  // Handle search and filtering
  useEffect(() => {
    if (searchQuery) {
      const filtered = destinations.filter(
        dest => dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                dest.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations(destinations);
    }
  }, [searchQuery, destinations]);

  // Handle region change
  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    fetchDestinations(region);
  };

  return (
    <PageLayout 
      title="Destinations" 
      subtitle="Explore our global network of over 160 destinations"
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
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search destinations" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-6"
                />
              </div>
              <div className="flex-1 relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select 
                  className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  value={selectedRegion}
                  onChange={(e) => handleRegionChange(e.target.value)}
                >
                  <option value="all">All Regions</option>
                  {regions.map(region => (
                    <option key={region.id} value={region.id}>{region.name}</option>
                  ))}
                </select>
              </div>
              <Button variant="qatar" className="py-6">
                Search Destinations
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div 
          className="mb-8 flex overflow-x-auto scrollbar-hide space-x-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            { id: 'popular', label: 'Popular Destinations' },
            { id: 'trending', label: 'Trending Now' },
            { id: 'seasonal', label: 'Seasonal Getaways' },
            { id: 'luxury', label: 'Luxury Travel' },
            { id: 'adventure', label: 'Adventure Destinations' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              } transition-colors`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Region Highlights */}
        <motion.div
          className="mb-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {regions.map((region, index) => (
            <motion.div 
              key={region.id}
              className={`p-4 text-center rounded-lg cursor-pointer border-2 transition-all ${
                selectedRegion === region.id 
                  ? 'border-purple-600 bg-purple-50' 
                  : 'border-transparent bg-white hover:bg-gray-50'
              }`}
              onClick={() => handleRegionChange(region.id)}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{type: "spring", stiffness: 300, duration: 0.3, delay: index * 0.1 }}
            >
              <h3 className="font-medium mb-1">{region.name}</h3>
              <p className="text-sm text-gray-500">{region.destinationCount} destinations</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Destinations Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <>
            {filteredDestinations.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold">No destinations found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search criteria</p>
              </div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                {filteredDestinations.map((destination) => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </motion.div>
            )}
          </>
        )}

        {/* World Map Section */}
        <motion.div 
          className="mt-16 bg-white p-8 rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Our Global Network</h2>
          <div className="aspect-[16/9] bg-gray-100 rounded-lg flex justify-center items-center">
            <p className="text-gray-500">Interactive world map would be displayed here with flight routes</p>
            <p className="text-sm text-gray-400 mt-2">(Requires a paid mapping API integration)</p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">
              Connecting you to over 160 destinations across six continents
            </p>
            <Button variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-50">
              View Full Network
            </Button>
          </div>
        </motion.div>

        {/* Promotional Banner */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Ready to explore the world?</h2>
              <p className="max-w-2xl">
                Book your next adventure today and enjoy special fares to our newest destinations.
              </p>
            </div>
            <Button variant="qatar" className="mt-4 md:mt-0 whitespace-nowrap group">
              Book Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* Travel Guide Section */}
        <motion.div 
          className="mt-16 mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6">Travel Guides & Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Travel Requirements Guide",
                description: "Everything you need to know about visa requirements, COVID-19 protocols, and entry regulations for different countries.",
                link: "/travel/travel-requirements"
              },
              {
                title: "Destination Guides",
                description: "Detailed guides with insider tips, must-visit attractions, local cuisine recommendations, and cultural insights.",
                link: "#"
              },
              {
                title: "Seasonal Travel Calendar",
                description: "Find the best time to visit your dream destinations with our comprehensive seasonal travel guide.",
                link: "#"
              }
            ].map((guide, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-2">{guide.title}</h3>
                <p className="text-gray-600 mb-4">{guide.description}</p>
                <a 
                  href={guide.link} 
                  className="inline-flex items-center text-purple-600 font-medium hover:text-purple-800"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

const DestinationCard = ({ destination }: { destination: Destination }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative h-52 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
          {destination.price}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold">{destination.name}</h3>
            <div className="flex items-center text-gray-500 text-sm">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {destination.country}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium">{destination.flightTime}</span> flight
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          {destination.description}
        </p>
        <div className="flex justify-between items-center">
          <Button variant="link" className="text-purple-600 p-0 hover:text-purple-800 hover:no-underline">
            View Destination
          </Button>
          <Button variant="outline" size="sm" className="border-purple-600 text-purple-600 hover:bg-purple-50">
            Book Flight
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationsPage;
