import { formatDistanceToNow } from "date-fns";
import { ArrowDownToLine, Check } from "lucide-react";

import type { ReceiptDetails } from "@/types/checkout";

interface EReceiptProps {
  receiptDetails: ReceiptDetails;
  onDownload?: () => void;
}

const EReceipt = ({ receiptDetails, onDownload }: EReceiptProps) => {
  const {
    receiptNumber,
    bookingReference,
    issueDate,
    paymentDetails,
    contactInfo,
    items,
    subtotal,
    taxes,
    total,
    currency,
  } = receiptDetails;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(price);
  };

  const formattedDate = new Date(issueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timeAgo = formatDistanceToNow(new Date(issueDate), { addSuffix: true });

  // Get emoji icon based on item type
  const getItemIcon = (type: string) => {
    switch (type) {
      case "flight":
        return "✈️";
      case "hotel":
        return "🏨";
      case "car":
        return "🚗";
      case "activity":
        return "🏛️";
      default:
        return "📦";
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      {/* Header */}
      <div className="text-center pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Skyways Airline</h1>
        <p className="text-gray-500 text-sm">Payment Receipt</p>
      </div>

      {/* Receipt Details */}
      <div className="py-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-gray-500">Receipt Number</p>
            <p className="font-medium">{receiptNumber}</p>
            <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-medium">{formattedDate}</p>
            <p className="text-sm text-gray-500 mt-2">Booking Reference</p>
            <p className="font-medium">{bookingReference}</p>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="py-4 border-b border-gray-200">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Customer</p>
            <p className="font-medium">
              {contactInfo.firstName} {contactInfo.lastName}
            </p>
            <p className="text-sm">{contactInfo.email}</p>
            <p className="text-sm">{contactInfo.phone}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Payment Method</p>
            <div className="flex items-center justify-end">
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-2 flex items-center">
                <Check className="h-3 w-3 mr-1" />
                Paid
              </div>
              <p className="font-medium">
                {paymentDetails.paymentMethod === "credit_card"
                  ? "Credit Card"
                  : paymentDetails.paymentMethod === "debit_card"
                    ? "Debit Card"
                    : paymentDetails.paymentMethod === "bank_transfer"
                      ? "Bank Transfer"
                      : "Quickteller"}
              </p>
            </div>
            {paymentDetails.cardDetails && (
              <p className="text-sm">
                {paymentDetails.cardDetails.brand} ••••{" "}
                {paymentDetails.cardDetails.last4}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="py-4 border-b border-gray-200">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="pb-2 text-gray-500 text-sm font-medium">Item</th>
              <th className="pb-2 text-gray-500 text-sm font-medium">
                Description
              </th>
              <th className="pb-2 text-gray-500 text-sm font-medium text-right">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="py-3">
                  <div className="flex items-center">
                    <span className="text-lg mr-2">
                      {getItemIcon(item.type)}
                    </span>
                    <span className="font-medium">{item.title}</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-600">
                  {item.description}
                  {item.quantity > 1 && (
                    <span className="text-xs text-gray-500 ml-1">
                      (x{item.quantity})
                    </span>
                  )}
                </td>
                <td className="py-3 text-right">
                  {formatPrice(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="py-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-600">Taxes & Fees</span>
          <span>{formatPrice(taxes)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Actions */}
      {onDownload && (
        <div className="mt-6">
          <button
            onClick={onDownload}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md flex items-center justify-center"
          >
            <ArrowDownToLine className="h-4 w-4 mr-2" />
            Download Receipt
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>This is an electronic receipt for your purchase.</p>
        <p className="mt-1">
          Skyways Airline • support@Skyways.com • +1 123 456 7890
        </p>
      </div>
    </div>
  );
};

export default EReceipt;
