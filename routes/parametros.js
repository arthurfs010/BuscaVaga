var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('parametros');
});

router.post('/', function (req, res) {
  
});

module.exports = router;
