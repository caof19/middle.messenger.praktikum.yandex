type  IListners = {
  [key:string]: Array<() => void>;
}

export default class EventBus {

  private listeners: IListners;
  constructor() {
    this.listeners  = {};
  }

  on(eventName:string, callback: () => void) {
    if(!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(callback);
  }

  off(eventName:string, callback: () => void) {
    if(!this.listeners[eventName]) {
      throw new Error("No event named " + eventName);
    }

    this.listeners[eventName].filter(item => item !== callback);
  }

  emit(eventName:string):void {

    if(!this.listeners[eventName]) {
      throw new Error("No event named " + eventName);
    }

    this.listeners[eventName].forEach(func => {
      func()
    })
  }
}
