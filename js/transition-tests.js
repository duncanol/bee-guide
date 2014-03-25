jQuery(document).ready(function() {
	console.log("ready")


  // moveTweenTest();


  arcTweenTest();
});

function arcTweenTest() {

  var w = 400, h = 400;

  var sx = d3.scale.linear().domain([-w / 2,w / 2]).range([0,w]);
  var sy = d3.scale.linear().domain([-h / 2,h / 2]).range([h,0]);
  
  var svg = d3.select(".contains-svg").append("svg")
    .attr("width", w)
    .attr("height", h);

  var hiddenSvg = d3.select("body").append("svg")
    .attr("width", 0)
    .attr("height", 0);

  svg.append("circle")
    .attr("cx", sx(0))
    .attr("cy", sy(0))
    .attr("r", 10)
    .attr("fill", "none")
    .attr("stroke", "black");

  // var arc = d3.svg.arc()
  //     .innerRadius(140)
  //     .outerRadius(140)
  //     .startAngle(0)
  //     .endAngle((90 / 360) * (2 * Math.PI));


  var pathContainer = 
    svg.append("g")
      // .attr("transform", "translate(" + sx(0) + "," + sy(0) + ")");

  var pathConfig = {
    startX: -75,
    startY: 0,
    ctrlX: 0,
    ctrlY: 100,
    endX: 75,
    endY: 0,


    getRealPath: function() {
      return this.getPath(d3.scale.identity(), d3.scale.identity());
    },


    getGraphicalPath: function() {
      return this.getPath(sx, sy);
    }, 


    getPath: function(xScale, yScale) {
      var d = "M" + xScale(this.startX) + "," + yScale(this.startY) + 
          " Q" + xScale(this.ctrlX) + "," + yScale(this.ctrlY) + " " + 
          xScale(this.endX) + "," + yScale(this.endY);
      console.log(d);
      return d;
    } 
  }


  var path =
    pathContainer.append("path")
      .attr("d", pathConfig.getGraphicalPath())
      // .attr("d", "M " + sx(100) + " " + sy(350) + " q " + sx(150) + " " + sy(-300) + " " + sx(300) + " " + sy(0))
      .attr("fill", "none")
      .attr("stroke", "black");

  var realPath =
    hiddenSvg.append("path")
      .attr("d", pathConfig.getRealPath())
      // .attr("d", "M " + sx(100) + " " + sy(350) + " q " + sx(150) + " " + sy(-300) + " " + sx(300) + " " + sy(0))
      .attr("fill", "none")
      .attr("stroke", "blue");

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
      y: pointsData[0][1],
      angle: 0
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
    // .attr("transform", "translate(" + sx(0) + "," + sy(0) + ")");
  var objects = objectGroup.selectAll("objects")
    .data([obj]);

  objects.enter()
    .append("svg:image")
      .attr("xlink:href", "/images/svg/Abeille-bee.svg")
      .attr("x", function(o) { 
        return sx(o.position.x) - o.width / 2; 
      })
      .attr("y", function(o) { 
        return sy(o.position.y) - o.height / 2;
      })
      .attr("transform", function(o) {
        return "rotate(" + o.position.angle + ", " + sx(o.position.x) + ", " + sy(o.position.y) + ")";
      })
      .attr("width", function(o) { return o.width; })
      .attr("height", function(o) { return o.height; });;

  function tick() {
    objects
      .attr("x", function(o) { 
        return sx(o.position.x) - o.width / 2; 
      })
      .attr("y", function(o) { 
        return sy(o.position.y) - o.height / 2;
      })
      .attr("transform", function(o) {
        return "rotate(" + o.position.angle + ", " + sx(o.position.x) + ", " + sy(o.position.y) + ")";
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
      .duration(1500)
      .attrTween("position", function() {
        return arcTween(this);
      });

  function arcTween(o) {
    return function(t) {
      var placeOnLine = lineLength * t;
      var point = realPath.node().getPointAtLength(placeOnLine);
      var xDiff = point.x - o.position.x;
      var yDiff = point.y - o.position.y;
      var angle = ((Math.atan2(-yDiff, xDiff) / (Math.PI * 2)) * 360) + 90;
      console.log("current position - " + o.position.x + "," + o.position.y + ",a=" + o.position.angle);
      console.log("new position     - " + point.x + "," + point.y+ ",a=" + angle);
      return {x: point.x, y: point.y, angle: angle};
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