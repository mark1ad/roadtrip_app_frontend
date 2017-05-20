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
      var marker = new google.maps.Marker({ animation: google.maps.Animation.DROP });
      marker.setPosition(latLngObj);
      marker.setMap(map);
      markers.push(marker);
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
      let options = {
        zoom: 8,
        center: centerCoordinatesObj,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById('map'), options);
    }

    /* Geocodes coordinates based on search string */
    function getCoordinates(searchStr, callbackFn) {
      var coordinates;
      geocoder.geocode({ address: searchStr }, function(results, status) {
        // console.log(searchStr);
        // console.log(results);
        // console.log(status);
        let lat = results[0].geometry.location.lat();
        let lng = results[0].geometry.location.lng();
        coordinates = convertLatLngObj(lat, lng);
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
