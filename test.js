var assert = require('assert'),
    Events = require('./minivents.js');

describe('Events Function', function () {
  it('should return an object with just three methods: on, off and emit, if called with new', 
    function () {
      var bus = new Events();
      assert.equal(true, typeof bus.emit === 'function');
      assert.equal(true, typeof bus.off === 'function');
      assert.equal(true, typeof bus.on === 'function');
  });

  it('should modify original object', function () {
    var obj = { foo : 'bar' }; 
    eventedObj = Events(obj);
    assert.equal(obj, eventedObj);
  });
});

describe('`on` function', function () {
  
  it('should not throw any exceptions when called with a string and a function', function () {
    var bus = Events({});
    try {
        bus.on('ping', function () { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with a string, a function and an object', function () {
    var bus = Events({});
    try {
        bus.on('ping', function () { }, { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

});

describe('`off` function', function () {
  
  it('should not throw any exceptions when called with a string and a function', function () {
    var bus = Events({}),
        f = function () { };
    bus.on('ping', f);
    try {
        bus.off('ping', f);
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with a function that is not registered as a callback for the specified event', function () {
    var bus = Events({});
    bus.on('ping', function () { });
    try {
        bus.off('ping', function () { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with the name of an event that does not exist', function () {
    var bus = Events({}),
        f = function () { };
    bus.on('ping', f);
    try {
        bus.off('pong', f);
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should result in the given callback no longer being triggered', function () {
    var bus = Events({}),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); };
    bus.on('ping', f);
    bus.off('ping', f);
    bus.emit('ping');
  });

});

describe('`emit` function',  function () {
    it('should result in registered callbacks being invoked',  function () {
        var bus = Events({}),
            f = function () { res = true; },
            res = false;
        bus.on('ping', f);
        bus.emit('ping');
        assert(res);
    });

    it('should pass all of its additional arguments to the callback',  function () {
        var bus = Events({}),
            f = function (arg) { foo = arg; },
            foo = false;
        bus.on('ping', f);
        bus.emit('ping', 'bar');
        assert.equal('bar', foo);
    });

    it('should inject a callback\'s context',  function () {
        var bus = Events({}),
            ctx = { }
            f = function () { o = this; },
            o = undefined;
        bus.on('ping', f, ctx);
        bus.emit('ping');
        assert.equal(ctx, o);
    });
});
