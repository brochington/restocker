'use strict';

var https = require('https'),
	qs = require('qs');

function Staples(){
	// this.endpoint = 'api.staples.com'

}

Staples.prototype.getData = function(callback){
	console.log('calling on getData!!');

	// https://www.kimonolabs.com/api/a0ydilhw?apikey=8f2d2671f42682e10fa6b9192287f803
	var options = {
		host: 'www.kimonolabs.com',
		method: 'GET',
		// header: {'Content-type': 'application/json'},
		path: '/api/a0ydilhw?apikey=8f2d2671f42682e10fa6b9192287f803'
	};


	var req = https.get(options, function(res){
		console.log('kimono response...');
		var chunk;

		res.setEncoding('utf8');

		res.on('data', function(data){
			// console.log(val);
			if(chunk === undefined){
				chunk = data;
			}else{
				chunk += data;	
			}
			
			// console.log(data);
		});

		res.on('end', function(){
			callback(chunk);
		});
	});

	req.end();

	req.on('error', function(e){
		console.log('e: ', e);
	});
};

module.exports = new Staples();