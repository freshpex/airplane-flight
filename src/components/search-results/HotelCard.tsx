import { motion } from 'framer-motion';
import { Star, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type  { Hotel } from '@/types/flight';

interface HotelCardProps {
  hotel: Hotel;
  selectedHotel: string | null;
  setSelectedHotel: (id: string) => void;
}

const HotelCard = ({ hotel, selectedHotel, setSelectedHotel }: HotelCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white rounded-lg shadow-lg overflow-hidden",
        selectedHotel === hotel.id && "ring-2 ring-purple-500"
      )}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-60 md:h-auto relative">
          <img 
            src={hotel.image} 
            alt={hotel.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
              <span className="text-sm font-bold">{hotel.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 md:p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{hotel.location}</p>
            <p className="text-gray-700 mb-4 line-clamp-2 md:line-clamp-3">
              Enjoy a comfortable stay with excellent amenities and services.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {hotel.features.map((feature, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                  {feature}
                </span>
              ))}
            </div>
            
            <div className="text-sm text-gray-600">
              <span className="flex items-center">
                <Plane className="h-3 w-3 mr-1" /> 
                {hotel.distance ? 
                  `${hotel.distance.value} ${hotel.distance.unit} from ${hotel.distance.landmark}` :
                  'Near city center'
                }
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-4 border-t mt-4">
            <div className="text-lg font-bold text-purple-700">
              ${hotel.price.amount} <span className="text-sm font-normal text-gray-600">per {hotel.price.period}</span>
            </div>
            
            <Button 
              variant={selectedHotel === hotel.id ? "default" : "outline"}
              onClick={() => setSelectedHotel(hotel.id)}
            >
              {selectedHotel === hotel.id ? 'Selected' : 'Select'}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HotelCard;
