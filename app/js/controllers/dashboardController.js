app.controller('dashboardController', ['$scope', 'd3', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', dashboardController]);

function dashboardController($scope, d3, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;

  var initValues = function(){
    mediaPlanService.pullMedia(server + "/users/getuser")
      .then(function(response){
        console.log(response.data[0].username);
        mediaPlanService.username = response.data[0].username;
      });
  };
  initValues();
  vm.sortType = 'report_name';
  vm.sortReverse = false;
  vm.searchReports = '';

  vm.dateStyle = function(item){
    var newItem = parseInt(item);
    // console.log(newItem);
    var today = new Date();
    var dd = today.getDate();
    // var dd = 10;
    var mm = today.getMonth()+1; //January is 0
    var yyyy = today.getFullYear();
    console.log(dd, parseInt(newItem));
    if(dd >= newItem * 0.95 ){
      console.log("Option 1");
      return { 'background-color' : '#b20000'};
    } else if(dd < newItem * 0.95 && dd >= newItem * 0.75){
      console.log("option 2");
      return { 'background-color' : '#c45800'};
    } else if(dd > (newItem * 0.50) && dd <= (newItem * 0.75)){
      console.log('option 3');
      return { 'background-color' : '#d0db00'};
    } else if(dd < newItem * 0.5){
      console.log('option 4');
      return { 'background-color' : '#37AC06'};
    }



  };


  mediaPlanService.pullMedia(server + "/reports/getreports")
    .then(function(response){
      console.log(response);
      vm.reports = response.data;
    });

  vm.dashboard = {
    main : true,
    client : false
  };

  vm.dashLinkShow = function(item){
    if(item === 'dashboard'){
        vm.dashboard = {
          main : true,
          client : false,
          report : false,
          provider : false
        };
    } else if(item === 'client'){
        vm.dashboard = {
          main : false,
          client : true,
          report : false,
          provider : false
        };
    } else if(item === 'report'){
        vm.dashboard = {
          main : false,
          client : false,
          report : true,
          provider : false
        };
    } else if(item === 'provider'){
        vm.dashboard = {
          main : false,
          client : false,
          report : false,
          provider : true
        };
    }
  };

  vm.data = [
  {key: "BDX Gold Package", value: 58, date: "January 2014"},
  {key: "BDX Gold Package", value: 59, date: "February 2014"},
  {key: "BDX Gold Package", value: 58, date: "March 2014"},
  {key: "BDX Gold Package", value: 50, date: "April 2014"},
  {key: "BDX Gold Package", value: 56, date: "May 2014"},
  {key: "BDX Gold Package", value: 80, date: "June 2014"},
  {key: "BDX Gold Package", value: 54, date: "July 2014"},
  {key: "BDX Gold Package", value: 53, date: "August 2014"},
  {key: "BDX Gold Package", value: 60, date: "September 2014"},
  {key: "BDX Gold Package", value: 51, date: "October 2014"},
  {key: "BDX Gold Package", value: 50, date: "November 2014"},
  {key: "BDX Gold Package", value: 10, date: "December 2014"},
  {key: "BDX Gold Package", value: 48, date: "January 2015"}
  ];


  vm.submitEdit = function(obj){
    mediaPlanService.tacticSubmit(server + '/reports/update', obj)
      .then(function(response){
        console.log(response);
      });
  };

  //----------LOGOUT----------
  vm.logout = function() {
    authService.logout()
      .then(function(response) {
        $location.path('/');
        console.log('User is now logged out!');
      });
  };

  // initValues();

}
