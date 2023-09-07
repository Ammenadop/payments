var express = require("express");
var cors = require("cors");
var app = express();
(ccavReqHandler = require("./ccavRequestHandler.js")),
  (ccavResHandler = require("./ccavResponseHandler.js"));
app.use(cors());
app.use(express.static("public"));
app.set("views", __dirname + "/public");
app.engine("html", require("ejs").renderFile);

app.get("/about", function (req, res) {
  res.render("dataFrom.html");
});

app.post("/payreq", function (request, response) {
  ccavReqHandler.postReq(request, response);
});

app.post("/payres", function (request, response) {
  ccavResHandler.postRes(request, response);
});

app.listen(10000)
