(function() {

  /* Creates Angular controller 'DashController' */
  angular
    .module('roadtripApp')
    .controller('DashController', DashController);

  /* Dependency injection */
  DashController.$inject = ['$http'];

  /* Controller constructor function */
  function DashController($http) {

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

    // Function declarations //

  }

})();
