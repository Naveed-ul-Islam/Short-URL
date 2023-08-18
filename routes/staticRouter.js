const express = require('express');
const { restrictTo } = require("../middlewares/auth");
const URL = require('../models/url');
const router = express.Router();



router.get('/admin/urls', restrictTo(['ADMIN']), async(req,res) => {

         //PAGINATION FOR ADMIN

        const page = parseInt(req.query.page);
        const limit =parseInt(req.query.limit);

        const startIndex = (page - 1) * limit
        const endIndex =  page * limit

        const results = await URL.find({}).limit(limit).skip(startIndex)
       

    return res.render('home',{urls:results});

});




router.get('/',restrictTo(["NORMAL", "ADMIN"]), async (req,res)=>{
    const allurls = await URL.find({ createdBy: req.user._id});
    
    return res.render('home',
    {urls: allurls,});
});

router.get('/signup',(req,res)=>{
    return res.render('signup');
});

router.get('/login',(req,res)=>{
    return res.render('login');
});

module.exports = router;