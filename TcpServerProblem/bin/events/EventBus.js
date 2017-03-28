"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("eventemitter3");
class EventBus {
    constructor() {
        if (EventBus.instance != null) {
            throw new Error("EventBus already instantiated");
        }
        this.eventEmitter = new EventEmitter();
        EventBus.instance = this;
    }
    addEventListener(eventName, callBack, context) {
        this.eventEmitter.addListener(eventName, callBack, context);
    }
    addEventListeners(eventNames, callBack, context) {
        for (var count = 0; count < eventNames.length; count++) {
            this.eventEmitter.addListener(eventNames[count], callBack, context);
        }
    }
    removeEventListener(eventName, callBack) {
        this.eventEmitter.removeListener(eventName, callBack);
    }
    sendEvent(eventName, message) {
        this.eventEmitter.emit(eventName, message);
    }
    sendMessage(message) {
        if (message != null) {
            this.eventEmitter.emit(message.messageType, message);
        }
        else {
            this.eventEmitter.emit(message.messageType);
        }
    }
    static getInstance() {
        if (EventBus.instance == null) {
            throw new Error("EventBus not instantiated");
        }
        return EventBus.instance;
    }
}
exports.default = EventBus;
