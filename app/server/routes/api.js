module.exports = function(app, path) {
  var User = require('../models/user');

  app
    .route(path + '/auth')
    .get(function(req, res) {
      User.crud.sendResponse(res, 200, true, req.token_decoded);
    });

  app
    .route(path + '/users')
    .post(function(req, res) {
      User.crud.create(req, function(result) {
        res
          .status(result.status)
          .send(result);
      });
    })
    .get(function(req, res) {
      User.crud.retrieve(req, function(result) {
        res
          .status(result.status)
          .send(result);
      });
    });

  app
    .route(path + '/users/:id')
    .get(function(req, res) {
      User.crud.retrieve(req, function(result) {
        res
          .status(result.status)
          .send(result);
      });
    })
    .put(function(req, res) {
      User.crud.update(req, function(result) {
        res
          .status(result.status)
          .send(result);
      });
    })
    .delete(function(req, res) {
      User.crud.delete(req, function(result) {
        res
          .status(result.status)
          .send(result);
      });
    });

  return app;
};
