const express=require("express")
const router=express.Router();
const fs=require('fs');
const accountRoutes=require('./account')
router.use(accountRoutes)

module.exports=router;