app.controller('adminController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', adminController]);

function adminController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;

  vm.mediaPlanShow = false;
  vm.showEditPPC = false;
  vm.showEditCPM = false;
  vm.showEditListing = false;
  vm.showEditEmail = false;
  vm.showEditFlatFee = false;



  //----------RETRIEVE MEDIA PLANS TO POPULATE DROPDOWN MENU----------
  vm.mediaPlanGetter = function() {
    var deferred = $q.defer();
    vm.accounts = [];
    mediaPlanService.pullMedia(server + '/users/mediaPlans/plans')
      .then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
          vm.accounts.push({
            name: response.data[i].name,
            id: response.data[i].media_plan_id
          });
        }
        deferred.resolve(vm.accounts);
      });
    return deferred.promise;
  };

  vm.mediaPlanGetter()
    .then(function(response) {
      console.log("MEDIA PLANS RETRIEVED: ", response);
    });

  //----------SUBMIT NEW CLIENT----------
  vm.clientSubmit = function(item){
    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/clientInfo', item)
      .then(function(response){
        console.log(response);
        if(response === false){
          alert('A MEDIA PLAN WITH THIS NAME ALREADY EXISTS!');
        } else {
          vm.mediaPlanGetter()
            .then(function(response) {
              console.log("MEDIA PLANS RETRIEVED: ", response);
            });
          //TODO: repopulate form with new client
        }
      });
  };

  vm.clientEdit = function(item){
    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/clientEdit', item)
    .then(function(response){
      console.log(response);
      if(response === false){
        alert('A MEDIA PLAN WITH THIS NAME ALREADY EXISTS!');
      } else {
        vm.mediaPlanGetter()
          .then(function(response) {
            console.log("MEDIA PLANS RETRIEVED: ", response);
          });
        //TODO: repopulate form with new client
      }
    });
  };

  //----------SHOW WHETHER OR NOT THE SPEND IS OVER OR UNDER BUDGET----------
  vm.spendRelations = function(){
    vm.data = [];

    if(vm.cumulativeSpend){
      if(vm.spendDelta > 0){
        vm.spendToBudget = "SPEND = $" + vm.cumulativeSpend.toLocaleString() + " ($" + vm.spendDelta.toLocaleString() + " Remaining In Budget)";
        vm.underBudget = true;
        vm.overBudget = false;
      } else {
        vm.spendToBudget = "$" + (vm.spendDelta * - 1).toLocaleString() + " Over Budget!";
        vm.overBudget = true;
        vm.underBudget = false;
      }
    } else {
      vm.spendToBudget = '';
    }
  };

  vm.data = [];


  //----------CLIENT MEDIA PLAN OBJECT----------
  vm.mediaPlan = {
    clientName: '',
    clientMonthlyBudget: '',
    year: '',
  };

  //----------NG-MODEL OBJECTS FOR TACTICS----------
  vm.ppcTactic = {
    tacticType: 'ppc'
  };

  vm.cpmTactic = {
    tacticType: 'cpm'
  };

  vm.emailTactic = {
    tacticType: 'email'
  };

  vm.flatFeeTactic = {
    tacticType: 'flat_fee'
  };

  vm.listingTactic = {
    tacticType: 'listings'
  };

  //----------MEDIA PLAN DROPDOWN SELECTOR FUNCTION----------
  vm.selectItemChanged = function(item) {

    if (!vm.selectedItem) {
      vm.officialMediaPlan = '';
      vm.mediaPlanShow = false;
      vm.mediaPlan = {
        clientName: '',
        clientMonthlyBudget: '',
        year: '',
      };
      vm.clientSubmitButton = false;

    } else {
      vm.mediaPlanShow = true;
      vm.clientSubmitButton = true;

      var client = vm.selectedItem;
      console.log('CLIENT = ', client);
      vm.mediaPlan.id = client;
      vm.listingTactic.mediaPlan = client;
      vm.flatFeeTactic.mediaPlan = client;
      vm.emailTactic.mediaPlan = client;
      vm.cpmTactic.mediaPlan = client;
      vm.ppcTactic.mediaPlan = client;

      mediaPlanService.reloadTactics(server + '/users/mediaPlans/allTactics', {
          mediaPlanId: vm.selectedItem
        }).then(function(response) {
          vm.officialMediaPlan = response.data;
          var id = response.config.data.mediaPlanId;
          mediaPlanService.getItems(server + '/users/mediaPlans/titles', {
            mediaPlanId: id
          }).then(function(response) {
            var data = response.data;
            vm.mediaPlan = {
              mediaPlanId: data.media_plan_id,
              clientName: data.name,
              clientMonthlyBudget: parseInt(data.monthly_budget, 10),
              year: parseInt(data.year, 10)
            };
            mediaPlanService.doubleLooper(vm.officialMediaPlan, vm.data);
          }).then(function(response){
            var budget = vm.mediaPlan.clientMonthlyBudget;
            var obj = vm.data;
            var item = 'monthly_spend';
            mediaPlanService.spendDelta(budget, obj, item)
              .then(function(response){
                // console.log(response);
                vm.cumulativeSpend = response.spend;
                vm.spendDelta = response.delta;
                // console.log(vm.cumulativeSpend);
                // console.log(vm.spendDelta);
              }).then(function(){
                vm.spendRelations();
              }).catch(function(error){
                console.log(error);
              });
          });
        }).catch(function(error) {
          console.log(error);
        });
    }
  };


