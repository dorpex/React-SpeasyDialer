const mongoose = require('mongoose');

const CommentSchema =  mongoose.Schema({
    leadId: {
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    },
    agentId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default : null
    },
    text: {
        type : String,
        default : '',
    },
},
{
    timestamps: true,
})

const Comment = mongoose.model('Comment', CommentSchema)
// Comment.find({}).populate('Comment').then(e => {
//     console.log(e);
//     e.forEach((item)=> {
//         item.remove()
//     })
//     console.log(e);
// })
module.exports = Comment;