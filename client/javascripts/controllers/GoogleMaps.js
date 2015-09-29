SportSpot_app.controller('GoogleMaps', function($scope, EventsFactory, $location){
    var infowindow = new google.maps.InfoWindow();
    var that = this;
    that.geocoder = new google.maps.Geocoder();
    that.events = []
 
                //                var contentString = '<div id="content">'+
                //       desc +
                //       '</div>';
                // var infowindow = new google.maps.InfoWindow({
                //         content: contentString
                // });
                // marker.addListener('click', function(){
                //     infowindow.open(that.map, marker)
                // });
                // marker.addListener('mouseover', function(){
                //     infowindow.open(that.map, marker)
                // })
                // marker.addListener('mouseout', function(){
                //     infowindow.close(that.map, marker)
                // })
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

        EventsFactory.getEvents(function(response){
            that.events=response
            console.log("all events in googleMaps controller:", that.events)
            for (var i = 0; i < that.events.length; i++) {
                console.log(i)
                var desc = that.events[i].information
                console.log(desc)
                var iwContent = desc
                createMarker({lat: that.events[i].longitude, lng: that.events[i].latitude}, desc, that.map, that.events[i]._id);
            }
            that.map = new google.maps.Map(document.getElementById('map'), that.mapOptions);
        })
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
            EventsFactory.getOneEvent(marker.id_num, function(){
                url = '/eventDetails/' + marker.id_num
                $location.path(url)
            })
        })
        return marker
    }

        // var createMap = function(location) {
    //   that.mapOptions = {
    //     zoom: 15,
    //     center: new google.maps.LatLng(location.lat, location.lng),
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    //   }
    //   that.map = new. google.maps.Map(document.getElementById('map'), that.mapOptions);
    // }
    // Create the map located on the main page
    // that.mapOptions = {
    //     zoom: 15,
    //     center: new google.maps.LatLng(41.923, 12.513),
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // }

    // that.eventMap = function() {
    //     console.log("Got here");
    //     that.eventOptions = {
    //         zoom: 15,
    //         center: new google.maps.LatLng(43.345, 67.111),
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };
    //     that.eventLoc = new google.maps.Map(document.getElementById('event'), that.eventOptions);
    // }

    // var createMarker = function (info){
    //     // for (var i = 0; i < Things.length; i++) {
    //     //   Things[i]
    //     // };
    //     var marker = new google.maps.Marker({
    //       map: that.map,
    //       position: new google.maps.LatLng(info.lat(), info.lng())
    //     });
    // }


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