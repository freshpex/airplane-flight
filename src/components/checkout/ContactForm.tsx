import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
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
import { ChevronDown } from "lucide-react";
import { countries } from "@/utils/countries";

interface ContactFormProps {
  onSubmit: (contactInfo: ContactInfo) => void;
  initialValues?: Partial<ContactInfo>;
}

const ContactForm = ({ onSubmit, initialValues = {} }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactInfo>({
    firstName: initialValues.firstName || "",
    lastName: initialValues.lastName || "",
    email: initialValues.email || "",
    phone: initialValues.phone || "",
    country: initialValues.country || "US",
    countryCode: initialValues.countryCode || "+1",
    address: initialValues.address || "",
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

    // Required field validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Country validation
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
      toast.success("Contact information saved");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="First Name"
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
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Last Name"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="+1 000 000 0000"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Country/Region *
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
            Address (optional)
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your address"
          />
        </div>

        <div className="pt-4 mt-4 border-t border-gray-200">
          <Button
            type="submit"
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg"
          >
            Continue to Passenger Details
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
