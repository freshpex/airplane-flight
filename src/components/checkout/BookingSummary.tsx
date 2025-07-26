import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

import type { BookingSummaryItem } from "@/types/checkout";

interface BookingSummaryProps {
  items: BookingSummaryItem[];
  subtotal: number;
  taxes: number;
  total: number;
  currency: string;
  expanded?: boolean;
}

const BookingSummary = ({
  items,
  subtotal,
  taxes,
  total,
  currency = "USD",
  expanded = true,
}: BookingSummaryProps) => {
  const [isExpanded, setIsExpanded] = React.useState(expanded);

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(price);
  };

  // Get appropriate icon based on item type
  const getItemIcon = (type: string): React.ReactNode => {
    switch (type) {
      case "flight":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5 15.5C22.1667 15.8333 22.1667 16.8333 21.5 17.1667L19.5 18.1667C19 18.5 18.5 18.1667 18.5 17.5V15.1667C18.5 14.8333 19 14.5 19.5 14.8333L21.5 15.5Z"
              fill="currentColor"
            />
            <path
              d="M20.833 9.16666L8.33301 15.8333C7.49967 16.3333 6.49967 16.5 5.49967 16.5L2.16634 16.5C1.66634 16.5 1.33301 16 1.49967 15.5C1.66634 15.1667 1.99967 15 2.33301 15L5.33301 15C5.83301 15 6.16634 14.6667 6.33301 14.1667L9.66634 4.16666C9.83301 3.66666 10.1663 3.33332 10.6663 3.33332C11.333 3.33332 11.833 4.16666 11.4997 4.83332L8.99967 9.99999L18.333 5.16666C18.833 4.83332 19.4997 5.16666 19.4997 5.83332L19.4997 7.99999C19.4997 8.49999 19.1663 8.83332 18.833 9.16666"
              fill="currentColor"
            />
          </svg>
        );
      case "hotel":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 21H21M6 18V9.5M18 18V9.5M6 9.5C6 8.4 6.9 7.5 8 7.5H16C17.1 7.5 18 8.4 18 9.5M6 9.5H18M10 17V13.5M14 17V13.5M4 7.5L12 3L20 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "car":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 14.5H19.5L21 11L19 8.5C19 8.5 18.5 8 18 8H14.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 8H3C2.5 8 2 8.5 2 9V12.5L3.5 14H6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 18.5V19.5C8 20.05 7.55 20.5 7 20.5H6C5.45 20.5 5 20.05 5 19.5V18.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 18.5V19.5C19 20.05 18.55 20.5 18 20.5H17C16.45 20.5 16 20.05 16 19.5V18.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.5 8H7L5 10.5L3.5 14H17.5L19 11L17 8.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.5 17C11.3284 17 12 16.3284 12 15.5C12 14.6716 11.3284 14 10.5 14C9.67157 14 9 14.6716 9 15.5C9 16.3284 9.67157 17 10.5 17Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 17C17.8284 17 18.5 16.3284 18.5 15.5C18.5 14.6716 17.8284 14 17 14C16.1716 14 15.5 14.6716 15.5 15.5C15.5 16.3284 16.1716 17 17 17Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "activity":
        return (
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 15C18 18.866 14.866 22 11 22C7.13401 22 4 18.866 4 15C4 11.134 7.13401 8 11 8C14.866 8 18 11.134 18 15Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M14.5 2.5C14.5 3.88071 13.3807 5 12 5C10.6193 5 9.5 3.88071 9.5 2.5C9.5 1.11929 10.6193 0 12 0C13.3807 0 14.5 1.11929 14.5 2.5Z"
              fill="currentColor"
            />
            <path
              d="M20 5.5C20 6.88071 18.8807 8 17.5 8C16.1193 8 15 6.88071 15 5.5C15 4.11929 16.1193 3 17.5 3C18.8807 3 20 4.11929 20 5.5Z"
              fill="currentColor"
            />
            <path
              d="M9 5.5C9 6.88071 7.88071 8 6.5 8C5.11929 8 4 6.88071 4 5.5C4 4.11929 5.11929 3 6.5 3C7.88071 3 9 4.11929 9 5.5Z"
              fill="currentColor"
            />
            <path
              d="M12 15V11M12 15L15 17M12 15L9 17"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with expand/collapse button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Your Booking</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? (
            <>
              <span>Hide details</span>
              <ChevronUp className="ml-1 h-4 w-4" />
            </>
          ) : (
            <>
              <span>Show details</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </>
          )}
        </button>
      </div>

      {/* Booking items list */}
      <div
        className={cn(
          "space-y-3 overflow-hidden",
          isExpanded ? "block" : "hidden",
        )}
      >
        {items.map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            className="flex items-start p-3 rounded-lg bg-gray-50 border border-gray-100"
          >
            <div className="h-10 w-10 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center mr-3 flex-shrink-0">
              {getItemIcon(item.type)}
            </div>

            <div className="flex-grow">
              <div className="flex justify-between">
                <h4 className="font-medium text-gray-900">{item.title}</h4>
                <span className="text-gray-900 font-medium">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>

              <p className="text-sm text-gray-600">{item.description}</p>

              {item.dates && (
                <div className="mt-1 text-xs text-gray-500">
                  {item.dates.start}
                  {item.dates.end ? ` - ${item.dates.end}` : ""}
                  {item.quantity > 1 &&
                    ` • ${item.quantity} ${item.type === "hotel" ? "nights" : item.type === "car" ? "days" : "tickets"}`}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Price breakdown */}
      <div className="border-t border-gray-200 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Taxes & fees</span>
          <span>{formatPrice(taxes)}</span>
        </div>

        <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
          <span>Total</span>
          <span className="text-purple-700">{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
