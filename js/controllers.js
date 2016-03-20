app.controller('mainController', ['$scope', mainController]);

function mainController($scope) {
  var vm = this;

  vm.title = {};
  vm.title.name = 'Hello';
}
