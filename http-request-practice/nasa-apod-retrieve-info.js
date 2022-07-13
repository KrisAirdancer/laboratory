// This code retrives the information about today's Astronomy Picture Of The Day (APOD)
// but does not return the photo data.
// This code from this tutorial: "Making HTTP Requests from NodeJS" https://www.youtube.com/watch?v=rh7opViDFMo

const https = require("https");

https
    .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", resp => {
        let data = "";

        // Store incoming data
        resp.on("data", chunk => {
            data += chunk;
        });

        // Reached end of response
        resp.on("end", () => {
            let url = JSON.parse(data);
            console.log(url);
        });
    })
    .on("error", err => {
        console.log("Error: " + err.message);
});