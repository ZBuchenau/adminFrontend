app.controller('adminController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', adminController]);

function adminController($scope, $http, server, localStorageService, $q, $location, authService){
  var vm = this;

  vm.logout = function(){
    authService.logout()
      .then(function(response){
        console.log(response);
        $location.path('/login');
      });
  };
}
