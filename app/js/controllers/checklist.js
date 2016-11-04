app.controller('checkController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', checkController]);

function checkController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;

  vm.accounts = [];
  vm.showHeaders = false;
  vm.models = {};

  // vm.formChange = function(item){
  //   item.color = 'red';
  // };

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
    vm.showHeaders = true;
    console.log(vm.selectedItem);
    mediaPlanService.getItems(server + '/users/mediaPlans/allTactics', {
      mediaPlanId: vm.selectedItem
    }).then(function(response){
      console.log(response);
      var info = response.data;
      for(var i = 0; i < info.length; i++){
        if(info[i].length > 0){
          for(var j = 0; j < info[i].length; j++){
            vm.mediaPlan.push(info[i][j]);
          }
        }
      }
      console.log(vm.mediaPlan);

      //TODO figure out how to push the proper data to an
      //array to be ng-repeated...

    });
  };


  vm.checkSubmit = function(item, type) {
    console.log('THIS IS THE ITEM!!!!!!!!!', item);
    // item.tacticType = item.tacticType;
    mediaPlanService.tacticSubmit(server + '/users/tactics/checkedit', item)
      .then(function(response) {
        console.log(response);
        //TODO: REPOPULATE THE CHECKLIST WITH THE DATA FROM THE RESPONSE.
      });
  };
}
