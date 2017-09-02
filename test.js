// Imports the Google Cloud client library
const Vision = require('@google-cloud/vision');

// Instantiates a client
const vision = Vision();

const uuidv4 = require('uuid/v4');
  
// Performs text detection on the local file
function detectMe(fileName) {
	vision.textDetection({ source: { filename: fileName } })
	  .then((results) => {
		const detections = results[0].textAnnotations;
		console.log('Text:');
		detections.forEach((text) => console.log(text));
	  })
	  .catch((err) => {
		console.error('ERROR:', err);
	  });
}
  
var express = require('express'),
    multer  = require('multer')

var app = express()
app.use(multer({ dest: './uploads/'}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  res.send('hello world');
});

app.post('/', function(req, res){

	var fileName = './uploads/' + uuidv4() + '.png';
	
	var base64Data = req.body.picture.replace(/^data:image\/png;base64,/, "");
	require("fs").writeFile(fileName, base64Data, 'base64', function(err) {
	  //console.log(err);
	  if (err) {
		  console.log('error:' + err);
		res.status(404).end();
	  } else {
		  vision.textDetection({ source: { filename: fileName } })
		  .then((results) => {
			const detections = results[0].textAnnotations;
			console.log('Text:');
			detections.forEach((text) => console.log(text));
			res.send(detections);
		  })
		  .catch((err) => {
			console.error('ERROR:', err);
			res.status(404).end();
		  });
	  }
	});
	//res.status(200).end();
});

app.listen(3000);