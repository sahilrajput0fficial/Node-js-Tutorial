import axios from "axios";
import { config } from "../config/cashfree.js";

import dotenv from "dotenv";

dotenv.config();

export const createPaymentSession = async (orderId, amount, customer) => {
  const response = await axios.post(
    config.BASE_URL,
    {
      order_id: orderId,
      order_amount: amount,
      order_currency: "INR",
      customer_details: {
        customer_id: customer.id,
        customer_email: customer.email,
        customer_phone: customer.phone,
      },
      order_meta: {
        return_url: `${process.env.FRONTEND_URL}/payment-success?order_id=${orderId}`,
      },
    },
    {
      headers: {
        "x-client-id": config.APP_ID,
        "x-client-secret": config.SECRET_KEY,
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
      },
    },
  );

  return response.data.payment_session_id;
};
