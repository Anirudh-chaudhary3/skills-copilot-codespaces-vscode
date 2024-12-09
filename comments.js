// create web server
var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var comments = require("./comments.js");

http.createServer(function(req, res) {
    if (req.method === "POST") {
        var body = "";
        req.on("data", function(chunk) {
            body += chunk;
        });
        req.on("end", function() {
            var data = qs.parse(body);
            comments.addComment(data.comment);
            res.end("Comment added");
        });
    } else if (req.method === "GET") {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(comments.getComments()));
    }
}).listen(3000);