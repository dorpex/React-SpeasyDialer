var express = require('express');
var router = express.Router();
let User = require('../models/user')
const momentTz = require('moment-timezone');
const Product = require('../models/product')

/* GET users listing. */
router.post('/refmaker/get-data',async function(req, res, next) {
    let users = await User.find({rank : 'משווק'}).select('_id name')
    let products = await Product.find({}).select('_id name')
    console.log(users);
//   req.body.birth_day = momentTz.tz(Date(req.body.birth_day), "Asia/Jerusalem");
//   console.log(req.body);
//   await new User(req.body).save()
//   .then(user => {
//     res.send({"userData" : user});
//   })
//   .catch(error => {
//     res.send({status : error});
//   });
    res.send({users , products})
});


module.exports = router;
