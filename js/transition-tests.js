jQuery(document).ready(function() {
	console.log("ready")


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


  var moveTween = function(o) {
    return function(t) {
      console.log(obj.position.x + ',' + obj.position.y);
      return {x: t * 2, y: t};
    };
  };

  d3.select(obj)
    .transition()
    .attrTween("position", moveTween);


});