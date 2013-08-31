/**
 *  Events
 */
function Events(target){
  var events = {}, i, list, args, A = Array;
  var target = target || this;
    /**
     *  On: listen to events
     */
    target.on = function(type, func, ctx){
      events[type] || (events[type] = [])
      events[type].push({f:func, c:ctx})
    }
    /**
     *  Off: stop listening to event / specific callback
     */
    target.off = function(type, func){
      list = events[type] || []
      !func && (list.length = 0) 
      i = list.length
      while(~--i<0) func == list[i].f && list.splice(i,1)
    }
    /** 
     * Emit: send event, callbacks will be triggered
     */
    target.emit = function(){
      args = A.apply([], arguments)
      list = events[args.shift()] || []
      args = args[0] instanceof A && args[0] || args
      i = list.length
      while(~--i<0) list[i].f.apply(list[i].c, args)
    }
}

var assert = require("assert");
var events = new Events();
var obj = {};
var eventsProps = (function(){
    var arr = [];
    for(var prop in events) {
        arr.push(prop);
    }
    return arr;
}());
/**
 *  Constructor Test
 */
describe("Events Object Properties", function(){
  it("should return an object with just three methods, on, off and emit, if passed nothing", 
    function(){
      var expected =  ["on", "off", "emit"];
      for(i = 0; i < eventsProps.length; i++){
        assert.equal(eventsProps[i], expected[i])
      }
  });
});

describe("Mixin should modify original obj, not create new", function(){
  it("should modify original object", function(){
    var objRef = obj; 
    Events(obj);
    assert.equal(objRef, obj);
  })  
});

