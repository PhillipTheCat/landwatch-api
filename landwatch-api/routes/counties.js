var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: //fill in,
  password: //fill in
});

function getAll() {
  var promise =  new Promise(function(resolve, reject) {
      console.log("Connected!");

      var sql = "select distinct COUNTY from landwatch.properties ORDER BY COUNTY;"
      con.query(sql, function (err, result) {
        if (err) {
          reject("rejecting promise")
        }
        else {
          resolve(result)
        }
    }, "something else")
  })
  return promise;
}



/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(getAll)
  getAll().then(resp => {
    var s = JSON.stringify(resp);
    return JSON.parse(s)
  }).then(jsonRes =>{ 
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(jsonRes)})
});

module.exports = router;
