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
    vm.currentUserId = '1'; // <<< hard coded, in development
    vm.deleteRoadtrip = deleteRoadtrip;
    vm.getUserRoadtrips = getUserRoadtrips;
    vm.currentUserRoadtrips = [];
    vm.newRoadtrip = {};

    // Initialization //
    vm.getUserRoadtrips();

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
    function getUserRoadtrips() {
      var params = 'users/' + vm.currentUserId;
      $http(request(params))
        .then(function(response) {
          vm.currentUserRoadtrips = response.data.roadtrips;
          console.log(vm.currentUserRoadtrips);
        });
    }

    /* Create a New Roadtrip */
    function createNewRoadtrip() {
      var newRoadtripId;
      $http(request('users/' + vm.currentUserId + '/roadtrips', 'POST', vm.newRoadtrip))
        .then(function(response) {
          vm.currentUserRoadtrips.push(response.data)
          vm.newRoadtrip = {};
          console.log(response);
      });
    };

    /* Delete a Roadtrip */
    function deleteRoadtrip(id, index) {
      $http(request('users/' + vm.currentUserId + '/roadtrips/' + id, 'DELETE'))
       .then(function(response) {
         vm.currentUserRoadtrips.splice(index, 1);
         console.log(response.data);
       })
    }

  }


})();
