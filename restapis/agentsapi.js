var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mysql = require("mysql");

var app = express();
app.use(cors());
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Boltelmo21!",
  database: "pubs"
});

app.get("/agents", function(req, res) {
  connection.query("SELECT * FROM agents", function(
    error,
    results,
    fields
  ) {
    console.log(error);
    res.json(results);
  });
});

app.get("/agents/:id", function(req, res) {
  console.log(req.params.id);
  let sql = "SELECT * FROM agents WHERE id = '" + req.params.id + "'";
  connection.query(sql, function(error, results, fields) {
    console.log(error);
    res.json(results);
  });
});

app.delete("/agents/:id", function(req, res) {
  let sql = "DELETE FROM agents WHERE id = '" + req.params.id + "'";
  connection.query(sql, function(error, results, fields) {
    res.end("agent removed if it existed");
  });
});

app.post("/agents", function(req, res) {
  let sql = "INSERT INTO agents (display_name,role,nationality)";
  sql =
    sql +
    " VALUES('" +
    req.body.display_name +
    "','" +
    req.body.role +
    "','" +
    req.body.nationality +
    "')";
  console.log(sql);
  connection.query(sql, function(error, results, fields) {
    res.end("added new item");
    console.log(error);
  });
});

var server = app.listen(8081, function() {
  console.log(server.address().address);
  console.log(server.address().port);
});
