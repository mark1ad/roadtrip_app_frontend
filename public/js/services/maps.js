(function() {

  /* Creates new maps factory */
  angular
    .module('roadtripApp')
    .factory('maps', maps);

  /* Maps service factory function */
  function maps() {

    /* Creates geocoder */
    var geocoder = new google.maps.Geocoder();

    /* Creates directions services */
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    var map;
    var markers = [];

    /* Maps service definition */
    var service = {
      addMarker: addMarker,
      addWaypoints: addWaypoints,
      clearMarkers: clearMarkers,
      convertLatLngObj: convertLatLngObj,
      deleteMarkers: deleteMarkers,
      drawMap: drawMap,
      getCoordinates: getCoordinates,
      markers: markers,
      setMapOnAll: setMapOnAll,
      setZoom: setZoom,
      showMarkers: showMarkers
    }
    return service;

    // Function Declarations //
    /* A lot of these are derived or taken from examples in the documentation */

    /* Adds marker to map based on given lat/long object */
    function addMarker(latLngObj) {
      if (latLngObj) {
        var marker = new google.maps.Marker({ animation: google.maps.Animation.DROP });
        marker.setPosition(latLngObj);
        marker.setMap(map);
        markers.push(marker);
      }
    }

    function addWaypoints(citiesArr, callback = function() {}, errorCallback = function() {}) {
      if (citiesArr[0]) {
        var waypoints = [];
        for (var i = 1; i < citiesArr.length-1; i++) {
          waypoints.push({
            location: citiesArr[i].location,
            stopover: true
          });
        }
        let origin = citiesArr[0].location;
        let destination = citiesArr[citiesArr.length-1].location;
        if (origin === destination) {
          getCoordinates(origin, addMarker);
          destination = '';
        } else {
          deleteMarkers();
        }
        directionsService.route({
          origin: origin,
          destination: destination,
          waypoints: waypoints,
          optimizeWaypoints: false,
          travelMode: 'DRIVING'
        }, function(response, status) {
          console.log(origin);
          console.log(destination);
          console.log(waypoints);
          console.log(response);
          console.log(status);
          console.log(citiesArr[citiesArr.length-1].location);
          let newestWaypoint = response.geocoded_waypoints[response.geocoded_waypoints.length-1];
          console.log(newestWaypoint);
          if (status === 'OK' || (response.geocoded_waypoints[0].geocoder_status === 'OK' && destination === '')) {
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
            }
            console.log('Validated');
            callback();
          } else {
            errorCallback();
          }
        });
      }
    }

    /* Hides markers on map */
    function clearMarkers() {
      setMapOnAll(null)
    }

    /* Converts given latitude and longitude to obj for maps use */
    function convertLatLngObj(lat, lng) {
      return { lat: lat, lng: lng };
    }

    /* Hides markers and removes them from the markers array */
    function deleteMarkers() {
      clearMarkers();
      markers = [];
    }

    /* Draws map on div#map centered on given coordinates obj */
    function drawMap(centerCoordinatesObj) {
      if (!centerCoordinatesObj) {
        centerCoordinatesObj = { lat: 39.8282, lng: -98.5795 }
      }
      let options = {
        zoom: 8,
        center: centerCoordinatesObj,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map'), options);
      directionsDisplay.setMap(map);
    }

    /* Geocodes coordinates based on search string */
    function getCoordinates(searchStr, callbackFn) {
      var coordinates;
      geocoder.geocode({ address: searchStr }, function(results, status) {
        // console.log(searchStr);
        // console.log(results);
        // console.log(status);
        if (!!results[0]) {
          let lat = results[0].geometry.location.lat();
          let lng = results[0].geometry.location.lng();
          coordinates = convertLatLngObj(lat, lng);
        } else {
          coordinates = undefined;
        }
        // console.log(coordinates);
        callbackFn(coordinates);
      });
    }

    /* Can be used to change visibility status of markers */
    function setMapOnAll(map) {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }

    function setZoom(num) {
      map.setZoom(num);
    }

    /* Makes all markers visible */
    function showMarkers() {
      setMapOnAll(map);
    }

  }

})();
