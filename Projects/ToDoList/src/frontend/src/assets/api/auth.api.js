import api from "./axios";


export const signUp = async(data)=>{
    const response =  await api.post("/auth/register",data,{
        headers:{
    },
    
})
    return response;
}

export const signIn = async(data)=>{
    const response = await api.post("/auth/login",data,{withCredentials:true}
    )
    return response;
    
}

export const getProfile = async(token)=>{
    const {data} = await api.get("/auth/profile",{
        headers:{
            Authorization:`Bearer ${token}` 
        }
    })
    
    return data.user;
}

export const getStaff = async (token) => {
  const { data } = await api.get("/auth/staff", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.user;
};

export const refreshAccessToken = async () => {
      const res = await axios.get("/auth/refresh-token", {
        withCredentials: true,
      });
      const token = res.data.accessToken;
      localStorage.setItem("authToken", token);
      setAccessToken(token);
      setIsAuthenticated(true);
      return token;
  };