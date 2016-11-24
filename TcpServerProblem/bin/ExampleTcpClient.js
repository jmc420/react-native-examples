"use strict";
const net = require('net');
class ExampleTcpClient {
    constructor() {
        this.clients = [];
        var argCount = process.argv.length;
        if (argCount != 3) {
            console.log("Must specify IP address ");
            process.exit();
        }
        let maxClients = 5;
        let host = process.argv[argCount - 1];
        this.makeConnections(host, maxClients, () => {
            console.log("Destroy clients");
            setTimeout(() => {
                for (var count = 0; count < maxClients; count++) {
                    this.clients[count].destroy();
                }
                this.makeConnections(host, maxClients, () => {
                    process.exit();
                });
            }, 3000);
        });
    }
    makeConnections(host, maxClients, done) {
        for (var count = 0; count < maxClients; count++) {
            this.makeConnection(host, count, maxClients, done);
        }
    }
    makeConnection(host, count, maxClients, done) {
        setTimeout(() => {
            this.clients[count] = this.connect(host, () => {
                if (count == (maxClients - 1)) {
                    done();
                }
            });
        }, 1000);
    }
    connect(host, done) {
        let socket = new net.Socket();
        socket.on("close", (e) => {
        });
        socket.on("error", (e) => {
        });
        socket.connect(5000, host, () => {
            console.log("Add connection");
            done();
        });
        return socket;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExampleTcpClient;
new ExampleTcpClient();
