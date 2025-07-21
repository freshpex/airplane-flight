import React from 'react';

interface CabinClassSelectorProps {
  cabinClass: string;
  setCabinClass: React.Dispatch<React.SetStateAction<string>>;
}

const CabinClassSelector = ({ cabinClass, setCabinClass }: CabinClassSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Cabin Class
      </label>
      <div className="relative">
        <select
          className="w-full h-12 pl-3 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
          value={cabinClass}
          onChange={(e) => setCabinClass(e.target.value)}
        >
          <option value="Economy">Economy</option>
          <option value="Premium Economy">Premium Economy</option>
          <option value="Business">Business</option>
          <option value="First">First</option>
        </select>
      </div>
    </div>
  );
};

export default CabinClassSelector;
