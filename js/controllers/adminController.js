app.controller('adminController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', adminController]);

function adminController($scope, $http, server, localStorageService, $q, $location, authService){
  var vm = this;

//==============================================================================
// DATA TO BE USED IN PIE GRAPH
//==============================================================================
  vm.mediaPlan = [{
    clientName: '',
    clientMonthlyBudget: 0,
    year: '',
  }];

  //==============================================================================
  // NG-MODELS TO BE PUSHED TO mediaPlan ARRAY
  //==============================================================================
  vm.ppcTactic = {
    type: 'ppc',
    providerName : '',
    tacticName : '',
    contractedClicks : 0,
    tacticSpend : 0,
  };

  vm.cpmTactic = {
    type: 'cpm',
    providerName: '',
    tacticName: '',
    contractedImpressions: '',
    tacticSpend: '',
  };

  vm.emailTactic = {
    type: 'email',
    providerName: '',
    tacticName: '',
    tacticSpend: '',
  };

  vm.flatFeeTactic = {
    type: 'flatFee',
    providerName: '',
    tacticName: '',
    tacticSpend: '',
  };

  vm.listingTactic = {
    type: 'listing',
    providerName: '',
    tacticName: '',
    tacticSpend: '',
  };

  //==============================================================================
  // TACTIC SUBMIT FUNCTIONS
  //==============================================================================
  vm.clientSubmit = function(){
    console.log(vm.mediaPlan);
  };

  vm.ppcTacticSubmit = function(){
    vm.mediaPlan.push(vm.ppcTactic);
    console.log(vm.mediaPlan);
    vm.ppcTactic = {
      providerName : '',
      tacticName : '',
      contractedClicks : 0,
      tacticSpend : 0,
    };
  };

  vm.cpmTacticSubmit = function(){
    vm.mediaPlan.push(vm.cpmTactic);
    console.log(vm.mediaPlan);
    vm.cpmTactic = {
      type: 'cpm',
      contractedImpressions: '',
      contractedSpend: '',
    };
  };

  vm.emailTacticSubmit = function(){
    vm.mediaPlan.push(vm.emailTactic);
    console.log(vm.mediaPlan);
    vm.emailTactic = {
      type: 'email',
      providerName: '',
      tacticName: '',
      tacticSpend: '',
    };
  };

  vm.flatFeeTacticSubmit = function(){
    vm.mediaPlan.push(vm.flatFeeTactic);
    console.log(vm.mediaPlan);
    vm.flatFeeTactic = {
      type: 'flatFee',
      providerName: '',
      tacticName: '',
      tacticSpend: '',
    };
  };

  vm.listingTacticSubmit = function(){
    vm.mediaPlan.push(vm.listingTactic);
    console.log(vm.mediaPlan);
    vm.listingTactic = {
      type: 'listing',
      providerName: '',
      tacticName: '',
      tacticSpend: '',
    };
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
