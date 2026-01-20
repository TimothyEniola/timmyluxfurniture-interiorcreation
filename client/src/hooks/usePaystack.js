import { useCallback } from 'react';

// Custom hook for Paystack payment
export const usePaystack = () => {
  const initializePayment = useCallback((config) => {
    const paystackConfig = {
      key: 'pk_test_1234567890abcdef1234567890abcdef12345678', // Demo test key
      email: config.email,
      amount: config.amount * 100, // Convert to kobo
      currency: 'NGN',
      ref: `timmy-lux-${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: 'Customer Name',
            variable_name: 'customer_name',
            value: config.customerName || 'N/A'
          },
          {
            display_name: 'Phone',
            variable_name: 'phone',
            value: config.phone || 'N/A'
          }
        ]
      },
      callback: (response) => {
        config.onSuccess?.(response);
      },
      onClose: () => {
        config.onClose?.();
      }
    };

    // Check if Paystack script is loaded
    if (window.PaystackPop) {
      const handler = window.PaystackPop.setup(paystackConfig);
      handler.openIframe();
    } else {
      console.error('Paystack script not loaded');
    }
  }, []);

  return { initializePayment };
};