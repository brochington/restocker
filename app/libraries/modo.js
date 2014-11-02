'use strict';

var https = require('https'),
	qs = require('qs');


function Modo(configObj){
	this.endpoint = 'api.sbx.gomo.do';
	this.apiKey = 'c98de17fddf04304d1964e9166479037';
	this.apiSecret = '6c35adce2d5f1d4a9f6a4de381d05f848bb8f823e069b330058ebc025b3c9acb';
	this.token = '66909c5f0cc200fd4cb7b73f7f92f4';
}

Modo.prototype.postRequest = function(resource, operation, params, callback){
	var data = qs.stringify(params);

	console.log('data: ', data);

	var options = {
		host: 'api.sbx.gomo.do',
		method: 'POST',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		path: ('/YiiModo/api_v2/' + resource + (operation ? ('/' + operation) : ''))
	};

	console.log('options: ', options);

	var req = https.request(options, function(res){
		console.log('got a response!!!');
		// console.log(res);

		var respData = '';

		res.on('data', function(chunk){
			respData += chunk;
		});

		res.on('end', function(){
			// console.log('ending!');
			callback(null, respData);
		});
	});
	console.log('data again: ', data);
	req.write(data);

	req.end();

	req.on('error', function(e){
		console.log('err!: ', e);
		callback(e, e);
	});
};

Modo.prototype.testMethod = function(){
	console.log('testMethod, yo!!');

};

module.exports = new Modo();