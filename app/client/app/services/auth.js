angular
  .module('serviceAuth', [])
  .factory('AuthStorage', function($window) {
    var factory = {};

    factory.get = function(key) {
      return $window.localStorage.getItem(key);
    };

    factory.set = function(key, data) {
      if (data) {
        return $window.localStorage.setItem(key, data);
      }
      else {
        return $window.localStorage.removeItem(key);
      }
    };

    return factory;
  })
  .factory('AuthInterceptor', function($q, $location, AuthStorage) {
    var factory = {};

    // This will happen on all HTTP requests (see app module.config).
    factory.request = function(config) {
      var token = AuthStorage.get('token');

      // If the token exists, add it to the header.
      if (token) {
        config.headers['x-access-token'] = token;
      }

      return config;
    };

    factory.responseError = function(response) {
      if (response.status === 403) {
        $location.path('/login');
        return $q.reject(response);
      }
    };

    return factory;
  })
  .factory('Auth', function($http, $q, $window, AuthStorage) {
    var factory = {};

    factory.login = function(username, password) {
      return $http.post('/auth', {
        username: username,
        password: password
      })
      .success(function(result) {
        for (var p in result.data) {
          AuthStorage.set(p, result.data[p]);
        }

        return true;
      })
      .error(function(result) {
        return result;
      });
    };

    factory.logout = function() {
      for (var p in $window.localStorage) {
        delete $window.localStorage[p];
      }
    };

    factory.isLoggedIn = function() {
      var token = AuthStorage.get('token');
      if (token) {
        return true;
      }
      else {
        return false;
      }
    };

    factory.getUser = function() {
      return $http.get('/api/auth')
        .success(function(result) {
          return result.data;
        })
        .error(function(result) {
          return result;
        });
    };

    return factory;
  });
