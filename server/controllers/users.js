var mongoose = require('mongoose')
var User = mongoose.model('User');
module.exports = (function() {
	return {
		create: function(request, response){
			var user = new User(request.body)
			user.save(function(err, results) {
				if(err) {
					console.log(err)
				} else {
					response.json(results);
				}
			})
		} 
	}
})();