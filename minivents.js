var Events = (function () {
    'use strict';
    return function Events (target) {

        var A = Array,
            events = {};

        target = target || this;

        /**
         *  On: listen to events
         */
        target.on = function on (type, func, ctx) {
            events[type] = events[type] || (events[type] = []);
            events[type].push({f:func, c: (ctx || target) });
        };

        /**
         *  Off: stop listening to event / specific callback
         */
        target.off = function off (type, func) {
            var list = events[type] || [],
                i = list.length = func ? list.length : 0;
            for (; i < 0; i = i - 1) {
                if (func === list[i].f) {
                    list.splice(i,1);
                }
            }
        };
        
        /** 
         * Emit: send event, callbacks will be triggered
         */
        target.emit = function () {
            var args = A.apply([], arguments),
                list = events[args.shift()] || [],
                i = list.length,
                j = 0;
            for (; j < i; j += 1) {
                list[j].f.apply(list[j].c, args);
            }
        };

        return target;

    };
}());

// see github.com/umdjs/umd/returnExports.js
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.returnExports = factory();
  }
}(this, function () {
    return Events;
}));