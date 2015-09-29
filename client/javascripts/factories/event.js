SportSpot_app.factory('EventsFactory', function($http) {
  var factory = {};
  var allEvents =[];
  var currEvent = {};
  var geocoder = new google.maps.Geocoder();

  factory.sendMessage = function(message, eventID, callback){
    url = '/Events/messages/' + eventID
    $http.put(url, message).success(function(data){
      currEvent = data.eventDetail
      callback(currEvent, data.message)
    })
  }

  factory.getEvents = function(callback) {
    $http.get('/Events').success(function(response) {
      console.log("inside getEvent")
      allEvents = response;
      callback(allEvents);
    })
  }

  factory.createEvent = function(newEvent, callback){
    geocoder.geocode( { 'address': newEvent.address }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        newAddress = results[0].geometry.location;
        console.log(newAddress)
        newEvent.latitude = newAddress.H
        newEvent.longitude = newAddress.L
        console.log(newEvent)
        $http.post('/Events', newEvent).success(function(response){
          console.log(response)
          callback(response)
        })
      } else {
        console.log("geocode status:", status)
      }
    });
  }

  factory.getOneEvent = function(eventID, callback){
    url = '/Events/' + eventID
    $http.get(url).success(function(data){
      currEvent = data
      callback(currEvent)
    })
  }
  factory.joinEvent = function(eventID, callback){
    var url = '/Events/' + eventID
    $http.put(url).success(function(data){
      currEvent=data
      console.log('after join', currEvent)
      callback(currEvent)
    })
  }
  factory.addEventToUser = function(eventID, callback){
    url = '/Events/' + eventID
    $http.put(url)
  }
  return factory;
})