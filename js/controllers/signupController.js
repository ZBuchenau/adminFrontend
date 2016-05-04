app.controller('signupController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', signupController]);

function signupController($scope, $http, server, localStorageService, $q, $location) {
  var vm = this;

  vm.user = {};
  vm.user.firstName = 'Zach';
  vm.user.lastName = 'Buchenau';
  vm.user.userName = 'ZBuchenau';
  vm.user.password = '12345';
  vm.user.email = 'ZBuchenau@yahoo.com';

  vm.submit = function(){

    $http.post(server + '/users/signup', vm.user)
      .then(onSuccess, onFailure)
      .then(function(response){
        $location.path('/admin');
      })
      .catch(function(err){
        console.log(err);
      });

      function onSuccess(response){

        var token = response.data;

        localStorageService.set('fiveWeightAdmin', token);

      }


      function onFailure(response){

        console.log('POST REQUEST FAILED');

      }
  };


}
