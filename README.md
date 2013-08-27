minivents
=========

Small event system for Javascript.

API
===

`on`
    Lets you listen for events, 
    pass in event (`String`), callback (`Function`) and optionally context (`Object`)
    
`off`
    Lets you stop listening for events, 
    pass in event (`String`) and optionally callback (`Function`)
    
`trigger`
    Calls all functions listening for that event, 
    pass in an event (`String`)
    
Example
=======

    var sandbox = new Events()

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

    sandbox.trigger("hey") // alerts "Fabien says Hi", i = 1;
    sandbox.trigger("error", 23) // logs "Person:: Fabien: Error -- 23"
    
    sandbox.off("hey", sayHi);
    
    sandbox.trigger("hey") // i = 2;

    

