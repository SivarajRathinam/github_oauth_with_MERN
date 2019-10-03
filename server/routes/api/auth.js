const helpers = require('../../../config/helpers');
const request = require('request');
const url = require(helpers.root('config/urls'))
const config = require(helpers.root('config/config'))
var sessionToken;

module.exports = (app) => {
	var githubOAuth = require('github-oauth')({
		githubClient: config.client_id,
		githubSecret: config.client_secret,
		baseURL: 'http://localhost:8080',
		loginURI: url.login_uri,
		callbackURI: url.auth_uri,
		scope:'repo,user'
	})
	app.get('/api/data', (req, res, next) => {
    	return res.send(sessionToken)
  	});
  	app.get('/api/login', (req, res, next) => {
    	return githubOAuth.login(req, res);
  	});
  	app.get('/api/auth', (req, res, next) => {
	    return githubOAuth.callback(req, res);
  	});
  	app.get('/api/user',(req,res,next)=>{
			console.log(req.headers)
			request({
				headers:{
					'Authorization':'token '+sessionToken.access_token,
					'user-agent':req.headers['user-agent']
				},
				url:'https://api.github.com/user',
				method:'GET'
			}, function (err, _res, body) {
				res.send(body)
			})

  	});
  	githubOAuth.on('error', function(err) {
  		console.error('there was a login error', err)
	})

	githubOAuth.on('token', function(token, serverResponse) {
  		sessionToken = token;
  		serverResponse.end(JSON.stringify(token))
	})
}