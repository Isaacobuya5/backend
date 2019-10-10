//importing the native http package
const http = require('http');
const app = require('./app');

//normalizePort returns a valid port whether it is provided as a number or a string
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }
    return false;
};

const port  = normalizePort(process.env.PORT || '3000');

//using the imported http package to create a server by passing a function which is executed everytime a call is made to the server
//that function receives a request and response objects as arguements
// const server = http.createServer((req,res) => {
//     //using the response end method to send a string response back to the caller
//     res.end("This is my server response page in nodejs");
// });

// //setting the server to listen on either the port environment variable or port 3000 for development
// server.listen(process.env.PORT || 3000);

app.set('port', port);

//checks for various errors and handles the appropriately -it is then registered to the server
//a listening event listener is also registered, logging the port or named pipe on which the server is running to the console.
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
        
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' require elevated priviledges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
    
        default:
            throw error;
    }
};
const server = http.createServer(app);
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);