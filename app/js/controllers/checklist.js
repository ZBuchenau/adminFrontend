app.controller('checkController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', checkController]);

function checkController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;

  vm.accounts = [];
  vm.showHeaders = false;
  vm.models = {};
  vm.comments = {};

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

  vm.commentSubmit = function(item){
    // console.log(vm.selectedItem);
    vm.comments.media_plan_id = parseInt(vm.selectedItem);
    console.log(vm.comments);
    // mediaPlanService.tacticSubmit(server + '/users/tactics/checkedit', item)
    // .then(function(response){
    //   console.log(response);
    // });
  };


  vm.logout = function() {
    authService.logout()
      .then(function(response) {
        $location.path('/');
        console.log('User is now logged out!');
      });
  };
}
