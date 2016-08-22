//var exec = require("child_process").exec;
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response, request){
	console.log("Request handler 'start' was called");

	// Test blocking
	/*	
	function sleep(milliSecond){
		var startTime = new Date().getTime();
		while (new Date().getTime() < startTime + milliSecond);
	}
	
	sleep(10000);
	
	*/

	// Test non-blocking
	/*	
	exec("find /",
			{timeout: 10000, maxBuffer: 2000*1024},
			function (error, stdout, stderr){
				response.writeHead(404, {"Content-Type": "text/plain"});
    				response.write(stdout);
    				response.end();
			});
	*/

	// Web application
	
	var body = '<html>' +
	'<head>' +
		'<meta http-equiv="Content-Type" content="text/html; ' +
		'charset=UTF-8" />'+
    	'</head>'+
    	'<body>'+
    		'<form action="/upload" enctype="multipart/form-data" method="post">'+
			'<input type="file" name="Upload"/>' +
    			'<input type="submit" value="Upload File" />'+
    		'</form>'+
    	'</body>'+
    	'</html>';

	response.writeHead(404, {"Content-Type": "text/html"});
        response.write(body);
        response.end();
}


function upload(response, request) {
	console.log("Request handler 'upload' was called.");

	var form = new formidable.IncomingForm(), files = [], fields = [];;
	console.log("about to parse");
	
	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		console.dir(request.headers);
		fs.rename(files.upload.path, "/tmp/test.jpg", function(error){
								console.log("eeeerrrrrooooorrrr");
								}
		);
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});


	/*
	response.writeHead(404, {"Content-Type": "text/plain"});
    	response.write("You've sent: " + postData +"\n");
	response.write("You've sent the text " + querystring.parse(postData).text);
    	response.end();
	*/
}

function show(response, request) {
 	console.log("Request handler 'show' was called.");
	fs.readFile("/tmp/test.jpg", "binary", function(error, file) {
    		if(error) {
      			response.writeHead(500, {"Content-Type": "text/plain"});
      			response.write(error + "\n");
      			response.end();
    		} else {
      			response.writeHead(200, {"Content-Type": "image/jpg"});
      			response.write(file, "binary");
      			response.end();
    		}
  	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;
