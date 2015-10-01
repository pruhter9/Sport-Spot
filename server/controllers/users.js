var mongoose = require('mongoose')
var User = mongoose.model('User');
module.exports = (function() {
	return {
		create: function(request, response){
			var user = new User(request.body)
			User.find({userName: request.body.userName}, function(err, results){
				if (err){
					console.log(err)
				} else if (results.length == 0){
					user.save(function(err, result) {
						if(err) {
							console.log(err)
						} else {
							console.log(result)
							request.session.user = result;
							console.log('user', request.session.user);
							response.json(result);
						}
					})
				}else{
					response.json(results)
				}
			})
		},
		login: function(request, response){
			console.log(request.body.userName)
			User.find({userName:request.body.userName, password:request.body.password}, function(err, result){
				if (err) {
					console.log(err)
				} else {
					request.session.user = result[0];
					console.log('user', request.session.user);
					response.json(result);
				}
			})
		} 
	}
})();