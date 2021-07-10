var express = require('express');
var router = express.Router();
let User = require('../models/user')
const momentTz = require('moment-timezone');


/* GET users listing. */
router.post('/register/submit',async function(req, res, next) {
  req.body.birth_day = momentTz.tz(Date(req.body.birth_day), "Asia/Jerusalem");
  console.log(req.body);
  await new User(req.body).save()
  .then(user => {
    res.send({"userData" : user});
  })
  .catch(error => {
    res.send({status : error});
  });
  
});
// Login 
router.post('/login/submit',async function(req, res, next) {

  User.findOne({ $and : [ { email : req.body.email } , { password : req.body.password } ] })
  .then(user => {
    if (user.length == 0) {
      console.log('user.length == 0');
      return res.send({"userData" : undefined});
    }
    return res.send({"userData" : user});
  })
  .catch(error => {
  });
 

});

/* GET users listing. */
router.post('/check-user-id',async function(req, res, next) {
  User.findById(req.body.userId)
  .then(user => {
    res.send({"user" : user})
  })
  .catch(error => {
    console.log('here');
    res.send({"error" : true})
  })
  // User.findById(req.body)
  // .then(user => {
  //   console.log(user);
  // })
  // .then(user => {
  //   res.send({"userData" : user});
  // })
  // .catch(error => {
  //   res.send({status : error});
  // });
  
});

module.exports = router;
