import {createPaymentSession} from "../services/cashfree.services.js"


export const startPayment = async (req, res) => {
  const { orderId, amount, email, phone } = req.body;

  const sessionId = await createPaymentSession(
    orderId,
    amount,
    {
      id: "cust_" + Date.now(),
      email,
      phone,
    },
  );
  res.json({
    paymentSessionId: sessionId,
  });
};