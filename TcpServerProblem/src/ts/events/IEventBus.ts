import {IMessage} from '../messages/IMessage';

export interface IEventBus {
  addEventListener(eventName:string, callBack:Function, context?: any);
  addEventListeners(eventName:string[], callBack:Function, context?: any);
  removeEventListener(eventName:string, callBack:Function);
  sendEvent(eventName:string, message?:IMessage);
  sendMessage(message:IMessage);
}

export default IEventBus;
