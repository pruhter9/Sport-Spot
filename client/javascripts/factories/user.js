SportSpot_app.factory('UsersFactory', function($http) {
  var factory = {};
  var Users = [];
  var currUser={};
 

  factory.checkLogin=function(callback){
    $http.get('/Users/session').success(function(data){
      console.log('session', data)
      currEvent = data
      callback(data)
    })
  }

  factory.register = function(newUser, callback) {
    $http.post('/Users', newUser).success(function(response) {
      currUser = response;
      callback(currUser);
    })
  }

  factory.login = function(loginInfo, callback){
    $http.post('/Users/login', loginInfo).success(function(response){
      currUser = response
      callback(currUser);
    })
  }
  factory.logOut = function(callback){
    $http.get('/Users/logOut').success(function(data){
      if(data.logout){
        callback(data)
      }else {
        callback(data)
      }
    })
  }
  return factory;

})