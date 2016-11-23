"use strict";
const React = require('react');
const react_native_1 = require('react-native');
const Styles_1 = require('./Styles');
const EventBus_1 = require('../events/EventBus');
const MessageType_1 = require('../messages/MessageType');
class Root extends React.Component {
    constructor() {
        super();
        this.connectionCount = 0;
        this.serverState = "initialising";
        this.state = { connectionCount: this.connectionCount, serverState: this.serverState };
    }
    componentDidMount() {
        let bus = EventBus_1.default.getInstance();
        bus.addEventListener(MessageType_1.default.CONNECTION_CLOSED, function () {
            this.connectionCount--;
            this.updateState();
        }, this);
        bus.addEventListener(MessageType_1.default.CONNECTION_OPENED, function () {
            this.connectionCount++;
            this.updateState();
        }, this);
        bus.addEventListener(MessageType_1.default.SERVER_CLOSED, function () {
            this.serverState = "closed";
            this.updateState();
        }, this);
        bus.addEventListener(MessageType_1.default.SERVER_LISTENING, function () {
            this.serverState = "listening";
            this.updateState();
        }, this);
    }
    updateState() {
        this.setState({ connectionCount: this.connectionCount, serverState: this.serverState });
    }
    render() {
        return (React.createElement(react_native_1.View, {style: Styles_1.default.container}, 
            React.createElement(react_native_1.Text, {style: Styles_1.default.welcome}, "Tcp Server"), 
            React.createElement(react_native_1.Text, {style: Styles_1.default.instructions}, 
                "Number of connections ", 
                this.state.connectionCount), 
            React.createElement(react_native_1.Text, {style: Styles_1.default.instructions}, 
                "Server ", 
                this.state.serverState)));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Root;
