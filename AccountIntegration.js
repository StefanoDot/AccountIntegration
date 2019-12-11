var jsforce = require('jsforce');
var mysql = require('mysql');
var connection = new jsforce.Connection({
	oauth2 : {
	// you can change loginUrl to connect to sandbox or prerelease env.
loginUrl : 'https://test.salesforce.com',
clientId : '3MVG9llQY5kM9T6ft1Y9n7M2VbUvo8HNz.d990cyA71MX_HkaRtwhzmSMmSc0cbOPOpiJctZq.uE2gr6JuLgx',
clientSecret : '11C800B8FEC38C021D351E226D3A914446F1FABF5B6CEBDADA86BB1EB949BABD',
redirectUri : 'https://test.salesforce.com/services/oauth2/token'
	}
});

var _requestput = {
	url: '/services/apexrest/Account/',
	method: 'PUT',
	headers: {"Content-Type" : "application/json"},
	body:'',
	json: true
};

var conn = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'sale2019!',
	database : 'westpole',
});

conn.connect(function (err) {
	if (err) throw err;
	console.log('connesso al db my sql');
});

function toSalesforce(){

}

connection.login("stefano.porcari@westpole.it.uat2", "Init$001!", function(err, userInfo) {
	console.log('login a salesforce effettuato con successo!')
	conn.query('SELECT * FROM account WHERE mnt_type = ? LIMIT 2','I', function(error, results, fields){
	var ultimateJson = {
				data:''
				};
	ultimateJson.data=results;
	console.log('ultimatejson '+ JSON.stringify(ultimateJson));
	 _requestput.body=ultimateJson;
	 console.log('_requestput results '+_requestput);
	 setTimeout(function(){
	 	connection.request(_requestput, function(err,resp) {
	 		if(err) throw err;
	 	});
	}, 5000);


 });
});
