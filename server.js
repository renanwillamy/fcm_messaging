var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var gcm = require('node-gcm');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.use(express.static(__dirname));

app.use(function(req, res, next) {
	res.setHeader('charset', 'utf-8');
	next();
});

app.get('/', function(req,res){
	res.sendFile(__dirname+'/index.html');
});



//Send a push notification to the server
//todo development of hard coded itens
app.post('/push', function (req, res) {
	//////////FCM//////////

	var FCM = require('fcm-node');

	var serverKey = 'AIzaSyDhgVRPMDEXKlKPw6yoOGW8qIDB0lygYy0';
	var fcm = new FCM(serverKey);
	var deviceToken = 'eF4yC1-ZR6c:APA91bFTs7KJqd8nsyXyBuzEzrVNigcTqWt4HVSyNEVRTYse_abO4bFu8HA8dFnjMnshSVXqJjUwCLG3kifnphsCRSQupj_pSYZQIBSkFJPYcg1D1JCD7xfzex14qNUglWRVuMUwR70F';

	console.log("req.body",req.body);

var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
	to: deviceToken, 	

	notification: {
		title: req.body.title, 
		body: req.body.msg ,
		icon : '/firebase-logo.png'
	},

};

fcm.send(message, function(err, response){
	if (err) {
		console.log("Something has gone wrong!",err);
	} else {
		console.log("Successfully sent with response: ", response);
	}
	res.send(response);
});

	//////////FCM////////////
	
});




app.listen(3000,function(err){
	if(!err){
		console.log('Running ...');
	}
});