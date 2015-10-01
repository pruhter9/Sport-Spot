SportSpot_app.controller('Users', function($scope, UsersFactory, $location) {
  var that = this
  that.currUser = {}
  that.loginError = ""
  that.loggedIn = false;

  that.register = function() {
    UsersFactory.register(that.newUser, function(newRegUser) {
       if (newRegUser.length == 0) {
  			that.loginError = "there already a user with that username"
  		} else {
  			that.currUser = newRegUser[0]
        that.loggedIn = true;
  			that.newUser = {};
  			$location.path('/main')
  		}
    });
  };

  that.getUserEvents=function(){
    console.log("itworks")
  }
  that.checkLogin=function(){
    console.log('here');
    UsersFactory.checkLogin(function(data){
      if(data){
        that.currUser=data;
        that.loggedIn=true;
        $location.path('/main');
      };
    });
  };
  that.login = function() {
  	UsersFactory.login(that.loginInfo, function(currUser){
  		if (currUser.length == 0) {
  			that.loginError = "there is no User with that Username and Password Combination"
  		} else {
  			that.currUser = currUser[0]
        that.loggedIn = true;
  			that.loginInfo = {}
  			$location.path('/main')
  		}
  	})
  }
  that.logOut = function() {
    UsersFactory.logOut(function(data){
      if(data.logOut){
        that.loginError=data.msg
        $location.path('/')
      }else{
        that.loginError=data.msg
        $location.path('/')
      }
    })
  }
})