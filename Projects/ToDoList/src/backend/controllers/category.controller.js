import categoryModel from "../models/category.models.js";
export const getCategory = async(req,res)=>{
    try{
        const data = await categoryModel.find()
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })   
    }  
}
export const addCategory = async(req,res)=>{
    try{
        const {img , title} = req.body;
        if(!img || !title){
            res.status(400).json({
                message:"Fill all the details",
            })
            return;
        }
        const data = {
            "img":img,
            "title":title
        }
        const inserted = await categoryModel.create(data);
        res.status(200).json({
            message : "Category Inserted",
            insertedId : inserted._id
        }) 
    }catch(err){
        res.status(500).json({
            message : "Internal Server Error",
            error : err.message
        })
    }
}
export const deleteCategory = async(req,res)=>{
    try{
        const id = req.params.id;
        if(!id){
            res.status(400).json({
                message:"Fill all fields"
            })
            return;
        }
        const deleted = await categoryModel.findByIdAndDelete(id);
        if(!deleted){
            res.status(500).json({
                message : "Not found data with id"
            })
            return;
        }
        res.status(201).json({
            message:"Data deleted"
        })
    }catch(err){
        res.status(500).json({
          message: "Internal Server Error",
          error: err.message,
        });

    }
}

export const updateCategory = async(req,res)=>{
    try {
      const id = req.params.id;
      if (!id) {
        res.status(400).json({
          message: "Fill all fields",
        });
        return;
      }
      const updated = await categoryModel.findByIdAndUpdate(id);
      if (!updated) {
        res.status(500).json({
          message: "Not found data with id",
        });
        return;
      }
      res.status(201).json({
        message: "Data updated",
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }

}