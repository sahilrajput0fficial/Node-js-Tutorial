import { inventoryModel, pincodeModel, warehouseModel } from "../models/delivery.models.js";


export const checkAvailability = async(req,res)=>{
    const {productId , variantId , pincode} = req.query;
    console.log(pincode);
    //if pincode exists in our data
    const pinCodeData = await pincodeModel.findOne({pincode : pincode})
    //console.log(pinCodeData);

    //if has warehouse and its status
    const warehouse = await warehouseModel.find({pincodes:pincode}).sort({"warehouses.stock": -1}).lean()//1:Ascending -1:Descending
    const warehouseId = (warehouse.length!=0 ? warehouse.map((item)=>item._id):[])
    console.log(warehouseId);

    const inv = await inventoryModel
      .find({
        productId : productId,
        variantId : variantId,
        warehouseId: { $in: warehouseId },
        stock: { $gt: 0 },
      })
      .populate("warehouseId").lean();
    console.log(inv);
    




    
    

    

    
}



///development controllers
export const addPincode=async(req,res)=>{
    const data = req.body;
    const inserted = pincodeModel.create(data);
    res.status(200).json({inserted})
    
}

export const addWarehouse=async(req,res)=>{
    const data = req.body;
    const inserted = warehouseModel.create(data);
    res.status(200).json({inserted });
}

export const addInventory = async(req,res)=>{
    const data = req.body;
    const inserted = inventoryModel.create(data);
    res.status(200).json({inserted });
}
