const express = require("express");
const mongoose= require('mongoose');
const bodyParser= require("body-parser");
const Favorites= require('../models/favorite');
const authenticate = require('../authenticate');
const favoritRouter = express.Router();
const cors = require('./cors');
favoritRouter.use(bodyParser.json());

favoritRouter.route('/')
.options(cors.corsWithOptions,(req,res)=>res.sendStatus(200))
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    const userId= req.user._id;
    Favorites.find({user: userId})
    .populate('user')
    .populate('products')
    .then((fav_Item)=>{
        res.setHeader('Content-Type','application/json');
        res.json(fav_Item);
    },err=>next(err))
    .catch(err=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    let listOfProducts=req.body.products,
        userId= req.user._id;
    Favorites.find({user: userId})
    .then(UserObj=>{
        
        if(UserObj && UserObj.length>0){
            const fprodcuts= UserObj[0].products||[];
            const totalfproducts=[...fprodcuts,...listOfProducts];
            const consolidatedDihes=[];
            const mapper={};
            
            //remove duplicate
            totalfproducts.map(item=>{
                if(!mapper[item]){
                    mapper[item]=item;
                    consolidatedDihes.push(item);
                }
                return item;
            });

            console.log(fprodcuts,listOfProducts,consolidatedDihes );
            
            Favorites.update({user: userId},{
                $set: {products:consolidatedDihes},
            },{new:true})
            .then(updatedDish=>{
                res.statusCode= 200;
                res.setHeader('COntent-Type','application/json');
                res.json(updatedDish);
            },(err)=>next(err));

        }else {
            const ubject= {
                user: userId,
                products:listOfProducts
            }
            Favorites.create(ubject)
            .then(fav_Item=>{
                res.statusCode= 200;
                res.setHeader('COntent-Type','application/json');
                res.json(fav_Item);
            })
        }

    },err=>next(err))
    .catch(err=>next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.sendStatus('put operation is not supported at /favorites end points');

})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{    
    Favorites.remove({user: req.user._id})
    .then((fav_prod)=>{        
        res.statusCode= 200;
        res.setHeader('COntent-Type','application/json');
        res.json({'products':[]});
    },err=>next(err))
    .catch(err=>next(err));
});



favoritRouter.route('/:productId')
.options(cors.corsWithOptions,(req,res)=> res.sendStatus(200))
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.end('get operation is not supported at /favorites/:productId end point');
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    let productId = req.params.productId,
        userId = req.user._id;

    Favorites.find({ user: userId })
        .then(UserObj => {

            if (UserObj && UserObj.length > 0) {
                const fprodcuts = UserObj[0].products;
                    if(fprodcuts.length=== 0){
                        fprodcuts.push(productId);
                    }else {
                        fprodcuts.map((fproduct) => {
                            if (fproduct.toString() !== productId) {
                                fprodcuts.push(productId);
                                return false;
                            }
                            return true;
                        });
                    }
                Favorites.update({ user: userId }, {
                    $set: { products: fprodcuts },
                }, { new: true })
                    .then(updatedItem => {
                        res.statusCode = 200;
                        res.setHeader('COntent-Type', 'application/json');
                        res.json(updatedItem);
                    }, (err) => next(err));

            } else {
                const ubject = {
                    user: userId,
                    products: [productId]
                }
                Favorites.create(ubject)
                    .then(fav_Item => {
                        res.statusCode = 200;
                        res.setHeader('COntent-Type', 'application/json');
                        res.json(fav_Item);
                    })
            }

        }, err => next(err))
        .catch(err => next(err));
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=403;
    res.sendStatus('put operation is not supported at /favorites/:productId end points');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    let productId = req.params.productId,
    userId = req.user._id;

    Favorites.find({ user: userId })
        .then(UserObj => {
            if (UserObj && UserObj.length > 0) {
                
                const fItems = UserObj[0].products;
                const restFDishes=fItems.filter(fDish => fDish.toString() !== productId.trim());
                                
                Favorites.update({ user: userId }, {
                    $set: { products: restFDishes },
                }, { new: true })
                    .then(updatedItem => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(updatedItem);
                    }, (err) => next(err));

            } else {
                res.statusCode = 200;
                res.setHeader('COntent-Type', 'application/json');
                res.json({
                    'status': 'no favorite product found'
                });
            }

        }, err => next(err))
        .catch(err => next(err));
});


module.exports= favoritRouter;