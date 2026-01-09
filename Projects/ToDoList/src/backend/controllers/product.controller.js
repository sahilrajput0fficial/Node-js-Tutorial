import { ProductModel } from "../models/product.models.js";



export const getProductDataBySlug = async(req,res)=>{
    try{
        const slug = req.params.slug;
        if(!slug){
            res.status(400).json({
              message: "No Slug Found",
            });
            return;

        }
        const data = await ProductModel.findOne({ slug: slug })
          .populate("category")
          .populate("variants.color");
        res.status(200).json(data);

    }catch(err){
        res.status(500).json({
          message: "Internal Server Error",
          error: err.message,
        });

    }
}


export const addProductData = async(req,res)=>{
    try{
        const products = req.body;
        if(!products){
            res.status(400).json({
                message :"No Data Entered"
            })
            return;
        }
        
        const inserted = await ProductModel.insertMany(products)
        const array =[]
        inserted.forEach(({_id})=>{
            array.push(_id)


        })
        res.status(200).json({
            message:"Inserted",
            insertedData: array
        })
        
      

    }catch(err){
        res.status(500).json({
          message: "Internal Server Error",
          error: err.message,
        });

    }
      
}

export const getAllproducts = async(req,res)=>{
    try{
        const data = await ProductModel.find()
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })   
    }  
}