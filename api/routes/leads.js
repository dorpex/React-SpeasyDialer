var express = require('express');
var router = express.Router();
let User = require('../models/user')
const momentTz = require('moment-timezone');
const Product = require('../models/product')

/* GET users listing. */
router.post('/new-lead',async function(req, res, next) {
    console.log('new lead');
    console.log(req.body);
    res.send({})
});


module.exports = router;
