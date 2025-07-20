import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Calendar, 
  MapPin, 
  Star,
  ArrowRight, 
  Check,
  Shield,
} from 'lucide-react';

// Define interfaces
interface Hotel {
  id: number;
  name: string;
  location: string;
  image: string;
  price: string;
  rating: number;
  reviewCount?: number; // Make this optional
  amenities: string[];
  description: string;
}

// Hotel data that would normally come from an API
const hotels = [
  {
    id: 1,
    name: 'SkyWays Grand Hotel',
    location: 'Paris, France',
    rating: 5,
    price: '€250',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    amenities: ['Free WiFi', 'Spa', 'Pool', 'Fine Dining', 'Airport Shuttle'],
    description: 'Experience unparalleled luxury in the heart of Paris, with stunning views of the Eiffel Tower.'
  },
  {
    id: 2,
    name: 'SkyWays Resort & Spa',
    location: 'Santorini, Greece',
    rating: 5,
    price: '€380',
    image: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    amenities: ['Private Pool', 'Sea View', 'Spa', 'Gourmet Dining', 'Concierge'],
    description: 'Cliffside luxury with breathtaking sunset views, featuring infinity pools and authentic Greek cuisine.'
  },
  {
    id: 3,
    name: 'SkyWays Business Center',
    location: 'London, UK',
    rating: 4.5,
    price: '£189',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    amenities: ['Business Center', 'Meeting Rooms', 'Express Check-in', 'Fitness Center', '24h Room Service'],
    description: 'Designed for the modern business traveler, with state-of-the-art facilities and central location.'
  },
  {
    id: 4,
    name: 'SkyWays Beach Resort',
    location: 'Maldives',
    rating: 5,
    price: '$520',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    amenities: ['Overwater Villas', 'Private Beach', 'Water Sports', 'Spa', 'All-Inclusive'],
    description: 'Paradise on earth with overwater villas, crystal clear waters and unmatched privacy.'
  },
  {
    id: 5,
    name: 'SkyWays Urban Boutique',
    location: 'Tokyo, Japan',
    rating: 4.5,
    price: '¥32,000',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
    amenities: ['City View', 'Japanese Garden', 'Traditional Cuisine', 'Tech Hub', 'Cultural Experiences'],
    description: 'A blend of traditional Japanese aesthetics and modern luxury in Tokyo\'s vibrant center.'
  },
  {
    id: 6,
    name: 'SkyWays Desert Retreat',
    location: 'Dubai, UAE',
    rating: 5,
    price: 'AED 1,200',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    amenities: ['Desert Views', 'Private Pools', 'Luxury Transport', 'Spa', 'Arabian Dining'],
    description: 'Experience Arabian luxury in our desert oasis, with exclusive experiences and impeccable service.'
  }
];

