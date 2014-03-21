jQuery(document).ready(function() {
	console.log("ready")


  // moveTweenTest();


  arcTweenTest();
});

function arcTweenTest() {

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


  var obj = {
    position: {
      x: pointsData[0][0], 
      y: pointsData[0][1]
    },
    width: 50,
    height: 50,
    getAttribute: function(attr) {
      return this[attr];
    },  
    setAttribute: function(attr, value) {
      this[attr] = value;  
      tick();
    }
  };

  var objectGroup = svg.append("g")
    .attr("transform", "translate(" + 300 + "," + 300 + ")");
  var objects = objectGroup.selectAll("objects")
    .data([obj]);

  objects.enter()
    .append("svg:image")
      .attr("xlink:href", "/images/svg/Abeille-bee.svg")
      .attr("x", function(o) { 
        return o.position.x - o.width / 2; 
      })
      .attr("y", function(o) { 
        return o.position.y - o.height / 2;
      })
      .attr("width", function(o) { return o.width; })
      .attr("height", function(o) { return o.height; });

  function tick() {
    objects
      .attr("x", function(o) { 
        return o.position.x - o.width / 2; 
      })
      .attr("y", function(o) { 
        return o.position.y - o.height / 2;
      })
  }

  // d3.timer(function() {
  //   objects.each(function(d) {
  //     moveObject(d)  
  //   })
  // }, 10);

  d3.select(obj)
    .transition()
      .ease('linear')
      .duration(1000)
      .attrTween("position", arcTween);

  function arcTween(o) {
    return function(t) {
      var placeOnLine = lineLength * t;
      var point = path.node().getPointAtLength(placeOnLine);
      console.log(placeOnLine + " - " + point.x + "," + point.y);
      return {x: point.x, y: point.y};
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