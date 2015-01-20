module.exports = function(Model) {
  var _ = require('underscore');

  var respond = function(fn, status, success, data) {
    if (_.isUndefined(data) || _.isNull(data)) {
      data = [];
    }

    // @see http://www.restapitutorial.com/httpstatuscodes.html
    var message = '';
    switch (status) {
      case 500:
        message = 'Server error.';
        break;
      case 409:
        message = 'Record already exists.';
        break;
      case 403:
        message = 'Permission denied.';
        break;
      case 400:
        message = 'Data is malformed or non-existent.';
        break;
      case 201:
        message = 'Data added.';
        break;
      case 200:
        message = 'The operation was successful.';
        break;
    }

    var response = {
      status: status,
      success: success,
      message: message,
      data: data
    };

    if (fn) {
      fn(response);
    }
    else {
      return response;
    }
  };

  var sendResponse = function(res, status, success, data) {
    var response = respond(null, status, success, data);

    res
      .status(response.status)
      .send(response);
  };

  var isValidID = function (_id) {
    return (!_.isUndefined(_id) && _id.toString().match(/^[0-9a-fA-F]{24}$/));
  };

  var save = function(document, req, fn, status) {
    document.save(function(e) {
      if (e) {
        status = 500;
        if (e.code === 11000 || e.code === 11001) {
          status = 409;
        }

        respond(fn, status, false, e);
      }
      else {
        req.params.id = document._id.toString();
        retrieve(req, fn, status);
      }
    });
  };

  var create = function(req, fn) {
    var document = new Model(req.body);
    save(document, req, fn, 201);
  };

  var retrieve = function(req, fn, status) {
    if (!_.isUndefined(req.params.id)) {
      if (!isValidID(req.params.id)) {
        respond(fn, 400, false);
      }
      else {
        Model
          .findById(req.params.id)
          .exec()
          .then(function(data) {
            if (_.isUndefined(status)) {
              status = 200;
            }

            respond(fn, status, true, data);
          });
      }
    }
    else {
      Model
        .find({})
        .lean()
        .exec()
        .then(function(data) {
          respond(fn, 200, true, data);
        });
    }
  };

  var update = function(req, fn) {
    retrieve(req, function(result) {
      if (!result.success) {
        respond(fn, result.status, result.success);
      }
      else {
        var document = result.data;
        for (var p in req.body) {
          document[p] = req.body[p];
        }

        save(document, req, fn);
      }
    });
  };

  var remove = function(req, fn) {
    retrieve(req, function(result) {
      if (!result.success) {
        respond(fn, result.status, result.success);
      }
      else {
        if (_.isEmpty(result.data)) {
          respond(fn, 400, false);
        }
        else {
          Model
            .findOneAndRemove({ _id: req.params.id })
            .exec(function(e, data) {
              if (e) {
                respond(fn, 500, false, e);
              }
              else {
                respond(fn, 200, true, data);
              }
            });
        }
      }
    });
  };

  Model.crud = {};
  Model.crud.sendResponse = sendResponse;
  Model.crud.create = create;
  Model.crud.retrieve = retrieve;
  Model.crud.update = update;
  Model.crud.delete = remove;
};
