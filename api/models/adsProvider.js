const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdsProviderSchema =  mongoose.Schema({
    providerName: {
        type: String
    },
    adsId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Ad'
        }
    ],
},
{
    timestamps: true,
})

const AdsProvider = mongoose.model('AdsProvider', AdsProviderSchema)

module.exports = AdsProvider;
