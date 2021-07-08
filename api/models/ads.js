const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdSchema =  mongoose.Schema({
    providerId: {
        type: Schema.Types.ObjectId,
        ref: 'AdsProvider'
    },
    leadsId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lead'
        }
    ],
    Type : {
        type: String,
    }
},
{
    timestamps: true,
})

const Ad = mongoose.model('Ad', AdSchema)

module.exports = Ad;
