function admin(req,res,next){
    if(!req.body.isAdmin) return res.status(403).send("acces forbidden");
    next();
}

module.exports=admin;