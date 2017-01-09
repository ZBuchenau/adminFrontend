app.controller('reportController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', reportController]);

function reportController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;

  vm.clientReports = {};
  vm.newReport = {};
  vm.reportListShow = true;
  vm.reportButtonShow = false;

  vm.pullClientReports = function(){
    mediaPlanService.pullMedia(server + '/clients')
      .then(function(response){
        vm.clientList = response.data;
        console.log('vm.clientList: ', vm.clientList);
        for(var i = 0; i < vm.clientList.length; i++){
          var prop = vm.clientList[i].client_name;
          var nameValue = vm.clientList[i].report_name;
          if(!vm.clientReports.hasOwnProperty(prop)){
            vm.clientReports[prop] = {};
            vm.clientReports[prop][nameValue] = vm.clientList[i].id;
            vm.clientReports[prop].clientId = vm.clientList[i].client_fk;
          } else {
            vm.clientReports[prop][nameValue] = vm.clientList[i].id;
          }
        }
        console.log('vm.clientReports: ', vm.clientReports);
    });
  };
  vm.pullClientReports();


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
      }).then(function(){
        vm.pullClientReports();
      });
  };

}
