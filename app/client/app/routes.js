angular
  // inject ngRoute for all our routing needs
  .module('routerRoutes', ['ngRoute', 'ngAnimate'])
  // configure our routes
  .config(function($routeProvider, $locationProvider) {
    var basicPage = {
      templateUrl : 'app/views/pages/basic.html',
      controller : 'controllerPages',
      controllerAs: 'controller'
    };

    $routeProvider
      // route for the home page
      .when('/login', {
        templateUrl : 'app/views/pages/login.html',
        controller : 'controllerLogin',
        controllerAs: 'controller'
      })
      .when('/profile', {
        templateUrl : 'app/views/pages/profile.html',
        controller : 'controllerProfile',
        controllerAs: 'controller'
      })
      .when('/', {
        templateUrl : 'app/views/pages/users.html',
        controller : 'controllerUsers',
        controllerAs: 'controller'
      })
      .when('/404', basicPage)
      .otherwise('/404');

    // set our app up to have pretty URLS
    $locationProvider.html5Mode(true);

  });
