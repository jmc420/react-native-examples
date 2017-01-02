"use strict";
const net = require("net");
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
                    this.quit();
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
    quit() {
        console.log('Press any key to exit');
        process.stdin.on('data', process.exit.bind(process, 0));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExampleTcpClient;
new ExampleTcpClient();
