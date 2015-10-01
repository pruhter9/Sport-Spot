var mongoose = require('mongoose')
var ObjectId = require('mongoose').Types.ObjectId
var Event = mongoose.model('Event');
var User = mongoose.model('User');
module.exports = (function() {
	return {
		create: function(request, response){
			console.log('current request body', request.body)
			request.body._user = request.session.user._id
			console.log('current request body', request.body)
			var newEvent = new Event(request.body)
			console.log(request.session.user)
			newEvent.save(function(err, results) {
				if(err) {
					console.log(err)
				} else {
					response.json(results);
				}
			})
		},
		get: function(request, response){
			Event.find({}).populate('_user').exec(function(err, events){
				if(err){
					console.log(err)
				} else {
					console.log("here are all the events:", events)
					response.json(events)
				}
			})
		},
		getOne: function(request, response){
			Event.find({_id: request.params.event_id}).populate('_user').populate('users').exec(function(err, result){
				if(err){
					console.log(err)
				} else {
					console.log('here in get one results',result)
					response.json(result)
					// result.populate('Users').exec(function(err, finResult){
					// 	if(err){
					// 		console.log(err)
					// 	}else{
					// 		console.log('final result of join/populate', result)
					// 		response.json(finResult)
					// 	}
					// })
				}
			})
		},
		addMsg:function(request, response){
			Event.find({_id: request.params.event_id}, function(err, currEvent){
				console.log('here inside addMsg', currEvent)
				var msg = {text:request.body.text, username:request.session.user.userName, date: new Date}
				currEvent[0].messages.push(msg);
				currEvent[0].save(function(err, newCurrEvent){
					if(err){
						console.log('we have an error in adding msg', err)
					}else{
						Event.find({_id: request.params.event_id}).populate('_user').populate('users').exec(function(error, finResult){
							console.log(finResult)
							if(error){
								console.log(error)
							}else{
								console.log('final result of join/populate', finResult)
								response.json({eventDetail: finResult, message:msg})
							}
						})
						// console.log('new curr event', newCurrEvent)
						// newCurrEvent = [newCurrEvent]
						// response.json(newCurrEvent)
					}
				})
				// response.json({msg:'here'})
			})
		},
		join: function(request, response){
			Event.find({_id: request.params.event_id}, function(err, currEvent){
				console.log('here inside join event controller server side')
				console.log(currEvent)
				if (currEvent[0].users.indexOf(request.session.user._id) > -1){
					response.json({msg:"Your already a part of this event!"})
				}else{
					currEvent[0].users.push(request.session.user);
					currEvent[0].save(function(err){
						if(err){
							console.log('we have an err:', err)
						}else{
							User.find({_id: request.session.user._id}, function(err, user){
								Event.find({_id: request.params.event_id}, function(err, result){
									user[0].events.push(result[0])
									user[0].save(function(err, user){
										if(err){
											console.log(err)
										} else {
											request.session.user = user
											Event.find({_id: request.params.event_id}).populate('_user').populate('users').exec(function(error, finResult){
												console.log(finResult)
												if(error){
													console.log(error)
												}else{
													console.log('final result of join/populate', finResult)
													response.json(finResult)
												}
											})
										}
									})
								})
							})
						}
					})
				}
			})
		}
	}
})();