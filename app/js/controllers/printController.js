app.controller('printController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', printController]);

function printController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;
  console.log("PRINT CONTROLLER");

  vm.ppcShow = true;
  vm.cpmShow = true;
  vm.listingsShow = true;
  vm.emailShow = true;
  vm.flatFeeShow = true;


  function sortObject(obj) {
    var arr = [];
    var prop;
    for (prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        arr.push({
          'key': prop,
          'value': obj[prop]
        });
      }
    }
    arr.sort(function(a, b) {
      return a.value - b.value;
    });
    return arr; // returns array
  }


  vm.mediaPlan = mediaPlanService.mediaPlan;
  vm.info = mediaPlanService.mediaPlanInfo;
  vm.providerSpends = mediaPlanService.providerObj;
  // console.log(vm.mediaPlan);
  console.log(vm.info);
  console.log(vm.providerSpends);




  var list = vm.providerSpends;
  vm.providerArr = sortObject(list);
  console.log(vm.providerArr);

}
