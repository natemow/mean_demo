angular
  .module('serviceUsers', ['serviceAuth'])
  .factory('Users', function($http) {
    var factory = {};

    factory.getUsers = function() {
      return $http.get('/api/users');
    };

    factory.getUser = function(id) {
      return $http.get('/api/users/' + id);
    };

    factory.createUser = function(data) {
      return $http.post('/api/users', data);
    };

    factory.updateUser = function(id, data) {
      console.log(data);
      return $http.put('/api/users/' + id, data);
    };

    factory.deleteUser = function(id) {
      return $http.delete('/api/users/' + id);
    };

    return factory;
  });
