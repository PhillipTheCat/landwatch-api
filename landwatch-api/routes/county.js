var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: //fill in ,
  password: //fill in your pw 
});

function getByCounty(countyName) {
  var promise =  new Promise(function(resolve, reject) {
      console.log("Connected!");

      var sql = "select PRICE, ACRES, PRICE_PER_ACRE, ST_X(coordinate) as latitude, ST_Y(coordinate) as longitude from landwatch.properties WHERE COUNTY='" + countyName + "';"
      console.log("executing..." + sql)
      con.query(sql, function (err, result) {
        if (err) {
          reject("rejecting promise")
          throw err;
        }
        else {
          resolve(result)
        }
    }, "something else")
  })
  return promise;
}



/* GET users listing. */
router.get('/:name', function(req, res, next) {
    var county = req.params.name.toUpperCase();
  getByCounty(county).then(resp => {
    var s = JSON.stringify(resp);
    return JSON.parse(s)
  }).then(jsonRes =>{ 
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(jsonRes)})
});

module.exports = router;