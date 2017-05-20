(function() {

  /* Creates Angular controller 'CityController' */
  angular
    .module('roadtripApp')
    .controller('CityController', CityController);

  /* Dependency injection */
  CityController.$inject = ['$http', '$scope', 'maps'];

  /* Controller constructor function */
  function CityController($http, $scope, maps) {

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
    vm.getCity = getCity;
    vm.cityData = {};
    // vm.updateCity = updateCity;
    vm.getCoordinates = maps.getCoordinates;
    vm.drawMap = maps.drawMap;
    vm.addMarker = maps.addMarker;
    // vm.drawCityMap = drawCityMap;
    vm.setZoom = maps.setZoom;

    // Function declarations //

    function request(route = '', method = 'GET', data = null) {
      return {
        method: method,
        url: URL + route,
        data: data
      };
    }

    function getCity(idNumber) {
      idNumber = idNumber.toString();
      $http(request('cities/' + idNumber))
        .then(function(response) {
          vm.cityData = response.data;
          console.log(vm.cityData);
          // vm.drawCityMap();
        }, function(error) {
          console.log("city.getCity error: ", error);
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
