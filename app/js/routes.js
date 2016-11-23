
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
  })
  .when('/printVersion', {
    templateUrl: '../views/printVersion.html',
    controller: 'printController as pc',
    css: 'css/printVersion.css',
    access: {restricted: true}
  })
  .when('/clients', {
    templateUrl: '../views/clients.html',
    controller: 'clientController as cr',
    css: 'css/clients.css',
    access: {restricted: true}
  })
  .when('/checklist', {
    templateUrl: '../views/checklist.html',
    controller: 'checkController as cc',
    css: 'css/checklist.css',
    access: {restricted: true}
  });
});
