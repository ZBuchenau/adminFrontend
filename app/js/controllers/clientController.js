app.controller('clientController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', clientController]);

function clientController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;

  vm.clientFormShow = false;

  vm.newClient = {};

  vm.submitClient = function(item){
    console.log(item);
  };
}
