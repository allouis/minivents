/**
 * Calling the `Events` function creates a new message bus over which messages can be sent.
 * The function adds methods to an object that allow for listening to and triggering events.
 */

var Events = function Events (target) {

    'use strict';

    /**
     * The `events` variable saves the names of registered events and associates those names with arrays of callback functions to be called, when the event is triggered.
     */
    var events = {};

    target = target || this;

    /**
     * With this method you can register callbacks to be executed when a certain event is triggered.
     * 
     * @param {String} The name of the event is specified by a string. It doesn't matter, whether this event name already exists or not.
     * @param {Function} The function to be called, when the event is triggered.
     * @param {Object} Optionally, you can provide a context for the callback function.
     */
    target.on = function on (type, func, ctx) {

        if (events[type] === undefined) {
            events[type] = [];
        }

        events[type].push({
            f : func,
            c : ctx
        });

    };

    /**
     * This method allows it to remove event listeners. A reference to the function to be removed is required.
     *
     * @param {String} The name of the event to which the callback belongs.
     * @param {Function} The callback function to be removed.
     */
    target.off = function off (type, func) {

        var list = events[type] || [],
            i = (func === undefined) ? 0 : list.length - 1;

        for (; i >= 0; i = i - 1) {
            if (func === (list[i] && list[i].f)) {
                list.splice(i, 1);
            }
        }

    };
    
    /** 
     * Calling this method triggers the specified event and will result in all registered callbacks being executed. There should be no reliance on the order in which the callbacks are being invoked.
     *
     * @param {String} The name of the event to be triggered. Any additional arguments will be passed to the callback function.
     */
    target.emit = function emit (type) {

        var args = [].slice.apply(arguments),
            list = events[type] || [],
            len = list.length,
            j = 0;

        args.shift();

        for (; j < len; j += 1) {
            list[j].f.apply(list[j].c, args);
        }

    };

    return target;

};

// see UMD pattern at https://github.com/umdjs/umd/blob/master/returnExports.js
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