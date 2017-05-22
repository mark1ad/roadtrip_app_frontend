(function() {

  /* Creates Angular controller 'ProfileController' */
  angular
    .module('roadtripApp')
    .controller('ProfileController', ProfileController);

  /* Dependency injection */
  ProfileController.$inject = ['$http', '$scope'];

  /* Controller constructor function */
  function ProfileController($http, $scope) {

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
    vm.currentUser = {};
    vm.currentUserId = localStorage.currentUserId;
    vm.currentUserRoadtrips = {};
    vm.deleteRoadtrip = deleteRoadtrip;
    vm.deleteUser = deleteUser;
    vm.updateCurrentUser = updateCurrentUser;
    vm.getCurrentUser = getCurrentUser;

    // Function declarations //

    function request(route = 'users/', method = 'GET', data = null) {
      return {
        method: method,
        url: URL + route,
        data: data
      };
    }

    /* Get the current User's info */
    function getCurrentUser() {
      $http(request('users/' + vm.currentUserId))
        .then(function(response) {
          vm.currentUser = response.data;
          vm.currentUserRoadtrips = response.data.roadtrips;
        }, function(error) {
          console.log("profile.getCurrentUser error: ", error);
        })
    }

      /* Delete a Roadtrip */
      function deleteRoadtrip(id, index) {
        $http(request('users/' + vm.currentUserId + '/roadtrips/' + id, 'DELETE'))
         .then(function(response) {
           vm.currentUserRoadtrips.splice(index, 1);
           console.log(response.data);
         }, function(error) {
           console.log("dash.deleteRoadtrip error: ", error);
         })
      }

    /* EDIT the current User's info */
    function updateCurrentUser() {
      $http(request('users/' + vm.currentUserId, 'PUT', vm.currentUser))
        .then(function(response) {
          console.log(response);
        }, function(error) {
          console.log("profile.updateCurrentUser error: ", error);
        });
    }

    /* DELETE user */
    function deleteUser() {
      $http(request('users/' + vm.currentUserId, 'DELETE'))
        .then(function(response) {
          console.log(response.data);
        }, function(error) {
          console.log("profile.deleteUser error: ", error);
        })
    }

  };

})();
