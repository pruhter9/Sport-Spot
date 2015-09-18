SportSpot_app.factory('UsersFactory', function($http) {
  var factory = {};
  var Users = [];
  var currUser={};

  factory.register = function(newUser, callback) {
    console.log(newUser)
    $http.post('/Users', newUser).success(function(response) {
      currUser = response;
      callback(currUser);
    })
  }

  return factory;

})