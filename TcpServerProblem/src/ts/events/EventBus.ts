
import EventEmitter = require('eventemitter3');
import IEventBus from './IEventBus';
import IMessage from '../messages/IMessage';

export default class EventBus implements IEventBus {
  protected eventEmitter:EventEmitter;
  protected static instance:IEventBus;

  constructor() {
    if (EventBus.instance != null) {
      throw new Error("EventBus already instantiated");
    }
    this.eventEmitter = new EventEmitter();
    EventBus.instance = this;
  }

  public addEventListener(eventName:string, callBack:Function, context?: any) {
    this.eventEmitter.addListener(eventName, callBack, context);
  }

  public addEventListeners(eventNames:string[], callBack:Function, context?: any) {
    for (var count=0; count<eventNames.length; count++) {
      this.eventEmitter.addListener(eventNames[count], callBack, context);
    }
  }

  public removeEventListener(eventName:string, callBack:Function) {
    this.eventEmitter.removeListener(eventName, callBack);
  }

  public sendEvent(eventName:string, message:IMessage) {
    this.eventEmitter.emit(eventName, message);
  }

  public sendMessage(message?:IMessage) {
    if (message != null) {
      this.eventEmitter.emit(message.messageType, message);
    }
    else {
      this.eventEmitter.emit(message.messageType);
    }

  }

  public static getInstance():IEventBus {
    if (EventBus.instance == null) {
      throw new Error("EventBus not instantiated");
    }
    return EventBus.instance;
  }
}
