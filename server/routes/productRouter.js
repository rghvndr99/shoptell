const express = require("express");
const bodyParser= require("body-parser");
const Products= require('../models/products');
const authenticate = require('../authenticate');
const productRoute = express.Router();
const cors = require('./cors');
productRoute.use(bodyParser.json());

productRoute.route('/')
.options(cors.corsWithOptions,(req,res)=>res.sendStatus(200))
.get(cors.cors,(req,res,next)=>{
	Products.find({})
	.populate('comments.author')
	.then((products)=>{
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
	},(err)=>next(err))
	.catch(err=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
	console.log(req.body);
	Products.create(req.body)
	.then((products)=>{
		console.log('prodcut Created ', products);
		res.setHeader('Content-Type', 'application/json');
        res.json(products);
	},(err)=>{
		console.log(err);
		return next(err);
	})
	.catch((err)=>{
		console.log('catch error',err);
		return next(err);
	});	
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
	res.statusCode = 403;
    res.end('PUT operation not supported on /products');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
	Products.remove({})
	.then((products)=>{
        res.setHeader('Content-Type', 'application/json');
        res.json(products);
	},(err)=>next(err))
	.catch(err=>next(err));
});


productRoute.route('/:productId')
.options(cors.corsWithOptions,(req,res)=>res.sendStatus(200))
.get(cors.cors,(req,res,next)=>{
	Products.findById(req.params.productId)
	.populate('comments.author')
	.then(product=>{
		res.statusCode=200;
		res.setHeader('Content-Type', 'application/json');
		res.json(product);
	},(err)=>next(err))
	.catch(err=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
	res.statusCode=403;
	res.end('post operation is supported at '+req.params.productId);
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
	Products.findByIdAndUpdate(req.params.productId,{
		$set:req.body,		
	},{new:true})
	.then(product=>{
		res.statusCode=200;
		res.setHeader('Content-Type', 'application/json');
		res.json(product);
	},(err)=>next(err))
	.catch(err=>next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
	console.log('delete id'+req.params.productId);
	Products.findByIdAndDelete(req.params.productId)
	.then(product=>{
		Products.find({})
		.populate('comments.author')
		.then((prodcuts)=>{
        	res.setHeader('Content-Type', 'application/json');
        	res.json(prodcuts);
		},(err)=>next(err))
		.catch(err=>next(err));
	},(err)=>next(err))
	.catch(err=>next(err));
});

//comments operations

productRoute.route('/:productId/comments')
.options(cors.corsWithOptions,(req,res)=>res.sendStatus(200))
.get(cors.cors,(req,res,next)=>{
		Products.findById(req.params.productId)
		.populate('comments.author')
		.then(product=>{
				if(product && product.comments) {
				res.statusCode=200;
				res.setHeader('Content-Type', 'application/json');
				res.json(product.comments);
			}else {
				let err = new Error('Dish ' + req.params.productId + ' not found');
		        err.status = 404;
		        return next(err);
			}
		},(err)=>next(err))
		.catch(err=>next(err));

})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
	Products.findById(req.params.productId)
	.then(product=>{
			if(product && product.comments) {
				req.body.author = req.user._id;
				product.comments.push(req.body);
				product.save()
				.then((product)=>{
					Products.findById(product._id)
					.populate('comments.author')
					.then(product=>{
						res.statusCode=200;
						res.setHeader('Content-Type', 'application/json');
						res.json(product);
					})
					
				},(err)=>next(err));
			
		}else {
			let err = new Error('product ' + req.params.productId + ' not found');
	        err.status = 404;
	        return next(err);
		}
	},(err)=>next(err))
	.catch(err=>next(err));

})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{	
	res.statusCode = 403;
    res.end('PUT operation not supported on /products/' + req.params.productId + '/comments');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
	Products.findById(req.params.productId)
	.then(product=>{
		product.comments=[];
		product.save()
		.then(product=>{
			res.statusCode=200;
		    res.setHeader('Content-Type', 'application/json');
		    res.json(product);
		},err=>next(err));		
	},(err)=>next(err))
	.catch(err=>next(err));

});


//commentId operations

productRoute.route('/:productId/comments/:commentId')
.options(cors.corsWithOptions,(req,res)=>res.sendStatus(200))
.get(cors.cors,(req,res,next)=>{

	Products.findById(req.params.productId)
	.populate('comments.author')
	.then(product=>{
			if(product && product.comments) {
				const comment=product.comments.filter((item)=> {
					const id=item._id;
					if(id.toString().trim() === req.params.commentId) {						
						return item;
					}
				});				
				res.statusCode=200;
				res.setHeader('Content-Type', 'application/json');
				res.json(comment[0]);
		}else {
			let err = new Error('Dish ' + req.params.productId + ' not found');
	        err.status = 404;
	        return next(err);
		}
	},(err)=>next(err))
	.catch((err)=>next(err));

})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /products/'+ req.params.productId+ '/comments/' + req.params.commentId);
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
	Products.findById(req.params.productId)
	.then(product=>{
		//check for user
		if(product.comments.author._id(req.user._id) !==null ) {
		if(product && product.comments) {
			product.comments.push(req.body);
			product.save()
			.then(product=>{
				res.statusCode=200;
				res.setHeader('Content-Type', 'application/json');
				res.json(product);
			},err=>next(err));
		}else {
			let err= new Error('Dish '+ req.params.productId + ' does not have any comments');
			return next(err);
		}
	} else {
		let err = new Error('you are not authorised for updating this comment');
		err.status = 403;
		return next(err);
	}	
		
	},(err)=>next(err))
	.catch(err=>next(err));

})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
	console.log(req.params);
	    Products.findById(req.params.productId)
    .then((product) => {
		const comments=product.comments.filter((comment)=>(comment._id).toString().trim()!==req.params.commentId);
		product.comments=comments;
		product.save()
            .then((product) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(product);                
            }, (err) => next(err))
    .catch((err) => next(err))

});
});

module.exports= productRoute;