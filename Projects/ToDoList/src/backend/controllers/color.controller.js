import colorModel from "../models/color.models.js"

export const getColors = async(req,res)=>{
    const data = await colorModel.find();
    res.status(201).json(data);

}

export const createColor = async(req,res)=>{
    const data = {
        "name":"red",
        "code":"#22274J"
    }
    const inserted = await colorModel.create(data);
    res.status(200).json({
        insert : inserted._id
    })
}




















