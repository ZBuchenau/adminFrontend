app.controller('clientController', ['$scope', 'd3Service', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', clientController]);

function clientController($scope, d3Service, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;

  
  //----------LOGOUT----------
  vm.logout = function() {
    authService.logout()
      .then(function(response) {
        $location.path('/');
        console.log('User is now logged out!');
      });
  };

}
