const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const favoriteSchema=new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    products:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    }]
},{
    timestamps: true
});

const Favorites= mongoose.model('favorite',favoriteSchema);
module.exports= Favorites;