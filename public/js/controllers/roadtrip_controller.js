(function() {

  /* Creates Angular controller 'TripController' */
  angular
    .module('roadtripApp')
    .controller('TripController', TripController);

  /* Dependency injection */
  TripController.$inject = ['$http', '$scope', 'maps'];

  /* Controller constructor function */
  function TripController($http, $scope, maps) {

    /* Helper variables */
    var URL;
    if (window.location.href === 'http://localhost:3001/') {
      URL = 'http://localhost:3000/';
    } else {
      URL = 'https://open-highway-api.herokuapp.com/';
    }
    console.log(URL);
    const vm = this;

    /* Controller properties */
    vm.getRoadtrip = getRoadtrip;
    vm.tripData = {};
    vm.updateRoadtrip = updateRoadtrip;
    vm.getCoordinates = maps.getCoordinates;
    vm.drawMap = maps.drawMap;
    vm.addMarker = maps.addMarker;
    vm.drawRoadtripMap = drawRoadtripMap;
    vm.setZoom = maps.setZoom;

    // Function declarations //

    function request(route = '', method = 'GET', data = null) {
      return {
        method: method,
        url: URL + route,
        data: data
      };
    }

    function getRoadtrip(idNumber) {
      idNumber = idNumber.toString();
      $http(request('roadtrips/' + idNumber))
        .then(function(response) {
          vm.tripData = response.data;
          vm.drawRoadtripMap();
        }, function(error) {
          console.log("trip.getRoadtrip error: ", error);
        });
    }

    function updateRoadtrip(idNumber) {
        idNumber = idNumber.toString();
        reqObj = request('roadtrips/' + idNumber, 'PUT', vm.tripData);
        console.log(reqObj);
        $http(reqObj)
          .then(function(response) {
            vm.tripData = response.data;
            console.log(response);
          }, function(error) {
            console.log("trip.updateRoadtrip error: ", error);
          })
    }

    function drawRoadtripMap() {
      vm.getCoordinates(vm.tripData.cities[0].location, function(data) {
        console.log(data);
        vm.drawMap(data);
        vm.setZoom(4);
        for (let i = 0; i < vm.tripData.cities.length; i++) {
          let timer = setTimeout(function(){
            console.log(vm.tripData.cities[i].location);
            vm.getCoordinates(vm.tripData.cities[i].location, vm.addMarker);
          }, i * 500);
        }
      });
    }

  }

})();
