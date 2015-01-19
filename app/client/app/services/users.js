angular
  .module('serviceUsers', [])
  .factory('Users', function($http) {
    var factory = {};
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiTmF0ZSIsInVzZXJuYW1lIjoibmF0ZW1vdyIsImlhdCI6MTQyMTYyNjc1NiwiZXhwIjoxNDIxNzEzMTU2fQ.x1pY4fC3V90tM_Bv2FW7rauY7IVeiMlvthUIsZ5Rb0g';

    factory.getUsers = function() {
      return $http.get('/api/users?token=' + token);
    };

    factory.getUser = function(id) {
      return $http.get('/api/users/' + id + '?token=' + token);
    };

    factory.createUser = function(data) {
      return $http.post('/api/users?token=' + token, data);
    };

    factory.updateUser = function(id, data) {
      return $http.put('/api/users/' + id + '?token=' + token, data);
    };

    factory.deleteUser = function(id) {
      return $http.delete('/api/users/' + id + '?token=' + token);
    };

    return factory;
  });
