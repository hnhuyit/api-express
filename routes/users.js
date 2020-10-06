var express = require('express');
var router = express.Router();
const User = require('./../models/User');
//Tao Middlewares
const verifyToken = require('./../middlewares/verifyToken');

/* GET users listing. */
router.get('/',
  verifyToken,
  function(req, res, next) {
    // res.send('respond with a resource');

    User.find({}).exec(function(err, users){
      res.send(users)
  })
});


module.exports = router;
