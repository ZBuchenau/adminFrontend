
app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '../views/home.html',
    controller: 'homeController as hc',
    css: 'css/home.css',
    access: {restricted: false}
  })
  .when('/logout', {
    controller: 'logoutController as lo'
  })
  .when('/admin', {
    templateUrl: '../views/admin.html',
    controller: 'adminController as ac',
    css: 'css/admin.css',
    access: {restricted: true}
  });
});
