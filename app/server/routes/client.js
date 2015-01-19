module.exports = function(app) {
  var express = require('express');
  var path = require('path');

  app
    .use(express.static(__dirname + '/../../client/'));
  app
    .get('*', function(req, res) {
      res.sendFile(path.join(__dirname + '/../../client/index.html'));
    });
};
