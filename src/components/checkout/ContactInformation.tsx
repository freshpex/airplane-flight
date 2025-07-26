import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { countries } from "@/utils/countries";
import type { ContactInfo } from "@/types/checkout";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface ContactInformationProps {
  initialValues: ContactInfo;
  onSubmit: (contactInfo: ContactInfo) => void;
}

const ContactInformation = ({
  initialValues,
  onSubmit,
}: ContactInformationProps) => {
  const [formData, setFormData] = useState<ContactInfo>({
    firstName: initialValues.firstName || "",
    lastName: initialValues.lastName || "",
    email: initialValues.email || "",
    phone: initialValues.phone || "",
    country: initialValues.country || "US",
    countryCode: initialValues.countryCode || "+1",
    address: initialValues.address || "",
    city: initialValues.city || "",
    state: initialValues.state || "",
    zipCode: initialValues.zipCode || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s\-()]{7,20}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
      <p className="text-gray-600 mb-6">
        Please enter your contact details. We'll use these to send your booking
        confirmation and updates.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`block w-full px-3 py-2 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`block w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
            placeholder="john.doe@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            Your booking confirmation will be sent to this email address.
          </p>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`block w-full px-3 py-2 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            We may need to contact you regarding your booking.
          </p>
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country/Region
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                className={`w-full justify-between ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
              >
                {formData.country
                  ? countries.find(
                      (country) => country.code === formData.country,
                    )?.name || "Select country..."
                  : "Select country..."}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search country..." />
                <CommandEmpty>No country found.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {countries.map((country) => (
                      <CommandItem
                        key={country.code}
                        value={country.code}
                        onSelect={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            country: value,
                            countryCode: country.phoneCode || prev.countryCode,
                          }));

                          if (errors.country) {
                            setErrors((prev) => ({
                              ...prev,
                              country: "",
                            }));
                          }
                        }}
                      >
                        <span>{country.name}</span>
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Address <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            placeholder="123 Main St, Apt 4B"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            Continue to Passenger Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactInformation;
