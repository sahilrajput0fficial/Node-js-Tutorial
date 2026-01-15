

export function authenticateStaff(req,res,next){
    const userRole = req.user.role;
    if(!userRole || (userRole !== "staff" && userRole !== "admin")){
        return res.status(403).json({
            message:"Access denied. Staff only resource."
        });
    }
    next();

} 