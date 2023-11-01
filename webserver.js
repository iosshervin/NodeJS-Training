// 1 - import mode.js core module 
var http = require('http');

var server = http.createServer(function (req, res) {
    // 2 - creating server 
    // handle incoming requst here
});

server.listen(6000); // 3 - listen for an incoming request 

console.log('Node.js web server at port 6000 is running...');
