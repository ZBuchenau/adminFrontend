
app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '../views/signup.html',
    controller: 'signupController as sc',
    css: 'css/homePage.css',
    access: {restricted: false}
  })
  .when('/login', {
    templateUrl: '../views/login.html',
    controller: 'loginController as lc',
    css: 'css/homePage.css',
    access: {restricted: false}
  })
  .when('/logout', {
    controller: 'logoutController as lo'
  })
  .when('/admin', {
    templateUrl: '../views/admin.html',
    controller: 'adminController as ac',
    css: 'css/homePage.css',
    access: {restricted: true}
  });
});
