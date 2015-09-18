SportSpot_app.controller('GoogleMaps', function($scope){

    var that = this;
    // var createMap = function(location) {
    //   that.mapOptions = {
    //     zoom: 15,
    //     center: new google.maps.LatLng(location.lat, location.lng),
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   }
    //   that.map = new. google.maps.Map(document.getElementById('map'), that.mapOptions);
    // }
    // Create the map located on the main page
    that.mainMap = function() {
        var initialLocation;
        navigator.geolocation.getCurrentPosition(function(position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            that.map.setCenter(initialLocation);
        });
        that.mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        that.map = new google.maps.Map(document.getElementById('map'), that.mapOptions);
    }
    // that.mapOptions = {
    //     zoom: 15,
    //     center: new google.maps.LatLng(41.923, 12.513),
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // }

    that.clearMarkers = function() {
        that.markers = [];
    }
    that.eventMap = function() {
        console.log("Got here");
        that.eventOptions = {
            zoom: 15,
            center: new google.maps.LatLng(43.345, 67.111),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        that.eventLoc = new google.maps.Map(document.getElementById('event'), that.eventOptions);
    }

    var createMarker = function (info){
        // for (var i = 0; i < Things.length; i++) {
        //   Things[i]
        // };
        var marker = new google.maps.Marker({
          map: that.map,
          position: new google.maps.LatLng(info.lat(), info.lng())
        });
    }

    that.markers = [];
    var cities = ["Atlanta, USA", "Seattle, USA", "13530 Meadow Road, Everett, WA, 98208"];
    var geocoder = new google.maps.Geocoder();

    // for (var i = 0; i < cities.length; i++) {

    //   geocoder.geocode( { 'address': cities[i] }, function(results, status) {
    //       if (status == google.maps.GeocoderStatus.OK) {
    //         newAddress = results[0].geometry.location;
    //         that.map.setCenter(newAddress);
    //         createMarker(newAddress)
    //       } else {
    //         console.log(status)
    //       }
    //   });
    // };

})