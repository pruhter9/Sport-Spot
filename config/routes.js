var friends = require('./../server/controllers/friends.js')
module.exports = function(app) {
	app.get('/friends', function(req, res){
		friends.index(req, res)
	});
	app.post('/friends', function(req, res) {
		friends.create(req, res)
    	console.log("here:", req.body);
  	});
}