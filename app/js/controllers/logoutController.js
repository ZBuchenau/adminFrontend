
app.controller('logoutController', ['$scope', '$http', 'server', 'localStorageService', logoutController]);

function logoutController($scope, $http, server, localStorageService){
  var vm = this;

  authService.logout()
    .then(function(){
      $location.path('/');
    });

}
