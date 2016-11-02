app.controller('checkController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', checkController]);

function checkController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;

  vm.accounts = [];

  mediaPlanService.pullMedia(server + '/users/mediaPlans/plans')
    .then(function(response){
      console.log(response);
      for (var i = 0; i < response.data.length; i++) {
        vm.accounts.push({
          name: response.data[i].name,
          id: response.data[i].media_plan_id
        });
      }
      console.log(vm.accounts);
    });

  vm.selectItemChanged = function(){
    vm.mediaPlan = [];
    console.log(vm.selectedItem);
    mediaPlanService.getItems(server + '/users/mediaPlans/allTactics', {
      mediaPlanId: vm.selectedItem
    }).then(function(response){
      // console.log(response.data);
      vm.mediaPlan = response.data;
      console.log(vm.mediaPlan);
      
      //TODO figure out how to push the proper data to an
      //array to be ng-repeated...

    });
  };

}
