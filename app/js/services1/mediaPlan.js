app.factory('mediaPlanService', ['$q', '$timeout', '$http', 'localStorageService', 'server', mediaPlanService]);

function mediaPlanService($q, $timeout, $http, localStorageService, server) {
  return ({
    tacticSubmit: tacticSubmit,
    pullMedia: pullMedia,
    getItems: getItems,
    reloadTactics: reloadTactics,
    doubleLooper: doubleLooper,
    spendDelta: spendDelta,
    tacticPost: tacticPost,
    pieValueArrays: pieValueArrays,
    deleteTacticAlert: deleteTacticAlert,
    spendFinder: spendFinder,
    spendCalc: spendCalc
  });



  function tacticSubmit(endPoint, obj) {
    var deferred = $q.defer();

    $http.post(endPoint, obj)
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

// Pulls all tactics for a given media plan
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


  function doubleLooper(obj, pushObj){
    for(var i = 0; i < obj.length; i++){
      for(var j = 0; j < obj[i].length; j++){
        pushObj.push(obj[i][j]);
      }
    }
    console.log(pushObj);
  }

  function spendDelta(budget, obj, thing){
    var deferred = $q.defer();

    var spend = 0;
    var delta;
    for(var i = 0; i < obj.length; i++){
      spend += parseInt(obj[i][thing]);
    }
    delta = budget - spend;

    data = {
      spend: spend,
      delta: delta
    };

    deferred.resolve(data);
    deferred.reject(data);

    return deferred.promise;
  }

  function tacticPost(endPoint, obj, type){
    obj.tacticType = type;
    var deferred = $q.defer();
    $http.post(endPoint, obj)
      .then(success, failure)
      .catch(function(error){
        console.log(error);
      });

      function success(response){
        console.log(response);
        deferred.resolve(response);
      }

      function failure(response){
        console.log(response);
        deferred.reject(response);
      }

      return deferred.promise;
  }

  function reloadTactics(endpoint, obj){
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

  function pieValueArrays(info){
    var deferred = $q.defer();
    var arr1 = [];
    var arr2 = [];
    for(var i = 0; i < info.length; i++){
      for(var j = 0; j < info[i].length; j++){
        arr1.push(info[i][j].provider_name + " - " + info[i][j].tactic_name);
        arr2.push(parseInt(info[i][j].monthly_spend));
      }
    }
    deferred.resolve ({
      tactics: arr1,
      values: arr2
    });
    return deferred.promise;
  }

  function deleteTacticAlert(message){
    var deferred = $q.defer();
    var retVal = confirm(message);
    if (retVal === true){
      deferred.resolve(true);
    } else {
      deferred.resolve(false);
    }
    return deferred.promise;
  }

  function spendFinder(mediaPlan, zero){
    //mediaPlan MUST BE AN ARRAY OF ARRAYS
    //ALWAYS ENTER 0 IN FOR THE zero PARAMETER
    var deferred = $q.defer();

    for(var i = 0; i < mediaPlan.length; i++){
      for(var j = 0; j < mediaPlan[i].length; j++){
        zero += parseInt(mediaPlan[i][j].monthly_spend);
      }
    }
    deferred.resolve(zero);
    return deferred.promise;
  }

  function spendCalc(currentSpend, budget){
    var deferred = $q.defer();

    var spendData = {
      spend : currentSpend,
      budgetRemaining: (budget - currentSpend),
    };
    deferred.resolve(spendData);

    return deferred.promise;

  }

}
