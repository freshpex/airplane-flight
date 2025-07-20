import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plane,
  MapPin,
  Calendar,
  Clock,
  Sun,
  Cloud,
  Umbrella,
  Star,
  ArrowRight,
  Info,
  Check,
  CreditCard
} from 'lucide-react';

const LondonDestination = () => {
  return (
    <PageLayout
      title="London"
      subtitle="Discover the vibrant capital of the United Kingdom"
      backgroundImage="https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Quick Facts */}
        <motion.div 
          className="mb-8 bg-white rounded-xl p-4 shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="flex flex-col items-center text-center p-2">
              <MapPin className="h-6 w-6 text-purple-600 mb-2" />
              <span className="text-xs text-gray-500">Location</span>
              <span className="text-sm font-medium">England, UK</span>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <Clock className="h-6 w-6 text-purple-600 mb-2" />
              <span className="text-xs text-gray-500">Time Zone</span>
              <span className="text-sm font-medium">GMT/BST</span>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <CreditCard className="h-6 w-6 text-purple-600 mb-2" />
              <span className="text-xs text-gray-500">Currency</span>
              <span className="text-sm font-medium">Pound Sterling (£)</span>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <Calendar className="h-6 w-6 text-purple-600 mb-2" />
              <span className="text-xs text-gray-500">Best Time to Visit</span>
              <span className="text-sm font-medium">May to September</span>
            </div>
            <div className="flex flex-col items-center text-center p-2">
              <Plane className="h-6 w-6 text-purple-600 mb-2" />
              <span className="text-xs text-gray-500">Flight Duration</span>
              <span className="text-sm font-medium">~7-11 hours from US</span>
            </div>
          </div>
        </motion.div>

        {/* Main Content Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full grid grid-cols-4 mb-8">
              <TabsTrigger value="overview" className="py-3">Overview</TabsTrigger>
              <TabsTrigger value="attractions" className="py-3">Attractions</TabsTrigger>
              <TabsTrigger value="hotels" className="py-3">Hotels</TabsTrigger>
              <TabsTrigger value="flights" className="py-3">Flights</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">About London</h2>
                    <p className="text-gray-600 mb-6">
                      London, the capital of England and the United Kingdom, is a 21st-century city with history 
                      stretching back to Roman times. At its centre stand the imposing Houses of Parliament, the 
                      iconic 'Big Ben' clock tower and Westminster Abbey, site of British monarch coronations. 
                      Across the Thames River, the London Eye observation wheel provides panoramic views of the 
                      South Bank cultural complex, and the entire city.
                    </p>
                    <p className="text-gray-600 mb-6">
                      As one of the world's most visited cities, London has something for everyone: from history 
                      and culture to fine food and exceedingly good times. With such diversity, London's cultural 
                      dynamism makes it among the world's most international cities. It is a city of ideas – an 
                      innovator of art and culture.
                    </p>
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">When to Visit</h3>
                      <div className="grid grid-cols-4 gap-4">
                        {['Spring', 'Summer', 'Autumn', 'Winter'].map((season, index) => (
                          <div key={index} className="bg-gray-50 p-3 rounded-lg text-center">
                            <span className="block font-medium">{season}</span>
                            {index === 1 ? (
                              <span className="text-xs text-green-600">Best Time</span>
                            ) : (
                              <span className="text-xs text-gray-500">&nbsp;</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Weather</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { month: 'Jan-Mar', temp: '2-10°C', icon: Cloud },
                          { month: 'Apr-Jun', temp: '7-18°C', icon: Cloud },
                          { month: 'Jul-Sep', temp: '14-23°C', icon: Sun },
                          { month: 'Oct-Dec', temp: '4-15°C', icon: Umbrella }
                        ].map((item, index) => {
                          const Icon = item.icon;
                          return (
                            <div key={index} className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                              <Icon className="h-8 w-8 text-gray-500" />
                              <div>
                                <span className="block text-sm font-medium">{item.month}</span>
                                <span className="text-xs text-gray-600">{item.temp}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="bg-gray-50 rounded-xl p-6 mb-6">
                      <h3 className="text-lg font-semibold mb-4">Travel Tips</h3>
                      <ul className="space-y-3">
                        {[
                          'Get an Oyster card for public transport',
                          'Many museums and galleries are free',
                          'Book attractions in advance to skip lines',
                          'Pack for all weather conditions',
                          'London is a walkable city with many scenic routes',
                          'Most shops are open 7 days a week'
                        ].map((tip, index) => (
                          <li key={index} className="flex">
                            <Info className="h-5 w-5 text-purple-600 mr-2 shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-600">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-purple-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold mb-4">Need Help Planning?</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Our travel specialists can create a personalized London itinerary 
                        tailored to your interests and budget.
                      </p>
                      <Button variant="qatar" className="w-full">
                        Contact a Specialist
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Photo Gallery */}
                <div className="mt-10">
                  <h2 className="text-2xl font-bold mb-6">Photo Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                      'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                      'https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
                      'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
                    ].map((image, index) => (
                      <div key={index} className="overflow-hidden rounded-lg h-48">
                        <img 
                          src={image} 
                          alt={`London scenery ${index + 1}`} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Attractions Tab */}
            <TabsContent value="attractions" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Top Attractions in London</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {[
                    {
                      name: 'Big Ben & Houses of Parliament',
                      description: 'The iconic clock tower and seat of the UK government, located on the banks of the River Thames.',
                      image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                      rating: 4.7,
                      duration: '1-2 hours',
                      price: 'Free (exterior)'
                    },
                    {
                      name: 'Tower of London',
                      description: 'Historic castle on the north bank of the River Thames, home to the Crown Jewels and famous ravens.',
                      image: 'https://images.unsplash.com/photo-1592509255531-161181e0cb8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                      rating: 4.8,
                      duration: '3-4 hours',
                      price: '£29.90'
                    },
                    {
                      name: 'British Museum',
                      description: 'World-class museum of human history and culture, with a permanent collection of over 8 million works.',
                      image: 'https://images.unsplash.com/photo-1574236079420-f04e5c0e0847?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                      rating: 4.9,
                      duration: '3-5 hours',
                      price: 'Free'
                    },
                    {
                      name: 'London Eye',
                      description: 'Massive observation wheel offering panoramic views of the city skyline.',
                      image: 'https://images.unsplash.com/photo-1584541832053-6db39a669cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                      rating: 4.6,
                      duration: '30 minutes',
                      price: 'From £32.50'
                    }
                  ].map((attraction, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={attraction.image} 
                          alt={attraction.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold">{attraction.name}</h3>
                          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                            <span className="text-sm font-medium text-yellow-700">{attraction.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{attraction.description}</p>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-400" />
                            {attraction.duration}
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-1 text-gray-400" />
                            {attraction.price}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full border-purple-600 text-purple-600 hover:bg-purple-50">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mb-10">
                  <h3 className="text-xl font-bold mb-4">Guided Tours</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        name: 'Royal London Walking Tour',
                        duration: '3 hours',
                        price: '£25',
                        highlights: ['Buckingham Palace', 'St. James Palace', 'Westminster Abbey']
                      },
                      {
                        name: 'Harry Potter Film Locations Tour',
                        duration: '2.5 hours',
                        price: '£30',
                        highlights: ['Diagon Alley', 'Platform 9¾', 'Filming Locations']
                      },
                      {
                        name: 'Jack the Ripper Evening Tour',
                        duration: '2 hours',
                        price: '£20',
                        highlights: ['Whitechapel', 'Crime Scenes', 'Victorian East End']
                      }
                    ].map((tour, index) => (
                      <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h4 className="font-semibold mb-2">{tour.name}</h4>
                        <div className="flex text-sm text-gray-500 mb-3 gap-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {tour.duration}
                          </div>
                          <div className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-1" />
                            {tour.price}
                          </div>
                        </div>
                        <ul className="mb-4">
                          {tour.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600 mb-1">
                              <Check className="h-4 w-4 text-green-500 mr-2" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                        <Button variant="outline" size="sm" className="w-full text-purple-600 border-purple-600 hover:bg-purple-50">
                          Book Tour
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Day Trips from London</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        destination: 'Stonehenge',
                        distance: '145 km',
                        duration: 'Full day',
                        image: 'https://images.unsplash.com/photo-1559562935-63fa68a3ead9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
                      },
                      {
                        destination: 'Oxford',
                        distance: '95 km',
                        duration: 'Full day',
                        image: 'https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
                      },
                      {
                        destination: 'Bath',
                        distance: '185 km',
                        duration: 'Full day',
                        image: 'https://images.unsplash.com/photo-1583122156490-d94b1454a8c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
                      },
                      {
                        destination: 'Windsor Castle',
                        distance: '45 km',
                        duration: 'Half day',
                        image: 'https://images.unsplash.com/photo-1592282725091-3446ea64d602?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1378&q=80'
                      }
                    ].map((trip, index) => (
                      <div key={index} className="rounded-lg overflow-hidden shadow-sm group">
                        <div className="h-40 overflow-hidden">
                          <img 
                            src={trip.image} 
                            alt={trip.destination} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div className="p-4 bg-white">
                          <h4 className="font-semibold mb-1">{trip.destination}</h4>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{trip.distance}</span>
                            <span>{trip.duration}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Hotels Tab */}
            <TabsContent value="hotels" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Recommended Hotels</h2>
                
                <div className="mb-8">
                  <div className="p-4 bg-blue-50 rounded-lg mb-6">
                    <div className="flex items-start">
                      <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                      <p className="text-sm text-blue-700">
                        Book your London hotel through SkyWings and receive exclusive benefits including 
                        free airport transfers, late checkout, and special room upgrades when available.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      {
                        name: 'The Savoy',
                        area: 'Covent Garden',
                        rating: 5,
                        price: '£550',
                        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                        amenities: ['Free WiFi', 'Spa', 'Fine Dining', 'River Views']
                      },
                      {
                        name: 'Citizen M Tower of London',
                        area: 'City of London',
                        rating: 4,
                        price: '£199',
                        image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                        amenities: ['Free WiFi', 'Rooftop Bar', 'City Views', 'Tech-Focused Rooms']
                      },
                      {
                        name: 'The Montague on the Gardens',
                        area: 'Bloomsbury',
                        rating: 4.5,
                        price: '£325',
                        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
                        amenities: ['Free WiFi', 'Garden Terrace', 'Afternoon Tea', 'Near British Museum']
                      }
                    ].map((hotel, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                        <div className="h-full">
                          <img 
                            src={hotel.image} 
                            alt={hotel.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-5 md:col-span-2">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-xl font-semibold">{hotel.name}</h3>
                              <p className="text-gray-500 text-sm">{hotel.area}</p>
                            </div>
                            <div className="flex">
                              {Array.from({ length: Math.floor(hotel.rating) }).map((_, idx) => (
                                <Star key={idx} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                              ))}
                              {hotel.rating % 1 > 0 && (
                                <StarHalf className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {hotel.amenities.map((amenity, idx) => (
                              <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                {amenity}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-end justify-between">
                            <div>
                              <div className="text-purple-700 font-bold text-xl">{hotel.price}</div>
                              <div className="text-gray-500 text-xs">per night, incl. taxes</div>
                            </div>
                            <Button variant="qatar" size="sm">
                              View Rooms
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center mb-10">
                  <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                    View All Hotels
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4">London Neighborhoods</h3>
                  <p className="text-gray-600 text-sm mb-6">
                    London has many distinct areas, each with its own character. Here's a guide 
                    to help you choose the best location for your stay.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      {
                        area: 'Covent Garden',
                        description: 'Central location with theaters, shopping, and dining.',
                        bestFor: ['First-time visitors', 'Theater enthusiasts', 'Shopping']
                      },
                      {
                        area: 'Westminster',
                        description: 'Home to iconic landmarks and government buildings.',
                        bestFor: ['Sightseeing', 'Historical landmarks', 'Museums']
                      },
                      {
                        area: 'South Bank',
                        description: 'Cultural hub along the Thames with great views.',
                        bestFor: ['Arts & culture', 'River views', 'Family attractions']
                      },
                      {
                        area: 'Shoreditch',
                        description: 'Trendy area with hip bars, street art, and markets.',
                        bestFor: ['Nightlife', 'Street art', 'Trendy restaurants']
                      },
                      {
                        area: 'Kensington',
                        description: 'Upscale area with museums and beautiful parks.',
                        bestFor: ['Luxury stays', 'Museums', 'Shopping']
                      },
                      {
                        area: 'Camden',
                        description: 'Vibrant district known for its markets and music scene.',
                        bestFor: ['Alternative culture', 'Markets', 'Live music']
                      }
                    ].map((neighborhood, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="font-semibold mb-2">{neighborhood.area}</h4>
                        <p className="text-sm text-gray-600 mb-3">{neighborhood.description}</p>
                        <h5 className="text-xs font-medium text-gray-500 mb-1">Best for:</h5>
                        <div className="flex flex-wrap gap-1">
                          {neighborhood.bestFor.map((item, idx) => (
                            <span key={idx} className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Flights Tab */}
            <TabsContent value="flights" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-6">Flights to London</h2>
                
                <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
                  <h3 className="text-lg font-semibold mb-4">SkyWings Direct Flights to London</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold">From</th>
                          <th className="text-left py-3 px-4 font-semibold">Flight Duration</th>
                          <th className="text-left py-3 px-4 font-semibold">Frequency</th>
                          <th className="text-left py-3 px-4 font-semibold">Starting From</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            from: 'New York (JFK)',
                            duration: '7h 05m',
                            frequency: 'Daily',
                            price: '$450'
                          },
                          {
                            from: 'Los Angeles (LAX)',
                            duration: '10h 30m',
                            frequency: 'Daily',
                            price: '$550'
                          },
                          {
                            from: 'Chicago (ORD)',
                            duration: '8h 10m',
                            frequency: 'Mon, Wed, Fri, Sun',
                            price: '$480'
                          },
                          {
                            from: 'Miami (MIA)',
                            duration: '8h 45m',
                            frequency: 'Tue, Thu, Sat, Sun',
                            price: '$510'
                          },
                          {
                            from: 'San Francisco (SFO)',
                            duration: '10h 15m',
                            frequency: 'Daily',
                            price: '$590'
                          }
                        ].map((flight, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-4">{flight.from}</td>
                            <td className="py-4 px-4">{flight.duration}</td>
                            <td className="py-4 px-4">{flight.frequency}</td>
                            <td className="py-4 px-4 font-semibold text-purple-700">{flight.price}</td>
                            <td className="py-4 px-4 text-right">
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">London Airports</h3>
                    
                    <div className="space-y-4">
                      {[
                        {
                          name: 'Heathrow Airport (LHR)',
                          distance: '23 km west of London',
                          transport: 'Tube (Piccadilly Line), Heathrow Express, Taxis'
                        },
                        {
                          name: 'Gatwick Airport (LGW)',
                          distance: '45 km south of London',
                          transport: 'Gatwick Express, Southern Railway, Taxis'
                        },
                        {
                          name: 'London City Airport (LCY)',
                          distance: '11 km east of London',
                          transport: 'DLR, Taxis'
                        }
                      ].map((airport, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <h4 className="font-medium mb-1">{airport.name}</h4>
                          <div className="text-sm text-gray-600">
                            <div className="flex items-center mb-1">
                              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                              {airport.distance}
                            </div>
                            <div className="flex items-center">
                              <Plane className="h-4 w-4 mr-2 text-gray-400" />
                              {airport.transport}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-semibold mb-4">Flight Information</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Best Time to Book</h4>
                          <p className="text-sm text-gray-600">
                            For the best deals, book your London flights 2-3 months in advance. 
                            Prices typically increase within 3 weeks of departure.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Flight Duration</h4>
                          <p className="text-sm text-gray-600">
                            Flights from the east coast of the US take approximately 7-8 hours, 
                            while west coast flights take 10-11 hours.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <CreditCard className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium">SkyWings Benefits</h4>
                          <p className="text-sm text-gray-600">
                            Elite members receive priority check-in, extra baggage allowance, 
                            and access to lounges at all London airports.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="qatar" className="w-full">
                      Search Flights to London
                    </Button>
                  </div>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-xl">
                  <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-semibold">Special London Flight + Hotel Package</h3>
                      <p className="text-sm text-gray-600">
                        Save up to 25% when you book your flight and hotel together.
                      </p>
                    </div>
                    <Button variant="qatar" size="sm" className="group">
                      View Packages <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Destinations */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                city: "Paris",
                country: "France",
                image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80"
              },
              {
                city: "Rome",
                country: "Italy",
                image: "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
              },
              {
                city: "Amsterdam",
                country: "Netherlands",
                image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              },
              {
                city: "Barcelona",
                country: "Spain",
                image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              }
            ].map((destination, index) => (
              <motion.div 
                key={index} 
                className="group relative h-64 rounded-xl overflow-hidden shadow-md"
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
                  <h3 className="text-white text-xl font-bold">{destination.city}</h3>
                  <p className="text-white/80">{destination.country}</p>
                </div>
                <Button 
                  variant="ghost" 
                  className="absolute inset-0 w-full h-full p-0 opacity-0 group-hover:opacity-100"
                >
                  <span className="sr-only">View {destination.city}</span>
                </Button>
              </motion.div>
            ))}
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
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl overflow-hidden shadow-lg text-white p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Experience London?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              From historic landmarks to vibrant culture, London has something for everyone.
              Book your SkyWings flight today and start your London adventure!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="secondary" className="bg-white text-purple-800 hover:bg-gray-100">
                Search Flights
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Explore Packages
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

// Custom half-star component
const StarHalf = (props: React.SVGProps<SVGSVGElement>) => {
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
      <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" />
    </svg>
  );
};

export default LondonDestination;
