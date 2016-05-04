app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '../views/signup.html',
    controller: 'signupController as sc',
    css: 'css/homePage.css'
  })
  .when('/login', {
    templateUrl: '../views/login.html',
    controller: 'loginController as lc',
    css: 'css/homePage.css'
  })
  .when('/admin', {
    templateUrl: '../views/admin.html',
    controller: 'adminController as lc',
    css: 'css/homePage.css'
  });
});
