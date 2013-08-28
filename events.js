/**
 * Events
 * @constructor Creates event object
 */
function Events() {
  /** @private */
  var events = {}, slice = Array.prototype.slice;
  return {
  /**
   * @param {String} type The name of the event 
   * @param {Function} func Function to call when event is triggered 
   * @param {Object} context The context of `this` within the function
   */
    on: function (type, func, context) {
      var list = events[type] || (events[type] = []);
      return !!list.push({f:func, context:context});
    },
  /**
   * @param {String} type The name of the event to be removed 
   * @param {Function} [func] The specific callback to be removed from event
   */
    off: function (type, func) {
      var list = events[type], copy = slice.call(events[type]), i, j;
      if(!func) return delete events[type];
      for (i=0, j=list.length; i<j; i++) {
        with(list[i]) {
          if(func === f) copy.splice(i, 1);
        }
      } 
      events[type] = copy;
    },
  /**
   * @param {String} type The name of the event to be triggered
   * @param {Array} [args] An array of arguments to pass the the callbacks
   */
    trigger: function (type, args) {
      if(!events[type]) return false;
      if(args && !(args instanceof Array)) args = [args];
      var list = events[type], i, j;
      for(i=0, j=list.length; i<j; i++){
        list[i].f.apply(list[i].context, args);
      }
    }
  };
}
