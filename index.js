var express   = require('express'); 
var expressns = require("express-namespace");

var app = express();

app.namespace("/fourm", function() 
{
	var staticServer = express.static(__dirname + "/public");

	function dispatch(req, res)
	{
		req.url = req.url.replace(/\/fourm/, "");
		if (req.url === "")
		{
			req.url = "/";
		}

		staticServer(req, res, function()
		{
			console.error("The request for: " + req.url + " did not resolve to something in /public.");
			res.statusCode = 404;
			res.end();
		});
	}

	app.get("/", dispatch);
	app.get("*", dispatch);
});

app.listen(3000);
console.log("Application listening on port 3000");