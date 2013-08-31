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
    /** 
     * Emit: send event, callbacks will be triggered
     */
    emit: function(){
      args = A.apply([], arguments)
      list = events[args.shift()] || []
      args = args[0] instanceof A && args[0] || args
      i = list.length
      while(~--i<0) list[i].f.apply(list[i].c, args)
    }
  }
}
