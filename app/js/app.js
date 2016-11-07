var app = angular.module('fiveWeightAdmin', ['ngRoute', 'LocalStorageModule', 'd3']);

app.constant('server', 'http://localhost:3000');
// app.constant('server', 'https://fiveweightadmin.herokuapp.com');

app.run(function($rootScope, $location, $route, authService, localStorageService) {
  $rootScope.$on('$routeChangeStart',
    function(event, next, current) {
      authService.checkToken()
        .then(function(response) {
          console.log(response);
          if (response === true && next.access.restricted) {
            authService.getUserStatus(localStorageService.get('fiveWeightAdmin'))
              .then(function(response) {
                if (response) {
                  console.log('You have been granted access!');
                  $location.path(next.originalPath);
                } else if (response) {
                  console.log('RESTRICTED... LOG BACK IN!');
                  event.preventDefault();
                } else {
                  console.log('app.js: line 20');
                  $location.path(next.originalPath);
                }
              });
          } else if (!response && next.access.restricted) {
            console.log('That path is Restricted! User Must Sign Up.');
            $location.path('/');
          } else if(!response && !next.access.restricted) {
            $location.path(next.originalPath);
          }

        });

    });
});
