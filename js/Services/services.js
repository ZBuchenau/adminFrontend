app.factory('authService', ['$q', '$timeout', '$http', 'localStorageService', 'server', authService]);



function authService($q, $timeout, $http, localStorageService, server) {
    var user = null;

    return ({
        isLoggedIn: isLoggedIn,
        getUserStatus: getUserStatus,
        login: login,
        logout: logout,
        signup: signup
    });


    // ============================================================================
    // ============================================================================
    function isLoggedIn() {

        var tokenToVerify = localStorageService.get('fiveWeightAdmin');

        if (tokenToVerify) {

            user = false;

            $http.post(server + '/users', {
                    token: tokenToVerify
                })
                .success(function(response) {
                    // console.log(response);
                    user = response;
                    return response;
                })
                .error(function(response) {
                    console.log(response);
                });

        } else {

            user = false;
            return false;

        }
    }



    // ============================================================================
    // ============================================================================
    function getUserStatus() {
        return $http.get(server + '/users/auth')
            // handle success
            .success(function(data) {
              console.log(data);
                // if (data.status) {
                //     user = true;
                // } else {
                //     user = false;
                // }
            })
            // handle error
            .error(function(data) {
                user = false;
            });
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
                console.log('IM RIGHT HERE...............');
                console.log(response.token);
                if (response.token) {
                    var token = response.token;
                    console.log(token);
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

        $http.get('/user/logout')
            .success(function(response) {
                user = false;

                localStorageService.remove('fiveWeightAdmin');
                deferred.resolve();
            })
            .error(function(response) {
                user = false;
                deferred.reject();
            });

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
                console.log(response);
                if (response.token) {

                    var token = response.token;
                    localStorageService.set('fiveWeightAdmin', token);

                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            })
            .error(function(response) {
                deferred.reject();
            });

        return deferred.promise;

    }

}
