const cors=require('cors');


var shelljs = require('shelljs');
var express = require('express');
var app = express();
app.use(cors());


var server = app.listen (3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('server started on http://' + host + ':' + port);
});

app.get ('/api', function (req, res) {
	var cx = req.query.cx;
	var cy = req.query.cy; 
	var r = req.query.r;
	var minx = req.query.minx; 
	var miny = req.query.miny; 
	var maxx = req.query.maxx; 
	var maxy = req.query.maxy; 
		
	shelljs.exec('circle-rect.exe ' + cx +' ' + cy +' ' + r + ' ' + minx + ' ' + miny + ' '+ maxx + ' '+ maxy ,function(status, output) {
	  
		  
          var output = {
          	status: status,
          	output: output
          };

		  res.writeHead(200, {
		  	"Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type"
		  });
	
		  res.write(JSON.stringify(output));
		  res.end();

	});
});
