app.directive('pieChart', ['d3Service', function(d3Service) {
  //in html, refer to this directive as <pie-chart></pie-chart>

  return {
    restrict: "E",
    // template: "<svg width='500' height='500'></svg>",
    replace: true,
    scope: {
      pieData: "="
    },
    link: function(scope, el, attrs) {

      // //TODO: Turn pieData into a function that loops through scope.pieData
      // //to pull items from the objects within that array.
      // var dataset = scope.pieData; //This will be the data retrieved from the controller.
      // // console.log(typeof(scope.pieData));
      //
      // var width = el[0].parentElement.clientWidth;
      // // console.log(width);
      // var height = el[0].parentElement.clientHeight;
      // // console.log(height);
      // var radius = Math.min(width, height) / 2;
      // // console.log(radius);
      //
      // var color = d3.scale.category20();
      //
      // var pie = d3.layout.pie().sort(null);
      //
      // var pieData = pie(dataset);
      //
      // var arc = d3.svg.arc()
      //   .innerRadius(radius/radius)
      //   .outerRadius(radius - 50);
      //
      // var svg = d3.select("pie-chart").append("svg")
      //   .attr("width", width)
      //   .attr("height", height)
      //   .append("g")
      //   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
      //
      // var path = svg.selectAll("path")
      //   .data(pieData)
      //   .enter().append("path")
      //   .attr("fill", function(d, i) {
      //     return color(i);
      //   })
      //   .attr("d", arc);
      //
      // svg.selectAll("text").data(pieData)
      //   .enter()
      //   .append("text")
      //   .attr("text-anchor", "middle")
      //   .attr("x", function(d) {
      //     var a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
      //     d.cx = Math.cos(a) * (radius - 75);
      //
      //     var textReturn = d.x = Math.cos(a) * (radius - 20);
      //     return textReturn;
      //   })
      //   .attr("y", function(d) {
      //     var a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
      //     d.cy = Math.sin(a) * (radius - 75);
      //
      //     var yReturn = d.y = Math.sin(a) * (radius - 20);
      //     return yReturn;
      //   })
      //   .text(function(d) {
      //     return d.value;
      //   })
      //   .each(function(d) {
      //     var bbox = this.getBBox();
      //     d.sx = d.x - bbox.width / 2 - 2;
      //     d.ox = d.x + bbox.width / 2 + 2;
      //     d.sy = d.oy = d.y + 5;
      //   });
      //
      // // svg.append("defs").append("marker")
      // //   .attr("id", "circ")
      // //   .attr("markerWidth", 6)
      // //   .attr("markerHeight", 6)
      // //   .attr("refX", 3)
      // //   .attr("refY", 3)
      // //   .append("circle")
      // //   .attr("cx", 3)
      // //   .attr("cy", 3)
      // //   .attr("r", 3);
      //
      // svg.selectAll("path.pointer").data(pieData).enter()
      //   .append("path")
      //   .attr("class", "pointer")
      //   .style("fill", "none")
      //   .style("stroke", "black")
      //   .attr("marker-end", "url(#circ)")
      //   .attr("d", function(d) {
      //     if (d.cx > d.ox) {
      //       return "M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy;
      //     } else {
      //       return "M" + d.ox + "," + d.oy + "L" + d.sx + "," + d.sy + " " + d.cx + "," + d.cy;
      //     }
      //   });

      //=============================================================================
      // ANIMATED PIE GRAPH
      //=============================================================================
      var width = el[0].parentElement.clientWidth,
        height = el[0].parentElement.clientHeight,
        radius = Math.min(width, height) / 2;

      var svg = d3.select("pie-chart")
        .append("svg")
        .style("height", "100%")
        .style("width", "100%")
        .style("viewBox", "[0 0 " + width*1.5 +" "+ height*1.5 + "]")
        .style("overflow", "auto")
        .append("g");

      svg.append("g")
        .attr("class", "slices");
      svg.append("g")
        .attr("class", "labels")
        .style("margin-right", "1rem");
      svg.append("g")
        .attr("class", "lines");

        console.log(el[0].parentElement.clientWidth);



      var pie = d3.layout.pie()
        .sort(null)
        .value(function(d) {
          return d.value;
        });

      var arc = d3.svg.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.4);

      var outerArc = d3.svg.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9);

      svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var key = function(d) {
        return d.data.label;
      };

      var color = d3.scale.ordinal()
        .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

      function randomData() {
        var labels = color.domain();
        return labels.map(function(label) {
          return {
            label: label,
            value: Math.random()
          };
        });
      }

      change(randomData());

      d3.select(".randomize")
        .on("click", function() {
          change(randomData());
        });


      function change(data) {

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
          .attr("dy", ".35em")
          .style("font-size", "80%")
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
      //=============================================================================
      //=============================================================================

    }
  };

}]);

app.directive('testDirective', [function() {

  return {
    restrict: "EA",
    scope: {
      myData: "@"
    },
    link: function(scope, element, attrs) {
      var data = scope.myData;
      // console.log(data);
    }
  };
}]);
