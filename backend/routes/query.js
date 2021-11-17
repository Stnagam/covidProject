var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log(req.query.sql);
  result = await connection.execute(req.query.sql);
  console.log(result);
  res.send(JSON.stringify(result));
});

module.exports = router;