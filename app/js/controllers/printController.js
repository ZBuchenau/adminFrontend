app.controller('printController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', printController]);

function printController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;
  console.log("PRINT CONTROLLER");


  vm.mediaPlan = mediaPlanService.mediaPlan;
  vm.info = mediaPlanService.mediaPlanInfo;
  vm.providerSpends = mediaPlanService.providerObj;
  // console.log(vm.mediaPlan);
  // console.log(vm.info);
  console.log(vm.providerSpends);



}
