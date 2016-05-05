
app.controller('loginController', ['$scope', '$http', 'server', 'localStorageService', 'authService', '$location', loginController]);

function loginController($scope, $http, server, localStorageService, authService, $location){
  var vm = this;

  vm.user = {};
  vm.user.email = 'ZBuchenau@yahoo.com';
  vm.user.password = '12345';

  vm.submit = function(){

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


    // $http.post(server + '/users/login', vm.user)
    //   .then(onSuccess, onFailure)
    //   .catch(function(err){
    //     console.log(err);
    //   });
    //
    //   function onSuccess(response){
    //
    //     var token = response.data.token;
    //
    //     localStorageService.set('fiveWeightAdmin', token);
    //   }
    //
    //   function onFailure(response){
    //     localStorageService.remove('fiveWeightAdmin');
    //     $location.path('/login');
    //   }
  };
}

// STOP UNDOING WHEN THIS SHOWS UP IF YOU HAVE TO GO BACK... AT THIS POINT, WE ARE WORKING 90%
