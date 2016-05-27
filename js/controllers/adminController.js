app.controller('adminController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', adminController]);

function adminController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService){
  var vm = this;

  vm.accounts = [];

  vm.mediaPlanGetter = function(){
    vm.accounts = [];
    mediaPlanService.pullMedia(server + '/users/mediaPlans/plans')
      .then(function(response){

        for(var i = 0; i < response.data.length; i++){
          vm.accounts.push({
            name: response.data[i].name,
            id: response.data[i].media_plan_id
          });
        }

        console.log(vm.accounts);
        console.log("Success!!!!!");
      });
  };

  vm.tacticGetter = function(){
    vm.plan = [];

  };


    vm.mediaPlanGetter();

  // console.log(server);

  vm.access=true;
  vm.toggle = false;
  vm.data = [12,34,216,52,63,11,21,31,45,68,67];


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
    // mediaPlan: vm.mediaPlan.clientName,
    type: 'ppc',
    providerName : '',
    tacticName : '',
    tacticSpend : '',
  };

  vm.cpmTactic = {
    // mediaPlan: vm.mediaPlan.clientName,
    type: 'cpm',
    providerName: '',
    tacticName: '',
    contractedImpressions: '',
    tacticSpend: '',
  };

  vm.emailTactic = {
    // mediaPlan: vm.mediaPlan.clientName,
    type: 'email',
    providerName: '',
    tacticName: '',
    tacticSpend: '',
  };

  vm.flatFeeTactic = {
    // mediaPlan: vm.mediaPlan.clientName,
    type: 'flatFee',
    providerName: '',
    tacticName: '',
    tacticSpend: '',
  };

  vm.listingTactic = {
    // mediaPlan: vm.mediaPlan.clientName,
    type: 'listing',
    providerName: '',
    tacticName: '',
    tacticSpend: '',
  };

  //==============================================================================
  // TACTIC / MEDIA-PLAN-INFO SELECT FUNCTIONS
  //==============================================================================
  vm.clientSelect = function(){
    vm.access = false;
  };

  vm.selectItemChanged = function(item){
    console.log(vm.selectedItem);
    vm.access = false;
    var client = vm.selectedItem;
    vm.mediaPlan.id = client;
    vm.listingTactic.mediaPlan = client;
    vm.flatFeeTactic.mediaPlan = client;
    vm.emailTactic.mediaPlan = client;
    vm.cpmTactic.mediaPlan = client;
    vm.ppcTactic.mediaPlan = client;

    console.log(vm.ppcTactic);

    mediaPlanService.pullTactic(server + '/users/mediaPlans/allTactics', {mediaPlanId: vm.selectedItem})
      .then(function(response){
        console.log("*************", response.data);
      })
      .catch(function(error){
        console.log(error);
      });
  };


  //==============================================================================
  // TACTIC / MEDIA-PLAN-INFO SUBMIT FUNCTIONS
  //==============================================================================

  vm.clientSubmit = function(){
    vm.access = false;

    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/clientInfo', vm.mediaPlan)
      .then(function(data){
        console.log(data[0]);
        var client = data[0].media_plan_id;
        vm.listingTactic.mediaPlan = client;
        vm.flatFeeTactic.mediaPlan = client;
        vm.emailTactic.mediaPlan = client;
        vm.cpmTactic.mediaPlan = client;
        vm.ppcTactic.mediaPlan = client;

        mediaPlanService.pullMedia(server + '/users/mediaPlans/plans')
          .then(function(response){
            // console.log(response);
            vm.mediaPlanGetter();
            console.log("Success!!!!!");
            console.log(vm.ppcTactic);
          });
      });

      // console.log(vm.listingTactic, vm.flatFeeTactic, vm.emailTactic, vm.cpmTactic, vm.ppcTactic);
  };


  vm.ppcTacticSubmit = function(){
    console.log(vm.ppcTactic);
    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/ppcTactics', vm.ppcTactic)
      .then(function(response){
        vm.ppcTactic.providerName = '';
        vm.ppcTactic.tacticName = '';
        vm.ppcTactic.tacticSpend = '';
      });
  };


  vm.cpmTacticSubmit = function(){
    console.log(vm.cpmTactic);

    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/cpmTactics', vm.cpmTactic)
    .then(function(response){
      vm.cpmTactic.providerName = '';
      vm.cpmTactic.tacticName = '';
      vm.cpmTactic.contractedImpressions = '';
      vm.cpmTactic.tacticSpend = '';
    });
  };


  vm.emailTacticSubmit = function(){
    console.log(vm.emailTactic);

    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/emailTactics', vm.emailTactic)
    .then(function(response){
      vm.emailTactic.providerName = '';
      vm.emailTactic.tacticName = '';
      vm.emailTactic.tacticSpend = '';
    });
  };


  vm.flatFeeTacticSubmit = function(){
    console.log(vm.flatFeeTactic);

    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/flatFeeTactics', vm.flatFeeTactic)
    .then(function(response){
      vm.flatFeeTactic.providerName = '';
      vm.flatFeeTactic.tacticName = '';
      vm.flatFeeTactic.tacticSpend = '';
    });
  };


  vm.listingTacticSubmit = function(){
    console.log(vm.listingTactic);

    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/listingTactics', vm.listingTactic)
    .then(function(response){
      vm.listingTactic.providerName = '';
      vm.listingTactic.tacticName = '';
      vm.listingTactic.tacticSpend = '';
    });
  };


  //==============================================================================
  // LOGOUT FUNCTION
  //==============================================================================
  vm.logout = function(){
    authService.logout()
      .then(function(response){
        $location.path('/login');
        console.log('User is now logged out!');
      });
  };
}
