import { useState } from "react";
import { Plus, Minus, ChevronDown } from "lucide-react";

import type { Passenger } from "@/types/checkout";
import { cn } from "@/lib/utils";

interface PassengerInformationProps {
  passengers: Passenger[];
  onUpdate: (passengers: Passenger[]) => void;
  onSubmit: () => void;
}

const PassengerInformation = ({
  passengers,
  onUpdate,
  onSubmit,
}: PassengerInformationProps) => {
  const [expandedPassenger, setExpandedPassenger] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>(
    {},
  );

  const handleChange = (
    index: number,
    field: keyof Passenger,
    value: string,
  ) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };

    onUpdate(updatedPassengers);

    // Clear error when field is edited
    if (errors[index]?.[field]) {
      const updatedErrors = { ...errors };
      updatedErrors[index] = { ...updatedErrors[index], [field]: "" };
      setErrors(updatedErrors);
    }
  };

  const validatePassenger = (passenger: Passenger, index: number): boolean => {
    const passengerErrors: Record<string, string> = {};

    if (!passenger.firstName.trim()) {
      passengerErrors.firstName = "First name is required";
    }

    if (!passenger.lastName.trim()) {
      passengerErrors.lastName = "Last name is required";
    }

    if (!passenger.dateOfBirth) {
      passengerErrors.dateOfBirth = "Date of birth is required";
    }

    if (!passenger.nationality) {
      passengerErrors.nationality = "Nationality is required";
    }

    if (!passenger.passportNumber && passenger.idType === "passport") {
      passengerErrors.passportNumber = "Passport number is required";
    }

    if (!passenger.passportExpiry && passenger.idType === "passport") {
      passengerErrors.passportExpiry = "Passport expiry date is required";
    }

    const updatedErrors = { ...errors };
    updatedErrors[index] = passengerErrors;
    setErrors(updatedErrors);

    return Object.keys(passengerErrors).length === 0;
  };

  const validateAll = (): boolean => {
    let isValid = true;

    passengers.forEach((passenger, index) => {
      if (!validatePassenger(passenger, index)) {
        isValid = false;
        setExpandedPassenger(index); // Expand the first invalid passenger
      }
    });

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateAll()) {
      onSubmit();
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Passenger Information</h2>
      <p className="text-gray-600 mb-6">
        Please enter details for all passengers. These should match exactly as
        they appear on ID/passport.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {passengers.map((passenger, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-4 bg-gray-50 cursor-pointer"
                onClick={() =>
                  setExpandedPassenger(expandedPassenger === index ? -1 : index)
                }
              >
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 flex items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    {index + 1}
                  </div>
                  <h3 className="font-medium">
                    {passenger.firstName || passenger.lastName
                      ? `${passenger.firstName} ${passenger.lastName}`
                      : `Passenger ${index + 1}`}
                    <span className="ml-2 text-sm text-gray-500">
                      ({passenger.type})
                    </span>
                  </h3>
                </div>
                <button type="button" className="text-gray-500">
                  {expandedPassenger === index ? (
                    <Minus className="h-5 w-5" />
                  ) : (
                    <Plus className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div
                className={cn(
                  "p-4 space-y-6 transition-all duration-300",
                  expandedPassenger === index ? "block" : "hidden",
                )}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={passenger.firstName}
                      onChange={(e) =>
                        handleChange(index, "firstName", e.target.value)
                      }
                      className={`block w-full px-3 py-2 border ${
                        errors[index]?.firstName
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
                    />
                    {errors[index]?.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[index].firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={passenger.lastName}
                      onChange={(e) =>
                        handleChange(index, "lastName", e.target.value)
                      }
                      className={`block w-full px-3 py-2 border ${
                        errors[index]?.lastName
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
                    />
                    {errors[index]?.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[index].lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={passenger.dateOfBirth || ""}
                      onChange={(e) =>
                        handleChange(index, "dateOfBirth", e.target.value)
                      }
                      className={`block w-full px-3 py-2 border ${
                        errors[index]?.dateOfBirth
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
                    />
                    {errors[index]?.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[index].dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nationality
                    </label>
                    <div className="relative">
                      <select
                        value={passenger.nationality || ""}
                        onChange={(e) =>
                          handleChange(index, "nationality", e.target.value)
                        }
                        className={`block w-full px-3 py-2 border ${
                          errors[index]?.nationality
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 appearance-none`}
                      >
                        <option value="">Select Nationality</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="NG">London</option>
                        <option value="GH">Ghana</option>
                        <option value="ZA">South Africa</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="IT">Italy</option>
                        <option value="ES">Spain</option>
                        <option value="JP">Japan</option>
                        <option value="CN">China</option>
                        <option value="IN">India</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>
                    {errors[index]?.nationality && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors[index].nationality}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ID Type
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="passport"
                        checked={passenger.idType === "passport"}
                        onChange={() =>
                          handleChange(index, "idType", "passport")
                        }
                        className="text-purple-600 focus:ring-purple-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Passport
                      </span>
                    </label>

                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="nationalId"
                        checked={passenger.idType === "nationalId"}
                        onChange={() =>
                          handleChange(index, "idType", "nationalId")
                        }
                        className="text-purple-600 focus:ring-purple-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        National ID
                      </span>
                    </label>

                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        value="drivingLicense"
                        checked={passenger.idType === "drivingLicense"}
                        onChange={() =>
                          handleChange(index, "idType", "drivingLicense")
                        }
                        className="text-purple-600 focus:ring-purple-500 h-4 w-4"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Driving License
                      </span>
                    </label>
                  </div>
                </div>

                {passenger.idType === "passport" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passport Number
                      </label>
                      <input
                        type="text"
                        value={passenger.passportNumber || ""}
                        onChange={(e) =>
                          handleChange(index, "passportNumber", e.target.value)
                        }
                        className={`block w-full px-3 py-2 border ${
                          errors[index]?.passportNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
                      />
                      {errors[index]?.passportNumber && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[index].passportNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Passport Expiry Date
                      </label>
                      <input
                        type="date"
                        value={passenger.passportExpiry || ""}
                        onChange={(e) =>
                          handleChange(index, "passportExpiry", e.target.value)
                        }
                        className={`block w-full px-3 py-2 border ${
                          errors[index]?.passportExpiry
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500`}
                      />
                      {errors[index]?.passportExpiry && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors[index].passportExpiry}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {passenger.idType === "nationalId" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      National ID Number
                    </label>
                    <input
                      type="text"
                      value={passenger.nationalIdNumber || ""}
                      onChange={(e) =>
                        handleChange(index, "nationalIdNumber", e.target.value)
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                )}

                {passenger.idType === "drivingLicense" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Driving License Number
                    </label>
                    <input
                      type="text"
                      value={passenger.drivingLicenseNumber || ""}
                      onChange={(e) =>
                        handleChange(
                          index,
                          "drivingLicenseNumber",
                          e.target.value,
                        )
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests{" "}
                    <span className="text-gray-400">(Optional)</span>
                  </label>
                  <textarea
                    value={passenger.specialRequests || ""}
                    onChange={(e) =>
                      handleChange(index, "specialRequests", e.target.value)
                    }
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Wheelchair assistance, dietary requirements, etc."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PassengerInformation;
