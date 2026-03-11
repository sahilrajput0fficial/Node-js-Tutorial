import api from "./axios";
export const loginAPI = async (email, password) => {
  const { data } = await api.post(
    "/seller/login",
    { email, password },
    {
      withCredentials: true,
    },
  );
  return data;
};
export const SignupAPI = async (email, password, name, storeName) => {
  const data = {
    email: email,
    password: password,
    name: name,
    storeName: storeName,
  };
  const resp = await api.post("/seller/signup", data, {
    withCredentials: true,
  });
  return resp.data;
};

export const profileAPI = async (token) => {
  const resp = await api.get("/seller/profile",  {
    withCredentials: true,
  });
  return resp.data;
};
