import api from "./axios";

export const getCategory = ()=>{
    return api.get("/category/")
}

export const addCategory = (data) =>{
    return api.post("/category/add",data)
}

export const updateCategory = (data)=>{
    return api.put("/category/update/:id",data)
}