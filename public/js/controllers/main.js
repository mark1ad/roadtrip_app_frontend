(function() {

  /* Creates Angular controller 'MainController' */
  angular
    .module('roadtripApp')
    .controller('MainController', MainController);

  /* Dependency injection */
  MainController.$inject = ['$http'];

  /* Controller constructor function */
  function MainController($http) {

    /* Helper variables */
    const URL = 'http://localhost:3000/';
    const vm = this;

    /* Controller properties */
    vm.getUsers = getUsers;
    vm.addCityInputField = addCityInputField;
    vm.closeCityInputField = closeCityInputField;
    vm.view = 1;
    vm.isDropdownActive = false;
    vm.cityInputFields = [0];

    /* Initialization */
    activate();

    // Function declarations //

    /* Initialization function */
    function activate() {
      vm.getUsers();
    }

    /* Gets user data from Rails server */
    function getUsers() {
      $http(request('users'))
      .then(function(response) {
        console.log(response);
      });
    }

    /* Creates $http request object */
    function request(route = '', method = 'GET', data = null) {
      return {
        method: method,
        url: URL + route,
        data: data
      };
    }

    /* Add another city input field */
    function addCityInputField() {
      var addOne = vm.cityInputFields[vm.cityInputFields.length - 1] + 1;
      vm.cityInputFields.push(addOne);
      console.log(vm.cityInputFields);
    }

    /* Close one city input field */
    function closeCityInputField() {
      if (vm.cityInputFields.length > 1) {
        vm.cityInputFields.pop();
      }
      console.log(vm.cityInputFields);
    }

  }

})();
