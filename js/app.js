var app = angular.module('fiveWeightAdmin', ['ngRoute', 'LocalStorageModule']);

app.constant('server', 'http://localhost:3000');

app.run(function($rootScope, $location, $route, authService, localStorageService) {
  $rootScope.$on('$routeChangeStart',
    function(event, next, current) {
      authService.checkToken()
        .then(function(response) {
          console.log(response);
          if (response === true && next.access.restricted) {
            authService.getUserStatus(localStorageService.get('fiveWeightAdmin'))
              .then(function(res) {
                if (res === true) {
                  console.log('You have been granted access!');
                  $location.path(next.originalPath);
                } else if (res === false) {
                  console.log('RESTRICTED... LOG BACK IN!');
                  event.preventDefault();
                  // $location.path(next.originalPath);
                } else {
                  console.log(false);
                }
              });
          } else if (!response && next.access.restricted) {
            console.log('That path is Restricted! User Must Sign Up.');
            $location.path('/login');
          } else if(!response && !next.access.restricted) {
            $location.path(next.originalPath);
          }

        });

    });
});
