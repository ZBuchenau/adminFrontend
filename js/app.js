
var app = angular.module('fiveWeightAdmin', ['ngRoute', 'LocalStorageModule']);

app.constant('server', 'http://localhost:3000');

app.run(function ($rootScope, $location, $route, authService, localStorageService){
  $rootScope.$on('$routeChangeStart',
  function(event, next, current){
    event.preventDefault();
    authService.getUserStatus()
      .then(function(response){
        if(response.data === true){
          $location.path('/admin');
        } else if(next.access.restricted && authService.isLoggedIn() === false) {
          $location.path('/login');
        }
      });
  });
});
