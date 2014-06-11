# minivents

Minivents allows you to create message busses, send messages over those busses and subscribe to messages.

## API

`Events` : Create a new message bus. This bus provides the following methods.

`on` : With this method you can register callbacks to be executed when a certain event is triggered. Params: `String type`, `Function callback`, `Object context`
    
`off` : Removes an event listener. A reference to the function to be removed is required. Params: `String type`, `Function callback`
    
`emit`: Calling this method triggers the specified event and will result in all registered callbacks being executed. Params: `String type`, `Object data` 
    
## Example

    var bus = new Events();
    
    bus.on('ping', function(){
        console.log('pong');
    });

    bus.emit('ping'); // 'pong'

    bus.off('ping');

    bus.emit('event'); // [nothing happens]
    
You can also create mixins of your objects to make a message bus out of any object.

    var obj = {
        foo: 'bar'
    };
    
    Events(obj);
    
    obj.on('ping', function(){
        console.log('pong');
    });

    obj.emit('ping'); // 'pong'    
