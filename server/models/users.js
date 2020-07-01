const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema= new Schema({
	admin:{
		default: false,
		type: Boolean
	},
	firstname: {
		type: String,
		default:''
	},
	facebookID:String,
	googleID: String,
	lastname: {
		type: String,
		default:''
	}
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',UserSchema);