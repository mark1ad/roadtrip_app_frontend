(function() {

  /* Creates Angular controller 'TripController' */
  angular
    .module('roadtripApp')
    .controller('TripController', TripController);

  /* Dependency injection */
  TripController.$inject = ['$http', '$scope'];

  /* Controller constructor function */
  function TripController($http, $scope) {

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
          console.log(vm.tripData);
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
            console.log(error);
          })
    }

  }

})();
