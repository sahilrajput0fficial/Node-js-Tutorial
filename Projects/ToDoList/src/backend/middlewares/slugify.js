import slugify from "slugify";
import { ProductSchema } from "../models/product.models.js";

ProductSchema.pre("validate",function (next)
{
    console.log(this.name)
    if(!this.slug){
        this.slug = slugify(this.name,{
            lower:true,
            strict:true
        });

        
    }
    next();

});