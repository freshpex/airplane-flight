import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plane,
  Hotel,
  MapPin,
  Car,
  Utensils,
  Wifi,
  Shield,
  Clock,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const ServicesSection = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      icon: Plane,
      title: "Book Flights",
      description:
        "Find and book flights to over 160 destinations worldwide with competitive prices and flexible options.",
      image:
        "https://www.qatarairways.com/content/dam/images/mobile/aircraft/codeshare-partners/m-virgin-australia-qr-aircrafts.jpg",
      features: ["160+ Destinations", "Flexible Booking", "Best Prices"],
      path: "/flight-search-destinations",
    },
    {
      icon: Hotel,
      title: "Reserve Hotels",
      description:
        "Book luxury accommodations worldwide with exclusive deals and member benefits.",
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Luxury Properties", "Member Discounts", "24/7 Support"],
      path: "/hotels",
    },
    {
      icon: MapPin,
      title: "Plan Tours",
      description:
        "Discover amazing experiences and activities at your destination with guided tours and local insights.",
      image:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Local Experiences", "Expert Guides", "Cultural Tours"],
      path: "/experience/activities",
    },
    {
      icon: Car,
      title: "Car Rentals",
      description:
        "Rent vehicles from trusted partners with convenient pickup locations and competitive rates.",
      image:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      features: ["Flexible Pickup", "Premium Vehicles", "Insurance Included"],
      path: "/car-rentals",
    },
  ];

  const features = [
    {
      icon: Wifi,
      title: "Free Wi-Fi",
      description:
        "Stay connected with complimentary high-speed internet on all flights.",
    },
    {
      icon: Utensils,
      title: "Gourmet Dining",
      description: "Enjoy award-winning cuisine prepared by world-class chefs.",
    },
    {
      icon: Shield,
      title: "Travel Insurance",
      description:
        "Comprehensive protection for your journey with flexible coverage options.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer service in multiple languages.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
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
            Your Journey, Our{" "}
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From booking to landing, we provide world-class services that make
            your travel experience seamless and memorable.
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 p-2 rounded-lg">
                      <Icon className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="text-gray-600 mb-4 flex-1">
                      {service.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center text-sm text-gray-500"
                        >
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      className="group/btn w-full justify-between"
                      onClick={() => navigate(service.path)}
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                  <Icon className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
