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
    /**
     *  Off: stop listening to event / specific callback
     */
    off: function(type, func){
      list = events[type] || []
      !func && (list.length = 0) 
      i = list.length
      while(~--i<0) func == list[i].f && list.splice(i,1)
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
