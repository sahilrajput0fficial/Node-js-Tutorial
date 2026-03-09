import api from "./axios";


export const signUp = async (data) => {
  const response = await api.post("/auth/register", data, {
    headers: {
    },

  })
  return response;
}

export const signIn = async (data) => {
  const response = await api.post("/auth/login", data, { withCredentials: true }
  )
  return response;

}

export const getProfile = async () => {
  const { data } = await api.get("/auth/profile");

  return data.user;
}

export const getStaff = async () => {
  const { data } = await api.get("/auth/staff");
  return data.user;
};
