
var controllerMain = function(App, Auth, $scope, $window) {
  App.authRequired();

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
        App.message = result.message;
      })
      .error(function(result) {
        App.message = result.message;
      });
  };
};

var controllerUsers = function(App, Users) {
  App.authRequired();

  // Bind this to vm (view-model).
  var vm = this;

  var getUsers = function() {
    vm.userAdd = false;
    vm.userEdit = false;
    vm.userDelete = false;

    Users.getUsers()
      .success(function(result) {
        vm.users = result.data;
      });
  }
  getUsers();

  var doSuccess = function(result) {
    App.message = result.message;
    getUsers();
  };

  var doFailure = function(result) {
    App.message = result.message;
  };

  vm.doAdd = function(data) {
    vm.userEdit = false;
    vm.userDelete = false;

    if (!data) {
      vm.userAdd = {};
    }
    else {
      Users
        .createUser(data)
        .success(doSuccess)
        .error(doFailure);
    }
  }

  vm.doEdit = function(id, data) {
    vm.userAdd = false;
    vm.userDelete = false;

    if (id && !data) {
      Users.getUser(id)
        .success(function(result) {
          vm.userEdit = result.data;
        });
    }
    else {
      Users
        .updateUser(id, data)
        .error(doFailure)
        .success(doSuccess);
    }
  };

  vm.doDelete = function(id, confirmed) {
    vm.userAdd = false;
    vm.userEdit = false;

    if (!confirmed) {
      vm.userDelete = { _id: id };
    }
    else {
      Users
        .deleteUser(id)
        .success(doSuccess)
        .error(doFailure);
    }
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
