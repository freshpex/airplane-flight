import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Camera,
  Map,
  Compass,
  Award,
  Users,
  Clock,
  Star,
  ChevronRight,
  Search,
  MapPin
} from 'lucide-react';

const Activities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Activities', icon: Compass },
    { id: 'tours', name: 'Guided Tours', icon: Map },
    { id: 'culture', name: 'Cultural Experiences', icon: Award },
    { id: 'adventure', name: 'Adventure', icon: Camera },
    { id: 'family', name: 'Family Friendly', icon: Users }
  ];

  const activities = [
    {
      id: 1,
      title: 'City Sightseeing Tour',
      category: 'tours',
      location: 'Multiple Cities',
      duration: '3-4 hours',
      price: 'From $49',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1568849676085-51415703900f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
    },
    {
      id: 2,
      title: 'Museum & Gallery Pass',
      category: 'culture',
      location: 'Multiple Cities',
      duration: '1-7 days',
      price: 'From $39',
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1566127444556-02b06ab19e1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80'
    },
    {
      id: 3,
      title: 'Mountain Hiking Adventure',
      category: 'adventure',
      location: 'Alps, Andes, Himalayas',
      duration: '1-3 days',
      price: 'From $149',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    {
      id: 4,
      title: 'Theme Park Experience',
      category: 'family',
      location: 'Multiple Locations',
      duration: '1 day',
      price: 'From $89',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1558233044-5a149518939c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
    }
  ];

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout
      title="Discover Activities"
      subtitle="Enhance your journey with exclusive experiences and attractions"
      backgroundImage="https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    >
      <div className="max-w-7xl mx-auto">
        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search activities, attractions, or experiences..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">Find Activities</Button>
          </div>

          <div className="mt-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center justify-center gap-2 ${
                    selectedCategory === category.id ? 'bg-purple-100 text-purple-700' : ''
                  }`}
                >
                  <category.icon size={16} />
                  <span className="hidden md:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {filteredActivities.map((activity) => (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg">{activity.title}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium ml-1">{activity.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-500 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {activity.location}
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-500 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {activity.duration}
                  </div>
                  
                  <div className="mt-auto pt-3 flex items-center justify-between">
                    <span className="font-semibold">{activity.price}</span>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      Book <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* More Content Section */}
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Looking for Something Special?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our travel experts can help you find and book unique experiences tailored to your interests.
            From private tours to exclusive events, let us enhance your journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline">Contact Travel Expert</Button>
            <Button className="bg-purple-600 hover:bg-purple-700">Browse All Experiences</Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Activities;
