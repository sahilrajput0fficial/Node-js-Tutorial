import api from "./axios";

export const getCategory = async ()=>{
    const {data}= await api.get("/category/")
    return data;
}

export const addCategory = (data) =>{
    return api.post("/category/add",data)
}

export const updateCategory = (data)=>{
    return api.put("/category/update/:id",data)
}