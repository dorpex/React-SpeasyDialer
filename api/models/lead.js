const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const moment = require('moment')

const LeadSchema =  mongoose.Schema({
    name: {
        type: String,
    },
    subLeads: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        }
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
    firstSubLeadWithAd : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'SubLead' 
    },
    lastSubLeadWithAd : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'SubLead' 
    },
    firstSubLeadWithAdOldId : {
        type : String 
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
    myId : {
        type : Number,
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