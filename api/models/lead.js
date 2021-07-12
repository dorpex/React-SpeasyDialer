const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const moment = require('moment')

const SubLeadSchema =  mongoose.Schema({
    ad: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Ad',
        default : null
    },
    list : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'List',
        default : null
    },
    createdAt : {
        type: Date, 
    },
},
{
    timestamps: true,
})

const LeadSchema =  mongoose.Schema({
    name: {
        type: String,
    },
    subLeads: [
        SubLeadSchema
    ],
    subLeadsOldIds: [
       
    ],
    hotlist: {
        type : Boolean,
        default : false
    },
    phone: {
        type : String,
        default : ''
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    },
    status: {
        type : String,
        default : 'חדש'
    },
    email : {
        type : String,
        default : ''
    },
    agent : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    gold : {
        type : String,
        default : ''
    },
    leadsActivity: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'LeadActivity' 
        }
    ],
    lastLeadDate : {
        type: Date, 
        default: moment(),
    },
    comments : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment' 
    },
    myId: {
        type : String,
        unique : true
    }
},
{
    timestamps: true,
})

// LeadSchema.pre('save', function(error, doc, next) {
//     if (error.name === 'MongoError' && error.code === 11000) {
//       next(new Error('There was a duplicate key error'));
//     } else {
//     // book._id === 100 -> true
//       next();
//     }
// });

// autoIncrement.initialize(mongoose.connection);
// LeadSchema.plugin(autoIncrement.plugin, { model: 'Lead', field: 'myId' });
const Lead = mongoose.model('Lead', LeadSchema)
// Lead.find({})
// .then(async (e) => {
//     // let x = 1
//     // for (const key in e) {
//     //     let lead = e[key]
//     //     lead.lastLeadDate = moment().subtract(x, "seconds")
//     //     console.log(x);
//     //     await lead.save()
//     //     x++
//     // }
// })
module.exports = Lead;