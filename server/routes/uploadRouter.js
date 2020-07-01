const express = require("express");
const bodyParser= require("body-parser");
const multer= require('multer');
const authenticate = require('../authenticate');
const cors = require('./cors');

const uploadRouter=express.Router();
uploadRouter.use(bodyParser.json());

const storage=multer.diskStorage({
    destination:(req,filename,callback)=>{
        console.log('filename destination called');
        callback(null,'public/images');
    },
    filename:(req,file,callback)=>{
        console.log('filename', file.originalname);
        callback(null,file.originalname);
    }
});

const fileFilter=(req,file,callback)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return callback(new Error('you can upload only images files'));
    }
    return callback(null,true);
}

const upload=multer({
    storage:storage,
    fileFilter: fileFilter
});

uploadRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>res.sendStatus(200))
.get(cors.cors,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.status=403;
    res.send('get operation is not supported at /fileUpload');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.status=403;
    res.send('delete operation is not supported at /fileUpload');
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.status=403;
    res.send(' put operation is not supported at /fileUpload');
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,upload.single('imgFile'),(req,res,next)=>{
    console.log('node',req.body);
    res.status=202;
    res.setHeader('Content-Type','application/json');
    res.json(res.file);
});

module.exports = uploadRouter;