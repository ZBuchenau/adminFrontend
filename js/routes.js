app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '../views/signup.html',
    controller: 'mainController as mc',
    css: 'css/homePage.css'
  });
});
