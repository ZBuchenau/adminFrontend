app.factory('mediaPlanService', ['$q', '$timeout', '$http', 'localStorageService', 'server', mediaPlanService]);

function mediaPlanService($q, $timeout, $http, localStorageService, server){
  return ({
    tacticSubmit: tacticSubmit
  });



    function tacticSubmit(endPoint, obj) {
      var deferred = $q.defer();

        $http.post(endPoint, {
            data: obj
          })
          .success(function(response) {
            var data = response;
            deferred.resolve(data);
          })
          .error(function(data) {
            deferred.reject(data);
          });

          return deferred.promise;
      }

}
