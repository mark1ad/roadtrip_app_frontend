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
    this.badLogin = false;
    var ctrl = this;

    this.login = function(main) {
      if (this.userpass.user === undefined || this.userpass.user === "") return;

      $http({
        method: 'POST',
        url: URL + 'users/login',
        data: {
          user: {
            name: this.userpass.user,
            password: this.userpass.password
            }
          }
        }
      ).then(function(response) {
        console.log(response.data);
        console.log(response.data.status);
        if (response.data.status == 200) {
          localStorage.setItem('currentUserId', response.data.user.id);
          localStorage.setItem('currentUserName', response.data.user.name);
          ctrl.badLogin = false;
          main.view = 3;
        }
        else {
          ctrl.badLogin = true;
        }
      },function(response) {
        console.log("fail");
        this.badLogin = true;
      })
    }

  }

})();
