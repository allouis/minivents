minivents
=========

Small event system for Javascript.

Minified version is ~~517~~ ~~419~~ ~~338~~ 356 bytes

About this fork
===

This fork was meant to address two issues:

1. Object name change from "Events" to "Minivents" to reduce changes of name collisions
2. Add ability to mixin events to any object (at the expense of 18 bytes!)

API
===

`on`
    Lets you listen for events, 
    pass in event (`String`), callback (`Function`) and optionally context (`Object`)
    
`off`
    Lets you stop listening for events, 
    pass in event (`String`) and optionally callback (`Function`)
    
`emit`
    Calls all functions listening for that event, 
    pass in an event (`String`)
    
`trigger` is no longer supported!!
`:%s/myobj.trigger(/myobj.emit(/` should do the trick in VIM
    
Examples
=========

### Create a new object:

```javascript
var sandbox = new MiniEvents()

var me = {
  name: "Fabien",
  type: "Person"
}

var i = 0;

function sayHi(word){
  var greeting = " says "
  !!word ? greeting += word : greeting += "Hi";
  alert(this.name + greeting);
}

function logError(errorCode){
    console.log(this.type + ":: " + this.name + ": Error -- " + errorCode);
}

function heyTriggered(){
    i++;
}

sandbox.on("hey", sayHi, me);
sandbox.on("hey", heyTriggered);
sandbox.on("error", logError, me);

sandbox.emit("hey") // alerts "Fabien says Hi", i = 1;
sandbox.emit("error", 23) // logs "Person:: Fabien: Error -- 23"

sandbox.off("hey", sayHi);

sandbox.emit("hey") // i = 2;
```

### Mixin to existing object:

```javascript
var Awesome = {
    become: function() {
        this.emit('become');
    }
};
Minivents(Awesome);
Awesome.on('become', function() {
   alert("You're awesome!");
});
Awesome.become();
```

Credit
======

Thanks to https://github.com/Zolmeister, whom helped make this even smaller.
    

