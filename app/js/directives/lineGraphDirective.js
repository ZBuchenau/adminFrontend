// app.directive('lineGraph', ['d3Service', '$q', 'mediaPlanService', function(d3Service, $q, mediaPlanService) {
//   //in html, refer to this directive as <pie-chart></pie-chart>
//
//   return {
//     restrict: "EA",
//     replace: true,
//     scope: {
//       lineData: "@"
//     },
//     link: function(scope, el, attrs) {
//
//       scope.$watch('lineData', function(newVal, oldVal) {
//
//         if (newVal) {
//
//           dataArray = [];
//           data = JSON.parse(newVal);
//         }
//       });
//     }
//   };
// }]);
