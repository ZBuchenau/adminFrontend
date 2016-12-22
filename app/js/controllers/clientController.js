app.controller('clientController', ['$scope', '$http', 'server', 'localStorageService', '$q', '$location', 'authService', 'mediaPlanService', clientController]);

function clientController($scope, $http, server, localStorageService, $q, $location, authService, mediaPlanService) {
  var vm = this;

  vm.clientFormShow = false;

  vm.newClient = {
    "client_name" : "Shea Homes",
    "client_address" : "10075 Park Meadows Dr",
    "client_city" : "Lone Tree",
    "client_state" : "CO",
    "client_zip" : "80124",
    "contact_fn" : "Zach",
    "contact_ln" : "Buchenau",
    "contact_email" : "ZBuchenau@yahoo.com",
    "contact_phone" : "3039299645",
    "billing_name" : "Shea Homes",
    "billing_address" : "10075 Park Meadows Dr",
    "billing_city" : "Parker",
    "billing_state" : "Colorado",
    "billing_zip" : "80134"
  };

  vm.submitClient = function(item){
    // console.log(item);
    mediaPlanService.tacticSubmit(server + '/clients', item)
      .then(function(response){
        console.log(response);
      });
  };

  vm.treeData = {
    "name": "5Weight Customers",
    "children": [{
      "name": "Shea Homes Colorado",
      "children": [{
        "name": "BackCountry CO",
        "children": [{
          "name": "BackCountry CO",
          "children": [{
            "name": "Zillow Boost"
          }]
        }]
      }, {
        "name": "Stepping Stone CO",
        "children": [{
          "name": "Zillow Boost"
        }]
      }]
    },
    {
      "name": "Shea Homes Colorado",
      "children": [{
        "name": "BackCountry CO",
        "children": [{
          "name": "Zillow Boost"
        }]
      }, {
        "name": "Stepping Stone CO",
        "children": [{
          "name": "Zillow Boost"
        }]
      }]
    },
    {
      "name": "Shea Homes Colorado",
      "children": [{
        "name": "BackCountry CO",
        "children": [{
          "name": "Zillow Boost"
        }]
      }, {
        "name": "Stepping Stone CO",
        "children": [{
          "name": "Zillow Boost"
        }]
      }]
    },
    {
      "name": "Shea Homes Colorado",
      "children": [{
        "name": "BackCountry CO",
        "children": [{
          "name": "Zillow Boost"
        }]
      }, {
        "name": "Stepping Stone CO",
        "children": [{
          "name": "Zillow Boost"
        }]
      }]
    },
    {
      "name": "Shea Homes Colorado",
      "children": [{
        "name": "BackCountry CO",
        "children": [{
          "name": "Zillow Boost"
        }]
      }, {
        "name": "Stepping Stone CO",
        "children": [{
          "name": "Zillow Boost"
        }]
      }]
    }]
  };
}
