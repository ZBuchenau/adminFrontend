app.controller('adminController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', adminController]);

function adminController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;

  vm.accounts = [];

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

        // console.log(vm.accounts);
        // console.log("Success!!!!!");
        deferred.resolve(vm.accounts);
      });

    return deferred.promise;
  };

  vm.tacticGetter = function() {
    vm.plan = [];

  };


  vm.mediaPlanGetter()
    .then(function(response) {
      console.log("MEDIA PLANS RETRIEVED: ", response);
    });

  // console.log(server);

  vm.access = true;
  vm.toggle = false;
  // vm.data = [12, 34, 216, 52, 63, 11, 21, 31, 45, 68, 67];
  vm.data = [1, 2, 3];


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
    providerName: '',
    tacticName: '',
    tacticSpend: '',
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
  vm.clientCreate = function() {
    vm.access = true;
  };

  vm.selectItemChanged = function(item) {

    // console.log(item);
    // console.log(vm.selectedItem);
    if (!vm.selectedItem) {
      vm.access = true;
      vm.mediaPlan = {
        clientName: '',
        clientMonthlyBudget: '',
        year: '',
      };
    } else {
      vm.access = false;
      var client = vm.selectedItem;
      console.log(client);
      vm.mediaPlan.id = client;
      vm.listingTactic.mediaPlan = client;
      vm.flatFeeTactic.mediaPlan = client;
      vm.emailTactic.mediaPlan = client;
      vm.cpmTactic.mediaPlan = client;
      vm.ppcTactic.mediaPlan = client;

      mediaPlanService.getItems(server + '/users/mediaPlans/allTactics', {
          mediaPlanId: vm.selectedItem
        })
        .then(function(response) {
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
            console.log(vm.mediaPlan);
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
        vm.ppcTactic.providerName = '';
        vm.ppcTactic.tacticName = '';
        vm.ppcTactic.tacticSpend = '';
        vm.officialMediaPlan[0].push(response);
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
        vm.officialMediaPlan[1].push(response);
      });
  };


  vm.emailTacticSubmit = function() {
    console.log(vm.emailTactic);

    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/emailTactics', vm.emailTactic)
      .then(function(response) {
        vm.emailTactic.providerName = '';
        vm.emailTactic.tacticName = '';
        vm.emailTactic.tacticSpend = '';
        vm.officialMediaPlan[3].push(response);
      });
  };


  vm.flatFeeTacticSubmit = function() {
    console.log(vm.flatFeeTactic);

    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/flatFeeTactics', vm.flatFeeTactic)
      .then(function(response) {
        vm.flatFeeTactic.providerName = '';
        vm.flatFeeTactic.tacticName = '';
        vm.flatFeeTactic.tacticSpend = '';
        vm.officialMediaPlan[4].push(response);
      });
  };


  vm.listingTacticSubmit = function() {
    console.log(vm.listingTactic);

    mediaPlanService.tacticSubmit(server + '/users/mediaPlans/listingTactics', vm.listingTactic)
      .then(function(response) {
        vm.listingTactic.providerName = '';
        vm.listingTactic.tacticName = '';
        vm.listingTactic.tacticSpend = '';
        vm.officialMediaPlan[2].push(response);
      });
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
