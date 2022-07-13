// This code retrieves the information about the Astronomy Picture Of The Day (APOD)
// as well as the image data.
// AOPD API Page: https://api.nasa.gov/
// This code from this tutorial: "Making HTTP Requests from NodeJS" https://www.youtube.com/watch?v=rh7opViDFMo

const https = require("https");
const Stream = require("stream").Transform;
const fs = require("fs");

https
    .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2022-07-13", resp => {
    // .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", resp => {
        let data = "";

        // Store incoming data
        resp.on("data", chunk => {
            data += chunk;
        });

        // Reached end of response
        resp.on("end", () => {
            let url = JSON.parse(data).hdurl; // This is the URL used by the https.get() call below. This line can be used to print all of the data from the JSON to the console, but to get the image, you need to get the url out of the JSON. Therefore, you must access the .hdurl property in the JSON.
            console.log(url);
            let title = JSON.parse(data).title.replace(/\s/g, "-").toLowerCase(); // Regex strips whitespace
            console.log(`title: ${title}`);

            // This https block could be in a helper method
            // This takes the JSON data that was sent as part of the first request, pulls the URL out of it, and then uses that URL to make a second request to get the photo.
            https.get(url, res => {
                // Check that the response is an image
                // console.log(res.headers); // Print the headers to the console. Could also print all of the data here, but that is a lot of stuff for a high-res image.
                // console.log(res.headers["content-type"], res.headers["content-length"]); // Print content information to the console

                // console.log(res);

                // In Steve's tutorial (the one where I got this code), Steve claims that this is preventing the photo from being downloaded more than once in the event that this code runs more than once. Instead, since we saved the photo, we can just access it later. I think what he means is that since we save it here, we can do a check elsewhere in our project to prevent this code from running a second time if we need the photo again. Such as if we reload a webpage that has the image on it, we can pull it from the saved files instead of downloading it again.
                // The actual check to ensure that the data that was returned was the correct data.
                if (
                    res.statusCode == 200 &&
                    (res.headers["content-type"] == "image/jpeg" || res.headers["content-type"] == "image/png" || res.headers["content-type"] == "image/gif")
                ) { // If true, we save the image locally.
                    let img = new Stream();

                    // Here, instead of storing the incoming data as a string, we save it as a Stream. This step pushes data onto the stream.
                    res.on("data", chunk => {
                        img.push(chunk);
                    });

                    // __dirname is built into Node.js and tells you what your current directory is.
                    res.on("end", () => {
                        let filename = `${__dirname}/images/${title}.jpeg`; // Could insert the name of the image from the JSON here if I wanted.
                        // In this step, we create a file (if it doesn't already exist) or override an existing one of the same name. We read the data from the Stream and put it into the new file.
                        fs.writeFileSync(filename, img.read());
                    });
                }
            });
        });
    })
    .on("error", err => {
        console.log("Error: " + err.message);
});