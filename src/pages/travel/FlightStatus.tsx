import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { 
  Plane, 
  Calendar, 
  Search, 
  Clock, 
  ArrowRight,
  LocateFixed,
  AlertCircle,
  Calendar as CalendarIcon
} from 'lucide-react';

const FlightStatus = () => {
  const [searchType, setSearchType] = useState<'flight-number' | 'route'>('flight-number');
  const [flightNumber, setFlightNumber] = useState('');
  const [date, setDate] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [searchResults, setSearchResults] = useState<null | any[]>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock flight data
  const mockFlights = [
    {
      flightNumber: 'SW 1234',
      route: 'London (LHR) to New York (JFK)',
      date: '2025-07-20',
      scheduledDeparture: '10:30',
      actualDeparture: '10:45',
      scheduledArrival: '13:45',
      actualArrival: '13:50',
      status: 'In Air',
      gate: 'A12',
      terminal: 'Terminal 5',
      aircraft: 'Boeing 787-9',
      progress: 65
    },
    {
      flightNumber: 'SW 5678',
      route: 'Paris (CDG) to Dubai (DXB)',
      date: '2025-07-20',
      scheduledDeparture: '09:00',
      actualDeparture: '09:10',
      scheduledArrival: '18:30',
      actualArrival: '18:25',
      status: 'Landed',
      gate: 'B22',
      terminal: 'Terminal 2',
      aircraft: 'Airbus A350-900',
      progress: 100
    },
    {
      flightNumber: 'SW 9012',
      route: 'Singapore (SIN) to Sydney (SYD)',
      date: '2025-07-20',
      scheduledDeparture: '22:45',
      actualDeparture: '',
      scheduledArrival: '08:30',
      actualArrival: '',
      status: 'Scheduled',
      gate: 'C15',
      terminal: 'Terminal 3',
      aircraft: 'Boeing 777-300ER',
      progress: 0
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSearchResults(null);

    // Simulate API call with timeout
    setTimeout(() => {
      // Simple mock search logic
      let results;
      if (searchType === 'flight-number') {
        results = mockFlights.filter(flight => 
          flight.flightNumber.toLowerCase().includes(flightNumber.toLowerCase()) && 
          (!date || flight.date === date)
        );
      } else {
        results = mockFlights.filter(flight => 
          flight.route.toLowerCase().includes(origin.toLowerCase()) && 
          flight.route.toLowerCase().includes(destination.toLowerCase()) && 
          (!date || flight.date === date)
        );
      }

      if (results.length === 0) {
        setError('No flights found matching your search criteria.');
      } else {
        setSearchResults(results);
      }
      setLoading(false);
    }, 1500);
  };

  // Get status color based on flight status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'text-blue-600';
      case 'Delayed': return 'text-amber-600';
      case 'In Air': return 'text-green-600';
      case 'Landed': return 'text-purple-600';
      case 'Cancelled': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Get progress bar color based on flight progress
  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-purple-600';
    if (progress > 75) return 'bg-green-600';
    if (progress > 25) return 'bg-blue-600';
    return 'bg-amber-600';
  };

  return (
    <PageLayout
      title="Flight Status"
      subtitle="Track the real-time status of SkyWays flights around the world"
      backgroundImage="https://images.unsplash.com/photo-1531299983330-093763e1d962?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Search Form */}
        <motion.div 
          className="bg-white rounded-xl p-6 shadow-lg mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs value={searchType} onValueChange={(value) => setSearchType(value as 'flight-number' | 'route')}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="flight-number">Search by Flight Number</TabsTrigger>
              <TabsTrigger value="route">Search by Route</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSearch}>
              <TabsContent value="flight-number" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="flight-number">Flight Number</Label>
                    <div className="relative mt-1.5">
                      <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <Input 
                        id="flight-number"
                        className="pl-10" 
                        placeholder="e.g. SW 1234"
                        value={flightNumber}
                        onChange={(e) => setFlightNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="flight-date">Date (Optional)</Label>
                    <div className="relative mt-1.5">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <Input 
                        id="flight-date"
                        className="pl-10" 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="route" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="origin">Origin</Label>
                    <div className="relative mt-1.5">
                      <LocateFixed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <Input 
                        id="origin"
                        className="pl-10" 
                        placeholder="City or Airport Code"
                        value={origin}
                        onChange={(e) => setOrigin(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative mt-1.5">
                      <LocateFixed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <Input 
                        id="destination"
                        className="pl-10" 
                        placeholder="City or Airport Code"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="route-date">Date (Optional)</Label>
                    <div className="relative mt-1.5">
                      <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <Input 
                        id="route-date"
                        className="pl-10" 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <div className="mt-6">
                <Button 
                  type="submit" 
                  variant="qatar" 
                  className="w-full sm:w-auto"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="mr-2">Searching</span>
                      <span className="animate-spin">
                        <svg className="h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </span>
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" /> 
                      Search Flights
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Tabs>
        </motion.div>

        {/* Search Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {error && (
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6 flex items-start gap-4">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertCircle className="text-red-600 h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">No Results Found</h3>
                <p className="text-gray-600">{error}</p>
                <p className="text-gray-600 mt-2">Please try different search criteria or contact our customer service for assistance.</p>
              </div>
            </div>
          )}

          {searchResults && searchResults.length > 0 && (
            <div className="space-y-6">
              {searchResults.map((flight, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {/* Flight Header */}
                  <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Plane className="h-6 w-6 text-purple-600" />
                      <div>
                        <span className="font-bold text-lg">{flight.flightNumber}</span>
                        <span className="text-gray-500 ml-3">|</span>
                        <span className="ml-3 text-gray-700">{flight.date}</span>
                      </div>
                    </div>
                    <div className={`font-semibold ${getStatusColor(flight.status)}`}>
                      {flight.status}
                    </div>
                  </div>
                  
                  {/* Flight Body */}
                  <div className="p-4">
                    <div className="flex flex-wrap justify-between mb-6">
                      <div className="w-full md:w-auto mb-4 md:mb-0">
                        <h3 className="text-lg font-semibold">{flight.route}</h3>
                        <div className="text-gray-500 text-sm mt-1">
                          {flight.terminal} • Gate {flight.gate} • {flight.aircraft}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="border-purple-600 text-purple-600">
                        Flight Details
                      </Button>
                    </div>
                    
                    {/* Progress */}
                    <div className="mb-6">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getProgressColor(flight.progress)}`}
                          style={{ width: `${flight.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Flight Times */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-blue-50 p-2 rounded-full">
                          <Clock className="text-blue-600 h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Scheduled Departure</div>
                          <div className="text-lg font-semibold">{flight.scheduledDeparture}</div>
                          {flight.actualDeparture && flight.actualDeparture !== flight.scheduledDeparture && (
                            <div className="text-sm text-blue-600 mt-1">
                              Actual: {flight.actualDeparture}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="bg-purple-50 p-2 rounded-full">
                          <Clock className="text-purple-600 h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Scheduled Arrival</div>
                          <div className="text-lg font-semibold">{flight.scheduledArrival}</div>
                          {flight.actualArrival && flight.actualArrival !== flight.scheduledArrival && (
                            <div className="text-sm text-purple-600 mt-1">
                              Actual: {flight.actualArrival}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* No search yet state */}
          {!searchResults && !error && (
            <div className="bg-white rounded-xl p-8 shadow-lg mb-6 text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Track Your Flight</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Enter your flight number or search by route to check the latest status and information about your flight.
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Additional Information */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Flight Status Information</h3>
            <p className="text-gray-600 mb-4">
              Our flight status tool provides real-time information about SkyWays flights. 
              Status updates include:
            </p>
            <ul className="space-y-2">
              {[
                'Scheduled and actual departure and arrival times',
                'Current flight status (scheduled, in air, landed, etc.)',
                'Gate and terminal information',
                'Aircraft type',
                'Flight progress'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-purple-50 p-1 rounded-full mt-0.5">
                    <ArrowRight className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Get Updates via SMS</h3>
            <p className="text-gray-600 mb-4">
              Stay informed about your flight with our automatic SMS notifications. 
              We'll send you updates about:
            </p>
            <ul className="space-y-2 mb-6">
              {[
                'Changes to departure or arrival times',
                'Gate changes',
                'Flight delays or cancellations',
                'Baggage claim information'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-purple-50 p-1 rounded-full mt-0.5">
                    <ArrowRight className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
            <Button variant="qatar" size="sm">
              Subscribe to Notifications
            </Button>
          </div>
        </motion.div>

        {/* Related Links */}
        <motion.div 
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4">Related Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Manage Booking',
                description: 'Make changes to your reservation',
                link: '/travel/manage-booking',
                icon: Calendar
              },
              {
                title: 'Online Check-in',
                description: 'Check in online and save time at the airport',
                link: '/travel/check-in',
                icon: LocateFixed
              },
              {
                title: 'Baggage Information',
                description: 'Learn about our baggage policy',
                link: '/travel/baggage-info',
                icon: Plane
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div 
                  key={index}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <div className="flex gap-4">
                    <div className="bg-purple-50 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      <Button asChild size="sm" variant="link" className="p-0 h-auto text-purple-600">
                        <a href={item.link}>Learn more</a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default FlightStatus;
