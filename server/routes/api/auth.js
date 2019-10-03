const helpers = require('../../../config/helpers');
const request = require('request');
const url = require(helpers.root('config/urls'))
const config = require(helpers.root('config/config'))
var session = require('express-session');

module.exports = (app) => {
	var githubOAuth = require('github-oauth')({
		githubClient: config.client_id,
		githubSecret: config.client_secret,
		baseURL: 'http://localhost:8080',
		loginURI: url.login_uri,
		callbackURI: url.auth_uri,
		scope:'repo,user'
	})
	app.use(session({secret: "text",cookie:{
		maxAge:3600000
	}}))
	app.use(function(req, res, next) {
  		res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  		next();
	});
	app.get('/api/data', (req, res, next) => {
    	return res.send(sessionToken)
  	});
  	app.get('/api/login', (req, res, next) => {
    	return githubOAuth.login(req, res);
  	});
  	app.get('/api/auth', (req, res, next) => {
	    return githubOAuth.callback(req, res,(n,token)=>{
	    	req.session.token = token;
	    	console.log(req.session)
			res.redirect('/folderView')
	    });
  	});
  	app.get('/api/user',(req,res,next)=>{
			console.log('session token : ',req.session)
			if(req.session.token && 'access_token' in req.session.token){
				request({
					headers:{
						'Authorization':'token '+req.session.token.access_token,
						'user-agent':req.headers['user-agent']
					},
					url:'https://api.github.com/user',
					method:'GET'
				}, function (err, _res, body) {
					res.send(body)
				})
			}else{
				res.redirect(url.login_uri)
			}

  	});
  	githubOAuth.on('error', function(err) {
  		console.error('there was a login error', err)
	})

	githubOAuth.on('token', function(token, serverResponse,tokenResp,req) {
  		
  		serverResponse.end(JSON.stringify(token))
	})
}