/**
 * Service for generating and downloading PDF documents like receipts
 * This is a simple mock implementatio              <td style="text-align: right; padding: 8px 0;">
                ${currencySymbol}${data.subtotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td style="text-align: right; padding: 8px 0;">Tax:</td>
              <td style="text-align: right; padding: 8px 0;">
                ${currencySymbol}${data.tax.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td style="text-align: right; padding: 8px 0; font-weight: bold;">Total:</td>
              <td style="text-align: right; padding: 8px 0; font-weight: bold;">
                ${currencySymbol}${data.total.toFixed(2)}app, you might use a library like jsPDF
 */

export interface ReceiptData {
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
  currency?: string;
}

export class PDFService {
  /**
   * Generate and download a PDF receipt
   * @param receiptData - The data to include in the receipt
   */
  public static generateReceipt(receiptData: ReceiptData): void {
    // In a real implementation, this would use jsPDF or a similar library
    // For this mock implementation, we'll create a data URL for a simple HTML receipt

    const receiptHtml = this.createReceiptHtml(receiptData);
    const encodedData = encodeURIComponent(receiptHtml);
    const dataUrl = `data:text/html;charset=utf-8,${encodedData}`;

    // Create an anchor element and trigger a download
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `receipt-${receiptData.transactionId}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Create HTML content for the receipt
   * @param data - Receipt data
   * @returns HTML string
   */
  private static createReceiptHtml(data: ReceiptData): string {
    const currencySymbol = data.currency === "USD" ? "$" : "₦";

    const itemsHtml = data.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 8px 0;">
          <strong>${item.name}</strong>
          ${item.description ? `<br><span style="font-size: 12px; color: #666;">${item.description}</span>` : ""}
        </td>
        <td style="text-align: right; padding: 8px 0;">
          ${currencySymbol}${item.price.toFixed(2)}
        </td>
      </tr>
    `,
      )
      .join("");

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Skyways - Receipt #${data.transactionId}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; }
          .info-section { display: flex; justify-content: space-between; margin: 20px 0; }
          table { width: 100%; border-collapse: collapse; }
          .totals { margin-top: 20px; text-align: right; }
          .footer { margin-top: 40px; font-size: 12px; text-align: center; color: #666; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 style="color: #0066cc; margin-bottom: 0;">Skyways</h1>
          <p style="color: #666;">Digital Receipt</p>
        </div>
        
        <div class="info-section">
          <div>
            <p style="font-size: 12px; color: #666; margin-bottom: 0;">Transaction ID</p>
            <p style="margin-top: 5px;"><strong>${data.transactionId}</strong></p>
          </div>
          <div style="text-align: right;">
            <p style="font-size: 12px; color: #666; margin-bottom: 0;">Date</p>
            <p style="margin-top: 5px;"><strong>${data.date}</strong></p>
          </div>
        </div>
        
        <div style="margin: 20px 0;">
          <p style="font-size: 12px; color: #666; margin-bottom: 0;">Customer</p>
          <p style="margin-top: 5px; margin-bottom: 0;"><strong>${data.customerName}</strong></p>
          <p style="margin-top: 5px;">${data.customerEmail}</p>
        </div>
        
        <table>
          <tr>
            <th colspan="2" style="text-align: left; padding-bottom: 10px; border-bottom: 1px solid #eee;">
              Purchase Details
            </th>
          </tr>
          ${itemsHtml}
        </table>
        
        <div class="totals">
          <table>
            <tr>
              <td style="text-align: right; padding: 8px 0;">Subtotal:</td>
              <td style="text-align: right; padding: 8px 0; width: 100px;">
                ₦${data.subtotal.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td style="text-align: right; padding: 8px 0;">Tax:</td>
              <td style="text-align: right; padding: 8px 0;">
                ₦${data.tax.toFixed(2)}
              </td>
            </tr>
            <tr>
              <td style="text-align: right; padding: 8px 0; font-weight: bold;">Total:</td>
              <td style="text-align: right; padding: 8px 0; font-weight: bold;">
                ₦${data.total.toFixed(2)}
              </td>
            </tr>
          </table>
        </div>
        
        <div class="footer">
          <p>Thank you for using Skyways. If you have any questions, please contact our support team.</p>
        </div>
      </body>
      </html>
    `;
  }
}
