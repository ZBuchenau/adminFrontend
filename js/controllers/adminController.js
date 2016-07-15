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
    type: 'ppc'
  };

  vm.cpmTactic = {
    type: 'cpm'
  };

  vm.emailTactic = {
    type: 'email'
  };

  vm.flatFeeTactic = {
    type: 'flatFee'
  };

  vm.listingTactic = {
    type: 'listing'
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


  //==============================================================================
  // TACTIC / MEDIA-PLAN-INFO SUBMIT FUNCTIONS
  //==============================================================================

  vm.clientSubmit = function() {
    vm.access = false;

    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/clientInfo', vm.mediaPlan)
      .then(function(data) {
        // console.log(data);
        var client = data.media_plan_id;
        vm.listingTactic.mediaPlan = client;
        vm.flatFeeTactic.mediaPlan = client;
        vm.emailTactic.mediaPlan = client;
        vm.cpmTactic.mediaPlan = client;
        vm.ppcTactic.mediaPlan = client;

        mediaPlanService.pullMedia(server + '/users/mediaPlans/plans')
          .then(function(response) {
            vm.mediaPlanGetter()
              .then(function(response) {
                console.log(vm.ppcTactic);
              });
          }).catch(function(error) {
            console.log(error);
          });
      });
  };


  vm.ppcTacticSubmit = function() {
    console.log(vm.ppcTactic);
    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/ppcTactics', vm.ppcTactic)
      .then(function(response) {
        console.log("PPC TACTIC SUBMIT RESPONSE: ", response[0]);
        vm.ppcTactic.providerName = '';
        vm.ppcTactic.tacticName = '';
        vm.ppcTactic.tacticSpend = '';

        vm.officialMediaPlan[0].push(response[0]);
        console.log(vm.officialMediaPlan[0]);
        // vm.data.push(response[0].monthly_spend);
        //
      }).then(function(response){
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
  };


  vm.cpmTacticSubmit = function() {
    console.log(vm.cpmTactic);

    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/cpmTactics', vm.cpmTactic)
      .then(function(response) {
        vm.cpmTactic.providerName = '';
        vm.cpmTactic.tacticName = '';
        vm.cpmTactic.contractedImpressions = '';
        vm.cpmTactic.tacticSpend = '';
        vm.officialMediaPlan[1].push(response[0]);
      }).then(function(response){
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
  };


  vm.emailTacticSubmit = function() {
    console.log(vm.emailTactic);

    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/emailTactics', vm.emailTactic)
      .then(function(response) {
        vm.emailTactic.providerName = '';
        vm.emailTactic.tacticName = '';
        vm.emailTactic.tacticSpend = '';
        vm.officialMediaPlan[3].push(response[0]);
      }).then(function(response){
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
  };


  vm.flatFeeTacticSubmit = function() {
    console.log(vm.flatFeeTactic);

    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/flatFeeTactics', vm.flatFeeTactic)
      .then(function(response) {
        vm.flatFeeTactic.providerName = '';
        vm.flatFeeTactic.tacticName = '';
        vm.flatFeeTactic.tacticSpend = '';
        vm.officialMediaPlan[4].push(response[0]);
      }).then(function(response){
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
  };


  vm.listingTacticSubmit = function() {
    console.log(vm.listingTactic);

    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/listingTactics', vm.listingTactic)
      .then(function(response) {
        vm.listingTactic.providerName = '';
        vm.listingTactic.tacticName = '';
        vm.listingTactic.tacticSpend = '';
        vm.officialMediaPlan[2].push(response[0]);
      }).then(function(response){
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
  };

  vm.deletePPC = function(obj){
    obj.tactic_id = 'ppc';
    console.log('****************************************', obj);
    mediaPlanService.tacticDelete(server + '/users/tactics/delete', obj)
    .then(function(response){
      console.log(response);
      var client = response.data[0];
      console.log(client);
      mediaPlanService.reloadTactics(server + '/users/mediaPlans/allTactics', client)
        .then(function(response){
          console.log(response);
        });
    });
  };

  vm.deleteCPM = function(obj){
    obj.tactic_id = 'cpm';
    console.log('****************************************', obj);
    mediaPlanService.tacticDelete(server + '/users/tactics/delete', obj);
  };

  vm.deleteListing = function(obj){
    obj.tactic_id = 'listings';
    console.log('****************************************', obj);
    mediaPlanService.tacticDelete(server + '/users/tactics/delete', obj);
  };

  vm.deleteEmail = function(obj){
    obj.tactic_id = 'email';
    console.log('****************************************', obj);
    mediaPlanService.tacticDelete(server + '/users/tactics/delete', obj);
  };

  vm.deleteFlatFee = function(obj){
    obj.tactic_id = 'flat_fee';
    console.log('****************************************', obj);
    mediaPlanService.tacticDelete(server + '/users/tactics/delete', obj)
      .then(function(response){
        console.log(response);
      });
  };

// *******************************************************************************
//  Re-Starting Here
// *******************************************************************************
  vm.resetForm = function(formModel){
    console.log(formModel.toString());
    if(formModel !== 'cpmTactic'){
      console.log(vm[formModel]);
    } else if (formModel === 'cpmTactic'){
      console.log(vm[formModel]);
    }
  };
// =============================================================================
// ADD A NEW TACTIC TO A MEDIA PLAN
// =============================================================================
  vm.flatFeeFormShow = false;

  vm.submitNewTactic = function(item, formName){
    //submit data to database
    console.log(item);
    vm.resetForm(formName);

    // if(formName === ppcTactic){
    //   vm.ppcTactic.$setPristine();
    // } else if(formName === cpmTactic){
    //   vm.cpmTactic.$setPristine();
    // } else if(formName === listingTactic){
    //   vm.listingTactic.$setPristine();
    // } else if(formName === emailTactic){
    //   vm.email.$setPristine();
    // } else if(formName === flatFeeTactic){
    //   vm.flatFeeTactic.$setPristine();
    // }
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
