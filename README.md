# minivents [![Build Status](https://travis-ci.org/allouis/minivents.svg?branch=master)](https://travis-ci.org/allouis/minivents)

http://allouis.github.io/minivents/

# API

`on` : Listen to event. Params { type:`String`, callback:`Function` | context:`Object` }
    
`off` : Stop listening to event. Params { type:`String` | callback:`Function` } 
    
`emit`: Emit event. Params { type:`String` | data:`Object` } 
    
# Constructor Example
```javascript
var sandbox = new Events();
    
sandbox.on("event", function(){
    // do stuff
});

sandbox.emit("event"); //does stuff

sandbox.off("event");

sandbox.emit("event"); //does not do stuff
```    
# Mixin Example
```javascript
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
```
