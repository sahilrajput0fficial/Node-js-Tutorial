import api from "./axios.js";

export const getCategory = async () => {
  const { data } = await api.get("/category/");
  return data;
};

export const addCategory = (data) => {
  return api.post("/category/add", data);
};


