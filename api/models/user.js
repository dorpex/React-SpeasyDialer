const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log(mongoose.version);
const userSchema =  mongoose.Schema({
    oldId : {
        type : String,
        trim : true,
        unique : true,
    },
    name: {
        type: String,
    },
    email: {
        type : String,
        trim : true,
    },
    password : {
        type : String,
    },
    status : {
        type : Boolean,
    },
    phone : {
        type : String,
    },
    rank : {
        type : String,
        default : 'נציג'
    },
    productsId : [
        { 
            type: Schema.Types.ObjectId,
            ref: 'Rule'
        }
    ],
    published : {
        type : Boolean
    },
    online : {
        type : Boolean
    },
    birth_day : {
        type : Date
    }
},
{
    timestamps: true,
})


// userSchema.post('save', function(error, doc, next){
//     if (error.name === 'MongoError' && error.code === 11000) {
//         next(new Error('There was a duplicate key error'));
//       } else {
//           console.log(doc);
//         next();
//       }
// })

const User = mongoose.model('User', userSchema)
module.exports = User;
// module.exports = User;
// User.find({}).then(e => {
//     e.forEach(element => {
//         console.log(element);
//     });
// })
// const task = new Tasks({
//     name: 'second',
// })

// task.save().then((res) => {
//     console.log(res);
// }).then((error) => {
//     console.log(error);
// })

