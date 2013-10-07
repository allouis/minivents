minivents
=========

http://allouis.github.io/minivents/

API
===

`on` : Listen to event. Params { type:`String`, callback:`Function` | context:`Object` }
    
`off` : Stop listening to event. Params { type:`String` | callback:`Function` } 
    
`emit`: Emit event. Params { type:`String` | data:`Object` } 

`trigger` is no longer supported!!

`:%s/myobj.trigger(/myobj.emit(/` should do the trick in VIM
    
Example
=======

    var sandbox = new Events();
    
    sandbox.on("event", function(){
        // do stuff
    });

    sandbox.emit("event"); //does stuff

    sandbox.off("event");

    sandbox.emit("event"); //does not do stuff
    
Mixin Example
=======

    var sandbox = {
        otherStuff: true
    };
    
    Events(sandbox);
    
    sandbox.on("event", function(){
        // do stuff
    });

    sandbox.emit("event"); //does stuff

    sandbox.off("event");

    sandbox.emit("event"); //does not do stuff
    
