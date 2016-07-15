app.controller('adminController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', adminController]);

function adminController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;

// =============================================================================
// GET THE MEDIA PLANS TO PLACE IN THE DROPDOWN MENU
// =============================================================================
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


  // =============================================================================
  // SHOW WHETHER OR NOT THE SPEND IS OVER OR UNDER BUDGET
  // =============================================================================
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
  vm.access = true;
  vm.toggle = false;
  vm.data = [];


  //==============================================================================
  // TITLE DATA TO BE PUSHED TO THE DATABASE AND USED IN TACTIC SUBMISSION
  //==============================================================================
  vm.mediaPlan = {
    clientName: '',
    clientMonthlyBudget: '',
    year: '',
  };

  //==============================================================================
  // NG-MODEL OBJECTS TO BE PUSHED TO DATABASE
  //==============================================================================
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

  //==============================================================================
  // MEDIA PLAN SELECTION FROM DROPDOWN
  //==============================================================================
  vm.selectItemChanged = function(item) {

    if (!vm.selectedItem) {
      vm.officialMediaPlan = '';
      vm.mediaPlan = {
        clientName: '',
        clientMonthlyBudget: '',
        year: '',
      };
    } else {
      var client = vm.selectedItem;
      vm.mediaPlan.id = client;
      vm.listingTactic.mediaPlan = client;
      vm.flatFeeTactic.mediaPlan = client;
      vm.emailTactic.mediaPlan = client;
      vm.cpmTactic.mediaPlan = client;
      vm.ppcTactic.mediaPlan = client;

      mediaPlanService.reloadTactics(server + '/users/mediaPlans/allTactics', {
          mediaPlanId: vm.selectedItem
        }).then(function(response) {
          console.log("*************", response.data);

          vm.officialMediaPlan = response.data;

          var id = response.config.data.mediaPlanId;
          mediaPlanService.getItems(server + '/users/mediaPlans/titles', {
            mediaPlanId: id
          }).then(function(response) {
            var data = response.data;
            console.log("THIS IS THE DATA >>>>>", data);
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

// *******************************************************************************
//  Re-Starting Here
// *******************************************************************************

// =============================================================================
// CLEAR A FORM ON SUBMISSION
// =============================================================================
  vm.resetForm = function(formModel){
    console.log(formModel.toString());
    if(formModel !== 'cpmTactic'){
      console.log(vm[formModel]);
      vm[formModel].providerName = null;
      vm[formModel].tacticName = null;
      vm[formModel].tacticSpend = null;
    } else if (formModel === 'cpmTactic'){
      console.log(vm[formModel]);
      vm[formModel].providerName = null;
      vm[formModel].tacticName = null;
      vm[formModel].tacticSpend = null;
      vm[formModel].contractedImpressions = null;
    }
  };

// =============================================================================
// ADD A NEW TACTIC TO A MEDIA PLAN
// =============================================================================
  vm.flatFeeFormShow = false;

  vm.submitNewTactic = function(item, formName){
    //submit data to database
    console.log(item);
    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/submitTactic', item)
      .then(function(response){
        //run function to re-populate tactics in media plans
        console.log(response);
        // vm.resetForm(formName);
      });
    //clear the form after submission to prepare it for a new entry

  };

  //==============================================================================
  // LOGOUT FUNCTION
  //==============================================================================
  vm.logout = function() {
    authService.logout()
      .then(function(response) {
        $location.path('/login');
        console.log('User is now logged out!');
      });
  };
}
