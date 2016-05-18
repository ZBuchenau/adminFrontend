app.directive('pieChart', ['d3Service', function(d3Service){
//in html, refer to this directive as <pie-chart></pie-chart>

  function link(scope, el, attrs){
    var pieData = [82,32,63,42,54,27,38,12,4,16,22,37];
    var color = d3.scale.category20();
    var elem = el[0];
    var width = elem.clientWidth;
    var height = elem.clientHeight;
    var min = Math.min(width, height);
    var pie = d3.layout.pie().sort(null);
    var arc = d3.svg.arc()
      .outerRadius(min / 2 * 0.9)
      .innerRadius(min / 2 * 0.1);

    var svg = d3.select(elem)
      .append('svg')
      .attr({width: width, height: height})
      .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    svg.selectAll('path').data(pie(pieData))
      .enter().append('path')
      .style('stroke', 'white')
      .attr('d', arc)
      .attr('fill', function(d, i){
        return color(i);
      });

      console.log(elem.clientWidth, "client width");
  }


  return {
    link: link,
    restrict: 'EA',
    scope: {}
  };

}]);
