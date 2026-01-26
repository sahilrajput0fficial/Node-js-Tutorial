import { ProductModel } from "../models/product.models.js";
import categoryModels from "../models/category.models.js";
import { upload } from "../middlewares/uploadProductImages.js";
import { SellerModel } from "../models/seller.models.js";
export const getProductDataBySlug = async (req, res) => {
  try {
    const slug = req.params.slug;
    if (!slug) {
      res.status(400).json({
        message: "No Slug Found",
      });
      return;
    }
    const data = await ProductModel.findOne({ slug: slug });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export const addProductData = async (req, res, next) => {
  try {
    const productData = JSON.parse(req.body.productData);
    const sellerId = req.cookies["seller-id"];
    if(!sellerId){
      return res.status(401).json({
        message:"Unauthorised"
      })
    }
    const images = req.files.images || [];
    const variantImages = req.files.variantImages || [];

    if (!productData) {
      res.status(400).json({
        message: "No Data Entered",
      });
      return;
    }
    const productImages = images.map((file) => file.path);
    const processedVariants = productData.variants.map((variant, index) => {
      const variantImageFiles = variantImages.filter((file) =>
        file.originalname.startsWith(`variant_${index}_`),
      );
      return {
        ...variant,
        images: variantImageFiles.map((file) => file.path),
      };
    });
    const categoryData = await categoryModels.findOne({
        title: productData.category,
    });

    const finalProductData = {
      ...productData,
      category : categoryData,
      images: productImages,
      variants: processedVariants,
      seller : sellerId
    };
    finalProductData.variants.forEach((variant) => {
      variant.color = {
        name: variant.colorName,
        code: variant.hexCode,
      };
    });


    //console.log(finalProductData);
    const inserted = await ProductModel.create(finalProductData);
    console.log(inserted);
    return res.status(200).json({
      message : "Product added"

    })
    
    
  } catch (err) {
    next(err);
  }
};

export const getAllproducts = async (req, res, next)=>{
  try {
    const data = await ProductModel.find();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getSellerProduct = async(req,res,next)=>{
  try{
    console.log("Process 1 Executing ")

    const sellerId = req.cookies["seller-id"];
        console.log("Seller is", sellerId);
    if (!sellerId) {
      return res.status(401).json({
        message: "Unauthorised",
      });
    }
    const allData = await SellerModel.find();
    if(!allData){
      console.log("Model not connevcted")
    }
    console.log(allData)
    const sellerData = await SellerModel.findById(sellerId)
    console.log(sellerData)
    if(!sellerData){
      return res.status(400).json({
        message : "Seller not found"
      })
    }
    const prod = await ProductModel.find({
      seller : sellerData._id
    })

    console.log(prod);
    res.status(200).json({prod}) // return krega array (find)




  
  }catch(err){
    next(err);
  }

}