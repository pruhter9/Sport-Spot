var mongoose = require('mongoose')
var fs = require('fs')
// "mongodb://heroku_hsj8hpds:Nguyenmp93@ds051883.mongolab.com:51883/heroku_hsj8hpds" ||"mongodb://localhost/SportSpot"  
mongoose.connect("mongodb://admin:admin1234@ds051903.mongolab.com:51903/sportspot" , function(err){
	if(err){
		console.log(err)
	}else{
		console.log('connected')
	}
});
var models_path = __dirname + '/../server/models';
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})