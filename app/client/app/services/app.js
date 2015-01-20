angular
  .module('serviceApp', [
    'serviceAuth'
  ])
  .factory('App', function($rootScope, $location, Auth) {
    var globals = {
      message: null,
      user: {
        isLoggedIn: Auth.isLoggedIn(),
        data: {}
      }
    };

    globals.broadcast = function(evt) {
      $rootScope
        .$broadcast(evt);
    };

    globals.authRequired = function() {
      if (!globals.user.isLoggedIn) {
        $location.path('/login');
      }
    }

    // Check to see if a user is logged in.
    $rootScope
      .$on('$routeChangeStart', function() {
        globals.message = null;
        globals.user.isLoggedIn = Auth.isLoggedIn();
      });

    // Populate user data.
    if (globals.user.isLoggedIn) {
      Auth
        .getUser()
        .success(function(result) {
          for (var p in result.data) {
            globals.user.data[p] = result.data[p];
          }
        })
        .error(function(result) {
          //console.log(result);
        });
    }
    else {
      for (var p in globals.user.data) {
        delete globals.user.data[p];
      }
    }

    return globals;
  });
