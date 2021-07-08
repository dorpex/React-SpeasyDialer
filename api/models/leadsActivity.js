const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LeadsActivitySchema =  mongoose.Schema({
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
    data :{
        type : String,
        default : '',
    },
    oldId : {
        type : String,
        trim : true,
        unique : true,
    },
},
{
    timestamps: true,
})

const LeadsActivity = mongoose.model('LeadsActivity', LeadsActivitySchema)
// LeadsActivity.find({}).populate('LeadsActivity').then(e => {
//     console.log(e);
//     e.forEach((item)=> {
//         item.remove()
//     })
//     console.log(e);
// })
module.exports = LeadsActivity;