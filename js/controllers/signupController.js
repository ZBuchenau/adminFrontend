
app.controller('signupController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', signupController]);

function signupController($scope, $http, server, localStorageService, $q, $location, authService) {

  var vm = this;

  vm.user = {};
  vm.user.firstName = 'Zach';
  vm.user.lastName = 'Buchenau';
  vm.user.userName = 'ZBuchenau';
  vm.user.password = '12345';
  vm.user.email = 'ZBuchenau@yahoo.com';

  vm.submit = function(){

    $scope.error = false;
    $scope.disabled = true;

    authService.signup(vm.user.firstName, vm.user.lastName, vm.user.userName, vm.user.password, vm.user.email)
      .then(function(response){
          $location.path('/login');
          $scope.disabled = false;
      })
      .catch(function(err){
        $scope.disabled = false;
        vm.error = true;
        vm.errorMessage = "Invalid Username and/or Password";
      });

    // $http.post(server + '/users/signup', vm.user)
    //   .then(onSuccess, onFailure)
    //   .catch(function(err){
    //     console.log(err);
    //   });
    //
    //   function onSuccess(response){
    //
    //     if(response.data.token){
    //
    //       var token = response.data.token;
    //       localStorageService.set('fiveWeightAdmin', token);
    //
    //       $location.path('/admin');
    //
    //     } else {
    //
    //       console.log('User already exists in the database');
    //
    //     }
    //
    //   }
    //
    //
    //   function onFailure(response){
    //
    //     console.log('POST REQUEST FAILED');
    //
    //   }
  };


}
