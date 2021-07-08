const mongoose = require('mongoose');

const ListSchema =  mongoose.Schema({
    name: {
        type: String,
    },
    oldId: {
        type : String,
        default : false,
        unique : true
    },
    type: {
        // 1 - normal , 2 - sold , 3 - hot list , 4 - null
        type : String,
    },
    crmId: {
        type : String,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    },
    status: {
        // 1 - sending , 2 - not sending , null - not sending
        type : String,
    }    

},
{
    timestamps: true,
})

const List = mongoose.model('List', ListSchema)
// List.find({}).populate('product').then(e => {
//     console.log(e);
//     e.forEach((item)=> {
//         item.remove()
//     })
//     console.log(e);
// })
module.exports = List;