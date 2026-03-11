import api from "./axios";

export const getAllOrders = async () => {
    const { data } = await api.get("/order/all", {
        withCredentials: true,
    });
    return data;
};

export const getOrderById = async (orderId) => {
    const { data } = await api.get(`/order/${orderId}`, {
        withCredentials: true,
    });
    return data;
};

export const updateOrderStatus = async (orderId, status) => {
    const { data } = await api.patch(`/order/${orderId}/status`, { status }, {
        withCredentials: true,
    });
    return data;
};
