(function() {

  /* Creates Angular controller 'LandingController' */
  angular
    .module('roadtripApp')
    .controller('LandingController', LandingController);

  /* Dependency injection */
  LandingController.$inject = ['$http', '$scope'];

  /* Controller constructor function */
  function LandingController($http, $scope) {

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
    vm.createNewUser = createNewUser;
    vm.newUserName = '';
    vm.newUserPass = '';


    // Function declarations //

    function request(route = 'users/', method = 'POST', data = null) {
      return {
        method: method,
        url: URL + route,
        data: data
      };
    }

    function createNewUser() {
      $http(request(route = 'users/', method = 'POST', data = {
        name: vm.newUserName,
        password: vm.newUserPass
      }))
        .then(function(response) {
          console.log(response);
          vm.newUserName = '';
          vm.newUserPass = '';
        }, function(error) {
          console.log(data);
          console.log("landing.createNewUser error: ", error);
        })
    }

  };

})();
