jQuery(document).ready(function() {
	console.log("ready")


  // moveTweenTest();


  arcTweenTest();
});

function arcTweenTest() {

  var obj = {
    position: {
      x: 100, 
      y: 100,
    }
    // getAttribute: function(attr) {
    //   return this[attr];
    // },  
    // setAttribute: function(attr, value) {
    //   this[attr] = value;  
    // }
  };


  var w = 1000, h = 1000;

  var svg = d3.select("body").append("svg")
    .attr("width", w)
    .attr("height", h);

  var arc = d3.svg.arc()
      .innerRadius(140)
      .outerRadius(140)
      .startAngle(0)
      .endAngle((90 / 360) * (2 * Math.PI));


  var pathContainer = 
    svg.append("g")
      .attr("transform", "translate(" + 300 + "," + 300 + ")");

  var path =
    pathContainer.append("path")
      .attr("d", "M 100 350 q 150 -300 300 0")
      .attr("fill", "none")
      .attr("stroke", "black");

  var pointsData = [];

  var lineLength = path.node().getTotalLength()
  for (var i = 0; i <= 10; i++) {
    var placeOnLine = (lineLength / 10) * i;
    var point = path.node().getPointAtLength(placeOnLine);
    pointsData[i] = [point.x, point.y];
    console.log(placeOnLine + " - " + pointsData[i])
  }

  var points =
    pathContainer.selectAll("points")
      .data(pointsData)
      .enter()
        .append("circle")
          .attr("cx", function(d) { 
            return d[0]; 
          })
          .attr("cy", function(d) { 
            return d[1]; 
          })
          .attr("r", 5)
          .attr("fill", "yellow")
          .attr("stroke", "black");
      
  var objectGroup = svg.append("g")
    .attr("transform", "translate(" + 300 + "," + 300 + ")");
  var objects = objectGroup.selectAll("objects")
    .data([obj]);

  objects.enter()
    .append("svg:image")
      .attr("xlink:href", "/images/svg/Abeille-bee.svg")
      .attr("x", function(o) { 
        return pointsData[0][0]; 
      })
      .attr("y", function(o) { 
        return pointsData[0][1];
      })
      .attr("width", 50)
      .attr("height", 50);

  objects.transition()
      .duration(1000)
      .attrTween("x", arcTweenX)
      .attrTween("y", arcTweenY);

  function arcTweenX(o) {
    return function(t) {
      var placeOnLine = lineLength * t;
      var point = path.node().getPointAtLength(placeOnLine);
      console.log(placeOnLine + " - " + point.x + "," + point.y);
      return point.x;
    };
  }

  function arcTweenY(o) {
    return function(t) {
      var placeOnLine = lineLength * t;
      var point = path.node().getPointAtLength(placeOnLine);
      console.log(placeOnLine + " - " + point.x + "," + point.y);
      return point.y;
    };
  }



  // var arcTween = function() {

  //   console.log("arc")
    
  //   var arc = d3.svg.arc()
  //     .innerRadius(100)
  //     .outerRadius(140)
  //     .startAngle(0)
  //     .endAngle(180);

  //   return function(t) {
  //     var arcValue = arc(t);
  //     console.log(arcValue);
  //     return arcValue;
  //   };
  // };

  
  // d3.select(obj)
  //   .transition()
  //   .attrTween("position", arcTween);

}

function moveTweenTest() {
    var obj = {
    position: {
      x: 0, 
      y: 0,
    },
    getAttribute: function(attr) {
      return this[attr];
    },  
    setAttribute: function(attr, value) {
      this[attr] = value;  
    }
  };


  var moveTween = function() {
    return function(t) {
      console.log("Move tween: " + obj.position.x + ',' + obj.position.y);
      return {x: t * 2, y: t};
    };
  };

  d3.select(obj)
    .transition()
    .attrTween("position", moveTween);
}