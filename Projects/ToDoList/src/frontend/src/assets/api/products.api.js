import api from "./axios";


export const getSaleLiveData = async()=>{
    return api.get("/products/")
}


export async function getProductData(slug){
    const { data } = await api.get(`/products/get/${slug}`);
    
    return data;
}