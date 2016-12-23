app.controller('reportController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', reportController]);

function reportController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;

  vm.newReport = {};

  mediaPlanService.pullMedia(server + '/clients')
    .then(function(response){
      vm.clientList = response.data;
  });

  vm.createReport = function(item){
    console.log(item);
    mediaPlanService.tacticSubmit(server + '/reports', item)
      .then(function(response){
        console.log(response);
        if(response !== false){
          console.log('success');
          vm.newReport = {};
        } else {
          alert('CHECK CLIENT FORM FOR ERRORS...');
        }
      });
  };

}
