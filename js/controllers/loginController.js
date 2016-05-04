app.controller('loginController', ['$scope', '$http', 'server', 'localStorageService', loginController]);

function loginController($scope, $http, server, localStorageService){
  var vm = this;

  vm.user = {};
  vm.user.email = 'ZBuchenau@yahoo.com';
  vm.user.password = '12345';

  vm.submit = function(){
    $http.post(server + '/users/login', vm.user);
  };
}
