const http = require('http');
const fs = require('fs');

// 'req' is the request made by the browser. browser to server1 messages. Use this to get incoming information from the browser.
// 'res' is the request made by the server. server1 to browser messages. Use this to send stuff to the browser.
const server1 = http.createServer((req, res) => {
    console.log(req.url, req.method);

    // Setting the header content type. There is plain text, HTML, and more.
    res.setHeader('Content-Type', 'text/html'); // Format: text/plain, text/html, etc.
    // Read the HTML file in using the fs module
    fs.readFile('./views/index.html', (err, data) => {

        if (err) { // If there is an error, don't send the HTML, print the error message to the console. However, without the res.end() call, the request will stay "open".
            console.log(err);
            res.end(); // Close the request so that it doesn't stay "open".
        } else { // If there isn't an error, send the HTML to the browser.
            res.write(data);
            res.end();
        }
    }); // Must fire a callback function if there is one (this is what the lambda is for).
});

server1.listen(11000, 'localhost', () => {
    console.log('Listening on port 11000');
});
