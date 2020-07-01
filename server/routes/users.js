var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('./cors');

const authenticate = require('../authenticate');
const User = require('../models/users');

router.use(bodyParser.json());

/* GET users listing. */
router.options('/',cors.cors,(req,res)=>res.sendStatus(200));
router.options('/login',cors.corsWithOptions,(req,res)=>res.sendStatus(200));
router.options('/signup',cors.corsWithOptions,(req,res)=>res.sendStatus(200));
router.options('/signout',cors.corsWithOptions,(req,res)=>res.sendStatus(200));
router.options('/facebook/token',cors.corsWithOptions,(req,res)=>res.sendStatus(200));
router.options('/google/token',cors.corsWithOptions,(req,res)=>res.sendStatus(200));

router.get('/',cors.cors,authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) =>{
  User.find({})
  .then(user=>{
	res.status=200;
	res.setHeader('Content-Type', 'application/json');
	res.json(user);
  },err=>next(err))
  .catch(err=>next(err));
});

router.post('/signup',(req,res,next)=>{
	const username= req.body.username;

	User.register(new User({username:username}),req.body.password,(err,user)=>{
		if(err) {
			const err= new Error(username + 'alreday exists');
			err.status= 403;
			next(err);
		}
		else {
			user.firstname= req.body.firstname || '';
			user.lastname= req.body.lastname || '';

			user.save((err,user)=>{
				if(err) {
					const err= new Error(username + 'has an issue ');
					err.status= 403;
					next(err);
				}
				else {
				passport.authenticate('local')(req,res,()=>{
						res.statusCode = 200;
						res.setHeader('Content-Type', 'application/json');
						res.send({success: true, status: 'Registration Successful!'});
						res.end();
				});
			}
			})

		}
	});
});

router.post('/login',cors.corsWithOptions,(req,res,next)=>{
	passport.authenticate('local',(err,user,info)=>{
		if(err) {return next(err)}
		if(!user) { return next('no user is found')}
		req.logIn(user,(err)=>{
			if(err) {return next(err);}
			const token = authenticate.getToken({_id: req.user._id});
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json({success: true,userId: req.user._id, isAdmin:user.admin, status: 'You are successfully logged in!', token});
		})
	})(req, res, next);
});

router.get('/facebook/token',cors.corsWithOptions,(req,res,next)=>{
	passport.authenticate('facebook-token',(err,user,info)=>{
		if(err) {return next(err)}
		if(!user) { return next('no user is found')}
		req.logIn(user,(err)=>{
			if(err) {return next(err);}
			const token = authenticate.getToken({_id: req.user._id});
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json({success: true,userId: req.user._id, isAdmin:user.admin, status: 'You are successfully logged in!', token});
		})
	})(req, res, next);
});
router.get('/google/token',cors.corsWithOptions,(req,res,next)=>{
	console.log(req.body);
	passport.authenticate('google',(err,user,info)=>{
		if(err) {return next(err)}
		if(!user) { return next('no user is found')}
		req.logIn(user,(err)=>{
			if(err) {return next(err);}
			const token = authenticate.getToken({_id: req.user._id});
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.json({success: true,userId: req.user._id, isAdmin:user.admin, status: 'You are successfully logged in!', token});
		})
	})(req, res, next);
});


router.get('/signout',cors.corsWithOptions,(req,res,next)=>{
	req.logout();
	res.statusCode= 200;
	res.setHeader('Content-Type', 'application/json');
	//console.log('sign off');
	res.json({success: true, status:' you are logged off successfully', token:null});
	//next();
});

module.exports = router;
