(function() {

  // Creates Angular controller 'LoginController'
  angular
    .module('roadtripApp')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$http', '$scope'];

  function LoginController($http, $scope) {
    var URL;
    if (window.location.href === 'http://localhost:3001/') {
      URL = 'http://localhost:3000/';
    } else {
      URL = 'https://open-highway-api.herokuapp.com/';
    }

    this.userpass = {};

    this.login = function(main) {
      $http({
        method: 'POST',
        url: URL + 'users/login',
        data: {
          user: this.userpass.user,
          password: this.userpass.password
          }
        }
      ).then(function(response) {
        // console.log(response.data);
        localStorage.setItem('currentUserId', response.data.user.id);
        localStorage.setItem('currentUserName', response.data.user.name);
        main.view = 3;
      },function(response) {
        console.log("fail");
      })
    }

  }

})();
