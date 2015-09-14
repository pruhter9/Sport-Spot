var mongoose = require('mongoose')
var Friend = mongoose.model('Friend');
module.exports = (function() {
	return {
		index: function(rea, res){
			Friend.find({}, function(err, results) {
				if(err) {
					console.log(err)
				} else {
					res.json(results);
				}
			})
		}, 
		create: function(req, res){
			var friend = new Friend(req.body);
		    friend.save(function(err) {
		        if(err) {
		          console.log(err);
		        } else {
		          Friend.find({}, function(err, results) {
		            if(err) {
		              console.log(err);
		            } else {
		              res.json(results);
		            }
		          })
		        }
		    })
		}
	}
})();