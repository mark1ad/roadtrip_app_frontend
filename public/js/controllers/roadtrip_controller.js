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
    vm.cityToAdd = {};
    vm.addCity = addCity;
    vm.deleteCity = deleteCity;
    vm.deleteMarkers = maps.deleteMarkers;
    vm.addWaypoints = maps.addWaypoints;
    vm.addError = false;
    vm.clearDirectionsDisplay = maps.clearDirectionsDisplay;

    // Function declarations //

    function request(route = '', method = 'GET', data = null) {
      return {
        method: method,
        url: URL + route,
        data: data
      };
    }

    function addCity() {
      if (vm.cityToAdd.location.length > 0) {
        let city = {
          location: vm.cityToAdd.location,
          roadtrip_id: vm.tripData.id,
          triporder: vm.tripData.cities.length+1
        }
        console.log(city);
        let newCitiesArr = vm.tripData.cities.slice();
        newCitiesArr.push(city);
        console.log(newCitiesArr);
        vm.addWaypoints(newCitiesArr, function() {
          $http(request('roadtrips/' + vm.tripData.id + '/cities', 'POST', city))
            .then(function(response) {
              vm.cityToAdd.location = "";
              vm.tripData.cities.push(response.data);
              // vm.getCoordinates(response.data.location, vm.addMarker);
              setError(false);
              // $scope.$apply();
            }, error => console.log(error))
        }, function(){
          setError(true);
          // $scope.$apply();
        });

      }
    }


    function setError(bool) {
      vm.addError = bool;
    }

    function deleteCity($index) {
      $http(request('cities/' + vm.tripData.cities[$index].id, 'DELETE'))
        .then(function(response) {
          let delTriporder = vm.tripData.cities[$index].triporder
          vm.tripData.cities.splice($index, 1);
          vm.tripData.cities.forEach(function(city) {
            if (city.triporder > delTriporder) {
              city.triporder -= 1;
            }
          });
          vm.deleteMarkers();
          // addMarkers();
          vm.addWaypoints(vm.tripData.cities);
        }, error => console.log(error))
    }

    function getRoadtrip(idNumber) {
      idNumber = idNumber.toString();
      $http(request('roadtrips/' + idNumber))
        .then(function(response) {
          vm.tripData = response.data;
          console.log(vm.tripData);
          vm.clearDirectionsDisplay();
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
      var coordVar;
      if (vm.tripData.cities[0]) {
        coordVar = vm.tripData.cities[0].location;
      } else {
        coordVar = 'Topeka, Kansas';
      }
      vm.getCoordinates(coordVar, function(data) {
        console.log(data);
        vm.drawMap(data);
        vm.setZoom(4);
        // addMarkers();
        vm.addWaypoints(vm.tripData.cities);
      });
    }

    function addMarkers() {
      for (let i = 0; i < vm.tripData.cities.length; i++) {
        let timer = setTimeout(function(){
          console.log(vm.tripData.cities[i].location);
          vm.getCoordinates(vm.tripData.cities[i].location, vm.addMarker);
        }, i * 200);
      }
    }


  }

})();
