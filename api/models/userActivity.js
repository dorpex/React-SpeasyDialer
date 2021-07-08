const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userActivitySchema =  mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status : {
        type : String,
        require : true,
        trim : true
    },
},
{
    timestamps: true,
})

const UserActivity = mongoose.model('UserActivity', userActivitySchema)

module.exports = UserActivity;
