app.controller('homeController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', homeController]);

function homeController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {

  var vm = this;

  vm.userExists = '';

  vm.signUpShow = false;
  vm.logInShow = false;


  vm.user = {};

  vm.submitSignUp = function() {

    $scope.error = false;
    $scope.disabled = true;

    authService.signup(vm.user.firstName, vm.user.lastName, vm.user.userName, vm.user.password, vm.user.email)
      .then(function(response) {
        if (response !== false) {
          $location.path('/admin');
          $scope.disabled = false;
        } else {
          $location.path('/');
        }
      })
      .catch(function(err) {
        $scope.disabled = false;
        vm.error = true;
        vm.errorMessage = "Invalid Username and/or Password";
      });
  };


  vm.submitLogin = function() {

    $scope.error = false;
    $scope.disabled = true;

    authService.login(vm.user.email, vm.user.password)
      .then(function() {
        $location.path('/admin');
        $scope.disabled = false;
      })
      .catch(function(err) {
        vm.error = true;
        vm.errorMessage = "Invalid Username and/or Password";
      });

  };
}
