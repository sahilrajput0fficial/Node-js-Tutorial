import api from "./axios";

export async function getProductData(slug) {
  const { data } = await api.get(`/products/get/${slug}`);

  return data;
}

export async function addProduct(token, data) {
  const formData = new FormData();
  formData.append(
    "productData",
    JSON.stringify({
      name: data.name,
      description: data.description,
      metatitle: data.metatitle,
      category: data.category,
      prop: data.prop,
      variants: data.variants.map((variant, index) => ({
        ...variant,
        images: [], 
      })),
    }),
  );
  if (data.images && data.images.length > 0) {
    data.images.forEach((image, index) => {
      formData.append("images", image);
    });
  }

  if (data.variants && data.variants.length > 0) {
    data.variants.forEach((variant, variantIndex) => {
      if (variant.images && variant.images.length > 0) {
        variant.images.forEach((image, imageIndex) => {
          formData.append(
            "variantImages",
            image,
            `variant_${variantIndex}_${imageIndex}`,
          );
        });
      }
    });
  }

  const response = await api.post("/products/add", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return response;
}


export async function  getSellerProduct(token){
    const { data } = await api.get(`/products/sellerProducts`,{
      headers:{
        "Authorization":`Bearer ${token}`
      },
      withCredentials: true
    });
    return data;
}
