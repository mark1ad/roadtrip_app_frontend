(function() {

  /* Creates Angular controller 'landingController' */
  angular
    .module('roadtripApp')
    .controller('landingController', landingController);

  /* Dependency injection */
  landingController.$inject = ['$http'];

  /* Controller constructor function */
  function landingController($http) {

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
    vm.foo = 'this is the landing page show!!! welcome'


    // Function declarations //

  }

})();
