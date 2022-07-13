const https = require('https');

// 'req' is the request made by the browser. browser to server1 messages. Use this to get incomming information from the browser.
// 'res' is the request made by the server1. server to browser messages. Use this to send stuff to the browser.
const server1 = https.createServer((req, res) => {
    console.log(req.url, req.method);
    console.log(req.message);

    // Setting the header content type. There is plain text, HTML, and more.
    res.setHeader('Content-Type', 'text/html'); // Format: text/plain, text/html, etc.
    // Write the content that is to be sent.
    res.write('<head><link rel="stylesheet" href="#"><head></head>');
    res.write('<p>Message from email-request:</p>'); // You can put all of the HTML into a file and send that instead.
    console.log(req.headers);
    res.write('<p>Anyone there?</p>');
    // End the response. This step actually sends the written content.
    res.end();
});

server1.listen(11000, 'localhost', () => {
    console.log('Listening on port 11000');
});