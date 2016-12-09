
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
  .when('/dashboard', {
    templateUrl: '../views/dashboard.html',
    controller: 'dashboardController as dc',
    css: 'css/dashboard.css',
    access: {restricted: true}
  })
  .when('/dashboard/clients', {
    templateUrl: '../views/clients.html',
    controller: 'clientController as cc',
    css: ['css/dashboard.css', 'css/clients.css'],
    access: {restricted: true}
  })
  .when('/dashboard/reports', {
    templateUrl: '../views/reports.html',
    controller: 'reportController as rc',
    css: ['css/dashboard.css', 'css/reports.css'],
    access: {restricted: true}
  })
  .when('/dashboard/providers', {
    templateUrl: '../views/providers.html',
    controller: 'providerController as pc',
    css: ['css/dashboard.css', 'css/providers.css'],
    access: {restricted: true}
  })
  .when('/checklist', {
    templateUrl: '../views/checklist.html',
    controller: 'checkController as cc',
    css: 'css/checklist.css',
    access: {restricted: true}
  });
});
