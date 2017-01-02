"use strict";
const React = require("react");
const EventBus_1 = require("./events/EventBus");
const Root_1 = require("./view/Root");
const ExampleTcpServer_1 = require("./ExampleTcpServer");
class Application extends React.Component {
    constructor() {
        super();
        new EventBus_1.default();
    }
    componentDidMount() {
        let server = new ExampleTcpServer_1.default();
    }
    render() {
        return (React.createElement(Root_1.default, null));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Application;
