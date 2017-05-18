(function() {

  /* Creates Angular controller 'tripController' */
  angular
    .module('roadtripApp')
    .controller('tripController', tripController);

  /* Dependency injection */
  tripController.$inject = ['$http'];

  /* Controller constructor function */
  function tripController($http) {

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
    vm.foo = 'this is the road trip show!!!'

    // Function declarations //

  }

})();
