import * as net from 'net';

import EventBus from './events/EventBus';
import IEventBus from './events/IEventBus';
import IMessage from './messages/IMessage';
import MessageType from './messages/MessageType';

export default class ExampleTcpServer {

    constructor() {
        let bus:IEventBus = EventBus.getInstance();
        let port:number = 5000;
        let server:net.Server = net.createServer((socket) => {
			console.log("New client");

            bus.sendMessage({messageType:MessageType.CONNECTION_OPENED});

			socket.on("data", (data) => {
				
			});
			socket.on("close", () => {
				console.log("close client ");
                bus.sendMessage({messageType:MessageType.CONNECTION_CLOSED});
			});
		}).listen(port);
		
		server.on("error", function(e) {
			bus.sendMessage({messageType:MessageType.SERVER_ERROR});
		});

		server.on("close", function(e) {
			bus.sendMessage({messageType:MessageType.SERVER_CLOSED});
		});

		server.on("listening", () => {
			bus.sendMessage({messageType:MessageType.SERVER_LISTENING});
		});

    }
}