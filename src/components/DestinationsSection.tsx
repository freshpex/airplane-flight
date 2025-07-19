import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, ArrowRight } from 'lucide-react';

const DestinationsSection = () => {
  const popularDestinations = [
    {
      city: 'Dubai',
      country: 'United Arab Emirates',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 'From $899',
      rating: 4.9,
      description: 'Luxury shopping, ultramodern architecture, and vibrant nightlife.',
      badge: 'Popular'
    },
    {
      city: 'Paris',
      country: 'France',
      image: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 'From $1,299',
      rating: 4.8,
      description: 'The City of Light with iconic landmarks and world-class cuisine.',
      badge: 'Trending'
    },
    {
      city: 'Tokyo',
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 'From $1,099',
      rating: 4.9,
      description: 'Where ancient traditions meet cutting-edge technology.',
      badge: 'Hot Deal'
    },
    {
      city: 'London',
      country: 'United Kingdom',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 'From $999',
      rating: 4.7,
      description: 'Rich history, royal palaces, and world-famous museums.',
      badge: null
    },
    {
      city: 'New York',
      country: 'United States',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 'From $799',
      rating: 4.8,
      description: 'The city that never sleeps with endless entertainment.',
      badge: 'Best Value'
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      price: 'From $1,199',
      rating: 4.9,
      description: 'Garden city with amazing food and futuristic attractions.',
      badge: null
    }
  ];

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case 'Popular':
        return 'bg-red-500';
      case 'Trending':
        return 'bg-green-500';
      case 'Hot Deal':
        return 'bg-orange-500';
      case 'Best Value':
        return 'bg-blue-500';
      default:
        return 'bg-purple-500';
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
            Discover Amazing{' '}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Destinations
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Explore the world's most captivating cities with our carefully curated selection of destinations.
          </p>
          <Button variant="outline" size="lg" className="group">
            View All Destinations
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDestinations.map((destination, index) => (
            <motion.div
              key={`${destination.city}-${destination.country}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden group hover:shadow-2xl transition-all duration-500 cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={`${destination.city}, ${destination.country}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  {destination.badge && (
                    <div className={`absolute top-4 left-4 ${getBadgeColor(destination.badge)} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                      {destination.badge}
                    </div>
                  )}

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                  </div>

                  {/* Location */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center space-x-1 mb-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm opacity-90">{destination.country}</span>
                    </div>
                    <h3 className="text-2xl font-bold">{destination.city}</h3>
                  </div>
                </div>

                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {destination.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-purple-600">
                        {destination.price}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">per person</span>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="group/btn text-purple-600 hover:text-purple-700"
                    >
                      Book Now
                      <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Can't find your dream destination?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              We fly to over 160 destinations worldwide. Let us help you plan your perfect trip.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 group"
            >
              Contact Travel Expert
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DestinationsSection;
