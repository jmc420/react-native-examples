"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
    constructor(message) {
        if (message) {
            this.messageType = message.messageType;
        }
    }
}
exports.default = Message;
