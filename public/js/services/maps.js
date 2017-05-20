(function() {

  /* Creates new maps factory */
  angular
    .module('roadtripApp')
    .factory('maps', maps);

  /* Maps service factory function */
  function maps() {

    /* Creates geocoder */
    var geocoder = new google.maps.Geocoder();

    var map;
    var markers = [];

    /* Maps service definition */
    var service = {
      addMarker: addMarker,
      convertLatLngObj: convertLatLngObj,
      drawMap: drawMap,
      getCoordinates: getCoordinates,
      markers: markers
    }
    return service;

    // Function Declarations //
    /* A lot of these are derived from examples in the documentation */

    /* Adds marker to map based on given lat/long object */
    function addMarker(latLngObj) {
      var marker = new google.maps.Marker();
      marker.setPosition(latLngObj);
      marker.setMap(map);
      markers.push(marker);
    }

    /* Converts given latitude and longitude to obj for maps use */
    function convertLatLngObj(lat, lng) {
      return { lat: lat, lng: lng };
    }

    /* Geocodes coordinates based on search string */
    function getCoordinates(searchStr, callbackFn) {
      var coordinates;
      geocoder.geocode({ address: searchStr }, function(results, status) {
        let lat = results[0].geometry.location.lat();
        let lng = results[0].geometry.location.lng();
        coordinates = convertLatLngObj(lat, lng);
        console.log(coordinates);
        callbackFn(coordinates);
      });
    }

    /* Draws map on div#map centered on given coordinates obj */
    function drawMap(centerCoordinatesObj) {
      let options = {
        zoom: 8,
        center: centerCoordinatesObj,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map'), options);
    }

  }

})();
