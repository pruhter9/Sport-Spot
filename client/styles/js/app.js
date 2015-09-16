"use strict";

  angular.module('SportSpot_app', ['ngRoute'])

  .config(function ($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main.html'
      })
      .when('/main', {
        templateUrl: 'partials/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })