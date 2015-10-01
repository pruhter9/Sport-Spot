var SportSpot_app = angular.module('SportSpot_app', ['ngRoute','ui.bootstrap']);

  SportSpot_app.config(function ($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'partials/loginReg.html'
      })
      .when('/main', {
        templateUrl: 'partials/main.html'
      })
      .when('/event', {
        templateUrl: 'partials/event.html'
      })
      .when('/eventDetails/:eventID', {
        templateUrl: 'partials/eventDetails.html'
      })
      .when('/users/', {
        templateUrl: 'partials/users.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })