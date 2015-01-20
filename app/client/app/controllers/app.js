
var controllerMain = function(App, Auth, $scope, $window) {
  // Bind this to vm (view-model).
  var vm = this;

  vm.App = App;
  vm.doLogout = function() {
    Auth.logout();
    $window.location.href = '/login';
  };

  $scope.user = App.user.data;
  $scope.user.isLoggedIn = App.user.isLoggedIn;
};

var controllerLogin = function(App, Auth, $window, $scope) {
  // Bind this to vm (view-model).
  var vm = this;

  vm.user = App.user.data;

  vm.doLogin = function() {
    Auth
      .login(vm.user.username, vm.user.password)
      .success(function(data) {
        $window.location.href = '/';
      })
      .error(function(result) {
        App.message = result.message;
      });
  };
};

var controllerProfile = function(App, AuthStorage, Users, $scope) {
  App.authRequired();

  // Bind this to vm (view-model).
  var vm = this;
  var id = App.user.data._id;

  Users.getUser(id)
    .success(function(result) {
      vm.user = result.data;
    });

  vm.doUpdate = function() {
    Users
      .updateUser(id, vm.user)
      .success(function(result) {
        App.message = 'Success';
      })
      .error(function(result) {
        App.message = 'Failure';
        console.log(result);
      });
  };
};

var controllerUsers = function(App, Users) {
  App.authRequired();

  // Bind this to vm (view-model).
  var vm = this;

  Users.getUsers()
    .success(function(result) {
      vm.users = result.data;
    });

  vm.doEdit = function(id) {
    Users.getUser(id)
      .success(function(result) {
        vm.user = result.data;
      });
  };
  vm.doDelete = function(id) {
    Users.getUser(id)
      .success(function(result) {
        vm.user = result.data;
      });
  };

};

var controllerPages = function(App, $location) {
  // Bind this to vm (view-model).
  var vm = this;
  vm.title = '';
  vm.content = '';

  switch ($location.path()) {
    case '/404':
      vm.title = 'Page not found';
      vm.content = 'Sorry, we couldn\'t find that page.';
      break;
  }
};

angular
  .module('app', [
    'serviceAuth',
    'serviceApp',
    'serviceUsers',
    'routerRoutes'
  ])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider
      .interceptors
      .push('AuthInterceptor');
  }])
  .controller('controllerMain', controllerMain)
  .controller('controllerLogin', controllerLogin)
  .controller('controllerProfile', controllerProfile)
  .controller('controllerUsers', controllerUsers)
  .controller('controllerPages', controllerPages);
