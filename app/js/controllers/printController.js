app.controller('printController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', printController]);

function printController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
    var vm = this;

    vm.mediaPlan = mediaPlanService.mediaPlan;
    vm.info = mediaPlanService.mediaPlanInfo;
    console.log(vm.mediaPlan);
    console.log(vm.info);
}
