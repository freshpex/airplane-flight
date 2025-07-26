import { motion } from "framer-motion";
import { formatCurrency } from "../../../utils/format";

interface ReceiptProps {
  transactionId: string;
  date: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    description?: string;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  onDownload: () => void;
}

export function Receipt({
  transactionId,
  date,
  customerName,
  customerEmail,
  items,
  subtotal,
  tax,
  total,
  onDownload,
}: ReceiptProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-600">Skyways</h2>
        <p className="text-sm text-gray-500">Digital Receipt</p>
      </div>

      <div className="flex justify-between mb-6">
        <div>
          <p className="text-xs text-gray-500">Transaction ID</p>
          <p className="font-medium">{transactionId}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Date</p>
          <p className="font-medium">{date}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs text-gray-500">Customer</p>
        <p className="font-medium">{customerName}</p>
        <p className="text-sm text-gray-600">{customerEmail}</p>
      </div>

      <div className="border-t border-b border-gray-200 py-4 mb-4">
        <p className="font-semibold mb-2">Purchase Details</p>
        {items.map((item, index) => (
          <div key={index} className="flex justify-between mb-2">
            <div>
              <p className="font-medium">{item.name}</p>
              {item.description && (
                <p className="text-xs text-gray-500">{item.description}</p>
              )}
            </div>
            <p className="font-medium">{formatCurrency(item.price)}</p>
          </div>
        ))}
      </div>

      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium">{formatCurrency(subtotal)}</p>
        </div>
        <div className="flex justify-between mb-2">
          <p className="text-gray-600">Tax</p>
          <p className="font-medium">{formatCurrency(tax)}</p>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <p>Total</p>
          <p>{formatCurrency(total)}</p>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onDownload}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors"
        >
          Download PDF
        </button>
        <p className="mt-4 text-xs text-gray-500">
          Thank you for using Skyways. If you have any questions, please contact
          our support team.
        </p>
      </div>
    </motion.div>
  );
}
