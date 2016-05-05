
var app = angular.module('fiveWeightAdmin', ['ngRoute', 'LocalStorageModule']);

app.constant('server', 'http://localhost:3000');

app.run(function ($rootScope, $location, $route, authService, localStorageService){
  $rootScope.$on('$routeChangeStart',
  function(event, next, current){
    if(next.access.restricted && authService.isLoggedIn() === false) {
      $location.path('/login');
    }
  });
});
