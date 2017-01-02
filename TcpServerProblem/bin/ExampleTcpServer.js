"use strict";
const net = require("net");
const EventBus_1 = require("./events/EventBus");
const MessageType_1 = require("./messages/MessageType");
class ExampleTcpServer {
    constructor() {
        let bus = EventBus_1.default.getInstance();
        let port = 5000;
        let server = net.createServer((socket) => {
            console.log("New client");
            bus.sendMessage({ messageType: MessageType_1.default.CONNECTION_OPENED });
            socket.on("data", (data) => {
            });
            socket.on("close", () => {
                console.log("close client ");
                bus.sendMessage({ messageType: MessageType_1.default.CONNECTION_CLOSED });
            });
        }).listen(port);
        server.on("error", function (e) {
            bus.sendMessage({ messageType: MessageType_1.default.SERVER_ERROR });
        });
        server.on("close", function (e) {
            bus.sendMessage({ messageType: MessageType_1.default.SERVER_CLOSED });
        });
        server.on("listening", () => {
            bus.sendMessage({ messageType: MessageType_1.default.SERVER_LISTENING });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExampleTcpServer;
