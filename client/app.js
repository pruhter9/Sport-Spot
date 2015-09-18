var SportSpot_app = angular.module('SportSpot_app', ['ngRoute']);

  SportSpot_app.config(function ($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html'
      })
      .when('/main', {
        templateUrl: 'partials/main.html'
      })
      .when('/event', {
        templateUrl: 'partials/event.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })