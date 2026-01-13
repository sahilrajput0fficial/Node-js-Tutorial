import api from "./axios";


export const signUp = async(data)=>{
    const response =  await api.post("/auth/register",data)
    console.log(response);
    return response;
}