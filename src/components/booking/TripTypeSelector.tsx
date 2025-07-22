import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpDown, ArrowRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TripTypeSelectorProps {
  tripType: 'roundtrip' | 'oneway' | 'multicity';
  setTripType: React.Dispatch<React.SetStateAction<'roundtrip' | 'oneway' | 'multicity'>>;
}

const TripTypeSelector = ({ tripType, setTripType }: TripTypeSelectorProps) => {
  const tripTypes = [
    { id: 'roundtrip', label: 'Round Trip', icon: ArrowUpDown },
    { id: 'oneway', label: 'One Way', icon: ArrowRight },
    { id: 'multicity', label: 'Multi City', icon: MapPin },
  ];

  return (
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
  );
};

export default TripTypeSelector;
