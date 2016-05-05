app.controller('loginController', ['$scope', '$http', 'server', 'localStorageService', loginController]);

function loginController($scope, $http, server, localStorageService){
  var vm = this;

  vm.user = {};
  vm.user.email = 'ZBuchenau@yahoo.com';
  vm.user.password = '12345';

  vm.submit = function(){
    $http.post(server + '/users/login', vm.user)
      .then(onSuccess, onFailure)
      .catch(function(err){
        console.log(err);
      });

      function onSuccess(response){

        var token = response.data.token;

        localStorageService.set('fiveWeightAdmin', token);
      }

      function onFailure(response){
        localStorageService.remove('fiveWeightAdmin');
        $location.path('/login');
      }
  };
}
