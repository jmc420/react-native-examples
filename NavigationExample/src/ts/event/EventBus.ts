
import EventEmitter = require('eventemitter3');

export default class EventBus {
    protected eventEmitter: EventEmitter;
    protected static instance: EventBus;

    public static DRAWER_EVENT:string = "DRAWER";
    public static MENU_POP_EVENT:string = "MENU_POP";
    public static MENU_PUSH_EVENT:string = "MENU_PUSH";
    public static MENU_REPLACE_EVENT:string = "MENU_REPLACE";

    constructor() {
        if (EventBus.instance != null) {
            throw new Error("EventBus already instantiated");
        }
        this.eventEmitter = new EventEmitter();
        EventBus.instance = this;
    }

    public getEventEmitter():EventEmitter {
        return this.eventEmitter;
    }

    public static getInstance(): EventBus {
        if (EventBus.instance == null) {
            throw new Error("EventBus not instantiated");
        }
        return EventBus.instance;
    }

}