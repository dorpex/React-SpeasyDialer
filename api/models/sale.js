const mongoose = require('mongoose');
const { Schema }= require('mongoose');

const SaleSchema =  mongoose.Schema({
    oldId: {
        type : String,
        default : false,
        unique : true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    lead: {
        type: Schema.Types.ObjectId,
        ref: 'Lead',
        default : null
    },
    agent: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default : null
    },
    profit: {
        type : Number,
        default : null,
    },
    method : {
        type : String,
        default : null
    },
    token : {
        type : String,
        default : null
    },
    receiptNumber : {
        type : String,
        default : null
    },
    // sale , cancel , monthly payment
    type : {
        type : String,
        default : null
    }
    
},
{
    timestamps: true,
})


SaleSchema.pre('find', function() {
    this.populate('agent');
});
  
const Sale = mongoose.model('Sale', SaleSchema)

module.exports = Sale;