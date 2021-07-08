const mongoose = require('mongoose');

const LeadsFollowUpSchema =  mongoose.Schema({
    leadId: {
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    },
    type: {
        type : String,
        default : '',
    },
    agentId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default : null
    },
    returnTime :{
        type : String,
        default : '',
    }
},
{
    timestamps: true,
})

const LeadsFollowUp = mongoose.model('LeadsFollowUp', LeadsFollowUpSchema)
// LeadsFollowUp.find({}).populate('LeadsFollowUp').then(e => {
//     console.log(e);
//     e.forEach((item)=> {
//         item.remove()
//     })
//     console.log(e);
// })
module.exports = LeadsFollowUp;