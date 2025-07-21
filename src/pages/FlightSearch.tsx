import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { 
  Plane, 
  Calendar, 
  Users,
  ArrowRight, 
  Search, 
  ChevronsUpDown, 
  ChevronsLeftRight,
  Hotel,
  Car,
  Luggage,
  Clock
} from 'lucide-react';
import AirportSelect from '@/components/travel/AirportSelect';
import type { Airport } from '@/data/airports';

const FlightSearch = () => {
  const [tripType, setTripType] = useState('roundtrip');
  const [departureDate, setDepartureDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [returnDate, setReturnDate] = useState(format(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd'));
  const [passengerCount, setPassengerCount] = useState(1);
  const [cabinClass, setCabinClass] = useState('Economy');
  const [origin, setOrigin] = useState<Airport | null>(null);
  const [destination, setDestination] = useState<Airport | null>(null);

  return (
    <PageLayout 
      title="Search Flights" 
      subtitle="Find and book your next journey with SkyWays Airlines"
    >
      <div className="max-w-7xl mx-auto">
        {/* Booking Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Tabs defaultValue="flights" className="w-full">
            <TabsList className="grid grid-cols-4 md:w-[500px] mx-auto mb-6">
              <TabsTrigger value="flights" className="flex items-center gap-2">
                <Plane className="h-4 w-4" /> Flights
              </TabsTrigger>
              <TabsTrigger value="hotels" className="flex items-center gap-2">
                <Hotel className="h-4 w-4" /> Hotels
              </TabsTrigger>
              <TabsTrigger value="cars" className="flex items-center gap-2">
                <Car className="h-4 w-4" /> Cars
              </TabsTrigger>
              <TabsTrigger value="packages" className="flex items-center gap-2">
                <Luggage className="h-4 w-4" /> Packages
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="flights" className="mt-0">
              <Card className="border-0 shadow-lg overflow-hidden">
                <CardContent className="p-6 md:p-8">
                  {/* Trip Type Selection */}
                  <div className="mb-6">
                    <RadioGroup 
                      defaultValue="roundtrip" 
                      className="flex flex-wrap gap-6" 
                      onValueChange={setTripType}
                      value={tripType}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="roundtrip" id="roundtrip" />
                        <Label htmlFor="roundtrip">Round Trip</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="oneway" id="oneway" />
                        <Label htmlFor="oneway">One Way</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="multicity" id="multicity" />
                        <Label htmlFor="multicity">Multi-City</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Origin & Destination */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="relative">
                      <AirportSelect
                        label="From"
                        placeholder="City or Airport"
                        icon="plane"
                        onSelect={setOrigin}
                      />
                    </div>
                    
                    <div className="relative">
                      <AirportSelect
                        label="To"
                        placeholder="City or Airport"
                        icon="mappin"
                        onSelect={setDestination}
                      />
                    </div>
                    
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
                      <div className="bg-white p-2 rounded-full shadow-md">
                        <ChevronsLeftRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="departure" className="block text-sm font-medium text-gray-700 mb-1">Departure Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input 
                          id="departure" 
                          type="date" 
                          className="pl-10"
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          min={format(new Date(), 'yyyy-MM-dd')}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="return" className="block text-sm font-medium text-gray-700 mb-1">Return Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input 
                          id="return" 
                          type="date" 
                          className="pl-10"
                          disabled={tripType === 'oneway'}
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          min={departureDate}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Passengers & Class */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <Label htmlFor="passengers" className="block text-sm font-medium text-gray-700 mb-1">Passengers</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <div className="flex">
                          <Input 
                            id="passengers" 
                            type="number" 
                            className="pl-10"
                            min="1"
                            max="9"
                            value={passengerCount}
                            onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">Cabin Class</Label>
                      <div className="relative">
                        <select 
                          id="class"
                          className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                          value={cabinClass}
                          onChange={(e) => setCabinClass(e.target.value)}
                        >
                          <option>Economy</option>
                          <option>Premium Economy</option>
                          <option>Business</option>
                          <option>First</option>
                        </select>
                        <Luggage className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <ChevronsUpDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Search Button */}
                  <div className="flex justify-center">
                    <Button 
                      variant="qatar" 
                      size="lg" 
                      className="w-full md:w-auto md:px-12 group"
                      disabled={!origin || !destination}
                      onClick={() => {
                        const searchData = {
                          origin,
                          destination,
                          departureDate,
                          returnDate: tripType === 'oneway' ? null : returnDate,
                          passengerCount,
                          cabinClass,
                          tripType
                        };
                        console.log('Search data:', searchData);
                        // Add navigation to results page here
                      }}
                    >
                      <Search className="mr-2 h-5 w-5" /> Search Flights
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="hotels" className="mt-0">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 flex items-center justify-center h-60">
                  <div className="text-center text-gray-500">
                    <Hotel className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-medium mb-2">Hotel Search Coming Soon</h3>
                    <p>Our hotel booking feature is currently under development.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="cars" className="mt-0">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 flex items-center justify-center h-60">
                  <div className="text-center text-gray-500">
                    <Car className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-medium mb-2">Car Rental Coming Soon</h3>
                    <p>Our car rental booking feature is currently under development.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="packages" className="mt-0">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8 flex items-center justify-center h-60">
                  <div className="text-center text-gray-500">
                    <Luggage className="h-12 w-12 mx-auto mb-4 opacity-30" />
                    <h3 className="text-lg font-medium mb-2">Package Deals Coming Soon</h3>
                    <p>Our vacation package feature is currently under development.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Popular Destinations */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Popular Destinations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                city: "London",
                country: "United Kingdom",
                image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
                price: "499"
              },
              {
                city: "Tokyo",
                country: "Japan",
                image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                price: "899"
              },
              {
                city: "Paris",
                country: "France",
                image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                price: "449"
              },
              {
                city: "Dubai",
                country: "United Arab Emirates",
                image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                price: "599"
              }
            ].map((destination, index) => (
              <motion.div 
                key={index} 
                className="group relative h-80 rounded-xl overflow-hidden shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0">
                  <img 
                    src={destination.image} 
                    alt={destination.city} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-white text-xl font-bold">{destination.city}</h3>
                      <p className="text-white/80">{destination.country}</p>
                    </div>
                    <div className="bg-white/90 rounded-lg px-3 py-1.5 text-sm font-semibold text-purple-800">
                      from ${destination.price}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  className="absolute inset-0 w-full h-full p-0 opacity-0 group-hover:opacity-100"
                  onClick={() => console.log(`Searching flights to ${destination.city}`)}
                >
                  <span className="sr-only">View flights to {destination.city}</span>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special Offers */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Special Offers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Summer Sale",
                description: "Up to 25% off flights to select European destinations",
                badge: "Limited Time",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
                expiry: "Aug 31, 2023"
              },
              {
                title: "Business Class Offer",
                description: "Experience premium travel with 30% off business class flights",
                badge: "Premium",
                image: "https://images.unsplash.com/photo-1540339832862-326df6633f6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                expiry: "Sep 15, 2023"
              }
            ].map((offer, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-48 md:h-auto bg-gray-100">
                    <img 
                      src={offer.image} 
                      alt={offer.title} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                        {offer.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{offer.description}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Expires: {offer.expiry}</span>
                    </div>
                    <Button variant="qatar" size="sm" className="group">
                      Book Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Flight Deals */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Today's Best Flight Deals</h2>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Route</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Dates</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    {
                      from: "New York",
                      to: "Miami",
                      dates: "Oct 10 - Oct 17",
                      price: "$149"
                    },
                    {
                      from: "Chicago",
                      to: "Las Vegas",
                      dates: "Sep 15 - Sep 22",
                      price: "$199"
                    },
                    {
                      from: "Los Angeles",
                      to: "San Francisco",
                      dates: "Aug 25 - Sep 1",
                      price: "$99"
                    },
                    {
                      from: "Boston",
                      to: "Washington DC",
                      dates: "Sep 5 - Sep 12",
                      price: "$129"
                    },
                    {
                      from: "Seattle",
                      to: "Portland",
                      dates: "Oct 3 - Oct 10",
                      price: "$79"
                    }
                  ].map((deal, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Plane className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{deal.from} → {deal.to}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{deal.dates}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-purple-700">{deal.price}</span>
                        <span className="text-xs text-gray-500 ml-1">roundtrip</span>
                      </td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-800">
                          Book Now
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Download App Banner */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-3 p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Download the SkyWays Mobile App</h2>
                <p className="mb-6">
                  Book flights, check in, manage your bookings, and access your boarding passes all in one place.
                  Enjoy exclusive app-only deals and real-time flight notifications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="secondary" className="bg-white text-purple-700 hover:bg-gray-100">
                    Download for iOS
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Download for Android
                  </Button>
                </div>
              </div>
              <div className="md:col-span-2 hidden md:block">
                <div className="h-full w-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-white text-center">
                    <p>App Screenshot</p>
                    <p className="text-sm opacity-70">(Placeholder image)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default FlightSearch;
