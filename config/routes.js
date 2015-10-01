var users = require('./../server/controllers/users.js');
var events = require('./../server/controllers/events.js');
module.exports = function(app) {
	app.post('/Users', function(req, res) {
		console.log("here")
		users.create(req, res)
    console.log("here:", req.body);
  });
 app.post('/Users/login', function(req, res){
  users.login(req, res)
})
 app.get('/Users/session', function(req, res){
  res.json(req.session.user)
 })
 app.get('/Users/logOut', function(req, res){
  console.log('logout')
  req.session.destroy(function(err){
    if(err){
      console.log(err)
      res.json({logout:false, msg:"log out unsuccesful"})
    }else{
      res.json({logout:true, msg:"log out succesful"})
    }
  })
 })

 app.post('/Events', function(req, res) {
  console.log(req.body)
  console.log("here in post event")
  events.create(req, res)
})
 app.get('/Events', function(req, res){
  console.log("here in get request for events")
  events.get(req,res)
})
 app.get('/Events/:event_id', function(req, res){
  console.log("here in get request for one event")
  events.getOne(req, res)
})
 app.put('/Events/:event_id', function(req, res){
  console.log('request parameter', req.params.event_id)
  events.join(req, res)
})
 app.put('/Events/messages/:event_id', function(req, res){
  events.addMsg(req, res)
 })
}