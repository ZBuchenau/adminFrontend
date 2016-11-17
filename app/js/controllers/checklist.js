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
    if(vm.selectedItem){
      vm.mediaPlan = [];
      // vm.showHeaders = true;
      console.log("VM.SELECTEDITEM", vm.selectedItem);
      mediaPlanService.getItems(server + '/users/mediaPlans/allTactics', {
        mediaPlanId : vm.selectedItem
      }).then(function(response){
        console.log(response);
        var info = response.data;
        for(var i = 0; i < info.length; i++){
          if(info[i].length > 0){
            for(var j = 0; j < info[i].length; j++){
              // console.log('CHECKING FOR COMMENTS', info[i][j]);
              vm.mediaPlan.push(info[i][j]);
            }
          }
        }
        if (vm.mediaPlan.length === 0){
          vm.showHeaders = false;
        } else {
          vm.showHeaders = true;
        }
        console.log(vm.mediaPlan);
      })
      .then(function(){
        mediaPlanService.getItems(server + '/users/tactics/pullcomments', {
          'media_plan_id' : vm.selectedItem
        }).then(function(response){
          console.log(response);
          vm.comments.checklist_comments = response.data;
        });
      });
    } else {
      vm.showHeaders = false;
      vm.mediaPlan = [];
      vm.comments.checklist_comments = '';
      console.log(vm.comments.checklist_comments);
    }
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
    vm.comments.media_plan_id = parseInt(vm.selectedItem);
    console.log(item);
    mediaPlanService.tacticSubmit(server + '/users/tactics/checkcomments', item)
    .then(function(response){
      console.log(response);
    });
  };


  vm.logout = function() {
    authService.logout()
      .then(function(response) {
        $location.path('/');
        console.log('User is now logged out!');
      });
  };
}
