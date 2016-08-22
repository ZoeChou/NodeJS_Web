var http = require("http");
var url = require("url");


function start(route , handle){
	function onRequest(request, response){
		//console.log("Request Received!");
		//var postData="";
		var pathname = url.parse(request.url).pathname;
		//var query = url.parse(request.url).query;
		
		console.log("Request for "+ pathname + " received!");		
		//route(handle, pathname, response); 	

		/*
		response.writeHead(200, {"Content-Type": "text/plain"});
  		response.write("Hello World");
  		response.end();
		*/

		/*
		request.addListener("data", function(postDataChunk){
			//call when a new chunk of data was received!
			postData += postDataChunk;
			console.log("Recerived POST data chunk '" + postDataChunk +"'.");
		});

		request.addListener("end", function(){
			//call when all chunk of data have been recerived!
			route(handle, pathname, response, postData);
		});
		*/
		route(handle, pathname, response, request);
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started!");
}

exports.start = start;
