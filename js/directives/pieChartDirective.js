app.directive('pieChart', ['d3Service', function(d3Service) {
  //in html, refer to this directive as <pie-chart></pie-chart>

  return {
    restrict: "E",
    // template: "<svg width='500' height='500'></svg>",
    replace: false,
    scope: {
      pieData: "="
    },
    link: function(scope, el, attrs) {
      var dataset = scope.pieData;
      console.log(typeof(scope.pieData));

      var width = el[0].parentElement.clientWidth;
      console.log(width);
      var height = el[0].parentElement.clientHeight;
      console.log(height);
      var radius = Math.min(width, height) / 2;
      console.log(radius);

      var color = d3.scale.category20();

      var pie = d3.layout.pie().sort(null);

      var pieData = pie(dataset);

      var arc = d3.svg.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - 50);

      var svg = d3.select("pie-chart").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

      var path = svg.selectAll("path")
        .data(pieData)
        .enter().append("path")
        .attr("fill", function(d, i) {
          return color(i);
        })
        .attr("d", arc);

      svg.selectAll("text").data(pieData)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", function(d) {
          var a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
          d.cx = Math.cos(a) * (radius - 75);

          var textReturn = d.x = Math.cos(a) * (radius - 20);
          return textReturn;
        })
        .attr("y", function(d) {
          var a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
          d.cy = Math.sin(a) * (radius - 75);

          var yReturn = d.y = Math.sin(a) * (radius - 20);
          return yReturn;
        })
        .text(function(d) {
          return d.value;
        })
        .each(function(d) {
          var bbox = this.getBBox();
          d.sx = d.x - bbox.width / 2 - 2;
          d.ox = d.x + bbox.width / 2 + 2;
          d.sy = d.oy = d.y + 5;
        });

      svg.append("defs").append("marker")
        .attr("id", "circ")
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("refX", 3)
        .attr("refY", 3)
        .append("circle")
        .attr("cx", 3)
        .attr("cy", 3)
        .attr("r", 3);

      svg.selectAll("path.pointer").data(pieData).enter()
        .append("path")
        .attr("class", "pointer")
        .style("fill", "none")
        .style("stroke", "black")
        .attr("marker-end", "url(#circ)")
        .attr("d", function(d) {
          if (d.cx > d.ox) {
            return "M" + d.sx + "," + d.sy + "L" + d.ox + "," + d.oy + " " + d.cx + "," + d.cy;
          } else {
            return "M" + d.ox + "," + d.oy + "L" + d.sx + "," + d.sy + " " + d.cx + "," + d.cy;
          }
        });
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
      console.log(data);
    }
  };
}]);
