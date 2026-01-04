import api from "./axios";


export const getSaleLiveData = async()=>{
    return api.get("/products/")
}