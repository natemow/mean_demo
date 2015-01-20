module.exports = function(app) {
  var _ = require('underscore');
  var jwt = require('jsonwebtoken');
  var config = require('../config');
  var User = require('../models/user');

  app
    .route('/auth')
    .post(function(req, res) {
      User
        .findOne({ username: req.body.username })
        .select('name username password')
        .exec(function(e, data) {
          if (e) {
            User.crud.sendResponse(res, 500, false, e);
          }
          else if (!data) {
            User.crud.sendResponse(res, 403, false);
          }
        })
        .then(function(user) {
          if (!user.comparePassword(req.body.password)) {
            User.crud.sendResponse(res, 403, false);
          }
          else {
            var token = jwt.sign({
                _id: user._id,
                name: user.name,
                username: user.username
              },
              config.server.secret,
              {
                expiresInMinutes: 1440 // expires in 24 hours
              }
            );

            User.crud.sendResponse(res, 200, true, {
              token: token
            });
          }
        });
    });

  return app;
}