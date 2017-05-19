(function() {

  /* Creates Angular controller 'MainController' */
  angular
    .module('roadtripApp')
    .controller('MainController', MainController);

  /* Dependency injection */
  MainController.$inject = ['$http', '$scope'];

  /* Controller constructor function */
  function MainController($http, $scope) {

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
    vm.getUsers = getUsers;
    vm.addCityInputField = addCityInputField;
    vm.closeCityInputField = closeCityInputField;
    vm.clearCityInputFields = clearCityInputFields;
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

    /* Add a city input field */
    function addCityInputField() {
      var addOne = vm.cityInputFields[vm.cityInputFields.length - 1] + 1;
      vm.cityInputFields.push(addOne);
      console.log(vm.cityInputFields);
    }

    /* Close a city input field */
    function closeCityInputField(index) {
      if (vm.cityInputFields.length > 1) {
        vm.cityInputFields.splice(index, 1);
      }
      console.log(vm.cityInputFields);
    }

    /* Clear all city input fields */
    function clearCityInputFields() {
      vm.cityInputFields = [0];
    }

  }

})();
