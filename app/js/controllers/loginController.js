
app.controller('loginController', ['$scope', '$http', 'server', 'localStorageService', 'authService', '$location', loginController]);

function loginController($scope, $http, server, localStorageService, authService, $location){
  var vm = this;



  vm.submitLogin = function(){
    vm.user = {};
    vm.user.email = 'ZBuchenau@yahoo.com';
    vm.user.password = '12345';

    $scope.error = false;
    $scope.disabled = true;

    authService.login(vm.user.email, vm.user.password)
      .then(function(){
        $location.path('/admin');
        $scope.disabled = false;
      })
      .catch(function(err){
        vm.error = true;
        vm.errorMessage = "Invalid Username and/or Password";
      });

  };
}
