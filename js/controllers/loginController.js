app.controller('loginController', ['$scope', '$http', 'server', loginController]);

function loginController($scope, $http, server){
  var vm = this;

  vm.user = {};
  vm.user.email = 'ZBuchenau@yahoo.com';
  vm.user.password = '12345';

  vm.submit = function(){
    $http.post(server + '/users/login', vm.user);
  };
}
