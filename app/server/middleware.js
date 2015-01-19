module.exports = function(app, config) {
  var _ = require('underscore');
  var bodyParser = require('body-parser');
  var jwt = require('jsonwebtoken');
  var User = require('./models/user');

  // Configure our app to handle CORS requests.
  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
  });

  // Use body-parser so we can grab information from POST requests.
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(function(req, res, next) {
    var url_tokenreqd = ['/api'];
    var token_check = false;

    _.each(url_tokenreqd, function(path) {
      if (req.url.indexOf(path) === 0) {
        token_check = true;
      }
    });

    if (!token_check) {
      next();
    }
    else {
      var token = req.body.token || req.query.token || req.params.token || req.headers['x-access-token'];
      var valid = false;

      if (token) {
        jwt.verify(token, config.server.secret, function(e, decoded) {
          if (e) {
            User.crud.sendResponse(res, 403, false);
          }
          else {
            req.token_decoded = decoded;
            next();
          }
        });
      }
      else {
        User.crud.sendResponse(res, 403, false);
      }
    }
  });

  // Log all requests.
//  app.use(function(req, res, next) {
//    console.log(req.method, req.url);
//    next();
//  });

};
