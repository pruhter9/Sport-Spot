SportSpot_app.controller('Events', function( $filter, socket, $scope, UsersFactory, EventsFactory, $location, $routeParams) {
	var that = this
	var infowindow = new google.maps.InfoWindow({
		disableAutoPan: true
	});
	that.geocoder = new google.maps.Geocoder();
	that.eventMarkers = [];
	that.createdMap = false;
	that.filterEventMarkers = [];

	that.activityArr = [{name: "Basketball"}, {name: "Football"}, {name: "Frisbee"}, {name: "Soccer"}, {name: "Volleyball"}, {name: "Other"}];


	socket.on('connect', function(){
		console.log('client side connected')
	})

	socket.on('broadcastMsg', function(data){
		console.log('sending message to all', data)
		EventsFactory.getOneEvent(data.eventID, function(data){
	      that.currEvent=data;
	    })
	})

	that.sendMessage = function(){
		if(that.sentMessage==undefined){
			that.errorChat='nothing to send'
		}else{
			that.errorChat=""
			console.log(that.sentMessage.text)
			EventsFactory.sendMessage(that.sentMessage, $routeParams.eventID, function(currEvent, message){
				that.currEvent=currEvent;
				that.sentMessage={}
				socket.emit('msgSend', {msg:message, eventID:$routeParams.eventID})
			})
		}

	}


	that.clearMsg=function(){
		that.errorMsg="";
	}
	that.joinEvent = function(){
		EventsFactory.joinEvent($routeParams.eventID, function(info){
			console.log(info);
			if(info.msg){
				that.errorMsg=info.msg;
			}else{
				that.currEvent = info;
			}
		})
	}
	that.createEvent = function(){
		EventsFactory.createEvent(that.newEvent, function(response){
			console.log('hello')
			console.log(response, "events controller")
			var desc = response.information
			console.log(desc)
			var iwContent = desc
			var marker = createMarker({lat: response.latitude, lng: response.longitude}, desc, that.map, response._id)
			that.eventMarkers.push(marker);
			marker.setMap(that.map)
			$location.path('/main')
		})
	}
	that.resize = function(){
		if(that.currEvent == undefined){
			EventsFactory.getOneEvent($routeParams.eventID, function(data){
				console.log('here')
	      		that.currEvent=data;
	      		google.maps.event.trigger(that.map, 'resize');
				resetCenter(that.currEvent[0].latitude, that.currEvent[0].longitude, that.map)
	    	})
		}else{
			google.maps.event.trigger(that.map, 'resize');
			resetCenter(that.currEvent[0].latitude, that.currEvent[0].longitude, that.map)
		}
	}

	that.mainMap = function() {
		if(that.createdMap==false) {
			var initialLocation;
			navigator.geolocation.getCurrentPosition(function(position) {
				initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				that.map.setCenter(initialLocation);
			});

			that.mapOptions = {
				zoom: 15,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
			};

			that.map = new google.maps.Map(document.getElementById('map'), that.mapOptions);

			EventsFactory.getEvents(function(response){
				that.events=response
				console.log("all events in googleMaps controller:", that.events)
				for (var i = 0; i < that.events.length; i++) {
					console.log(i)
						var iwContent = '<div id="content">'+
											'<div id="siteNotice">'+
											'</div>'+
											'<header id="firstHeading" class="firstHeading">Event Creater: ' + that.events[i]._user.firstName + ' ' + that.events[i]._user.lastName + '</header>'+
											'<div id="bodyContent">'+
												'<li>Address: ' + that.events[i].address + '</li>'+
												'<li>Information: ' + that.events[i].information + '</li>'+
												'<li>Activity: ' + that.events[i].activity + '</li>'+
												'<li>Date: ' + $filter('date')(that.events[i].date, 'MM/dd/yyyy', 'PT') + '</li>'+
												'<li>Click for more information</li>'+
												'</ul>'+
											'</div>'+
										'</div>';
					that.eventMarkers.push(createMarker({lat: that.events[i].latitude, lng: that.events[i].longitude}, iwContent, that.map, that.events[i]._id));
				}
			})
			setAllMap(that.map)
			that.createdMap=true
		}
		google.maps.event.trigger(map,'resize')
	}

	function createMarker(latlon, iwContent, map, id) {
		var marker = new google.maps.Marker({
			position: latlon,
			map: map,
			id_num: id
		})
		google.maps.event.addListener(marker, 'mouseover', function(){
			infowindow.setContent(iwContent);
			infowindow.open(map, marker)
		})
		google.maps.event.addListener(marker, 'mouseout', function(){
			infowindow.setContent(iwContent);
			infowindow.close(map, marker)
		})
		google.maps.event.addListener(marker, 'click', function(){
			EventsFactory.getOneEvent(marker.id_num, function(data){
				that.currEvent = data
				url = '/eventDetails/' + marker.id_num
				$location.path(url)
			})
		})
		return marker;
	}

	function setAllMap (map){
		for(var i = 0; i <that.eventMarkers.length; i++){
			that.eventMarkers[i].setMap(map)
		}
	}

	function resetCenter(Lat, Lng, map){
		map.setCenter({lat:Lat, lng:Lng})
	}

	that.clearMarkers=function(){
		setAllMap(null)
	}
	that.resetMarkers = function(){
		setAllMap(that.map)
	}
	that.filterEvents=function(type){
		// that.filteredEventMarker=that.eventMarkers.infoWindow
	}
	// that.filterEvents
})