const HotelsPage = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  });
  const [filteredHotels, setFilteredHotels] = useState(hotels);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // When the backend is ready, this would make an API call with the search parameters
    // For this demo, we'll just filter the hotels by location
    if (searchParams.location) {
      setFilteredHotels(hotels.filter(hotel => 
        hotel.location.toLowerCase().includes(searchParams.location.toLowerCase())
      ));
    } else {
      setFilteredHotels(hotels);
    }
  };

  return (
    <PageLayout 
      title="SkyWays Hotels" 
      subtitle="Luxury accommodations in top destinations worldwide"
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
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Destination or hotel name" 
                    name="location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    className="pl-10 py-6"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    type="date" 
                    placeholder="Check-in date" 
                    name="checkIn"
                    value={searchParams.checkIn}
                    onChange={handleInputChange}
                    className="pl-10 py-6"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    type="date" 
                    placeholder="Check-out date" 
                    name="checkOut"
                    value={searchParams.checkOut}
                    onChange={handleInputChange}
                    className="pl-10 py-6"
                  />
                </div>
                <div className="relative">
                  <select
                    name="guests"
                    value={searchParams.guests}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5+">5+ Guests</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit" variant="qatar" className="py-6">
                  <Search className="mr-2 h-4 w-4" /> Search Hotels
                </Button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Featured Hotels */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured SkyWays Hotels</h2>
            <Button variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-50">
              View All Hotels
            </Button>
          </div>

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
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </motion.div>
        </div>

        {/* SkyWays Hotels Benefits */}
        <motion.div 
          className="mb-16 bg-white p-8 rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Why Book with SkyWays Hotels</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Star,
                title: 'Exclusive Member Rates',
                description: 'Save up to 15% on hotel bookings with your SkyWays membership'
              },
              {
                icon: Check,
                title: 'Best Price Guarantee',
                description: "Find a lower rate and we'll match it, plus give you an additional 10% off"
              },
              {
                icon: Shield,
                title: 'Secure Booking',
                description: 'Your data is protected with the latest encryption technology'
              },
              {
                icon: ArrowRight,
                title: 'Earn Loyalty Points',
                description: 'Collect points on every stay and redeem for flights or future stays'
              }
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
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Hotel Collections */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Curated Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Luxury Escapes',
                image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                count: '24 properties'
              },
              {
                title: 'Business Hotels',
                image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                count: '32 properties'
              },
              {
                title: 'Beach Resorts',
                image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                count: '18 properties'
              },
              {
                title: 'City Breaks',
                image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                count: '41 properties'
              },
              {
                title: 'Family-Friendly',
                image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                count: '29 properties'
              },
              {
                title: 'Boutique Stays',
                image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
                count: '15 properties'
              }
            ].map((collection, index) => (
              <motion.div
                key={index}
                className="relative h-64 rounded-xl overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <img 
                  src={collection.image} 
                  alt={collection.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{collection.title}</h3>
                  <p className="text-sm opacity-80">{collection.count}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Membership Promo */}
        <motion.div 
          className="mb-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Join SkyWays Elite Hotel Program</h2>
              <p className="max-w-2xl">
                Enjoy exclusive benefits, earn points with every stay, and unlock premium perks like room upgrades,
                late check-out, and complimentary services.
              </p>
            </div>
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-purple-600"
            >
              Join Now
            </Button>
          </div>
        </motion.div>

        {/* Top Destinations */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8">Top Hotel Destinations</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { city: 'Paris', country: 'France', hotels: 24 },
              { city: 'Dubai', country: 'UAE', hotels: 18 },
              { city: 'London', country: 'UK', hotels: 32 },
              { city: 'New York', country: 'USA', hotels: 28 },
              { city: 'Tokyo', country: 'Japan', hotels: 15 },
              { city: 'Rome', country: 'Italy', hotels: 22 },
              { city: 'Singapore', country: 'Singapore', hotels: 14 },
              { city: 'Barcelona', country: 'Spain', hotels: 19 },
              { city: 'Sydney', country: 'Australia', hotels: 17 },
              { city: 'Istanbul', country: 'Turkey', hotels: 21 },
              { city: 'Bangkok', country: 'Thailand', hotels: 23 },
              { city: 'Bali', country: 'Indonesia', hotels: 16 }
            ].map((destination, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 rounded-lg text-center cursor-pointer hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.03 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <h3 className="font-semibold">{destination.city}</h3>
                <p className="text-sm text-gray-500">{destination.country}</p>
                <p className="text-xs text-purple-600 mt-1">{destination.hotels} hotels</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* FAQ Section */}
        <motion.div 
          className="mb-16 bg-white p-8 rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: 'How do I earn points with SkyWays Hotels?',
                answer: 'You earn points for every qualified stay at any SkyWays Hotel. Elite members earn bonus points based on their tier status. Points can be redeemed for free nights, room upgrades, or transferred to your flight miles.'
              },
              {
                question: 'What is the cancellation policy?',
                answer: 'Cancellation policies vary by hotel and rate type. Most bookings offer free cancellation up to 24-48 hours before check-in. Always check the specific terms when booking.'
              },
              {
                question: 'Can I combine hotel bookings with flight reservations?',
                answer: 'Yes! Book both together for exclusive package rates and earn bonus loyalty points. Look for our flight+hotel packages for the best deals.'
              },
              {
                question: 'Are breakfast and Wi-Fi included?',
                answer: 'Most SkyWays Hotels offer complimentary Wi-Fi. Breakfast inclusion varies by property and rate. Elite members often receive breakfast as a status benefit.'
              }
            ].map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Mobile App Promo */}
        <motion.div 
          className="mb-8 bg-gray-50 rounded-xl p-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-3/5 mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Download the SkyWays App</h2>
              <p className="text-gray-600 mb-6">
                Book and manage your hotel stays on the go. Enjoy mobile check-in, room selection,
                and exclusive mobile-only deals.
              </p>
              <div className="flex space-x-4">
                <Button variant="qatar" className="group">
                  App Store <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" className="border-purple-800 text-purple-800 hover:bg-purple-50">
                  Google Play
                </Button>
              </div>
            </div>
            <div className="md:w-2/5 text-center">
              <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">App screenshot would appear here</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

const HotelCard = ({ hotel }: { hotel: Hotel }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -10 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
          {hotel.price} / night
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{hotel.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
          </div>
        </div>
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          {hotel.location}
        </div>
        <p className="text-gray-600 text-sm mb-4">
          {hotel.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity: string, index: number) => (
            <span 
              key={index} 
              className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full"
            >
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="bg-gray-50 text-gray-600 text-xs px-2 py-1 rounded-full">
              +{hotel.amenities.length - 3} more
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <Button variant="link" className="text-purple-600 p-0 hover:text-purple-800 hover:no-underline">
            View Details
          </Button>
          <Button variant="outline" size="sm" className="border-purple-600 text-purple-600 hover:bg-purple-50">
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelsPage;
