const mongoose = require('mongoose');

const productSchema =  mongoose.Schema({
    name: {
        type: String,
    },
    oldId: {
        type : String,
        default : false,
        unique : true
    },
    serialNumber: {
        type : String,
    }
},
{
    timestamps: true,
})

// productSchema.post('save', function(error, doc, next){
//     if (error.name === 'MongoError' && error.code === 11000) {
//         next(new Error('There was a duplicate key error'));
//       } else {
//           console.log(doc);
//         next();
//       }
// })

const Product = mongoose.model('Product', productSchema)
Product.find({}).then(e => {
    // console.log(e);
    // e.forEach((item)=> {
    //     item.remove()
    // })
    // console.log(e);
})
module.exports = Product;