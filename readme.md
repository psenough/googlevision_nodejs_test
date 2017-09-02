# To install:

`npm install`

`npm install http-server -g`

# To run:

Make sure you don't have any other services running on port 3000 and 8080

Make sure you have your google vision API credentials set on environment variable using 
`GOOGLE_APPLICATION_CREDENTIALS=path/to/yourcredentials.json`

`http-server` will launch the local server so you can call `http://localhost:8080/test.html` on the browser

`node test.js` will launch the node server that listens to port 3000, a GET request replies hello world, a POST request with an image sends the image to the google vision API and returns the object containing the retrieved text
