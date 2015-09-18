SportSpot_app.controller('Users', function($scope, UsersFactory, $location) {
  var that = this

  that.register = function() {
    UsersFactory.register(that.newUser, function(newRegUser) {
      that.currUser = newRegUser;
      $location.path('/main')
    });
    that.newUser = {};
  }
})