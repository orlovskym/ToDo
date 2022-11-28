let devMode = false;
let events = [];
let funktions = [];


function subscribe(eventName, funktion) {
    if (devMode) console.log('New subscription: ' + eventName);
    events.push(eventName);
    funktions.push(funktion);
}

function publish(eventName, data) {
    if (devMode) console.log('Broadcast: ' + eventName + ' with ' + data);

       for (let i=0; i<events.length; i++){
           if (events[i]==eventName){
               funktions[i](data);
           }
       }
}

export { subscribe, publish, }