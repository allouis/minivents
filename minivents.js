(this.window||module)[(this.window ? 'Events' : 'exports')] = function (target){
  var events = {};
  target = target || this
    /**
     *  On: listen to events
     */
    target.on = function(type, func, ctx){
      (events[type] = events[type] || []).push({f:func, c:ctx})
    }
    /**
     *  Off: stop listening to event / specific callback
     */
    target.off = function(type, func){
      type || (events = {})
      var list = events[type] || [],
      i = list.length = func ? list.length : 0
      while(i-->0) func == list[i].f && list.splice(i,1)
    }
    /** 
     * Emit: send event, callbacks will be triggered
     */
    target.emit = function(){
      var args = Array.apply([], arguments),
      list = events[args.shift()] || [], i=0, j
      for(;j=list[i++];) j.f.apply(j.c, args)
    };
}
