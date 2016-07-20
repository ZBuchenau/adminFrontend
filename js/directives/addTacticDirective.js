app.directive('addTactic', ['$q', 'mediaPlanService', addTactic]);

function addTactic($q, mediaPlanService){
  return {
    restrict: "E",
    replace: true,
    scope : {
      submitFunction : "@",
      showModel : "@",
      providerModel : "@",
      tacticModel : "@",
      spendModel : "@",
      cancelButtonShow : "@",


    },
    templateUrl: '../../views/addTacticForm.html'
  };
}


// <div class="tacticFormContainer">
//   <form name="editForm" class="tacticForm" ng-submit="{{submitFunction}}" ng-show="{{showModel}}" method="post">
//       <label for="editForm">Add Tactic: </label>
//       <input type="text" id="ProviderName" placeholder="Provider Name" ng-model="{{providerModel}}" required>
//       <input type="text" id="tacticName" placeholder="Tactic Name" ng-model="{{tacticModel}}" required>
//       <input type="number" id="monthlySpend" placeholder="Monthly Spend" ng-model="{{spendModel}}" required>
//       <input class="submitTactic" type="submit" name="button">
//   </form>
//   <button class="formHide" type="button" name="button" ng-show="{{showModel}}" ng-click="{{showModel}} = false">X</button>
// </div>
// <button class="addTacticButton" type="button" name="button" ng-show="!{{showModel}}" ng-click="{{showModel}} = true">+ New Tactic</button>
