/**
 *  Events
 */
function Events(){
  var events = {}, i, list, args, A = Array;
  return {
    /**
     *  On: listen to events
     */
    on: function(type, func, ctx){
      events[type] || (events[type] = [])
      events[type].push({f:func, c:ctx})
    },
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
    emit: function (type, args) {
      if(!events[type]) return false;
      if(args && !(args instanceof Array)) args = [args];
      var list = events[type], i, j;
      for(i=0, j=list.length; i<j; i++){
        list[i].f.apply(list[i].context, args);
      }
    }
  }
}
