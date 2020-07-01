const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://localhost:8000', 'https://localhost:3441','http://localhost:3001/users/google/token'];
const corsOptionSDelete=(req,callback)=>{
    console.log('res+req',req.header('Origin'));

    callback(null, {
        origin: (-1 !== whitelist.indexOf(req.header('Origin'))? true: false)
    });
    
}

exports.cors=cors();
exports.corsWithOptions=cors(corsOptionSDelete);