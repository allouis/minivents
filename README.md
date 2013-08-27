minivents
=========

Small event system for Javascript.

API
===

`on`
    Lets you listen for events, pass in event, callback and optionally context
    
`off`
    Lets you stop listening for events, pass in event and optionally function
    
`trigger`
    Calls all functions listening for that event, pass in an event
    
Example
=======

    var sandbox = new Events()

    var Model = function(name){
      this.name = name;
      this.alert = function(word){
        var extra = ""
        if(word) extra = " says " + word
        alert(this.name + extra)
      }
      sandbox.on("alert", this.alert, this);
    }
  
    new Model("fabien")
  
    sandbox.trigger("alert") //alerts "fabien"
    sandbox.trigger("alert", "BOO!")// alerts "fabien says BOO!"




