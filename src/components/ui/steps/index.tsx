import React from "react";
import { Check } from "lucide-react";

interface StepsProps {
  activeStep: number;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

interface StepProps {
  title: string;
  description?: string;
}

export function Steps({ activeStep, size = "md", children }: StepsProps) {
  const steps = React.Children.toArray(
    children,
  ) as React.ReactElement<StepProps>[];

  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;

        const sizeClasses = {
          sm: {
            container: "h-7 w-7",
            icon: "h-3.5 w-3.5",
            text: "text-xs",
          },
          md: {
            container: "h-9 w-9",
            icon: "h-4 w-4",
            text: "text-sm",
          },
          lg: {
            container: "h-10 w-10",
            icon: "h-5 w-5",
            text: "text-base",
          },
        };

        return (
          <div key={index} className="flex flex-1 items-center">
            {/* Step with connector */}
            <div className="relative flex flex-col items-center">
              <div
                className={`
                  ${sizeClasses[size].container} rounded-full flex items-center justify-center
                  ${
                    isCompleted
                      ? "bg-purple-600 text-white"
                      : isActive
                        ? "bg-purple-100 border-2 border-purple-600 text-purple-600"
                        : "bg-gray-100 text-gray-400"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className={sizeClasses[size].icon} />
                ) : (
                  <span className="font-medium">{index + 1}</span>
                )}
              </div>

              <span
                className={`
                  mt-2 ${sizeClasses[size].text}
                  ${isActive || isCompleted ? "text-gray-900 font-medium" : "text-gray-500"}
                `}
              >
                {step.props.title}
              </span>

              {step.props.description && (
                <span
                  className={`
                    mt-1 text-xs 
                    ${isActive ? "text-gray-600" : "text-gray-400"}
                    max-w-[80px] text-center
                  `}
                >
                  {step.props.description}
                </span>
              )}
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 mx-2 h-0.5 
                  ${index < activeStep ? "bg-purple-600" : "bg-gray-200"}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Step(_props: StepProps) {
  return null; // This is just a placeholder component for the API
}
