app.controller('signupController', ['$scope', '$http', 'server', signupController]);

function signupController($scope, $http, server) {
  var vm = this;

  vm.user = {};
  vm.user.firstName = 'Zach';
  vm.user.lastName = 'Buchenau';
  vm.user.userName = 'ZBuchenau';
  vm.user.password = '12345';
  vm.user.email = 'ZBuchenau@yahoo.com';

  vm.submit = function(){
    $http.post(server + '/users/signup', vm.user);
  };


}
