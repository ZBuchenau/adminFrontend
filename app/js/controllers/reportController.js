app.controller('reportController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', reportController]);

function reportController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;


  mediaPlanService.pullMedia(server + '/clients')
    .then(function(response){
      vm.clientList = response.data;
  });

}
