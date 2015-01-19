angular
  // inject ngRoute for all our routing needs
  .module('routerRoutes', ['ngRoute'])
  // configure our routes
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      // route for the home page
      .when('/', {
        templateUrl : 'app/views/pages/home.html',
        controller : 'homec',
        controllerAs: 'home'
      })
      .when('/about', {
        templateUrl : 'app/views/pages/about.html',
        controller : 'aboutc',
        controllerAs: 'about'
      })
      .when('/contact', {
        templateUrl : 'app/views/pages/contact.html',
        controller : 'contactc',
        controllerAs: 'contact'
      })
      .when('/404', {
        templateUrl : 'app/views/pages/fourofour.html',
        controller : 'fourofourc',
        controllerAs: 'fourofour'
      })
      .otherwise('/404');

    // set our app up to have pretty URLS
    $locationProvider.html5Mode(true);

  });
