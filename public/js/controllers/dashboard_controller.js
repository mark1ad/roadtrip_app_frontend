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
    vm.newRoadtrip = {};
    vm.createNewRoadtrip = createNewRoadtrip

    // Function declarations //

    /* Creates $http request object */
    function request(route = '', method = 'GET', data = null) {
      return {
        method: method,
        url: URL + route,
        data: data
      };
    }

    /* Create a New Roadtrip */
    function createNewRoadtrip() {
      $http(request('roadtrips', 'POST', vm.newRoadtrip))
      .then(function(response) {
        vm.createNewRoadtrip = {};
        console.log(response);
      });
    }
  }


})();
