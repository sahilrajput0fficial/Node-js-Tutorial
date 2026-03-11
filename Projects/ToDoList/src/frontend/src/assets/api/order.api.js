import api from "./axios";

export const placeOrder = async (data) => {
    const response = await api.post("/order/place-order", data);
    return response.data;
};

export const startPayment = async (orderId, amount, email, phone) => {
    const response = await api.post("/payment/start-payment", {
        orderId,
        amount,
        email,
        phone,
    });
    return response.data;
};

export const getOrderById = async (orderId) => {
    const response = await api.get(`/order/${orderId}`);
    return response.data;
};

export const getCouponStatus = async (couponCode) => {
    const response = await api.get(`/coupon/verify/${couponCode}`);
    return response.data;
};
export const getOrders = async () => {
    const response = await api.get(`/order`);
    return response.data;
};

export const cancelOrder = async (orderId) => {
    const response = await api.patch(`/order/${orderId}/cancel`);
    return response.data;
};
