app.controller('adminController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', adminController]);

function adminController($scope, $http, server, localStorageService, $q, $location, authService){
  var vm = this;
  vm.mediaPlan = [];
  vm.ppcTacticShow = false;

  vm.showHidePPC = function(){
    vm.ppcTacticShow = !vm.ppcTacticShow;
  };
  vm.ppcTactic = {
    providerName : '',
    tacticName : '',
    contractedClicks : 0,
    tacticSpend : 0,
  };

  vm.tacticSubmit = function(){
    vm.mediaPlan.push(vm.ppcTactic);
    console.log(vm.mediaPlan);
    vm.ppcTactic = {
      providerName : '',
      tacticName : '',
      contractedClicks : 0,
      tacticSpend : 0,
    };
  };

  vm.logout = function(){
    authService.logout()
      .then(function(response){
        $location.path('/login');
        console.log('User is now logged out!');
      });
  };
}
