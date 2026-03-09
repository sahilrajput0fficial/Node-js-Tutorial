import api from "./axios";

export const getCategory = async ()=>{
    const {data}= await api.get("/category/")
    return data;
}

