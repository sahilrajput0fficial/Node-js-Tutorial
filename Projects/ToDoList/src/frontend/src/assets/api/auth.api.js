import api from "./axios";


export const signUp = async(data)=>{
    const response =  await api.post("/auth/register",data,{
        headers:{
    }
})
    console.log(response);
    return response;
}

export const signIn = async(data)=>{
    const token = await api.post("/auth/login",data
    )
    console.log(token);
    return token;
    
}

export const getProfile = async(token)=>{
    const {data} = await api.get("/auth/profile",{
        headers:{
            Authorization:`Bearer ${token}` 
        }
    })
    
    return data.user;
}