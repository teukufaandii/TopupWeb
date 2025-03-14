// services/whatsappService.js
import twilio from "twilio";

/**
 * Service for sending WhatsApp messages using Twilio
 */
class WhatsAppService {
  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    this.twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER;
  }

  /**
   * Format phone number for WhatsApp
   * @param {string} phoneNumber - Raw phone number
   * @returns {string} - Formatted phone number with country code
   */
  formatPhoneNumber(phoneNumber) {
    let formattedNumber = phoneNumber.replace(/\D/g, "");

    if (!formattedNumber.startsWith("+")) {
      if (formattedNumber.startsWith("0")) {
        formattedNumber = "+62" + formattedNumber.substring(1);
      } else {
        formattedNumber = "+" + formattedNumber;
      }
    }

    return formattedNumber;
  }

  /**
   * Create a message for successful transaction
   * @param {Object} transaction - Transaction object with details
   * @returns {string} - Formatted message
   */
  createSuccessMessage(transaction) {
    return `
🎮 *Payment Successful!* 🎮

Thank you for your purchase at Fandi Topup Store!

*Order Details:*
- Invoice ID: ${transaction.invoiceId}
- Item: ${transaction.itemId.name}
- Quantity: ${transaction.quantity}
- Total: ${transaction.itemPrice}
- Payment Method: ${transaction.payment_method}

*Game Details:*
- UID: ${transaction.game_uid}
- Server: ${transaction.game_server}

Your order has been processed successfully. Your items will be delivered to your game account shortly.

Thank you for shopping with us! 🙏
`;
  }

  /**
   * Send WhatsApp message using Twilio
   * @param {Object} transaction - Transaction object containing all details
   * @returns {Promise<Object>} - Result of the send operation
   */
  async sendPaymentSuccessNotification(transaction) {
    try {
      const phoneNumber = this.formatPhoneNumber(transaction.phone_number);
      console.log("Attempting to send WhatsApp to:", phoneNumber);
      const messageBody = this.createSuccessMessage(transaction);

      const message = await this.client.messages.create({
        from: `whatsapp:${this.twilioWhatsAppNumber}`,
        to: `whatsapp:${phoneNumber}`,
        body: messageBody,
      });

      console.log(
        "Complete Twilio response:",
        JSON.stringify(message, null, 2)
      );
      return {
        success: true,
        sid: message.sid,
        status: message.status,
      };
    } catch (error) {
      console.error("Error sending WhatsApp notification:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

export default new WhatsAppService();
