
app.factory('authInterceptor', function ($rootScope, $q, $window, localStorageService) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if (localStorageService.get('fiveWeightAdmin')) {
        config.headers.Authorization = 'Bearer ' + localStorageService.get('fiveWeightAdmin');
      }

      return config;
    },
    responseError: function (rejection) {
      if (rejection.status === 401) {
        // handle the case where the user is not authenticated
        console.log('User is not authenticated');
      }
      return $q.reject(rejection);
    }
  };
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});
