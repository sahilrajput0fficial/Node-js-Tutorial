import api from "./axios";

export async function getAvail(prodId,varId,pincode){
    console.log(`/check?productId=${prodId}&variantId=${varId}&pincode=${pincode}`);
    
    const { data } = await api.get(`/check?productId=${prodId}&variantId=${varId}&pincode=${pincode}`);
    
    return data;
}