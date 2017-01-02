import * as net from 'net';

import EventBus from './events/EventBus';
import IEventBus from './events/IEventBus';
import IMessage from './messages/IMessage';
import MessageType from './messages/MessageType';

export default class ExampleTcpClient {

    protected clients:net.Socket[] = [];

    constructor() {
        var argCount = process.argv.length;

      if (argCount != 3) {
        console.log("Must specify IP address ");
        process.exit();
      }

      let maxClients:number = 5;
      let host:string = process.argv[argCount-1];

      this.makeConnections(host, maxClients,() => {
            console.log("Destroy clients");
            setTimeout(() => { 
                for (var count=0; count<maxClients; count++) {
                    this.clients[count].destroy();
                }
                this.makeConnections(host, maxClients,() => {
                    this.quit();
                });
            }, 3000);
      });
    }

    private makeConnections(host:string, maxClients:number, done:Function) {
        for (var count:number=0; count<maxClients; count++) {
            this.makeConnection(host, count, maxClients, done);
        }
    }

    private makeConnection(host:string, count:number, maxClients:number, done:Function) {
        setTimeout(() => {
                this.clients[count] = this.connect(host, () => {
                    if (count == (maxClients-1)) {
                        done();
                    }
                });
               
        }, 1000); 
    }

    private connect(host:string, done:Function):net.Socket {
        let socket:net.Socket = new net.Socket();
		
		socket.on("close", (e) => {
			console.log("Socket closed");
		});

		socket.on("error", (e) => {
			console.log("Socket cannot connect");
		});

		socket.connect(5000, host, () => {
            console.log("Add connection");
            done();
		});

        return socket;
    }

    private quit() {
        console.log('Press any key to exit');

        process.stdin.on('data', process.exit.bind(process, 0));
    }
}

new ExampleTcpClient();