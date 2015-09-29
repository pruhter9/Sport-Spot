var mongoose = require('mongoose')
var fs = require('fs')
mongoose.connect('mongodb://heroku_hsj8hpds:Nguyenmp93@ds051883.mongolab.com:51883/heroku_hsj8hpds');
var models_path = __dirname + '/../server/models';
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})