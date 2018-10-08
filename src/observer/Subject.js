export default class Subject {
    constructor() {
        this.observers = {};
    }
    subscribe(command, observer) {
        if (!this.observers[command]) {
            this.observers[command] = [];
        }
        let arrObservers = this.observers[command];
        arrObservers.map((item)=>{
            if (item == observer){
                return;
            }
        });
        arrObservers.push(observer);
    }
    unsubscribe(command, observer) {
        if (!this.observers[command]) {
            return;
        }

        let arrObservers = this.observers[command].filter((item)=>{
            return (item != observer)
        });
        this.observers[command] = arrObservers;
    }
    update(command, data = {}) {
        if (!this.observers[command]) {
            return;
        }
        this.observers[command].map((item)=>{
            item.update(command, data);
        });
    }
}
