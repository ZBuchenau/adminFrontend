app.factory('mediaPlanService', ['$q', '$timeout', '$http', 'localStorageService', 'server', mediaPlanService]);

function mediaPlanService($q, $timeout, $http, localStorageService, server) {
  return ({
    tacticSubmit: tacticSubmit,
    pullMedia: pullMedia,
    getItems: getItems
  });



  function tacticSubmit(endPoint, obj) {
    var deferred = $q.defer();

    $http.post(endPoint, {
        data: obj,
        token: localStorageService.get('fiveWeightAdmin')
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



  function pullMedia(endpoint) {
    var deferred = $q.defer();
    $http.get(endpoint)
      .then(success, failure)
      .catch(function(err) {
        console.log(err);
      });

      function success(response){
        // console.log(response);
        deferred.resolve(response);
      }

      function failure(response){
        console.log(response);
        deferred.reject(response);
      }
    return deferred.promise;
  }


  function getItems(endpoint, obj){
    var deferred = $q.defer();

    $http.post(endpoint, obj)
      .then(success, failure)
      .catch(function(err) {
        console.log(err);
      });

      function success(response){
        var mediaPlan = response;
        console.log(mediaPlan);
        deferred.resolve(mediaPlan);
      }

      function failure(response){
        console.log(response);
        deferred.reject(response);
      }

    return deferred.promise;
  }


}
