var express = require('express');
var router = express.Router();
var database = require('../database');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log("abcd");
  console.log(database.a);
  console.log(connection);
  result = await connection.execute(`SELECT NAME FROM AIRPORT`);
  console.log(result);
  console.log("abcdefg");
  res.send(JSON.parse('{"jsonContent":"' + result.rows[0][0] + '"}'));
});

module.exports = router;
