import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

import type { Passenger } from "@/types/checkout";

interface PassengerFormProps {
  numPassengers: number;
  onSubmit: (passengers: Passenger[]) => void;
  onBack: () => void;
  initialValues?: Passenger[];
}

const PassengerForm = ({
  numPassengers,
  onSubmit,
  onBack,
  initialValues = [],
}: PassengerFormProps) => {
  // Initialize passengers array with default values
  const [passengers, setPassengers] = useState<Passenger[]>(() => {
    if (initialValues.length > 0) {
      return initialValues;
    }

    // Create default passengers based on numPassengers
    return Array(numPassengers)
      .fill(null)
      .map((_, index) => ({
        type: index === 0 ? "adult" : "adult", // First passenger is always adult (primary)
        title: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        nationality: "London",
        passportNumber: "",
        passportExpiry: "",
      }));
  });

  // Track expanded passenger panels
  const [expandedIndex, setExpandedIndex] = useState(0);

  // Form validation errors
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>(
    {},
  );

  // Set errors object structure based on number of passengers
  useEffect(() => {
    const newErrors: Record<string, Record<string, string>> = {};
    for (let i = 0; i < numPassengers; i++) {
      newErrors[i] = {};
    }
    setErrors(newErrors);
  }, [numPassengers]);

  // Handle passenger input change
  const handlePassengerChange = (
    index: number,
    field: keyof Passenger,
    value: string,
  ) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };
    setPassengers(updatedPassengers);

    // Clear error when field is edited
    if (errors[index]?.[field]) {
      const newErrors = { ...errors };
      delete newErrors[index][field];
      setErrors(newErrors);
    }
  };

  // Validate passenger form
  const validateForm = (): boolean => {
    const newErrors: Record<string, Record<string, string>> = {};
    let isValid = true;

    passengers.forEach((passenger, index) => {
      newErrors[index] = {};

      // Validate required fields
      if (!passenger.title) {
        newErrors[index].title = "Title is required";
        isValid = false;
      }

      if (!passenger.firstName) {
        newErrors[index].firstName = "First name is required";
        isValid = false;
      }

      if (!passenger.lastName) {
        newErrors[index].lastName = "Last name is required";
        isValid = false;
      }

      // Validate passport details for international flights
      // In a real app, this would check if the flight is international
      if (!passenger.passportNumber) {
        newErrors[index].passportNumber = "Passport number is required";
        isValid = false;
      }

      if (!passenger.passportExpiry) {
        newErrors[index].passportExpiry = "Passport expiry date is required";
        isValid = false;
      } else {
        // Check if passport is not expired
        const expiryDate = new Date(passenger.passportExpiry);
        const today = new Date();
        if (expiryDate <= today) {
          newErrors[index].passportExpiry = "Passport is expired";
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(passengers);
      toast.success("Passenger details saved");
    } else {
      // Show error toast and expand the first passenger with errors
      const errorIndex = Object.keys(errors).findIndex(
        (index) => Object.keys(errors[index]).length > 0,
      );

      if (errorIndex !== -1) {
        setExpandedIndex(Number(errorIndex));
        toast.error("Please correct the errors in the passenger details");
      }
    }
  };

  const toggleExpanded = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  const getPassengerTypeLabel = (type: string): string => {
    switch (type) {
      case "adult":
        return "Adult";
      case "child":
        return "Child (2-11 years)";
      case "infant":
        return "Infant (under 2 years)";
      default:
        return "Passenger";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Passenger Details</h2>
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center text-gray-600"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {passengers.map((passenger, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white"
          >
            <div
              className={`flex justify-between items-center p-4 cursor-pointer ${
                expandedIndex === index
                  ? "bg-purple-50 border-b border-gray-200"
                  : ""
              }`}
              onClick={() => toggleExpanded(index)}
            >
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                  <span className="text-sm font-medium text-purple-600">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">
                    {passenger.firstName || passenger.lastName
                      ? `${passenger.title} ${passenger.firstName} ${passenger.lastName}`
                      : getPassengerTypeLabel(passenger.type)}
                  </h3>
                  {(passenger.firstName || passenger.lastName) && (
                    <p className="text-xs text-gray-500">
                      {getPassengerTypeLabel(passenger.type)}
                    </p>
                  )}
                </div>
              </div>

              <div className="text-gray-500">
                {expandedIndex === index ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </div>

            {expandedIndex === index && (
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <select
                      value={passenger.title}
                      onChange={(e) =>
                        handlePassengerChange(index, "title", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors[index]?.title
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select</option>
                      <option value="Mr">Mr</option>
                      <option value="Mrs">Mrs</option>
                      <option value="Ms">Ms</option>
                      <option value="Dr">Dr</option>
                      <option value="Miss">Miss</option>
                    </select>
                    {errors[index]?.title && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors[index].title}
                      </p>
                    )}
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Passenger Type *
                    </label>
                    <select
                      value={passenger.type}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "type",
                          e.target.value as "adult" | "child" | "infant",
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      disabled={index === 0} // First passenger type cannot be changed (primary traveler)
                    >
                      <option value="adult">Adult (12+ years)</option>
                      <option value="child">Child (2-11 years)</option>
                      <option value="infant">Infant (under 2 years)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "firstName",
                          e.target.value,
                        )
                      }
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors[index]?.firstName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="First Name"
                    />
                    {errors[index]?.firstName && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors[index].firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) =>
                        handlePassengerChange(index, "lastName", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-md ${
                        errors[index]?.lastName
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Last Name"
                    />
                    {errors[index]?.lastName && (
                      <p className="mt-1 text-xs text-red-600">
                        {errors[index].lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={passenger.dateOfBirth}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "dateOfBirth",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <select
                      value={passenger.nationality}
                      onChange={(e) =>
                        handlePassengerChange(
                          index,
                          "nationality",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="London">London</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-2">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Travel Documents
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passport Number *
                      </label>
                      <input
                        type="text"
                        value={passenger.passportNumber}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "passportNumber",
                            e.target.value,
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-md ${
                          errors[index]?.passportNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Passport Number"
                      />
                      {errors[index]?.passportNumber && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors[index].passportNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passport Expiry Date *
                      </label>
                      <input
                        type="date"
                        value={passenger.passportExpiry}
                        onChange={(e) =>
                          handlePassengerChange(
                            index,
                            "passportExpiry",
                            e.target.value,
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-md ${
                          errors[index]?.passportExpiry
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        min={new Date().toISOString().split("T")[0]}
                      />
                      {errors[index]?.passportExpiry && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors[index].passportExpiry}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="pt-4 mt-4 border-t border-gray-200 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            Back to Contact Info
          </Button>

          <Button
            type="submit"
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg"
          >
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PassengerForm;