// =============================================================================
// TACTIC HANDLERS
// =============================================================================

//----------FORM CLEARING FUNCTION----------
  vm.resetForm = function(formModel){
    // console.log(formModel.toString());
    vm[formModel].providerName = null;
    vm[formModel].tacticName = null;
    vm[formModel].tacticSpend = null;
    if (formModel === 'cpmTactic'){
      vm[formModel].cost_per_thousand = null;
    } else if (formModel === 'listingTactic'){
      vm[formModel].communities = null;
    } else if (formModel === 'emailTactic'){
      vm[formModel].emails_per_year = null;
    }
  };

//----------SHOW/HIDE "+ NEW TACTIC" FORMS----------
  vm.ppcFormShow = false;
  vm.cpmFormShow = false;
  vm.listingFormShow = false;
  vm.emailFormShow = false;
  vm.flatFeeFormShow = false;

  //----------ADD NEW TACTIC----------
  vm.submitNewTactic = function(item, formName){
    //submit data to database
    // console.log(item);
    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/submitTactic', item)
      .then(function(response){
        // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^', response);
        //run function to re-populate tactics in media plans
        if(response !== false){
          vm.officialMediaPlan = response;
          vm.resetForm(formName);
        } else {
          alert('This Tactic Already Exists In The Database!!');
        }
      });
  };

  //----------EDIT TACTIC----------
  vm.ppcEdit = {};
  vm.cpmEdit = {};
  vm.listingsEdit = {};
  vm.emailEdit = {};
  vm.flatFeeEdit = {};

  vm.editTactic = function(item, type){
      console.log(type + ':::::::::::::::::Edit');
      if(type === 'ppc'){
        // vm.showEditPPC = !vm.showEditPPC;
        vm.ppcEdit = angular.copy(item);
      } else if (type === 'cpm'){
        // vm.showEditCPM = !vm.showEditCPM;
        vm.cpmEdit = angular.copy(item);
        console.log("^^^^^^^^^^^^^^^", vm.cpmEdit);
      } else if (type === 'listing'){
        // vm.showEditListing = !vm.showEditListing;
        vm.listingsEdit = angular.copy(item);
      } else if (type === 'email'){
        // vm.showEditEmail = !vm.showEditEmail;
        vm.emailEdit = angular.copy(item);
      } else if (type === 'flatFee'){
        // vm.showEditFlatFee = !vm.showEditFlatFee;
        vm.flatFeeEdit = angular.copy(item);
      }
  };

  vm.editTacticSubmit = function(item, type){
    console.log('THIS IS THE ITEM!!!!!!!!!', item);
    item.tacticType = type;
    mediaPlanService.tacticSubmit(server + '/users/tactics/edit', item)
    .then(function(response){
      console.log(response);
      if(response !== false){
        vm.officialMediaPlan = response;
      }
    });
  };

  //----------DELETE TACTIC----------
  vm.deleteTactic = function(item, type){
    // console.log(item);
    // console.log(type);
    mediaPlanService.deleteTacticAlert('Are you sure you want to DELETE this tactic?')
    .then(function(response){
      if(response === true){
        mediaPlanService.tacticPost(server + '/users/tactics/delete', item, type)
          .then(function(response){
            vm.officialMediaPlan = response.data;
          });
      } else {
        console.log("DELETE TACTIC CANCELLED");
      }
    });
  };

  //----------LOGOUT----------
  vm.logout = function() {
    authService.logout()
      .then(function(response) {
        $location.path('/');
        console.log('User is now logged out!');
      });
  };


}
