import { isValid } from "../helper/creditcardverify.js";
const paymentMethod = {
  upi: "upi",
  card: "card",
  cod: "cod",
};

export const placeOrder = async (orderData) => {
  if (orderDataVerify(orderData) & (await paymentDetailsVerify(orderData))) {
    console.log("Order verified successfully");
  }

  return orderData;
};

export const orderDataVerify = (data) => {
  console.log(data);
  if (
    !data.firstName ||
    !data.mobile ||
    !data.address ||
    !data.city ||
    !data.state ||
    !data.pincode
  ) {
    throw new Error("User personal data not complete");
  }

  return true;
};
export async function paymentDetailsVerify(orderData) {
  const payment_method = orderData.paymentMethod;

  if (payment_method === paymentMethod.upi) {
    if (!orderData.upi) {
      throw new Error("UPI ID not provided");
    }

    return true;
  } else if (payment_method === paymentMethod.card) {
    if (
      !orderData.cardNumber ||
      !orderData.cardName ||
      !orderData.expiry ||
      !orderData.cvv
    ) {
      throw new Error("Card details missing");
    }

    const valid = await isValid(orderData.cardNumber);

    if (!valid) {
      throw new Error("Card number is invalid");
    }

    return true;
  } else if (payment_method === paymentMethod.cod) {
    return true;
  } else {
    throw new Error("Invalid payment method");
  }
}
