var assert = require('assert'),
    Events = require('./minivents.js');

describe('Events Constructor', function () {
  it('should return an object containing the methods used by minivents if called with new', function () {
      var bus = new Events();
      assert.equal('object', typeof bus);
  });

  it('should return an object containing the methods used by minivents if called with an empty object', function () {
      var bus = new Events();
      assert.equal('object', typeof bus);
  });

});

describe('Event busses', function () {

    it('should contain an `emit` function', function () {
      var bus = new Events();
      assert.equal('function', typeof bus.emit);
    });

    it('should contain an `off` function', function () {
      var bus = new Events();
      assert.equal('function', typeof bus.off);
    });

    it('should contain an `on` function', function () {
      var bus = new Events();
      assert.equal('function', typeof bus.on);
    });

});

describe('`on` function', function () {
  
  it('should not throw any exceptions when called with a string and a function', function () {
    var bus = new Events();
    try {
        bus.on('ping', function () { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with a string, a function and an object', function () {
    var bus = new Events();
    try {
        bus.on('ping', function () { }, { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

});

describe('`off` function', function () {
  
  it('should not throw any exceptions when called with a string and a function', function () {
    var bus = new Events(),
        f = function () { };
    bus.on('ping', f);
    try {
        bus.off('ping', f);
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with a function that is not registered as a callback for the specified event', function () {
    var bus = new Events();
    bus.on('ping', function () { });
    try {
        bus.off('ping', function () { });
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should not throw any exceptions when called with the name of an event that does not exist', function () {
    var bus = new Events(),
        f = function () { };
    bus.on('ping', f);
    try {
        bus.off('pong', f);
    } catch (e) {
        assert.fail(undefined, e, e.toString());
    }
  });

  it('should result in the given callback no longer being triggered', function () {
    var bus = new Events(),
        f = function () { assert.fail(undefined, undefined, 'This function must not be executed.'); };
    bus.on('ping', f);
    bus.off('ping', f);
    bus.emit('ping');
  });

});

describe('`emit` function',  function () {
    it('should result in registered callbacks being invoked',  function () {
        var bus = new Events(),
            called = 0,
            f1 = function () { called++ },
            f2 = function () { called++ },
            f3 = function () { called++ };
        bus.on('ping', f1);
        bus.on('ping', f2);
        bus.on('ping', f3);
        bus.emit('ping');
        assert.equal(called, 3);
    });

    it('should pass all of its additional arguments to the callback',  function () {
        var bus = new Events(),
            f = function (arg0, arg1) { 
              assert.equal('foo', arg0);
              assert.equal('bar', arg1);
            };
        bus.on('ping', f);
        bus.emit('ping', 'foo', 'bar');
    });

    it('should inject a callback\'s context',  function () {
        var bus = new Events(),
            ctx = { }
            f = function () { assert.equal(ctx, this); };
        bus.on('ping', f, ctx);
        bus.emit('ping');
    });

});
