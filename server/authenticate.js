const passport= require('passport');
const passportLocal= require('passport-local').Strategy;
const JWTStretegy = require('passport-jwt').Strategy;
const ExtractJWT= require('passport-jwt').ExtractJwt;
const jwt= require('jsonwebtoken');
const facebookTokenStretegy= require('passport-facebook-token');
const googleTokenStretegy= require('passport-google-oauth20').Strategy;

const config = require('./config.js');
const User= require('./models/users');

const opt={
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secretKey
}

exports.getToken=(user)=>{
	return jwt.sign(user,config.secretKey,{expiresIn:3600});
};

exports.jwtPassword=passport.use(new JWTStretegy(opt,(jwt_payload,done)=>{
	console.log('jwt payload', jwt_payload);
	User.findOne({_id:jwt_payload._id},(err,user)=>{
		if(user) {
			return done(null, user);
		}else {
			return done(err,false);
		}
	})

}));

exports.verifyUser=passport.authenticate('jwt',{session:false});
exports.verifyAdmin=(req,res,next)=>{
	if(req.user.admin) {
		next();
	}
	else {
		let err=new Error('You are not authorized to perform this operation!');
		err.status= 403;
		return next(err);
	}
}

exports.facebookPassport=passport.use(new facebookTokenStretegy({
	clientID: config.facebookAppID,
	clientSecret: config.facebookAppSecret
},(accessToken,reFreshToken,profile,done)=>{
	User.findOne({facebookID:profile.id},(err,data)=>{
		if(err) {
			return done(err,false)
		}
		else if(!err && data!==null){
			return done(null,data);
		}else {
			const user=new User({
				username:profile.displayName,
			});
			user.firstname =profile.name.givenName;
			user.lastname= profile.name.familyName;
			user.facebookID= profile.id;
			user.save((err,res)=>{
				if(err) {
					return done(err, false);
				}
				else{
					return done(null,res);
				}
			});
		}
	})
}));

exports.googlePassport=passport.use(new googleTokenStretegy({
	clientID: config.googleID,
	clientSecret: config.googleSecret,
	callbackURL:''
},(accessToken,reFreshToken,profile,done)=>{
	
	User.findOne({googleID:profile.id},(err,data)=>{
		if(err) {
			return done(err,false)
		}
		else if(!err && data!==null){
			return done(null,data);
		}else {
			const user=new User({
				username:profile.displayName,
			});
			user.firstname =profile.name.givenName;
			user.lastname= profile.name.familyName;
			user.googleID= profile.id;
			user.save((err,res)=>{
				if(err) {
					return done(err, false);
				}
				else{
					return done(null,res);
				}
			});
		}
	})
}));

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());