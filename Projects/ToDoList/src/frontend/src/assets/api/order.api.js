import api from "./axios";

export const placeOrder = async (data) => {
    const response = await api.post("/order/place-order", data);
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
