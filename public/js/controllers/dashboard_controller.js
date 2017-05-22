(function() {

  /* Creates Angular controller 'DashController' */
  angular
    .module('roadtripApp')
    .controller('DashController', DashController);

  /* Dependency injection */
  DashController.$inject = ['$http', '$scope'];

  /* Controller constructor function */
  function DashController($http, $scope) {

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
    vm.createNewRoadtrip = createNewRoadtrip;
    vm.currentUserId = localStorage.currentUserId;
    vm.getAllRoadtrips = getAllRoadtrips;
    vm.allRoadtrips = [];
    vm.newRoadtrip = {};

    // Initialization //
    vm.getAllRoadtrips();

    // Function declarations //

    /* Creates $http request object */
    function request(route = '', method = 'GET', data = null) {
      return {
        method: method,
        url: URL + route,
        data: data
      };
    };

    /* Get all Roadtrips belonging to a User */
    function getAllRoadtrips() {
      var params = 'roadtrips/'
      $http(request(params))
        .then(function(response) {
          vm.allRoadtrips = response.data;
          console.log(vm.allRoadtrips);
        }, function(error) {
          console.log("dash.getAllRoadtrips error: ", error);
        });
    }

    /* Create a New Roadtrip */
    function createNewRoadtrip() {
      var newRoadtripId;
      $http(request('users/' + vm.currentUserId + '/roadtrips', 'POST', vm.newRoadtrip))
        .then(function(response) {
          vm.allRoadtrips.push(response.data)
          vm.newRoadtrip = {};
          console.log(response);
      }, function(error) {
        console.log("dash.createNewRoadtrip error: ", error);
      });
    };


  }


})();
