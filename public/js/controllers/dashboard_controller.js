(function() {

  /* Creates Angular controller 'dashController' */
  angular
    .module('roadtripApp')
    .controller('dashController', dashController);

  /* Dependency injection */
  dashController.$inject = ['$http'];

  /* Controller constructor function */
  function dashController($http) {

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
    vm.foo = 'this is the dashboard show!!!'

    // Function declarations //

  }

})();
