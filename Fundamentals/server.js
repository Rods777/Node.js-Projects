// Creating Web Server
const http = require("http");
const fs = require("fs");

const html = fs.readFileSync('Template/index.html', 'utf-8');

// Create a server
const server = http.createServer((request, response) =>{
    response.end(html) 
    console.log("A new request is created");
});

// Starts a server
server.listen(8000, "127.0.0.1", () => {
    console.log("Web Server has started and running on port 8000");
});

