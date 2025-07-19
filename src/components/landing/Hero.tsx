import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plane, Calendar, MapPin, Users } from 'lucide-react';

const tabs = [
  { id: 'flights', name: 'Flights', icon: <Plane className="h-5 w-5" /> },
  { id: 'hotels', name: 'Hotels', icon: <Calendar className="h-5 w-5" /> },
  { id: 'tours', name: 'Tours', icon: <MapPin className="h-5 w-5" /> },
];

const tripTypes = ['Round trip', 'One way', 'Multi-city'];
const cabinClasses = ['Economy', 'Business', 'First'];

export function Hero() {
  const [activeTab, setActiveTab] = useState('flights');
  const [tripType, setTripType] = useState('Round trip');
  const [cabinClass, setCabinClass] = useState('Economy');
  const [passengers, setPassengers] = useState(1);

  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1529074963764-98f45c47aa5e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>

      <div className="container mx-auto px-4 pt-32 pb-16 sm:pt-36 lg:pt-40 relative z-10">
        {/* Hero Content */}
        <div className="max-w-2xl mb-10 md:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-up animate-delay-100">
            Experience Exceptional <span className="text-qatar-gold">Journey</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 animate-fade-up animate-delay-200">
            Discover a world of comfort, luxury, and unforgettable destinations with EmmaAirways, 
            your gateway to exceptional travel experiences.
          </p>
        </div>

        {/* Search Panel */}
        <div className="bg-white rounded-xl shadow-xl p-4 animate-fade-up animate-delay-300">
          {/* Tabs */}
          <div className="flex mb-4 border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-all',
                  activeTab === tab.id
                    ? 'border-qatar-burgundy text-qatar-burgundy'
                    : 'border-transparent text-neutral-600 hover:text-qatar-burgundy hover:border-neutral-300'
                )}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>

          {/* Flights Tab Content */}
          {activeTab === 'flights' && (
            <>
              {/* Trip Type & Class Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Trip Type</label>
                  <div className="flex rounded-md border border-neutral-200 p-1">
                    {tripTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setTripType(type)}
                        className={cn(
                          'flex-1 text-sm py-1 px-2 rounded-md transition-all',
                          tripType === type
                            ? 'bg-qatar-burgundy text-white'
                            : 'text-neutral-700 hover:bg-neutral-100'
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Cabin Class & Passengers</label>
                  <div className="flex rounded-md border border-neutral-200 divide-x">
                    <div className="flex-1 p-1">
                      <select 
                        value={cabinClass}
                        onChange={(e) => setCabinClass(e.target.value)}
                        className="w-full text-sm py-1 px-2 border-0 focus:ring-0 bg-transparent"
                      >
                        {cabinClasses.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex items-center p-1">
                      <Users size={16} className="text-neutral-500 ml-2" />
                      <select 
                        value={passengers}
                        onChange={(e) => setPassengers(Number(e.target.value))}
                        className="w-full text-sm py-1 px-2 border-0 focus:ring-0 bg-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                          <option key={num} value={num}>{num} {num === 1 ? 'passenger' : 'passengers'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flight Search */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <label className="block text-xs font-medium text-neutral-600">From</label>
                  <input 
                    type="text" 
                    placeholder="City or Airport" 
                    className="w-full border-0 bg-transparent p-0 text-lg text-neutral-900 placeholder:text-neutral-400 focus:ring-0"
                  />
                </div>
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <label className="block text-xs font-medium text-neutral-600">To</label>
                  <input 
                    type="text" 
                    placeholder="City or Airport" 
                    className="w-full border-0 bg-transparent p-0 text-lg text-neutral-900 placeholder:text-neutral-400 focus:ring-0"
                  />
                </div>
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <label className="block text-xs font-medium text-neutral-600">Depart</label>
                  <input 
                    type="date"
                    className="w-full border-0 bg-transparent p-0 text-lg text-neutral-900 focus:ring-0"
                  />
                </div>
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <label className="block text-xs font-medium text-neutral-600">Return</label>
                  <input 
                    type="date"
                    className="w-full border-0 bg-transparent p-0 text-lg text-neutral-900 focus:ring-0"
                    disabled={tripType === 'One way'}
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-end">
                <Button size="lg" className="bg-qatar-burgundy text-white hover:bg-qatar-burgundy/90">
                  Search Flights
                </Button>
              </div>
            </>
          )}

          {/* Hotels Tab Content */}
          {activeTab === 'hotels' && (
            <div className="py-4 text-center">
              <h3 className="text-xl font-medium text-neutral-800 mb-2">Find Perfect Accommodations</h3>
              <p className="text-neutral-600 mb-6">Search for hotels, resorts, and more at your destination</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <label className="block text-xs font-medium text-neutral-600">Destination</label>
                  <input 
                    type="text" 
                    placeholder="City or Property" 
                    className="w-full border-0 bg-transparent p-0 text-lg text-neutral-900 placeholder:text-neutral-400 focus:ring-0"
                  />
                </div>
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <label className="block text-xs font-medium text-neutral-600">Check-in</label>
                  <input 
                    type="date"
                    className="w-full border-0 bg-transparent p-0 text-lg text-neutral-900 focus:ring-0"
                  />
                </div>
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <label className="block text-xs font-medium text-neutral-600">Check-out</label>
                  <input 
                    type="date"
                    className="w-full border-0 bg-transparent p-0 text-lg text-neutral-900 focus:ring-0"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button size="lg" className="bg-qatar-burgundy text-white hover:bg-qatar-burgundy/90">
                  Search Hotels
                </Button>
              </div>
            </div>
          )}

          {/* Tours Tab Content */}
          {activeTab === 'tours' && (
            <div className="py-4 text-center">
              <h3 className="text-xl font-medium text-neutral-800 mb-2">Discover Amazing Tours & Activities</h3>
              <p className="text-neutral-600 mb-6">Find guided tours, attractions, and unique experiences</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <label className="block text-xs font-medium text-neutral-600">Destination</label>
                  <input 
                    type="text" 
                    placeholder="City or Country" 
                    className="w-full border-0 bg-transparent p-0 text-lg text-neutral-900 placeholder:text-neutral-400 focus:ring-0"
                  />
                </div>
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  <label className="block text-xs font-medium text-neutral-600">Date</label>
                  <input 
                    type="date"
                    className="w-full border-0 bg-transparent p-0 text-lg text-neutral-900 focus:ring-0"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button size="lg" className="bg-qatar-burgundy text-white hover:bg-qatar-burgundy/90">
                  Search Tours
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
