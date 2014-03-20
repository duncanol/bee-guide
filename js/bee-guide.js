function Bee(width, height, x, y) {
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.angle = 180;
}

Bee.prototype.setAttribute = function(attr, value) {
  this[attr] = value;
};

Bee.prototype.getAttribute = function(attr) {
  return this[attr];
};

jQuery(document).ready(function() {

	var $window = jQuery(window);

  var width = $window.width() - 20, height = $window.height() - 20, radius = 20;
	var bee = new Bee(50, 50, width / 2, 50);

	var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

  svg.append("path")
    .attr("class", "mesh")
    .attr("d", d3.hexbin()
      .size([width, height])
      .radius(radius)
      .mesh);

  var beeImage = svg.append("g")
  	.append("svg:image")
  	.attr("xlink:href", "/images/svg/Abeille-bee.svg")
  	.attr("x", bee.x)
  	.attr("y", bee.y)
  	.attr("width", bee.width)
  	.attr("height", bee.height);

 	beeImage
 		.attr("transform", "rotate(" + bee.angle + ", " + bee.x + ", " + bee.y + ")");

  d3.select(bee)
    .transition()
      .duration(1000)
      .attrTween("x", tween)
      .attr("x", 100);


  beeImage
    .attr("x", bee.x)
    .attr("y", bee.y)
    .attr("transform", "rotate(" + bee.angle + ", " + bee.x + ", " + bee.y + ")");


});