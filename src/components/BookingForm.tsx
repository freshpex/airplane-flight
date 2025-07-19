import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plane, 
  Calendar, 
  Users, 
  ArrowRight, 
  MapPin,
  ArrowUpDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

const BookingForm = () => {
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway' | 'multicity'>('roundtrip');
  const [passengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const tripTypes = [
    { id: 'roundtrip', label: 'Round Trip', icon: ArrowUpDown },
    { id: 'oneway', label: 'One Way', icon: ArrowRight },
    { id: 'multicity', label: 'Multi City', icon: MapPin },
  ];

  return (
    <section className="relative -mt-32 z-30 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Card className="backdrop-blur-sm bg-white/95 shadow-2xl border-0">
            <CardContent className="p-6 lg:p-8">
              {/* Trip Type Selector */}
              <div className="flex flex-wrap gap-2 mb-6">
                {tripTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <motion.button
                      key={type.id}
                      onClick={() => setTripType(type.id as any)}
                      className={cn(
                        'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                        tripType === type.id
                          ? 'bg-purple-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{type.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Booking Form */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
                {/* From */}
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From
                  </label>
                  <div className="relative">
                    <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Departure city"
                      className="pl-10 h-12 text-base"
                      defaultValue="New York (NYC)"
                    />
                  </div>
                </div>

                {/* To */}
                <div className="lg:col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Destination city"
                      className="pl-10 h-12 text-base"
                      defaultValue="Dubai (DXB)"
                    />
                  </div>
                </div>

                {/* Departure Date */}
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departure
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="date"
                      className="pl-10 h-12 text-base"
                      defaultValue="2025-08-15"
                    />
                  </div>
                </div>

                {/* Return Date */}
                {tripType === 'roundtrip' && (
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        type="date"
                        className="pl-10 h-12 text-base"
                        defaultValue="2025-08-25"
                      />
                    </div>
                  </div>
                )}

                {/* Passengers */}
                <div className={cn(
                  tripType === 'roundtrip' ? 'lg:col-span-2' : 'lg:col-span-4'
                )}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Passengers
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      readOnly
                      className="pl-10 h-12 text-base cursor-pointer"
                      value={`${passengers.adults + passengers.children + passengers.infants} Passenger${passengers.adults + passengers.children + passengers.infants !== 1 ? 's' : ''}`}
                    />
                  </div>
                </div>

                {/* Search Button */}
                <div className="lg:col-span-12 lg:col-start-1 mt-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="qatar"
                      size="xl"
                      className="w-full lg:w-auto lg:px-12 group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        Search Flights
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Quick Options */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-4 text-sm">
                  <motion.button
                    className="text-purple-600 hover:text-purple-800 font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    + Add hotels
                  </motion.button>
                  <motion.button
                    className="text-purple-600 hover:text-purple-800 font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    + Add car rental
                  </motion.button>
                  <motion.button
                    className="text-purple-600 hover:text-purple-800 font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    + Add activities
                  </motion.button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;
