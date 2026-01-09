import { inventoryModel, pincodeModel, warehouseModel } from "../models/delivery.models.js";


export const checkAvailability = async(req,res)=>{
    const {productId , variantId , pincode} = req.query;

    if (!/^\d{6}$/.test(pincode)) {
    return res.status(400).json({
        deliverable: false,
        reason: "Invalid pincode",
    });
    }
    console.log(pincode);
    //if pincode exists in our data
    const pinCodeData = await pincodeModel.findOne({pincode : pincode})
    //console.log(pinCodeData);

    //if has warehouse and its status
    const warehouse = await warehouseModel.find({pincodes:pincode}).sort({"warehouses.stock": -1}).lean()//1:Ascending -1:Descending
    const warehouseId = (warehouse.length!=0 ? warehouse.map((item)=>item._id):[])
    console.log(warehouse);

    const inv = await inventoryModel
      .find({
        productId : productId,
        variantId : variantId,
        warehouseId: { $in: warehouseId },
        stock: { $gt: 0 },
      })
      .populate("warehouseId").lean();
    if(inv.length<=0){
        return res.status(200).json({
          deliverable: false,
          reason: "No stock available nearby",
        });
    }
    const sortedInv = inv.sort((a, b) => b.stock - a.stock);
    const selectedInv = sortedInv[0];
    console.log(selectedInv);

        const etaDays = selectedInv.warehouseId.city ? 2 : 4;
        const eta = new Date();
        eta.setDate(eta.getDate() + etaDays);

        // 9️⃣ Send response
        res.status(200).json({
          deliverable: true,
          warehouse: selectedInv.warehouseId.name,
          warehouseId: selectedInv.warehouseId._id,
          city: selectedInv.warehouseId.city,
          stockAvailable: selectedInv.stock,
          eta: eta,
          shipping: "FREE",
        });
    




    
    

    

    
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
