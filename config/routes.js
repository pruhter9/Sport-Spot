var users = require('./../server/controllers/users.js')
module.exports = function(app) {
	app.post('/Users', function(req, res) {
		users.create(req, res)
    	console.log("here:", req.body);
  	});
}