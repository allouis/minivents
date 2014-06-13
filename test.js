var assert = require('assert'),
    Events = require('./minivents.js');

describe('Events Constructor', function () {
  it('should return an object containing the methods used by minivents if called with new', 
    function () {
      var bus = new Events();
      assert.equal(true, typeof bus.emit === 'function');
      assert.equal(true, typeof bus.off === 'function');
      assert.equal(true, typeof bus.on === 'function');
      assert.equal(true, typeof bus.reset === 'function');
      assert.equal(true, typeof bus.silence === 'function');
      assert.equal(true, typeof bus.unsilence === 'function');
      assert.equal(true, typeof bus.lock === 'function');
      assert.equal(true, typeof bus.unlock === 'function');
  });

  it('should return an object containing the methods used by minivents if called with an empty object', 
    function () {
      var bus = Events({});
      assert.equal(true, typeof bus.emit === 'function');
      assert.equal(true, typeof bus.off === 'function');
      assert.equal(true, typeof bus.on === 'function');
      assert.equal(true, typeof bus.reset === 'function');
      assert.equal(true, typeof bus.silence === 'function');
      assert.equal(true, typeof bus.unsilence === 'function');
      assert.equal(true, typeof bus.lock === 'function');
      assert.equal(true, typeof bus.unlock === 'function');
  });

  it('should return an object containing the methods used by minivents if called with a string', 
    function () {
      var bus = Events('test');
      assert.equal(true, typeof bus.emit === 'function');
      assert.equal(true, typeof bus.off === 'function');
      assert.equal(true, typeof bus.on === 'function');
      assert.equal(true, typeof bus.reset === 'function');
      assert.equal(true, typeof bus.silence === 'function');
      assert.equal(true, typeof bus.unsilence === 'function');
      assert.equal(true, typeof bus.lock === 'function');
      assert.equal(true, typeof bus.unlock === 'function');
  });

  it('should make named busses available via a `get` method', 
    function () {
      var bus = Events('test');
      assert.equal(true, typeof Events.get === 'function');
      assert.equal(bus, Events.get('test'));
      
  });

  it('should modify original object that was passed to it', function () {
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

describe('`reset` function',  function () {
  
  it('should remove all callbacks from the bus if called with no arguments', function () {
    var bus = Events({});
    bus.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    bus.reset();
    bus.emit('ping');
  });

  it('should remove all callbacks from a specified event if called with the event type', function () {
    var bus = Events({}),
      res = undefined;
    bus.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    bus.on('pong', function () {
      res = true;
    });
    bus.reset('ping');
    bus.emit('ping');
    bus.emit('pong');
    assert.equal(true, res);
  });

  it('should not affect public busses', function () {
    var bus = Events('test'),
      res = undefined;
    bus.on('ping', function () {
      res = true;
    });
    bus.reset();
    bus.emit('ping');
    assert.equal(true, res);
  });

});

describe('`silence` function', function () {
  it('should disable triggering events of any type if called with no arguments', function () {
    var bus = Events({});
    bus.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    bus.silence();
    bus.on('pong', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    bus.emit('ping');
    bus.emit('pong');
  });

  it('should disable triggering events of a certain type if called with the event type', function () {
    var bus = Events({}),
      res = undefined;
    bus.on('ping', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    bus.on('pong', function () {
      res = true;
    });
    bus.silence('ping');
    bus.emit('ping');
    bus.emit('pong');
    assert.equal(true, res);
  });

  it('should prevent the specified callback from being triggered if called with the event type and callback function', function () {
    var bus = Events({}),
      f = function () {
        assert.fail(undefined, undefined, 'This function must not be executed.');
      },
      res = undefined;
    bus.on('ping', f);
    bus.on('ping', function () {
      res = true;
    });
    bus.silence('ping', f);
    bus.emit('ping');
    assert.equal(true, res);
  });

  it('should not affect public busses if called with no arguments', function () {
    var bus = Events('test'),
      res = undefined;
    bus.on('ping', function () {
      res = true;
    });
    bus.silence();
    bus.emit('ping');
    assert.equal(true, res);
  });

  it('should not affect public busses if called with an event type', function () {
    var bus = Events('test'),
      res = undefined;
    bus.on('ping', function () {
      res = true;
    });
    bus.silence('ping');
    bus.emit('ping');
    assert.equal(true, res);
  });
});

describe('`unsilence` function', function () {
  it('should re-enable triggering messages on a bus if called with no arguments', function () {
    var bus = Events({}),
      res = undefined;
    bus.on('ping', function () {
      res = true;
    });
    bus.silence();
    bus.unsilence();
    bus.emit('ping');
    assert.equal(true, res);
  });

  it('should re-enable triggering messages of a certain type if called with the event type', function () {
    var bus = Events({}),
      res = undefined;
    bus.on('ping', function () {
      res = true;
    });
    bus.on('pong', function () {
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    bus.silence('ping');
    bus.silence('pong');
    bus.unsilence('ping');
    bus.emit('ping');
    assert.equal(true, res);
  });

  it('should re-enable the specified callback if called with the event type and callback function', function () {
    var bus = Events({}),
      f0 = function () {
        res = true;
      },
      f1 = function () {
        assert.fail(undefined, undefined, 'This function must not be executed.');
      },
      res = undefined;
    bus.on('ping', f0);
    bus.on('ping', f1);
    bus.silence('ping', f0);
    bus.silence('ping', f1);
    bus.unsilence('ping', f0);
    bus.emit('ping');
    assert.equal(true, res);
  });
});

describe('`lock` function', function () {

  it('should prevent new callbacks from being attach to any events if called with no argument', function () {
    var bus = Events({}),
      res = undefined;
    bus.on('ping', function () { // this function should still be executed
      res = true;
    });
    bus.lock();
    bus.on('ping', function () { // this function should not be executed
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    bus.emit('ping');
    assert.equal(true, res);
    bus.on('pong', function () { // and this function should not be executed either
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    bus.emit('pong');
  });

  it('should prevent new callbacks from being attach to any events if called with an event name', function () {
    var bus = Events({}),
      res = undefined;
    bus.on('ping', function () { // this function should still be executed
      res = true;
    });
    bus.lock('ping');
    bus.on('ping', function () { // this function should not be executed
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    bus.emit('ping');
    assert.equal(true, res);
    res = false;
    bus.on('pong', function () { // this function should be executed as it belongs to a different (unlocked) event
      res = true;
    });
    bus.emit('pong');
    assert.equal(true, res);
  });

  it('should not affect public busses if called with no argument', function () {
    var bus = Events('test'),
      res = undefined;
    bus.lock();
    bus.on('ping', function () {
      res = true;
    });
    bus.emit('ping');
    assert.equal(true, res);
  });

  it('should not affect public busses if called with an event name', function () {
    var bus = Events('test'),
      res = undefined;
    bus.on('ping', function () {});
    bus.lock('ping');
    bus.on('ping', function () {
      res = true;
    });
    bus.emit('ping');
    assert.equal(true, res);
  });

});

describe('`unlock` function', function () {

  it('should allow new callbacks to be attached to any events if called with no argument', function () {
    var bus = Events({}),
      res = undefined;
    bus.lock();
    bus.unlock();
    bus.on('ping', function () {
      res = true;
    });
    bus.emit('ping');
    assert.equal(true, res);
    bus.on('pong', function () {
      res = true;
    });
    bus.emit('pong');
  });

  it('should allow new callbacks to be attached to any events if called with an event name', function () {
    var bus = Events({}),
      res = undefined;
    bus.lock('ping');
    bus.lock('pong');
    bus.unlock('ping');
    bus.on('ping', function () {
      res = true;
    });
    bus.emit('ping');
    assert.equal(true, res);
    bus.on('pong', function () { // this function should not execute as the pong event has been locked
      assert.fail(undefined, undefined, 'This function must not be executed.');
    });
    bus.emit('pong');
  });

});