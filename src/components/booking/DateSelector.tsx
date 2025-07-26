import { Calendar } from "lucide-react";
import { Input } from "../ui/input";

interface DateSelectorProps {
  label: string;
  defaultValue?: string;
  value?: string;
  onChange: (value: string) => void;
}

const DateSelector = ({
  label,
  defaultValue,
  value,
  onChange,
}: DateSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="date"
          className="pl-10 h-12 text-base"
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DateSelector;
