// Paystack configuration
export const PAYSTACK_CONFIG = {
  publicKey: 'pk_test_1234567890abcdef1234567890abcdef12345678', // Demo test key - replace with your actual Paystack public key
  currency: 'NGN',
};

// Initialize payment configuration
export const initializePayment = (config) => {
  return {
    ...config,
    amount: config.amount * 100, // Paystack expects amount in kobo (multiply by 100)
    email: config.email,
    currency: PAYSTACK_CONFIG.currency,
    publicKey: PAYSTACK_CONFIG.publicKey,
    reference: `timmy-lux-${Date.now()}`, // Generate unique reference
    metadata: {
      custom_fields: [
        {
          display_name: "Customer Name",
          variable_name: "customer_name",
          value: config.customerName || "N/A"
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: config.phone || "N/A"
        }
      ]
    }
  };
};