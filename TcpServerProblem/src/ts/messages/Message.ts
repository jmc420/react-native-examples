import IMessage from "./IMessage";

export default class Message implements IMessage {
	public	messageType:string;

	constructor(message?:IMessage) {
		if (message) {
			this.messageType = message.messageType;
		}
	}
}
