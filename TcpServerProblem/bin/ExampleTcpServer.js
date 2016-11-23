"use strict";
const net = require('net');
const EventBus_1 = require('./events/EventBus');
const MessageType_1 = require('./messages/MessageType');
class ExampleTcpServer {
    constructor() {
        let bus = EventBus_1.default.getInstance();
        let port = 5000;
        let host = "localhost";
        let server = net.createServer((socket) => {
            console.log("New client");
            bus.sendMessage({ messageType: MessageType_1.default.CONNECTION_OPENED });
            socket.on("data", (data) => {
            });
            socket.on("close", () => {
                console.log("close client ");
                bus.sendMessage({ messageType: MessageType_1.default.CONNECTION_CLOSED });
            });
        }).listen(port, "localhost", null, function () {
            console.log("Tcp server started " + host + ":" + port);
        });
        server.on("error", function (e) {
        });
        server.on("close", function (e) {
            bus.sendMessage({ messageType: MessageType_1.default.SERVER_CLOSED });
        });
        server.on("listening", () => {
            bus.sendMessage({ messageType: MessageType_1.default.SERVER_LISTENING });
        });
        ;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExampleTcpServer;
