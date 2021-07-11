const mongoose = require('mongoose');
const { Schema }= require('mongoose');
const SubLeadSchema =  mongoose.Schema({
    oldId: {
        type : String,
        default : false,
        unique : true
    },
    ad: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Ad',
        default : null
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product',
        default : null
    },
    phone : {
        type : String,
        default : null
    },
    email : {
        type : String,
        default : null
    },
    masterLead : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Lead',
        default : null
    },
    list : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'List',
        default : null
    },
    masterLeadMyId : {
        type : Number,
        default : null
    }

},
{
    timestamps: true,
})


// SubLeadSchema.pre('save', function(error, doc, next) {
//     if (error.name === 'MongoError' && error.code === 11000) {
//       next(new Error('There was a duplicate key error'));
//     } else {
//       next();
//     }
// });



const SubLead = mongoose.model('subLead', SubLeadSchema)
module.exports = SubLead;