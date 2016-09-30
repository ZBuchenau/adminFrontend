app.directive('pieChart', ['d3Service', '$q', 'mediaPlanService', function(d3Service, $q, mediaPlanService) {
  //in html, refer to this directive as <pie-chart></pie-chart>

  return {
    restrict: "EA",
    replace: true,
    scope: {
      pieData: "@"
    },
    link: function(scope, el, attrs) {

      scope.$watch('pieData', function(newVal, oldVal) {

        if (newVal) {

          dataArray = [];
          console.log('WATCHING');
          console.log(Math.random());
          data = JSON.parse(newVal);
          mediaPlanService.pieValueArrays(data, 'provider_name', 'tactic_name', 'monthly_spend')
            .then(function(response) {
                console.log(response);
                console.log("WIDTH:" + el[0].parentElement.clientWidth, "HEIGHT:" + el[0].parentElement.clientHeight);

                // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
                var width = el[0].parentElement.clientWidth,
                  height = el[0].parentElement.clientHeight,
                  radius = Math.min(width, height) / 2;

                var dataArray = response.tactics;
                var valueArray = response.values;
                d3.selectAll("pie-chart > *").remove();

                var svg = d3.select("pie-chart")
                  .append("svg")
                  .style("height", "100%")
                  .style("width", "100%")
                  .style("viewBox", "[0 0 " + width * 1.5 + " " + height * 1.5 + "]")
                  .style("overflow", "visible")
                  .append("g");

                svg.append("g")
                  .attr("class", "slices");
                svg.append("g")
                  .attr("class", "labels")
                  .style("margin-right", "1rem");
                svg.append("g")
                  .attr("class", "lines");

                // console.log(el[0].parentElement.clientWidth);

                var pie = d3.layout.pie()
                  .sort(null)
                  .value(function(d) {
                    return d.value;
                  });

                var arc = d3.svg.arc()
                  .outerRadius(radius * 0.8)
                  .innerRadius(radius * 0.05);

                var outerArc = d3.svg.arc()
                  .innerRadius(radius * 0.9)
                  .outerRadius(radius * 0.9);

                svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                var key = function(d) {
                  return d.data.label;
                };


                var getRandomColor = function(arr) {
                  console.log(arr);
                  var colors = [];
                  for (var i = 0; i < arr.length; i++) {
                    var letters = '0123456789ABCDEF'.split('');
                    var color = '#';
                    for (var j = 0; j < 6; j++) {
                      color += letters[Math.floor(Math.random() * 16)];
                    }
                    console.log(color);
                    colors.push(color);
                  }
                  return colors;
                };

                var color = d3.scale.ordinal()
                  .domain(dataArray)
                  .range(getRandomColor(dataArray));


                function randomData() {
                  var labels = color.domain();
                  var values = valueArray;
                  console.log(typeof labels);
                  return labels.map(function(label) {
                    var index = labels.indexOf(label);
                    var returned = {
                      label: label,
                      value: values[index]
                    };
                    console.log(returned);
                    return returned;
                  });

                }

                change(randomData());


                function change(data) {
                  console.log(data);

                  /* ------- PIE SLICES -------*/
                  var slice = svg.select(".slices").selectAll("path.slice")
                    .data(pie(data), key);

                  slice.enter()
                    .insert("path")
                    .style("fill", function(d) {
                      return color(d.data.label);
                    })
                    .attr("class", "slice");

                  slice.transition()
                    .duration(1000)
                    .attrTween("d", function(d) {
                      this._current = this._current || d;
                      var interpolate = d3.interpolate(this._current, d);
                      this._current = interpolate(0);
                      return function(t) {
                        return arc(interpolate(t));
                      };
                    });

                  slice.exit()
                    .remove();

                  /* ------- TEXT LABELS -------*/

                  var text = svg.select(".labels").selectAll("text")
                    .data(pie(data), key);

                  text.enter()
                    .append("text")
                    .attr("dy", ".3em")
                    .style("font-size", "75%")
                    .style("font-weight", "bold")
                    .style("color", "black")
                    .text(function(d) {
                      return d.data.label;
                    });

                  function midAngle(d) {
                    return d.startAngle + (d.endAngle - d.startAngle) / 2;
                  }

                  text.transition().duration(1000)
                    .attrTween("transform", function(d) {
                      this._current = this._current || d;
                      var interpolate = d3.interpolate(this._current, d);
                      this._current = interpolate(0);
                      return function(t) {
                        var d2 = interpolate(t);
                        var pos = outerArc.centroid(d2);
                        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                        return "translate(" + pos + ")";
                      };
                    })
                    .styleTween("text-anchor", function(d) {
                      this._current = this._current || d;
                      var interpolate = d3.interpolate(this._current, d);
                      this._current = interpolate(0);
                      return function(t) {
                        var d2 = interpolate(t);
                        return midAngle(d2) < Math.PI ? "start" : "end";
                      };
                    });

                  text.exit()
                    .remove();

                  /* ------- SLICE TO TEXT POLYLINES -------*/

                  var polyline = svg.select(".lines").selectAll("polyline")
                    .data(pie(data), key);

                  polyline.enter()
                    .append("polyline")
                    .style("fill", "none")
                    .style("stroke-width", "1.5px")
                    .style("stroke", "black")
                    .style("opacity", "0.4");

                  polyline.transition().duration(1000)
                    .attrTween("points", function(d) {
                      this._current = this._current || d;
                      var interpolate = d3.interpolate(this._current, d);
                      this._current = interpolate(0);
                      return function(t) {
                        var d2 = interpolate(t);
                        var pos = outerArc.centroid(d2);
                        pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                        return [arc.centroid(d2), outerArc.centroid(d2), pos];
                      };
                    });

                  polyline.exit()
                    .remove();
                }
                // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

              },
              true);
        }
      });
    }
  };
}]);


// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>





// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>




// });
// }};
// ]);

// app.directive('testDirective', [function() {
//
//   return {
//     restrict: "EA",
//     scope: {
//       myData: "@",
//     },
//     link: function(scope, element, attrs) {
//       scope.$watch(function(newVal, oldVal) {
//         if (newVal) {
//           console.log(newVal);
//           var data = scope.myData;
//           console.log(data);
//         }
//       }, true);
//     }
//   };
// }]);
