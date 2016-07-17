app.factory('authService', ['$q', '$timeout', '$http', 'localStorageService', 'server', authService]);

function authService($q, $timeout, $http, localStorageService, server) {
  var user = null;

  return ({
    checkToken: checkToken,
    getUserStatus: getUserStatus,
    login: login,
    logout: logout,
    signup: signup
  });


  // ============================================================================
  // ============================================================================
  function getUserStatus(theToken) {
    var deferred = $q.defer();

    if (theToken) {
      $http.post(server + '/users/auth', {'check': theToken})
        .success(function(response) {
          var user = response;
          deferred.resolve(user);
        })
        .error(function(data) {
          console.log('ZACH ERROR', data);
        });


    } else {
      user = false;
      deferred.resolve(user);
    }


    return deferred.promise;
  }


  // ============================================================================
  // ============================================================================
  function checkToken() {
    var deferred = $q.defer();

    if (localStorageService.get('fiveWeightAdmin')) {
      deferred.resolve(true);
    } else if (!localStorageService.get('fiveWeightAdmin')) {
      deferred.resolve(false);
    } else {
      deferred.reject();
    }

    return deferred.promise;
  }


  // ============================================================================
  // ============================================================================
  function login(userEmail, userPassword) {

    //create a new instance of deferred
    var deferred = $q.defer();

    //send a post request to the server
    $http.post(server + '/users/login', {
        email: userEmail,
        password: userPassword
      })
      .success(function(response, status) {

        if (response.token) {
          var token = response.token;
          user = true;
          localStorageService.set('fiveWeightAdmin', token);
          deferred.resolve();
        } else {
          user = false;
          deferred.reject();
        }
      })
      // handle error
      .error(function(err) {
        user = false;
        deferred.reject();
      });

    // return promise object
    return deferred.promise;

  }


  // ============================================================================
  // ============================================================================
  function logout() {
    var deferred = $q.defer();

    localStorageService.remove('fiveWeightAdmin');
    deferred.resolve('User is logged out!');
    return deferred.promise;
  }


  // ============================================================================
  // ============================================================================
  function signup(firstname, lastname, username, password, email) {
    var deferred = $q.defer();

    $http.post(server + '/users/signup', {
        firstName: firstname,
        lastName: lastname,
        userName: username,
        password: password,
        email: email
      })
      .success(function(response) {
        if (response.token) {

          var token = response.token;
          localStorageService.set('fiveWeightAdmin', token);

          deferred.resolve();
        } else {
          console.log("User already exists in the database");
          deferred.reject();
        }
      })
      .error(function(response) {
        deferred.reject();
      });

    return deferred.promise;

  }

}
