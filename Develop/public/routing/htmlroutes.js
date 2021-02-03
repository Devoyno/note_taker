const path = require ("path");

//routes
module.exports = function (app){
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/../notes.html"));
});
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "/../index.html"));
});
}